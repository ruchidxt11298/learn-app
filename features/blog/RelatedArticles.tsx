"use client";

import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/feedback/EmptyState";
import BlogCard from "./BlogCard";
import { useRelatedBlogPosts } from "@/hooks/queries/useBlog";
import type { BlogPost } from "@/types";

export default function RelatedArticles({ post }: { post: BlogPost }) {
  const { data: related, isLoading } = useRelatedBlogPosts(post);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!related || related.length === 0) {
    return <EmptyState title="No related articles" description="Check back soon for more stories like this one." />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {related.map((r) => (
        <BlogCard key={r.id} post={r} />
      ))}
    </div>
  );
}
