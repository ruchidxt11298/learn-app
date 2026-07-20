import { blogsMock } from "@/data/blogs.mock";
import { simulateNetwork } from "@/lib/mockDelay";
import type { BlogPost, PaginatedResponse } from "@/types";

export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function getBlogPosts(filters: BlogFilters = {}): Promise<PaginatedResponse<BlogPost>> {
  // MOCK now — REAL later: const { data } = await api.get('/blogs', { params: filters }); return data;
  let items = [...blogsMock].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  if (filters.category) items = items.filter((p) => p.category === filters.category);
  if (filters.tag) items = items.filter((p) => p.tags.includes(filters.tag!));
  if (filters.search) {
    const q = filters.search.toLowerCase();
    items = items.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
  }

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 6;
  const start = (page - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  return simulateNetwork({
    items: pageItems,
    total: items.length,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const found = blogsMock.find((p) => p.slug === slug) ?? null;
  return simulateNetwork(found);
}

export async function getLatestBlogPosts(limit = 3): Promise<BlogPost[]> {
  const items = [...blogsMock].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)).slice(0, limit);
  return simulateNetwork(items);
}

export async function getRelatedBlogPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const items = blogsMock
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, limit);
  return simulateNetwork(items);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  return simulateNetwork(blogsMock.map((p) => p.slug), 0);
}

export async function getBlogCategories(): Promise<string[]> {
  return simulateNetwork(Array.from(new Set(blogsMock.map((p) => p.category))), 0);
}

export async function getBlogTags(): Promise<string[]> {
  return simulateNetwork(Array.from(new Set(blogsMock.flatMap((p) => p.tags))), 0);
}
