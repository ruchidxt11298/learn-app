"use client";

import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/feedback/EmptyState";
import PackageCard from "./PackageCard";
import { useRelatedPackages } from "@/hooks/queries/usePackages";
import type { TourPackage } from "@/types";

export default function RelatedPackages({ pkg }: { pkg: TourPackage }) {
  const { data: related, isLoading } = useRelatedPackages(pkg);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[26rem] rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!related || related.length === 0) {
    return <EmptyState title="No related packages" description="Check back soon for more packages like this one." />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {related.map((r) => (
        <PackageCard key={r.id} pkg={r} />
      ))}
    </div>
  );
}
