import type { Metadata } from "next";
import { Suspense } from "react";
import Section from "@/components/layout/Section";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Skeleton from "@/components/ui/Skeleton";
import BlogListView from "@/features/blog/BlogListView";

export const metadata: Metadata = {
  title: "Travel Blog",
  description: "Travel guides, tips and inspiration from the Roshi Journeys team — Char Dham Yatra planning, destination guides and packing checklists.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <Section>
      <Breadcrumb items={[{ label: "Blog" }]} />
      <h1 className="mt-4 mb-8 font-heading text-3xl font-bold text-dark sm:text-4xl dark:text-white">Travel Blog</h1>
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
        <BlogListView />
      </Suspense>
    </Section>
  );
}
