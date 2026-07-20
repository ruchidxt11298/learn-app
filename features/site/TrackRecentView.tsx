"use client";

import { useEffect } from "react";
import { useRecentViewsStore } from "@/store/useRecentViewsStore";

export default function TrackRecentView({ type, slug }: { type: "destination" | "package"; slug: string }) {
  const track = useRecentViewsStore((s) => s.track);

  useEffect(() => {
    track(type, slug);
  }, [type, slug, track]);

  return null;
}
