import { useQuery } from "@tanstack/react-query";
import {
  getFeaturedPackages,
  getPackageBySlug,
  getPackages,
  getRelatedPackages,
  type PackageFilters,
} from "@/services/packages.service";
import type { TourPackage } from "@/types";

export function usePackages(filters: PackageFilters = {}) {
  return useQuery({
    queryKey: ["packages", filters],
    queryFn: () => getPackages(filters),
  });
}

export function usePackage(slug: string) {
  return useQuery({
    queryKey: ["package", slug],
    queryFn: () => getPackageBySlug(slug),
    enabled: !!slug,
  });
}

export function useFeaturedPackages(limit = 6) {
  return useQuery({
    queryKey: ["packages", "featured", limit],
    queryFn: () => getFeaturedPackages(limit),
  });
}

export function useRelatedPackages(pkg?: TourPackage | null) {
  return useQuery({
    queryKey: ["packages", "related", pkg?.id],
    queryFn: () => getRelatedPackages(pkg!),
    enabled: !!pkg,
  });
}
