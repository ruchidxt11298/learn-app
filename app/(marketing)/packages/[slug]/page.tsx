import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Gauge, Users, MapPin } from "lucide-react";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Rating from "@/components/ui/Rating";
import Badge from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import WishlistButton from "@/features/wishlist/WishlistButton";
import CompareButton from "@/features/compare/CompareButton";
import TrackRecentView from "@/features/site/TrackRecentView";
import PackageHeroSlider from "@/features/packages/PackageHeroSlider";
import PackageDetailContent from "@/features/packages/PackageDetailContent";
import { getAllPackageSlugs, getPackageBySlug } from "@/services/packages.service";
import { getDestinationBySlug } from "@/services/destinations.service";
import { ADVENTURE_CATEGORIES } from "@/types";
import { siteConfig, SHOW_PRICES } from "@/lib/site-config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPackageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return {};

  return {
    title: pkg.seo.title,
    description: pkg.seo.description,
    keywords: pkg.seo.keywords,
    alternates: { canonical: `/packages/${pkg.slug}` },
    openGraph: {
      title: pkg.seo.title,
      description: pkg.seo.description,
      images: [{ url: pkg.images[0]?.url }],
    },
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const destination = await getDestinationBySlug(pkg.destinationSlug);
  const categoryLabel = ADVENTURE_CATEGORIES.find((c) => c.value === pkg.category)?.label ?? pkg.category;

  return (
    <>
      <TrackRecentView type="package" slug={pkg.slug} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: pkg.name,
          description: pkg.seo.description,
          image: pkg.images[0]?.url,
          touristType: pkg.category,
          ...(SHOW_PRICES
            ? {
                offers: {
                  "@type": "Offer",
                  price: pkg.price.amount,
                  priceCurrency: pkg.price.currency,
                },
              }
            : {}),
          url: `${siteConfig.url}/packages/${pkg.slug}`,
        }}
      />

      <PackageHeroSlider images={pkg.images} />

      <Container className="py-8">
        <Breadcrumb items={[{ label: "Packages", href: "/packages" }, { label: pkg.name }]} />
        <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
          <div>
            <Badge variant="secondary">{categoryLabel}</Badge>
            <h1 className="mt-2 font-heading text-3xl font-bold text-dark sm:text-4xl dark:text-white">{pkg.name}</h1>
            {destination && (
              <Link href={`/destinations/${destination.slug}`} className="mt-1 flex items-center gap-1 text-sm text-secondary-dark hover:underline dark:text-secondary-light">
                <MapPin className="h-4 w-4" /> {destination.name}, {destination.country}
              </Link>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <Rating value={pkg.rating} reviewCount={pkg.reviewCount} />
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {pkg.durationDays}D / {pkg.durationNights}N
              </span>
              <span className="flex items-center gap-1 capitalize">
                <Gauge className="h-4 w-4" /> {pkg.difficulty}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {pkg.groupSize.min}-{pkg.groupSize.max} people
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CompareButton id={pkg.id} />
            <WishlistButton id={pkg.id} />
            <a href="#book" className={buttonVariants({ variant: "accent" })}>
              Book Now
            </a>
          </div>
        </div>
      </Container>

      <PackageDetailContent pkg={pkg} />
    </>
  );
}
