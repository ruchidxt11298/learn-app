"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination as SwiperPagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Quote } from "lucide-react";
import Section, { SectionHeading } from "@/components/layout/Section";
import Skeleton from "@/components/ui/Skeleton";
import Rating from "@/components/ui/Rating";
import ImageWithFallback from "@/components/media/ImageWithFallback";
import { useTestimonials } from "@/hooks/queries/useReviews";

export default function TestimonialsSlider() {
  const { data: testimonials, isLoading } = useTestimonials();

  return (
    <Section className="bg-primary/5 dark:bg-slate-900">
      <SectionHeading eyebrow="Traveler Stories" title="What Our Travelers Say" description="Real experiences from real Roshi Journeys travelers." />

      {isLoading && <Skeleton className="mx-auto h-56 max-w-2xl rounded-2xl" />}

      {testimonials && (
        <Swiper
          modules={[Autoplay, SwiperPagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <figure className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10">
                <Quote className="h-6 w-6 text-secondary" aria-hidden />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-text-muted dark:text-slate-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full">
                    <ImageWithFallback image={t.avatar} fill className="object-cover" sizes="44px" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark dark:text-white">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.location}</p>
                  </div>
                  <Rating value={t.rating} className="ml-auto" />
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Section>
  );
}
