"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "@/components/ui/Skeleton";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/feedback/EmptyState";
import ErrorState from "@/components/feedback/ErrorState";
import PackageCard from "./PackageCard";
import PackageFilters from "./PackageFilters";
import { usePackages } from "@/hooks/queries/usePackages";
import type { PackageFilters as Filters } from "@/services/packages.service";
import type { AdventureCategory, SortOption } from "@/types";

export default function PackagesView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: Filters = useMemo(
    () => ({
      search: searchParams.get("search") ?? undefined,
      category: (searchParams.get("category") as AdventureCategory) ?? undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      maxDuration: searchParams.get("maxDuration") ? Number(searchParams.get("maxDuration")) : undefined,
      minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
      departureMonth: searchParams.get("departureMonth") ?? undefined,
      sortBy: (searchParams.get("sortBy") as SortOption) ?? "popular",
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      pageSize: 9,
    }),
    [searchParams],
  );

  const { data, isLoading, isError, refetch } = usePackages(filters);

  const updateFilters = useCallback(
    (patch: Partial<Filters>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries({ ...patch, page: patch.page ?? 1 }).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });
      router.push(`/packages?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="flex flex-col gap-8">
      <PackageFilters filters={filters} onChange={updateFilters} />

      {isError && <ErrorState onRetry={() => refetch()} />}

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-[26rem] rounded-2xl" />
          ))}
        </div>
      )}

      {!isLoading && data && data.items.length === 0 && (
        <EmptyState title="No packages found" description="Try adjusting your filters or search terms." />
      )}

      {!isLoading && data && data.items.length > 0 && (
        <>
          <p className="text-sm text-text-muted">{data.total} packages found</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          <Pagination page={data.page} totalPages={data.totalPages} onChange={(page) => updateFilters({ page })} />
        </>
      )}
    </div>
  );
}
