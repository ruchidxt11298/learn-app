import type { GeoLocation, ImageAsset, Money, SeoMeta } from "./common";

export type AdventureCategory =
  | "family"
  | "spiritual"
  | "wildlife"
  | "trekking"
  | "beaches"
  | "desert-safari"
  | "cruise"
  | "religious"
  | "luxury";

export type Difficulty = "easy" | "moderate" | "challenging";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string[];
  accommodation?: string;
}

export interface PackageFaq {
  question: string;
  answer: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  name: string;
  destinationSlug: string;
  images: ImageAsset[];
  category: AdventureCategory;
  price: Money;
  discountPercent?: number;
  durationDays: number;
  durationNights: number;
  difficulty: Difficulty;
  groupSize: { min: number; max: number };
  rating: number;
  reviewCount: number;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  departureDates: string[];
  location: GeoLocation;
  faqs: PackageFaq[];
  featured: boolean;
  seo: SeoMeta;
}

export const ADVENTURE_CATEGORIES: { value: AdventureCategory; label: string }[] = [
  { value: "family", label: "Family Tour" },
  { value: "spiritual", label: "Spiritual Journey" },
  { value: "wildlife", label: "Wildlife" },
  { value: "trekking", label: "Trekking" },
  { value: "beaches", label: "Beaches" },
  { value: "desert-safari", label: "Desert Safari" },
  { value: "cruise", label: "Cruise" },
  { value: "religious", label: "Religious Tour" },
  { value: "luxury", label: "Luxury Tour" },
];
