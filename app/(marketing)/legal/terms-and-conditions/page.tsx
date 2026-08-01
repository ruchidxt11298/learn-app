import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/layout/Section";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${siteConfig.name}`,
  description: `Review the terms and conditions for using ${siteConfig.name}.`,
  alternates: { canonical: "/legal/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  return (
    <Section>
      <Breadcrumb items={[{ label: "Terms & Conditions" }]} />
      <div className="space-y-6">
        <SectionHeading title="Terms & Conditions" description="The terms for using our services." align="left" />
        <div className="prose max-w-none text-text ">
          <p>These terms govern your use of {siteConfig.name} and the purchase of travel packages. Please review them carefully before booking.</p>
          <p>Your booking is subject to availability, confirmation and the policies set forth by our service partners. We reserve the right to update these terms as needed.</p>
          <p>If you have questions, email us at <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.</p>
        </div>
      </div>
    </Section>
  );
}
