import { useQuery } from "@tanstack/react-query";
import {
  getBlogCategories,
  getBlogPostBySlug,
  getBlogPosts,
  getBlogTags,
  getLatestBlogPosts,
  getRelatedBlogPosts,
  type BlogFilters,
} from "@/services/blog.service";
import type { BlogPost } from "@/types";

export function useBlogPosts(filters: BlogFilters = {}) {
  return useQuery({
    queryKey: ["blog-posts", filters],
    queryFn: () => getBlogPosts(filters),
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getBlogPostBySlug(slug),
    enabled: !!slug,
  });
}

export function useLatestBlogPosts(limit = 3) {
  return useQuery({
    queryKey: ["blog-posts", "latest", limit],
    queryFn: () => getLatestBlogPosts(limit),
  });
}

export function useRelatedBlogPosts(post?: BlogPost | null) {
  return useQuery({
    queryKey: ["blog-posts", "related", post?.id],
    queryFn: () => getRelatedBlogPosts(post!),
    enabled: !!post,
  });
}

export function useBlogCategories() {
  return useQuery({ queryKey: ["blog-categories"], queryFn: getBlogCategories, staleTime: Infinity });
}

export function useBlogTags() {
  return useQuery({ queryKey: ["blog-tags"], queryFn: getBlogTags, staleTime: Infinity });
}
