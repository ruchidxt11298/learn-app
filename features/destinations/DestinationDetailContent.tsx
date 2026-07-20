"use client";

import { CheckCircle2, Star } from "lucide-react";
import Tabs from "@/components/ui/Tabs";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";
import ImageWithFallback from "@/components/media/ImageWithFallback";
import Gallery from "@/components/media/Gallery";
import MapEmbed from "@/components/media/MapEmbed";
import PackageCard from "@/features/packages/PackageCard";
import ReviewsList from "@/features/reviews/ReviewsList";
import Section, { SectionHeading } from "@/components/layout/Section";
import { usePackages } from "@/hooks/queries/usePackages";
import { useCurrency } from "@/hooks/useCurrency";
import type { Destination } from "@/types";

export default function DestinationDetailContent({ destination }: { destination: Destination }) {
  const { format } = useCurrency();
  const { data: packagesData, isLoading: packagesLoading } = usePackages({ destinationSlug: destination.slug, pageSize: 3 });

  return (
    <>
      <Section className="!py-10">
        <Tabs
          tabs={[
            {
              id: "overview",
              label: "Overview",
              content: (
                <div className="space-y-6">
                  <p className="leading-relaxed text-text-muted dark:text-slate-300">{destination.description}</p>
                  <div>
                    <h3 className="mb-3 font-heading text-lg font-semibold text-dark dark:text-white">Things to Do</h3>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {destination.thingsToDo.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((a) => (
                      <Badge key={a} variant="primary" className="capitalize">
                        {a.replace("-", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              id: "attractions",
              label: "Top Attractions",
              content: (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {destination.topAttractions.map((a) => (
                    <Card key={a.name} hover={false}>
                      <div className="relative h-48 w-full">
                        <ImageWithFallback image={a.image} fill className="object-cover" sizes="(min-width: 640px) 50vw, 100vw" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-heading font-semibold text-dark dark:text-white">{a.name}</h4>
                        <p className="mt-1 text-sm text-text-muted">{a.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              ),
            },
            {
              id: "hotels",
              label: "Hotels",
              content: (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {destination.hotels.map((h) => (
                    <Card key={h.name} hover={false} className="flex overflow-hidden">
                      <div className="relative h-32 w-32 shrink-0">
                        <ImageWithFallback image={h.image} fill className="object-cover" sizes="128px" />
                      </div>
                      <div className="flex flex-1 flex-col justify-center p-4">
                        <h4 className="font-heading font-semibold text-dark dark:text-white">{h.name}</h4>
                        <span className="mt-1 flex items-center gap-1 text-xs text-accent">
                          <Star className="h-3.5 w-3.5 fill-accent" /> {h.rating.toFixed(1)}
                        </span>
                        <p className="mt-1 text-sm font-semibold text-primary dark:text-secondary-light">
                          {format(h.priceRange)} / night
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              ),
            },
            {
              id: "restaurants",
              label: "Restaurants",
              content: (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {destination.restaurants.map((r) => (
                    <Card key={r.name} hover={false} className="flex overflow-hidden">
                      <div className="relative h-32 w-32 shrink-0">
                        <ImageWithFallback image={r.image} fill className="object-cover" sizes="128px" />
                      </div>
                      <div className="flex flex-1 flex-col justify-center p-4">
                        <h4 className="font-heading font-semibold text-dark dark:text-white">{r.name}</h4>
                        <p className="text-sm text-text-muted">{r.cuisine}</p>
                        <Badge variant="neutral" className="mt-1 w-fit capitalize">
                          {r.priceRange}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              ),
            },
            {
              id: "tips",
              label: "Travel Tips",
              content: (
                <ul className="space-y-3">
                  {destination.travelTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-text-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      {tip}
                    </li>
                  ))}
                </ul>
              ),
            },
          ]}
        />
      </Section>

      <Section className="bg-white dark:bg-slate-900">
        <SectionHeading eyebrow="Gallery" title={`Photos from ${destination.name}`} align="left" />
        <Gallery images={destination.gallery} />
      </Section>

      {!packagesLoading && packagesData && packagesData.items.length > 0 && (
        <Section className="bg-background dark:bg-dark">
          <SectionHeading eyebrow="Book a Trip" title={`Tour Packages in ${destination.name}`} align="left" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packagesData.items.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </Section>
      )}
      {packagesLoading && (
        <Section className="bg-background dark:bg-dark">
          <Skeleton className="h-96 w-full rounded-2xl" />
        </Section>
      )}

      <Section className="bg-white dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Location" title="Where It Is" align="left" />
            <MapEmbed location={destination.location} className="h-80" title={`Map of ${destination.name}`} />
          </div>
          <div>
            <SectionHeading eyebrow="Traveler Reviews" title="What Visitors Say" align="left" />
            <ReviewsList entityType="destination" entityId={destination.id} />
          </div>
        </div>
      </Section>
    </>
  );
}
