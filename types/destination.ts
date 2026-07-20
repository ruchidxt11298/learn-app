import type { GeoLocation, ImageAsset, Money, SeoMeta } from "./common";

export type Season = "summer" | "winter" | "monsoon" | "all-year";

export interface DestinationAttraction {
  name: string;
  description: string;
  image: ImageAsset;
}

export interface DestinationHotel {
  name: string;
  rating: number;
  priceRange: Money;
  image: ImageAsset;
}

export interface DestinationRestaurant {
  name: string;
  cuisine: string;
  priceRange: "budget" | "mid" | "luxury";
  image: ImageAsset;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  continent: string;
  shortDescription: string;
  description: string;
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  startingPrice: Money;
  durationDays: number;
  rating: number;
  reviewCount: number;
  bestTimeToVisit: string[];
  season: Season;
  activities: string[];
  topAttractions: DestinationAttraction[];
  thingsToDo: string[];
  hotels: DestinationHotel[];
  restaurants: DestinationRestaurant[];
  travelTips: string[];
  location: GeoLocation;
  featured: boolean;
  seo: SeoMeta;
}
