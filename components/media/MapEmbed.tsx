import { MapPin } from "lucide-react";
import { googleMapsApiKey, hasGoogleMaps } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { GeoLocation } from "@/types";

export default function MapEmbed({
  location,
  className,
  title = "Location map",
}: {
  location: GeoLocation;
  className?: string;
  title?: string;
}) {
  if (hasGoogleMaps) {
    const query = location.address ?? `${location.lat},${location.lng}`;
    return (
      <div className={cn("overflow-hidden rounded-2xl", className)}>
        <iframe
          title={title}
          className="h-full w-full min-h-64 border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(query)}`}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800/50",
        className,
      )}
    >
      <MapPin className="h-8 w-8 text-primary" aria-hidden />
      <p className="text-sm font-medium text-text dark:text-slate-200">{location.address ?? `${location.lat}, ${location.lng}`}</p>
      <p className="text-xs text-text-muted">Interactive map available once a Google Maps API key is configured.</p>
    </div>
  );
}
