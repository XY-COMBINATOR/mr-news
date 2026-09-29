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
  headers: { 'User-Agent': 'MR-News-Crawler/1.0' },
  timeout: 8000,
});

const FEEDS = [
  { source: 'Reuters Top News', url: 'https://www.reutersagency.com/feed/?best-topics=top-news&post_type=best', tier: 1 },
  { source: 'AP News', url: 'https://feedx.net/rss/ap.xml', tier: 1 },
  { source: 'BBC World News', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', tier: 1 },
  { source: 'WSJ Technology', url: 'https://feeds.a.dj.com/rss/RSSWSJTechnology.xml', tier: 1 },
  { source: 'TechCrunch', url: 'https://techcrunch.com/feed/', tier: 2 },
  { source: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index', tier: 2 },
  { source: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/', tier: 2 },
];

/**
 * Crawls configured premium RSS feeds and returns a normalized array of raw news articles.
 */
export async function fetchRawArticles(): Promise<RawArticle[]> {
  const feedPromises = FEEDS.map(async (feed) => {
    try {
      const res = await parser.parseURL(feed.url);
      const items = (res.items || []).slice(0, 10);
      const feedArticles: RawArticle[] = [];

      for (const item of items) {
        if (item.title && item.link) {
          feedArticles.push({
            title: item.title.trim(),
            link: item.link.trim(),
            source: feed.source,
            pubDate: item.pubDate || new Date().toISOString(),
            contentSnippet: item.contentSnippet || item.content || '',
          });
        }
      }

      return feedArticles;
    } catch (err) {
      console.warn(`[RSS] Failed to fetch feed from ${feed.source}:`, err);
      return [];
    }
  });

  const settled = await Promise.allSettled(feedPromises);
  const articles: RawArticle[] = [];

  for (const result of settled) {
    if (result.status === 'fulfilled') {
      articles.push(...result.value);
    }
  }

  return articles;
}
