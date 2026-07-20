"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination({
  page,
  totalPages,
  onChange,
  className,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-1", className)}>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-700"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p, i) => {
        const prev = pages[i - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-1">
            {showEllipsis && <span className="px-1 text-text-muted">…</span>}
            <button
              onClick={() => onChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                p === page
                  ? "bg-primary text-white"
                  : "text-text hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700",
              )}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-700"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
