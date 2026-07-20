import { useQuery } from "@tanstack/react-query";
import { getReviewsForEntity, getTestimonials } from "@/services/reviews.service";
import type { Review } from "@/types";

export function useReviewsForEntity(entityType: Review["entityType"], entityId?: string) {
  return useQuery({
    queryKey: ["reviews", entityType, entityId],
    queryFn: () => getReviewsForEntity(entityType, entityId!),
    enabled: !!entityId,
  });
}

export function useTestimonials(limit?: number) {
  return useQuery({ queryKey: ["testimonials", limit], queryFn: () => getTestimonials(limit) });
}
