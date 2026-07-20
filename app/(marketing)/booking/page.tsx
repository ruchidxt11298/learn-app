import type { Metadata } from "next";
import { Suspense } from "react";
import Section from "@/components/layout/Section";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Skeleton from "@/components/ui/Skeleton";
import BookingPageView from "@/features/booking/BookingPageView";

export const metadata: Metadata = {
  title: "Book Your Trip",
  description: "Complete your booking with Roshi Journeys — fill in your travel details and choose a payment option.",
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  return (
    <Section>
      <Breadcrumb items={[{ label: "Booking" }]} />
      <h1 className="mt-4 mb-8 font-heading text-3xl font-bold text-dark sm:text-4xl dark:text-white">
        Complete Your Booking
      </h1>
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
        <BookingPageView />
      </Suspense>
    </Section>
  );
}
