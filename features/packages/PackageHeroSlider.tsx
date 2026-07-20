"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination as SwiperPagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImageWithFallback from "@/components/media/ImageWithFallback";
import type { ImageAsset } from "@/types";

export default function PackageHeroSlider({ images }: { images: ImageAsset[] }) {
  return (
    <div className="relative h-[50vh] min-h-96 w-full [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-pagination-bullet-active]:bg-accent">
      <Swiper
        modules={[Navigation, SwiperPagination]}
        navigation
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {images.map((image, i) => (
          <SwiperSlide key={image.url + i}>
            <div className="relative h-full w-full">
              <ImageWithFallback image={image} fill priority={i === 0} className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
