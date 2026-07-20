import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Rating({
  value,
  reviewCount,
  size = "sm",
  className,
}: {
  value: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <div className={cn("flex items-center gap-1", className)} role="img" aria-label={`Rated ${value} out of 5`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i < Math.round(value) ? "fill-accent text-accent" : "fill-slate-200 text-slate-200 dark:fill-slate-600 dark:text-slate-600",
            )}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-text-muted">
        {value.toFixed(1)}
        {reviewCount !== undefined && ` (${reviewCount})`}
      </span>
    </div>
  );
}
