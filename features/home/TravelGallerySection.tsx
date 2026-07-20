"use client";

import Section, { SectionHeading } from "@/components/layout/Section";
import Skeleton from "@/components/ui/Skeleton";
import Gallery from "@/components/media/Gallery";
import { useGalleryItems } from "@/hooks/queries/useGallery";

export default function TravelGallerySection() {
  const { data: items, isLoading } = useGalleryItems();

  return (
    <Section className="bg-white dark:bg-slate-900">
      <SectionHeading eyebrow="Moments" title="Travel Gallery" description="A glimpse into the adventures our travelers have captured." />
      {isLoading ? (
        <div className="columns-2 gap-3 sm:columns-3 md:columns-4 [&>*]:mb-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <Gallery images={(items ?? []).map((g) => g.image)} />
      )}
    </Section>
  );
}
