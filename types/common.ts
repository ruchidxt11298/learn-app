export type CurrencyCode = "USD" | "INR" | "EUR" | "GBP";

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface ImageAsset {
  url: string;
  alt: string;
  publicId?: string;
  width?: number;
  height?: number;
}

export interface SeoMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  address?: string;
}

export type SortOption = "price-asc" | "price-desc" | "rating" | "popular" | "newest";
