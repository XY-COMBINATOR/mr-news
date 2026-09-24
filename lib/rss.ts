import Parser from 'rss-parser';

export interface RawArticle {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  contentSnippet?: string;
  category?: string;
}

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
  timeout: 8000,
});

const FEEDS = [
  // ── Tier 1: Frontier AI Labs & Research ──────────────────────────────────
  { source: 'OpenAI Blog',     url: 'https://openai.com/news/rss.xml',                                    tier: 1 },
  { source: 'HuggingFace',     url: 'https://huggingface.co/blog/feed.xml',                               tier: 1 },
  { source: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/',                            tier: 1 },
  // ── Tier 2: AI Tech News & Breakthroughs ─────────────────────────────────
  { source: 'TechCrunch AI',   url: 'https://techcrunch.com/category/artificial-intelligence/feed/',     tier: 2 },
  { source: 'The Verge AI',    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', tier: 2 },
  { source: 'Wired AI',        url: 'https://www.wired.com/feed/tag/ai/latest/rss',                      tier: 2 },
  { source: 'Ars Technica',    url: 'https://feeds.arstechnica.com/arstechnica/index',                   tier: 2 },
  { source: 'MarkTechPost',    url: 'https://www.marktechpost.com/feed/',                                tier: 2 },
];

/**
 * Crawls configured premium RSS feeds and returns a normalized array of raw news articles.
 */
export async function fetchRawArticles(): Promise<RawArticle[]> {
  const articles: RawArticle[] = [];

  const feedPromises = FEEDS.map(async (feed) => {
    try {
      const res = await parser.parseURL(feed.url);
      const items = res.items.slice(0, 10);
      for (const item of items) {
        if (item.title && item.link) {
          articles.push({
            title: item.title.trim(),
            link: item.link.trim(),
            source: feed.source,
            pubDate: item.pubDate || new Date().toISOString(),
            contentSnippet: item.contentSnippet || item.content || '',
          });
        }
      }
    } catch (err) {
      console.warn(`[RSS] Failed to fetch feed from ${feed.source}:`, err);
    }
  });

  await Promise.allSettled(feedPromises);
  return articles;
}
// MR NEWS — Executive Morning Intelligence Platform
