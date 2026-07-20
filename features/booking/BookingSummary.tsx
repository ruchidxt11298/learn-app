"use client";

import { ShieldCheck, Headset, BadgePercent } from "lucide-react";
import Card from "@/components/ui/Card";
import ImageWithFallback from "@/components/media/ImageWithFallback";
import Skeleton from "@/components/ui/Skeleton";
import { usePackage } from "@/hooks/queries/usePackages";
import { useDestination } from "@/hooks/queries/useDestinations";
import PriceTag from "@/components/ui/PriceTag";
import { SHOW_PRICES } from "@/lib/site-config";

export default function BookingSummary({ packageSlug, destinationSlug }: { packageSlug?: string; destinationSlug?: string }) {
  const { data: pkg, isLoading: pkgLoading } = usePackage(packageSlug ?? "");
  const { data: destination, isLoading: destLoading } = useDestination(destinationSlug ?? "");

  if (packageSlug && pkgLoading) return <Skeleton className="h-64 rounded-2xl" />;
  if (destinationSlug && destLoading) return <Skeleton className="h-64 rounded-2xl" />;

  return (
    <div className="space-y-4">
      {pkg && (
        <Card hover={false}>
          <div className="relative h-36 w-full">
            <ImageWithFallback image={pkg.images[0]} fill className="object-cover" sizes="400px" />
          </div>
          <div className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary-dark dark:text-secondary-light">
              Booking For
            </p>
            <h3 className="mt-1 font-heading font-semibold text-dark dark:text-white">{pkg.name}</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <PriceTag
                price={pkg.price}
                discountPercent={pkg.discountPercent}
                amountClassName="text-lg font-bold text-primary dark:text-secondary-light"
                strikeClassName="text-xs text-text-muted line-through"
              />
            </div>
            <p className="text-xs text-text-muted">
              {pkg.durationDays} days / {pkg.durationNights} nights
            </p>
          </div>
        </Card>
      )}

      {!pkg && destination && (
        <Card hover={false}>
          <div className="relative h-36 w-full">
            <ImageWithFallback image={destination.heroImage} fill className="object-cover" sizes="400px" />
          </div>
          <div className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary-dark dark:text-secondary-light">
              Booking For
            </p>
            <h3 className="mt-1 font-heading font-semibold text-dark dark:text-white">{destination.name}</h3>
            <p className="mt-2 text-lg font-bold text-primary dark:text-secondary-light">
              {SHOW_PRICES && "From "}
              <PriceTag price={destination.startingPrice} />
            </p>
          </div>
        </Card>
      )}

      <Card hover={false} className="p-4">
        <ul className="space-y-3 text-sm text-text-muted">
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-secondary" /> Secure booking, no hidden fees
          </li>
          <li className="flex items-center gap-2">
            <Headset className="h-4 w-4 text-secondary" /> 24/7 support before and during your trip
          </li>
          <li className="flex items-center gap-2">
            <BadgePercent className="h-4 w-4 text-secondary" /> Free cancellation up to 30 days before departure
          </li>
        </ul>
      </Card>
    </div>
  );
}
