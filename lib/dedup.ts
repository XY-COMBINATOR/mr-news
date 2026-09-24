import crypto from 'crypto';
import { RawArticle } from './rss';
import { supabaseAdmin } from './supabase';

export function hashUrl(url: string): string {
  return crypto.createHash('sha256').update(url.trim().toLowerCase()).digest('hex');
}

/**
 * Calculates Jaccard Similarity between two headline strings.
 */
function jaccardSimilarity(str1: string, str2: string): number {
  const words1 = new Set(str1.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean));
  const words2 = new Set(str2.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean));
  
  if (words1.size === 0 || words2.size === 0) return 0;
  
  let intersection = 0;
  words1.forEach(w => {
    if (words2.has(w)) intersection++;
  });
  
  const union = new Set([...words1, ...words2]).size;
  return intersection / union;
}

/**
 * Filters out duplicate articles within the same batch and against seen articles in Supabase.
 */
export async function deduplicateArticles(rawArticles: RawArticle[]): Promise<RawArticle[]> {
  if (rawArticles.length === 0) return [];

  // 1. In-batch deduplication via Jaccard similarity & URL hashing
  const uniqueArticles: RawArticle[] = [];
  const seenHashesInBatch = new Set<string>();

  for (const article of rawArticles) {
    const hash = hashUrl(article.link);
    if (seenHashesInBatch.has(hash)) continue;

    // Check similarity against already accepted articles in batch
    const isSimilar = uniqueArticles.some(
      existing => jaccardSimilarity(existing.title, article.title) > 0.6
    );

    if (!isSimilar) {
      seenHashesInBatch.add(hash);
      uniqueArticles.push(article);
    }
  }

  // 2. Cross-day deduplication against Supabase `articles_seen`
  try {
    const hashes = uniqueArticles.map(a => hashUrl(a.link));
    const { data: seenDb } = await supabaseAdmin
      .from('articles_seen')
      .select('url_hash')
      .in('url_hash', hashes);

    const seenHashesInDb = new Set((seenDb || []).map((row: { url_hash: string }) => row.url_hash));

    const finalArticles = uniqueArticles.filter(a => !seenHashesInDb.has(hashUrl(a.link)));
    return finalArticles;
  } catch (err) {
    console.error('[DEDUP] Error querying Supabase articles_seen:', err);
    return uniqueArticles;
  }
}

/**
 * Persists newly processed articles into Supabase `articles_seen`.
 */
export async function markArticlesSeen(articles: { link: string; title: string; source: string }[]) {
  if (articles.length === 0) return;

  const rows = articles.map(a => ({
    url_hash: hashUrl(a.link),
    url: a.link,
    headline: a.title,
    source: a.source,
  }));

  try {
    await supabaseAdmin.from('articles_seen').upsert(rows, { onConflict: 'url_hash' });
  } catch (err) {
    console.error('[DEDUP] Error marking articles as seen in Supabase:', err);
  }
}
// MR NEWS — Executive Morning Intelligence Platform
