"use client";

import { CheckCircle2, XCircle, CalendarDays } from "lucide-react";
import Tabs from "@/components/ui/Tabs";
import Accordion from "@/components/ui/Accordion";
import Badge from "@/components/ui/Badge";
import Section, { SectionHeading } from "@/components/layout/Section";
import Gallery from "@/components/media/Gallery";
import MapEmbed from "@/components/media/MapEmbed";
import BookingForm from "@/features/booking/BookingForm";
import ReviewsList from "@/features/reviews/ReviewsList";
import RelatedPackages from "./RelatedPackages";
import PriceTag from "@/components/ui/PriceTag";
import { SHOW_PRICES } from "@/lib/site-config";
import { formatShortDate } from "@/utils/formatDate";
import type { TourPackage } from "@/types";

export default function PackageDetailContent({ pkg }: { pkg: TourPackage }) {

  return (
    <>
      <Section className="!py-10">
        <Tabs
          tabs={[
            {
              id: "overview",
              label: "Overview & Highlights",
              content: (
                <div className="space-y-4">
                  <h3 className="font-heading text-lg font-semibold text-dark dark:text-white">Highlights</h3>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {pkg.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-text-muted">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
            {
              id: "included",
              label: "Included / Excluded",
              content: (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-heading font-semibold text-dark dark:text-white">Included</h4>
                    <ul className="space-y-2">
                      {pkg.included.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-heading font-semibold text-dark dark:text-white">Excluded</h4>
                    <ul className="space-y-2">
                      {pkg.excluded.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ),
            },
            {
              id: "itinerary",
              label: "Itinerary",
              content: (
                <Accordion
                  defaultOpenId={`day-${pkg.itinerary[0]?.day}`}
                  items={pkg.itinerary.map((day) => ({
                    id: `day-${day.day}`,
                    title: (
                      <span>
                        <span className="mr-2 text-secondary">Day {day.day}</span> {day.title}
                      </span>
                    ),
                    content: (
                      <div className="space-y-2">
                        <p>{day.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {day.meals && day.meals.length > 0 && <Badge variant="neutral">Meals: {day.meals.join(", ")}</Badge>}
                          {day.accommodation && <Badge variant="neutral">Stay: {day.accommodation}</Badge>}
                        </div>
                      </div>
                    ),
                  }))}
                />
              ),
            },
            {
              id: "pricing",
              label: "Pricing & Dates",
              content: (
                <div className="space-y-6">
                  <div className="flex items-baseline gap-3">
                    <PriceTag
                      price={pkg.price}
                      discountPercent={pkg.discountPercent}
                      amountClassName="text-3xl font-bold text-primary dark:text-secondary-light"
                      strikeClassName="text-lg text-text-muted line-through"
                    />
                    {SHOW_PRICES && <span className="text-sm text-text-muted">/ person</span>}
                  </div>
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-heading font-semibold text-dark dark:text-white">
                      <CalendarDays className="h-4 w-4" /> Upcoming Departures
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.departureDates.map((date) => (
                        <Badge key={date} variant="secondary">
                          {formatShortDate(date)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: "faqs",
              label: "FAQs",
              content: (
                <Accordion
                  items={pkg.faqs.map((f, i) => ({ id: `faq-${i}`, title: f.question, content: f.answer }))}
                />
              ),
            },
          ]}
        />
      </Section>

      <Section className="bg-white dark:bg-slate-900">
        <SectionHeading eyebrow="Gallery" title={`Photos from ${pkg.name}`} align="left" />
        <Gallery images={pkg.images} />
      </Section>

      <Section className="bg-background dark:bg-dark">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Location" title="Where It Is" align="left" />
            <MapEmbed location={pkg.location} className="h-80" title={`Map for ${pkg.name}`} />
          </div>
          <div>
            <SectionHeading eyebrow="Traveler Reviews" title="What Travelers Say" align="left" />
            <ReviewsList entityType="package" entityId={pkg.id} />
          </div>
        </div>
      </Section>

      <Section id="book" className="bg-white dark:bg-slate-900">
        <SectionHeading eyebrow="Reserve Your Spot" title="Book This Package" align="left" />
        <BookingForm defaultPackageSlug={pkg.slug} />
      </Section>

      <Section className="bg-background dark:bg-dark">
        <SectionHeading eyebrow="You Might Also Like" title="Related Packages" align="left" />
        <RelatedPackages pkg={pkg} />
      </Section>
    </>
  );
}
