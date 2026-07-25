"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { img } from "@/data/_helpers";
import { siteConfig } from "@/lib/site-config";
import HeroSearch from "./HeroSearch";

const DHAM_STOPS = [
  { name: "Yamunotri", image: img("hero-yamunotri", 400, 400, "Yamunotri Temple") },
  { name: "Gangotri", image: img("hero-gangotri", 400, 400, "Gangotri Temple") },
  { name: "Kedarnath", image: img("hero-kedarnath", 400, 400, "Kedarnath Temple") },
  { name: "Badrinath", image: img("hero-badrinath", 400, 400, "Badrinath Temple") },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden py-28">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/hero-char-dham-bg.png"
          alt="Char Dham Yatra collage — Yamunotri, Gangotri, Kedarnath and Badrinath temples along the Uttarakhand route"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/55 to-dark/85" />
      </motion.div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur"
        >
          🔱 || हर हर महादेव || {siteConfig.tagline}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-6xl lg:text-7xl">चार धाम यात्रा</h1>
          <p className="mt-2 text-lg font-semibold text-secondary-light sm:text-xl">Char Dham Yatra with {siteConfig.name}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl text-base font-medium text-slate-200 sm:text-lg"
        >
          यमुनोत्री • गंगोत्री • केदारनाथ • बद्रीनाथ — with Chopta-Tungnath, Auli, Devprayag Sangam and Mana Village along the way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          {DHAM_STOPS.map((stop) => (
            <div key={stop.name} className="flex flex-col items-center gap-2">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl ring-2 ring-white/40 sm:h-20 sm:w-20">
                <Image src={stop.image.url} alt={stop.image.alt} fill className="object-cover" />
              </div>
              <span className="text-xs font-semibold text-white sm:text-sm">{stop.name}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/packages" className={buttonVariants({ variant: "accent", size: "lg" })}>
            Explore Tour Packages
          </Link>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className={buttonVariants({ variant: "outline", size: "lg", className: "border-white text-white hover:bg-white hover:text-dark" })}
          >
            <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-4 w-full px-2"
        >
          <HeroSearch />
        </motion.div>
      </div>
    </section>
  );
}
