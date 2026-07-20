import type { Metadata } from "next";
import { Suspense } from "react";
import Section from "@/components/layout/Section";
import Skeleton from "@/components/ui/Skeleton";
import BookingSuccessView from "@/features/booking/BookingSuccessView";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  robots: { index: false, follow: false },
};

export default function BookingSuccessPage() {
  return (
    <Section>
      <Suspense fallback={<Skeleton className="mx-auto h-72 max-w-2xl rounded-2xl" />}>
        <BookingSuccessView />
      </Suspense>
    </Section>
  );
}
