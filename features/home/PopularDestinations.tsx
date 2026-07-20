"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section, { SectionHeading } from "@/components/layout/Section";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/feedback/ErrorState";
import { buttonVariants } from "@/components/ui/Button";
import DestinationCard from "@/features/destinations/DestinationCard";
import { useFeaturedDestinations } from "@/hooks/queries/useDestinations";

export default function PopularDestinations() {
  const { data: destinations, isLoading, isError, refetch } = useFeaturedDestinations(6);

  return (
    <Section className="bg-white dark:bg-slate-900">
      <SectionHeading
        eyebrow="Top Picks"
        title="Popular Destinations"
        description="Handpicked destinations loved by travelers around the world."
      />

      {isError && <ErrorState onRetry={() => refetch()} />}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-96 rounded-2xl" />)}

        {destinations?.map((destination, i) => (
          <motion.div
            key={destination.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
          >
            <DestinationCard destination={destination} />
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/destinations" className={buttonVariants({ variant: "outline" })}>
          View All Destinations
        </Link>
      </div>
    </Section>
  );
}
