"use client";

import { useSearchParams } from "next/navigation";
import BookingForm from "./BookingForm";

export default function BookingPageView() {
  const searchParams = useSearchParams();
  const packageSlug = searchParams.get("package") ?? undefined;
  const destinationSlug = searchParams.get("destination") ?? undefined;

  return <BookingForm defaultPackageSlug={packageSlug} defaultDestinationSlug={destinationSlug} />;
}
