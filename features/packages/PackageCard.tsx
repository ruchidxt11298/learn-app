import Link from "next/link";
import { Clock, Users, Gauge } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";
import ImageWithFallback from "@/components/media/ImageWithFallback";
import WishlistButton from "@/features/wishlist/WishlistButton";
import CompareButton from "@/features/compare/CompareButton";
import { buttonVariants } from "@/components/ui/Button";
import PriceTag from "@/components/ui/PriceTag";
import { SHOW_PRICES } from "@/lib/site-config";
import { ADVENTURE_CATEGORIES, type TourPackage } from "@/types";

export default function PackageCard({ pkg }: { pkg: TourPackage }) {
  const categoryLabel = ADVENTURE_CATEGORIES.find((c) => c.value === pkg.category)?.label ?? pkg.category;

  return (
    <Card className="group flex flex-col">
      <Link href={`/packages/${pkg.slug}`} className="relative block h-52 w-full overflow-hidden">
        <ImageWithFallback
          image={pkg.images[0]}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        {SHOW_PRICES && pkg.discountPercent && (
          <Badge variant="accent" className="absolute left-3 top-3 bg-accent text-white">
            {pkg.discountPercent}% OFF
          </Badge>
        )}
        <div className="absolute right-3 top-3 flex gap-2">
          <CompareButton id={pkg.id} />
          <WishlistButton id={pkg.id} />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="secondary" className="w-fit">
          {categoryLabel}
        </Badge>
        <Link href={`/packages/${pkg.slug}`}>
          <h3 className="mt-2 font-heading text-lg font-semibold text-dark hover:text-primary dark:text-white">{pkg.name}</h3>
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {pkg.durationDays}D/{pkg.durationNights}N
          </span>
          <span className="flex items-center gap-1 capitalize">
            <Gauge className="h-3.5 w-3.5" /> {pkg.difficulty}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {pkg.groupSize.min}-{pkg.groupSize.max}
          </span>
        </div>
        <Rating value={pkg.rating} reviewCount={pkg.reviewCount} className="mt-2" />
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
          <div className="flex items-baseline gap-2">
            <PriceTag
              price={pkg.price}
              discountPercent={pkg.discountPercent}
              amountClassName="font-heading text-lg font-bold text-primary dark:text-secondary-light"
              strikeClassName="text-xs text-text-muted line-through"
            />
          </div>
          <Link href={`/packages/${pkg.slug}`} className={buttonVariants({ size: "sm" })}>
            Book Now
          </Link>
        </div>
      </div>
    </Card>
  );
}
