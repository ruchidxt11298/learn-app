"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";
import Section, { SectionHeading } from "@/components/layout/Section";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Wishlist | ${siteConfig.name}`,
  description: `View saved destinations and packages for your devotional journey with ${siteConfig.name}.`,
  alternates: { canonical: "/wishlist" },
};

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((state) => state.ids);

  return (
    <Section>
      <Breadcrumb items={[{ label: "Wishlist" }]} />
      <div className="space-y-6">
        <SectionHeading
          title="Your Wishlist"
          description="Saved trips, destinations and packages will appear here for easy booking later."
          align="left"
        />

        {wishlistIds.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-10 text-center shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <p className="text-lg font-medium text-dark dark:text-white">Your wishlist is empty.</p>
            <p className="mt-2 text-sm text-text-muted">Browse packages and destinations to save your favorite devotional travel options.</p>
            <Link href="/packages" className="mt-6 inline-flex rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white hover:bg-secondary-dark">
              Browse Packages
            </Link>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <p className="text-lg font-medium text-dark dark:text-white">You have {wishlistIds.length} saved item{wishlistIds.length === 1 ? "" : "s"}.</p>
            <p className="mt-2 text-sm text-text-muted">Wishlist detail pages are not yet available, but your selections are stored here for future access.</p>
            <ul className="mt-6 space-y-2 text-sm text-text-muted">
              {wishlistIds.map((id) => (
                <li key={id} className="rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
                  {id}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
