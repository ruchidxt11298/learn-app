"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "@/components/ui/Skeleton";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/feedback/EmptyState";
import ErrorState from "@/components/feedback/ErrorState";
import DestinationCard from "./DestinationCard";
import DestinationFilters from "./DestinationFilters";
import { useDestinationCountries, useDestinations } from "@/hooks/queries/useDestinations";
import type { DestinationFilters as Filters } from "@/services/destinations.service";
import type { SortOption } from "@/types";

export default function DestinationsView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: Filters = useMemo(
    () => ({
      search: searchParams.get("search") ?? undefined,
      country: searchParams.get("country") ?? undefined,
      season: searchParams.get("season") ?? undefined,
      activity: searchParams.get("activity") ?? undefined,
      maxDuration: searchParams.get("maxDuration") ? Number(searchParams.get("maxDuration")) : undefined,
      sortBy: (searchParams.get("sortBy") as SortOption) ?? "popular",
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      pageSize: 9,
    }),
    [searchParams],
  );

  const { data: countries = [] } = useDestinationCountries();
  const { data, isLoading, isError, refetch } = useDestinations(filters);

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
      router.push(`/destinations?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="flex flex-col gap-8">
      <DestinationFilters filters={filters} countries={countries} onChange={updateFilters} />

      {isError && <ErrorState onRetry={() => refetch()} />}

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-96 rounded-2xl" />
          ))}
        </div>
      )}

      {!isLoading && data && data.items.length === 0 && (
        <EmptyState title="No destinations found" description="Try adjusting your filters or search terms." />
      )}

      {!isLoading && data && data.items.length > 0 && (
        <>
          <p className="text-sm text-text-muted">{data.total} destinations found</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
          <Pagination page={data.page} totalPages={data.totalPages} onChange={(page) => updateFilters({ page })} />
        </>
      )}
    </div>
  );
}
