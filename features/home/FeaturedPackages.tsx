"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section, { SectionHeading } from "@/components/layout/Section";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/feedback/ErrorState";
import { buttonVariants } from "@/components/ui/Button";
import PackageCard from "@/features/packages/PackageCard";
import { useFeaturedPackages } from "@/hooks/queries/usePackages";

export default function FeaturedPackages() {
  const { data: packages, isLoading, isError, refetch } = useFeaturedPackages(6);

  return (
    <Section className="bg-background dark:bg-dark">
      <SectionHeading
        eyebrow="Best Sellers"
        title="Featured Tour Packages"
        description="All-inclusive packages designed by our travel experts, ready to book."
      />

      {isError && <ErrorState onRetry={() => refetch()} />}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[26rem] rounded-2xl" />)}

        {packages?.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
          >
            <PackageCard pkg={pkg} />
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/packages" className={buttonVariants({ variant: "outline" })}>
          View All Packages
        </Link>
      </div>
    </Section>
  );
}
