import type { ImageAsset } from "./common";

export interface Review {
  id: string;
  author: string;
  avatar?: ImageAsset;
  rating: number;
  comment: string;
  date: string;
  entityType: "destination" | "package";
  entityId: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: ImageAsset;
  rating: number;
  quote: string;
}
