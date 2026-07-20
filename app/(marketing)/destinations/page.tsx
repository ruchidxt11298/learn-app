import type { Metadata } from "next";
import { Suspense } from "react";
import Section from "@/components/layout/Section";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Skeleton from "@/components/ui/Skeleton";
import DestinationsView from "@/features/destinations/DestinationsView";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Browse our handpicked travel destinations across the world — filter by country, season, activity and budget.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <Section>
      <Breadcrumb items={[{ label: "Destinations" }]} />
      <h1 className="mt-4 mb-8 font-heading text-3xl font-bold text-dark sm:text-4xl dark:text-white">
        Explore Destinations
      </h1>
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
        <DestinationsView />
      </Suspense>
    </Section>
  );
}
