import type { Metadata } from "next";
import Hero from "@/features/home/Hero";
import PopularDestinations from "@/features/home/PopularDestinations";
import FeaturedPackages from "@/features/home/FeaturedPackages";
import WhyChooseUs from "@/features/home/WhyChooseUs";
import AdventureCategories from "@/features/home/AdventureCategories";
import TravelGallerySection from "@/features/home/TravelGallerySection";
import TestimonialsSlider from "@/features/home/TestimonialsSlider";
import LatestBlog from "@/features/home/LatestBlog";
import NewsletterSection from "@/features/home/NewsletterSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <PopularDestinations />
      <FeaturedPackages />
      <WhyChooseUs />
      <AdventureCategories />
      <TravelGallerySection />
      <TestimonialsSlider />
      <LatestBlog />
      <NewsletterSection />
    </>
  );
}
