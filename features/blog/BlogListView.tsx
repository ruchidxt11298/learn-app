"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "@/components/ui/Skeleton";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/feedback/EmptyState";
import ErrorState from "@/components/feedback/ErrorState";
import BlogCard from "./BlogCard";
import BlogFilters from "./BlogFilters";
import { useBlogCategories, useBlogPosts, useBlogTags } from "@/hooks/queries/useBlog";
import type { BlogFilters as Filters } from "@/services/blog.service";

export default function BlogListView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: Filters = useMemo(
    () => ({
      search: searchParams.get("search") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      tag: searchParams.get("tag") ?? undefined,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      pageSize: 6,
    }),
    [searchParams],
  );

  const { data: categories = [] } = useBlogCategories();
  const { data: tags = [] } = useBlogTags();
  const { data, isLoading, isError, refetch } = useBlogPosts(filters);

  const updateFilters = useCallback(
    (patch: Partial<Filters>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries({ ...patch, page: patch.page ?? 1 }).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });
      router.push(`/blog?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="flex flex-col gap-8">
      <BlogFilters filters={filters} categories={categories} tags={tags} onChange={updateFilters} />

      {isError && <ErrorState onRetry={() => refetch()} />}

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      )}

      {!isLoading && data && data.items.length === 0 && (
        <EmptyState title="No articles found" description="Try a different search term, category or tag." />
      )}

      {!isLoading && data && data.items.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination page={data.page} totalPages={data.totalPages} onChange={(page) => updateFilters({ page })} />
        </>
      )}
    </div>
  );
}
