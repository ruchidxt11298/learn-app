"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Section, { SectionHeading } from "@/components/layout/Section";
import { ADVENTURE_CATEGORIES } from "@/types";

const CATEGORY_IMAGES: Record<string, string> = {
  family: "family-category",
  spiritual: "spiritual-category",
  wildlife: "wildlife-category",
  trekking: "trekking-category",
  beaches: "beaches-category",
  "desert-safari": "desert-category",
  cruise: "cruise-category",
  religious: "religious-category",
  luxury: "luxury-category",
};

export default function AdventureCategories() {
  return (
    <Section className="bg-background dark:bg-dark">
      <SectionHeading eyebrow="Explore by Interest" title="Adventure Categories" description="Find the trip style that fits you best." />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {ADVENTURE_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.value}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (i % 5) * 0.08 }}
          >
            <Link
              href={`/packages?category=${cat.value}`}
              className="group relative block h-32 overflow-hidden rounded-2xl sm:h-40"
            >
              <Image
                src={`https://picsum.photos/seed/${CATEGORY_IMAGES[cat.value]}/400/400`}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-dark/40 transition-colors group-hover:bg-dark/55" />
              <span className="absolute inset-x-2 bottom-3 text-center text-sm font-semibold text-white">{cat.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
