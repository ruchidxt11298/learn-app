import Section from "@/components/layout/Section";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { siteConfig } from "@/lib/site-config";
import WishlistPageView from "@/features/wishlist/WishlistPageView";

export const metadata = {
  title: `Wishlist | ${siteConfig.name}`,
  description: `View saved destinations and packages for your devotional journey with ${siteConfig.name}.`,
  alternates: { canonical: "/wishlist" },
};

export default function WishlistPage() {
  return (
    <Section>
      <Breadcrumb items={[{ label: "Wishlist" }]} />
      <WishlistPageView />
    </Section>
  );
}
