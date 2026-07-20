import { packagesMock } from "@/data/packages.mock";
import { simulateNetwork } from "@/lib/mockDelay";
import type { AdventureCategory, PaginatedResponse, SortOption, TourPackage } from "@/types";

export interface PackageFilters {
  category?: AdventureCategory;
  destinationSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  maxDuration?: number;
  minRating?: number;
  departureMonth?: string; // YYYY-MM
  search?: string;
  sortBy?: SortOption;
  page?: number;
  pageSize?: number;
  featured?: boolean;
}

function applyFilters(filters: PackageFilters): TourPackage[] {
  let items = [...packagesMock];

  if (filters.category) items = items.filter((p) => p.category === filters.category);
  if (filters.destinationSlug) items = items.filter((p) => p.destinationSlug === filters.destinationSlug);
  if (filters.minPrice !== undefined) items = items.filter((p) => p.price.amount >= filters.minPrice!);
  if (filters.maxPrice !== undefined) items = items.filter((p) => p.price.amount <= filters.maxPrice!);
  if (filters.maxDuration !== undefined) items = items.filter((p) => p.durationDays <= filters.maxDuration!);
  if (filters.minRating !== undefined) items = items.filter((p) => p.rating >= filters.minRating!);
  if (filters.featured !== undefined) items = items.filter((p) => p.featured === filters.featured);
  if (filters.departureMonth) {
    items = items.filter((p) => p.departureDates.some((d) => d.startsWith(filters.departureMonth!)));
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    items = items.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  switch (filters.sortBy) {
    case "price-asc":
      items.sort((a, b) => a.price.amount - b.price.amount);
      break;
    case "price-desc":
      items.sort((a, b) => b.price.amount - a.price.amount);
      break;
    case "rating":
      items.sort((a, b) => b.rating - a.rating);
      break;
    case "popular":
      items.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }

  return items;
}

export async function getPackages(filters: PackageFilters = {}): Promise<PaginatedResponse<TourPackage>> {
  // MOCK now — filter/sort/paginate in-memory.
  // REAL later: const { data } = await api.get('/packages', { params: filters }); return data;
  const filtered = applyFilters(filters);
  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 9;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return simulateNetwork({
    items,
    total: filtered.length,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
  });
}

export async function getPackageBySlug(slug: string): Promise<TourPackage | null> {
  const found = packagesMock.find((p) => p.slug === slug) ?? null;
  return simulateNetwork(found);
}

export async function getFeaturedPackages(limit = 6): Promise<TourPackage[]> {
  const items = packagesMock.filter((p) => p.featured).slice(0, limit);
  return simulateNetwork(items);
}

export async function getRelatedPackages(pkg: TourPackage, limit = 4): Promise<TourPackage[]> {
  const items = packagesMock
    .filter((p) => p.id !== pkg.id && (p.destinationSlug === pkg.destinationSlug || p.category === pkg.category))
    .slice(0, limit);
  return simulateNetwork(items);
}

export async function getAllPackageSlugs(): Promise<string[]> {
  return simulateNetwork(packagesMock.map((p) => p.slug), 0);
}

export async function getPackagesByIds(ids: string[]): Promise<TourPackage[]> {
  return simulateNetwork(packagesMock.filter((p) => ids.includes(p.id)), 0);
}
