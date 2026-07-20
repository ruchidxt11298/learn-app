import type { Metadata } from "next";
import { Suspense } from "react";
import Section from "@/components/layout/Section";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Skeleton from "@/components/ui/Skeleton";
import PackagesView from "@/features/packages/PackagesView";

export const metadata: Metadata = {
  title: "Tour Packages",
  description: "Browse all-inclusive tour packages — filter by price, duration, category, rating and departure date.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <Section>
      <Breadcrumb items={[{ label: "Packages" }]} />
      <h1 className="mt-4 mb-8 font-heading text-3xl font-bold text-dark sm:text-4xl dark:text-white">
        Tour Packages
      </h1>
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
        <PackagesView />
      </Suspense>
    </Section>
  );
}
