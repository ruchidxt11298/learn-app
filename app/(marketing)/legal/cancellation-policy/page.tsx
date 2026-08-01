import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/layout/Section";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Cancellation Policy | ${siteConfig.name}`,
  description: `Understand the cancellation policy for ${siteConfig.name}'s travel packages.`,
  alternates: { canonical: "/legal/cancellation-policy" },
};

export default function CancellationPolicyPage() {
  return (
    <Section>
      <Breadcrumb items={[{ label: "Cancellation Policy" }]} />
      <div className="space-y-6">
        <SectionHeading title="Cancellation Policy" description="Our cancellation and refund terms." align="left" />
        <div className="prose max-w-none text-text ">
          <p>Cancellations made 30 or more days before departure are eligible for a full refund, minus any banking or processing fees.</p>
          <p>Later cancellations may be subject to partial refunds, depending on supplier terms and the booking stage. Contact us as soon as possible if your plans change.</p>
          <p>For more details, please email <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.</p>
        </div>
      </div>
    </Section>
  );
}
