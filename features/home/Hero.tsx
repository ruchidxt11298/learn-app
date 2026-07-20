"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/Button";
import HeroSearch from "./HeroSearch";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="https://picsum.photos/seed/hero-adventure/1920/1080"
          alt="Aerial view of a tropical coastline at sunrise"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark/80" />
      </motion.div>

      <div className="flex flex-col items-center gap-6 px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur"
        >
          Trusted by 128,000+ travelers
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
        >
          Discover Your Next Adventure
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl text-lg text-slate-200"
        >
          Best Holiday Packages Across the World
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/packages" className={buttonVariants({ variant: "accent", size: "lg" })}>
            Explore Tours
          </Link>
          <Link href="/contact" className={buttonVariants({ variant: "outline", size: "lg", className: "border-white text-white hover:bg-white hover:text-dark" })}>
            Contact Us
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4 w-full px-2"
        >
          <HeroSearch />
        </motion.div>
      </div>
    </section>
  );
}
