import type { Metadata } from "next";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/layout/Section";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactForm from "@/features/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name} for devotional travel packages, pilgrimage tours and spiritual journeys.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section>
      <Breadcrumb items={[{ label: "Contact" }]} />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeading
            title="Contact Roshi Journeys"
            description="Reach out for pilgrimage packages, Char Dham Yatra bookings, temple tour planning and devotional travel assistance."
            align="left"
          />
          <p className="mb-8 max-w-2xl text-base leading-7 text-text-muted">
            Our team is available to help you plan every step of your spiritual journey. Fill out the form below and we will respond as soon as possible with a tailored itinerary and booking support.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-secondary">Call Us</h2>
              <p className="text-sm text-text-muted">{siteConfig.contact.businessHours}</p>
              <Link href={`tel:${siteConfig.contact.phone}`} className="mt-4 block text-lg font-semibold text-dark hover:text-secondary dark:text-white">
                {siteConfig.contact.phone}
              </Link>
              <Link href={`tel:${siteConfig.contact.phoneSecondary}`} className="mt-2 block text-sm text-text-muted hover:text-secondary-light dark:text-slate-300">
                {siteConfig.contact.phoneSecondary}
              </Link>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-secondary">Email</h2>
              <Link href={`mailto:${siteConfig.contact.email}`} className="text-lg font-semibold text-dark hover:text-secondary dark:text-white">
                {siteConfig.contact.email}
              </Link>
              <p className="mt-4 text-sm text-text-muted">Office address</p>
              <p className="mt-2 text-sm leading-6 text-text">{siteConfig.contact.address}</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
