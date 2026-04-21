import { personal, posts as fallbackPosts } from '../data/portfolio';

export interface BlogPostItem {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
}

interface RssJsonItem {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  categories?: string[];
}

interface RssJsonResponse {
  status?: string;
  items?: RssJsonItem[];
}

function stripHtml(input: string) {
  return input
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toDisplayDate(input?: string) {
  if (!input) return '';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

function getMediumFeedUrl(mediumUrl: string | undefined) {
  if (!mediumUrl) return null;

  try {
    const url = new URL(mediumUrl);

    if (url.pathname.startsWith('/feed')) {
      return mediumUrl;
    }

    if (url.pathname.startsWith('/@')) {
      return `https://medium.com/feed${url.pathname}`;
    }

    if (url.hostname.endsWith('.medium.com') && url.hostname !== 'medium.com') {
      return `https://${url.hostname}/feed`;
    }

    return null;
  } catch {
    return null;
  }
}

async function fetchMediumPosts(): Promise<BlogPostItem[] | null> {
  const feedUrl = getMediumFeedUrl((personal as { medium?: string }).medium);
  if (!feedUrl) return null;

  try {
    const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
    const response = await fetch(endpoint);
    if (!response.ok) return null;

    const data = (await response.json()) as RssJsonResponse;
    if (data.status !== 'ok' || !Array.isArray(data.items) || data.items.length === 0) {
      return null;
    }

    const mapped = data.items
      .map((item) => {
        const title = (item.title || '').trim();
        const href = (item.link || '').trim();
        if (!title || !href) return null;

        const excerpt = stripHtml(item.description || '').slice(0, 170);

        return {
          category: item.categories?.[0] || 'Medium',
          date: toDisplayDate(item.pubDate) || 'Latest',
          title,
          excerpt: excerpt || 'Read the full article on Medium.',
          href,
        } as BlogPostItem;
      })
      .filter((post): post is BlogPostItem => post !== null);

    return mapped.length > 0 ? mapped : null;
  } catch {
    return null;
  }
}

export async function getBlogPosts(limit?: number): Promise<BlogPostItem[]> {
  const mediumPosts = await fetchMediumPosts();
  const basePosts: BlogPostItem[] = mediumPosts || fallbackPosts;

  if (typeof limit === 'number') {
    return basePosts.slice(0, limit);
  }

  return basePosts;
}
