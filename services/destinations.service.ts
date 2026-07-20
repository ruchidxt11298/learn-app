import { destinationsMock } from "@/data/destinations.mock";
import { simulateNetwork } from "@/lib/mockDelay";
import type { Destination, PaginatedResponse, SortOption } from "@/types";

export interface DestinationFilters {
  country?: string;
  season?: string;
  minPrice?: number;
  maxPrice?: number;
  maxDuration?: number;
  activity?: string;
  search?: string;
  sortBy?: SortOption;
  page?: number;
  pageSize?: number;
  featured?: boolean;
}

function applyFilters(filters: DestinationFilters): Destination[] {
  let items = [...destinationsMock];

  if (filters.country) items = items.filter((d) => d.country === filters.country);
  if (filters.season) items = items.filter((d) => d.season === filters.season);
  if (filters.activity) items = items.filter((d) => d.activities.includes(filters.activity!));
  if (filters.minPrice !== undefined) items = items.filter((d) => d.startingPrice.amount >= filters.minPrice!);
  if (filters.maxPrice !== undefined) items = items.filter((d) => d.startingPrice.amount <= filters.maxPrice!);
  if (filters.maxDuration !== undefined) items = items.filter((d) => d.durationDays <= filters.maxDuration!);
  if (filters.featured !== undefined) items = items.filter((d) => d.featured === filters.featured);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    items = items.filter(
      (d) => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q) || d.shortDescription.toLowerCase().includes(q),
    );
  }

  switch (filters.sortBy) {
    case "price-asc":
      items.sort((a, b) => a.startingPrice.amount - b.startingPrice.amount);
      break;
    case "price-desc":
      items.sort((a, b) => b.startingPrice.amount - a.startingPrice.amount);
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

export async function getDestinations(filters: DestinationFilters = {}): Promise<PaginatedResponse<Destination>> {
  // MOCK now — filter/sort/paginate in-memory.
  // REAL later: const { data } = await api.get('/destinations', { params: filters }); return data;
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

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const found = destinationsMock.find((d) => d.slug === slug) ?? null;
  return simulateNetwork(found);
}

export async function getFeaturedDestinations(limit = 6): Promise<Destination[]> {
  const items = destinationsMock.filter((d) => d.featured).slice(0, limit);
  return simulateNetwork(items);
}

export async function getAllDestinationSlugs(): Promise<string[]> {
  return simulateNetwork(destinationsMock.map((d) => d.slug), 0);
}

export async function getDestinationCountries(): Promise<string[]> {
  return simulateNetwork(Array.from(new Set(destinationsMock.map((d) => d.country))), 0);
}
