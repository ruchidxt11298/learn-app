import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/layout/Section";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: `Learn about ${siteConfig.name}'s mission, values and spiritual travel expertise.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Section>
      <Breadcrumb items={[{ label: "About" }]} />
      <div className="max-w-5xl space-y-10">
        <div>
          <SectionHeading
            title="About Roshi Journeys"
            description="We curate devotional tours, pilgrimage circuits and sacred journeys across India with a focus on temples, rituals and spiritual experiences."
            align="left"
          />
          <p className="text-base leading-7 text-text-muted">
            {siteConfig.name} is dedicated to helping travelers discover the spiritual heart of India. From the Char Dham Yatra to temple festivals and sacred riverside stays, our packages are designed for reverence, comfort and authentic devotional travel.
          </p>
          <p className="mt-6 text-base leading-7 text-text-muted">
            Our experienced team guides every traveler through planning, logistics and local customs so your journey is smooth, respectful and deeply meaningful. We work with trusted partners across Uttarakhand, Haryana, Rajasthan, Madhya Pradesh, Assam, Odisha and beyond.
          </p>
          <p className="mt-6 text-base leading-7 text-text-muted">
            Whether you are travelling for darshan, a temple celebration, or a family pilgrimage, we tailor each itinerary around sacred sites, cultural traditions and the devotional spirit of India.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">Our Focus</h3>
            <p className="mt-3 text-sm text-text-muted">Pilgrimage tours, temple darshan and spiritual travel experiences across India.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">Trusted Support</h3>
            <p className="mt-3 text-sm text-text-muted">Personalized guidance, licensed guides, and local partners for every journey.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">Devotional Travel</h3>
            <p className="mt-3 text-sm text-text-muted">A respectful, meaningful itinerary centered on temples, rituals and spiritual wellbeing.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
