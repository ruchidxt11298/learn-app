"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";
import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

export default function Gallery({ images, className }: { images: ImageAsset[]; className?: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const showPrev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const showNext = () => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div className={cn("columns-2 gap-3 sm:columns-3 md:columns-4 [&>*]:mb-3", className)}>
        {images.map((image, i) => (
          <button
            key={image.url + i}
            onClick={() => setActiveIndex(i)}
            className="group relative block w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            aria-label={`View ${image.alt || "photo"} full size`}
          >
            <ImageWithFallback
              image={image}
              width={image.width ?? 500}
              height={image.height ?? 400}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
            <div className="absolute inset-0 bg-dark/0 transition-colors group-hover:bg-dark/10" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-dark/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close gallery"
              className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[70vh] w-full max-w-4xl"
            >
              <ImageWithFallback image={images[activeIndex]} fill className="object-contain" sizes="90vw" />
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
