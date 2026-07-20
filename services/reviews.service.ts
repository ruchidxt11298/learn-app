import { reviewsMock, testimonialsMock } from "@/data/reviews.mock";
import { simulateNetwork } from "@/lib/mockDelay";
import type { Review, Testimonial } from "@/types";

export async function getReviewsForEntity(entityType: Review["entityType"], entityId: string): Promise<Review[]> {
  return simulateNetwork(reviewsMock.filter((r) => r.entityType === entityType && r.entityId === entityId));
}

export async function getTestimonials(limit?: number): Promise<Testimonial[]> {
  const items = limit ? testimonialsMock.slice(0, limit) : testimonialsMock;
  return simulateNetwork(items);
}
