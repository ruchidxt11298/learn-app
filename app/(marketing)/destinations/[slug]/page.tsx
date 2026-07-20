import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, Sun } from "lucide-react";
import Container from "@/components/layout/Container";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Rating from "@/components/ui/Rating";
import { buttonVariants } from "@/components/ui/Button";
import ImageWithFallback from "@/components/media/ImageWithFallback";
import JsonLd from "@/components/seo/JsonLd";
import WishlistButton from "@/features/wishlist/WishlistButton";
import CompareButton from "@/features/compare/CompareButton";
import TrackRecentView from "@/features/site/TrackRecentView";
import DestinationDetailContent from "@/features/destinations/DestinationDetailContent";
import { getAllDestinationSlugs, getDestinationBySlug } from "@/services/destinations.service";
import { siteConfig, SHOW_PRICES } from "@/lib/site-config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllDestinationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};

  return {
    title: destination.seo.title,
    description: destination.seo.description,
    keywords: destination.seo.keywords,
    alternates: { canonical: `/destinations/${destination.slug}` },
    openGraph: {
      title: destination.seo.title,
      description: destination.seo.description,
      images: [{ url: destination.heroImage.url }],
    },
  };
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  return (
    <>
      <TrackRecentView type="destination" slug={destination.slug} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: destination.name,
          description: destination.shortDescription,
          image: destination.heroImage.url,
          url: `${siteConfig.url}/destinations/${destination.slug}`,
        }}
      />

      <div className="relative h-[50vh] min-h-96 w-full">
        <ImageWithFallback image={destination.heroImage} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-8">
          <Breadcrumb items={[{ label: "Destinations", href: "/destinations" }, { label: destination.name }]} />
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="flex items-center gap-1 text-sm font-medium text-secondary-light">
                <MapPin className="h-4 w-4" /> {destination.country}
              </span>
              <h1 className="mt-1 font-heading text-3xl font-bold text-white sm:text-4xl">{destination.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-200">
                <Rating value={destination.rating} reviewCount={destination.reviewCount} />
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {destination.durationDays} days recommended
                </span>
                <span className="flex items-center gap-1">
                  <Sun className="h-4 w-4" /> {destination.season.replace("-", " ")}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" /> Best: {destination.bestTimeToVisit.join(", ")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CompareButton id={destination.id} />
              <WishlistButton id={destination.id} />
              <Link href={`/booking?destination=${destination.slug}`} className={buttonVariants({ variant: "accent" })}>
                {SHOW_PRICES ? `Book Now — from ${destination.startingPrice.currency} ${destination.startingPrice.amount}` : "Book Now — Contact for Best Price"}
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <DestinationDetailContent destination={destination} />
    </>
  );
}
