import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/layout/Section";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Read the privacy policy for ${siteConfig.name}.`,
  alternates: { canonical: "/legal/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />
      <div className="space-y-6">
        <SectionHeading title="Privacy Policy" description="How we collect and use your information." align="left" />
        <div className="prose max-w-none text-text ">
          <p>{siteConfig.name} respects your privacy. We collect only the information needed to support your travel requests and improve your experience.</p>
          <p>Contact data provided through our forms is used only for booking, communication and service delivery. We do not sell your personal information to third parties.</p>
          <p>If you have questions about privacy, please contact us at <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.</p>
        </div>
      </div>
    </Section>
  );
}
