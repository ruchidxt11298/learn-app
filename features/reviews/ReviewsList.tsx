"use client";

import ImageWithFallback from "@/components/media/ImageWithFallback";
import Rating from "@/components/ui/Rating";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/feedback/EmptyState";
import { useReviewsForEntity } from "@/hooks/queries/useReviews";
import { formatDate } from "@/utils/formatDate";
import type { Review } from "@/types";

export default function ReviewsList({ entityType, entityId }: { entityType: Review["entityType"]; entityId: string }) {
  const { data: reviews, isLoading } = useReviewsForEntity(entityType, entityId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return <EmptyState title="No reviews yet" description="Be the first to share your experience." />;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-2xl border border-slate-100 p-5 dark:border-slate-700">
          <div className="flex items-start gap-3">
            {review.avatar ? (
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <ImageWithFallback image={review.avatar} fill className="object-cover" sizes="40px" />
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                {review.author.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-dark dark:text-white">{review.author}</p>
                <span className="text-xs text-text-muted">{formatDate(review.date)}</span>
              </div>
              <Rating value={review.rating} className="mt-1" />
              <p className="mt-2 text-sm text-text-muted">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
