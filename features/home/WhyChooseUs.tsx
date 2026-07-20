"use client";

import { motion } from "framer-motion";
import { BadgeDollarSign, Compass, ShieldCheck, Headset, SlidersHorizontal, Users2 } from "lucide-react";
import Section, { SectionHeading } from "@/components/layout/Section";

const REASONS = [
  { icon: BadgeDollarSign, title: "Best Price Guarantee", description: "Transparent pricing with no hidden fees — we match any comparable published rate." },
  { icon: Compass, title: "Expert Local Guides", description: "Every tour is led by certified, experienced guides who know the destination inside out." },
  { icon: ShieldCheck, title: "Safe & Secure Travel", description: "Rigorous safety standards and vetted partners across every destination we operate in." },
  { icon: Headset, title: "24/7 Support", description: "Round-the-clock assistance before, during and after your trip, wherever you are." },
  { icon: SlidersHorizontal, title: "Customized Packages", description: "Every itinerary can be tailored to your pace, budget and interests." },
  { icon: Users2, title: "Trusted Local Operator", description: "A Uttarakhand-based team with first-hand knowledge of the Char Dham route and destinations across India." },
];

export default function WhyChooseUs() {
  return (
    <Section className="bg-white dark:bg-slate-900">
      <SectionHeading eyebrow="Why Roshi Journeys" title="Why Choose Us" description="What makes traveling with us different." />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            className="rounded-2xl border border-slate-100 p-6 transition-shadow hover:shadow-lg dark:border-slate-700"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary-light">
              <reason.icon className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-dark dark:text-white">{reason.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
