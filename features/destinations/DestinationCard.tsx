import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import Card from "@/components/ui/Card";
import Rating from "@/components/ui/Rating";
import ImageWithFallback from "@/components/media/ImageWithFallback";
import WishlistButton from "@/features/wishlist/WishlistButton";
import CompareButton from "@/features/compare/CompareButton";
import { buttonVariants } from "@/components/ui/Button";
import PriceTag from "@/components/ui/PriceTag";
import { SHOW_PRICES } from "@/lib/site-config";
import type { Destination } from "@/types";

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Card className="group flex flex-col">
      <Link href={`/destinations/${destination.slug}`} className="relative block h-56 w-full overflow-hidden">
        <ImageWithFallback
          image={destination.heroImage}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute right-3 top-3 flex gap-2">
          <CompareButton id={destination.id} />
          <WishlistButton id={destination.id} />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1 text-xs font-medium text-secondary-dark dark:text-secondary-light">
          <MapPin className="h-3.5 w-3.5" />
          {destination.country}
        </div>
        <Link href={`/destinations/${destination.slug}`}>
          <h3 className="mt-1 font-heading text-lg font-semibold text-dark hover:text-primary dark:text-white">
            {destination.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {destination.durationDays} days
          </span>
          <Rating value={destination.rating} reviewCount={destination.reviewCount} />
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
          <div>
            {SHOW_PRICES && <span className="text-xs text-text-muted">From</span>}
            <div className="font-heading text-lg font-bold text-primary dark:text-secondary-light">
              <PriceTag price={destination.startingPrice} />
            </div>
          </div>
          <Link href={`/destinations/${destination.slug}`} className={buttonVariants({ size: "sm" })}>
            Book Now
          </Link>
        </div>
      </div>
    </Card>
  );
}
