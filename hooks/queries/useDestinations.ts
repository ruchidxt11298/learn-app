import { useQuery } from "@tanstack/react-query";
import { getDestinationBySlug, getDestinationCountries, getDestinations, getFeaturedDestinations, type DestinationFilters } from "@/services/destinations.service";

export function useDestinations(filters: DestinationFilters = {}) {
  return useQuery({
    queryKey: ["destinations", filters],
    queryFn: () => getDestinations(filters),
  });
}

export function useDestination(slug: string) {
  return useQuery({
    queryKey: ["destination", slug],
    queryFn: () => getDestinationBySlug(slug),
    enabled: !!slug,
  });
}

export function useFeaturedDestinations(limit = 6) {
  return useQuery({
    queryKey: ["destinations", "featured", limit],
    queryFn: () => getFeaturedDestinations(limit),
  });
}

export function useDestinationCountries() {
  return useQuery({
    queryKey: ["destinations", "countries"],
    queryFn: getDestinationCountries,
    staleTime: Infinity,
  });
}
