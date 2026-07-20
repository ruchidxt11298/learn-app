"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { SHOW_PRICES } from "@/lib/site-config";
import { ADVENTURE_CATEGORIES } from "@/types";
import type { PackageFilters as Filters } from "@/services/packages.service";

const PRICE_RANGES = [
  { label: "Under ₹40,000", value: "40000" },
  { label: "Under ₹80,000", value: "80000" },
  { label: "Under ₹1,50,000", value: "150000" },
  { label: "Under ₹3,00,000", value: "300000" },
];

const DURATIONS = [
  { label: "Up to 4 days", value: "4" },
  { label: "Up to 6 days", value: "6" },
  { label: "Up to 8 days", value: "8" },
];

const RATINGS = [
  { label: "4.5 & up", value: "4.5" },
  { label: "4 & up", value: "4" },
  { label: "3.5 & up", value: "3.5" },
];

const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Top Rated", value: "rating" },
  ...(SHOW_PRICES
    ? [
        { label: "Price: Low to High", value: "price-asc" },
        { label: "Price: High to Low", value: "price-desc" },
      ]
    : []),
];

export default function PackageFilters({ filters, onChange }: { filters: Filters; onChange: (patch: Partial<Filters>) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:grid-cols-2 lg:grid-cols-6 dark:bg-slate-800 dark:ring-white/10">
      <div className="lg:col-span-2">
        <Input
          placeholder="Search packages…"
          defaultValue={filters.search ?? ""}
          onChange={(e) => onChange({ search: e.target.value || undefined })}
        />
      </div>
      <Select
        placeholder="Category"
        value={filters.category ?? ""}
        options={ADVENTURE_CATEGORIES.map((c) => ({ label: c.label, value: c.value }))}
        onChange={(e) => onChange({ category: (e.target.value || undefined) as Filters["category"] })}
      />
      {SHOW_PRICES && (
        <Select
          placeholder="Max Price"
          value={filters.maxPrice?.toString() ?? ""}
          options={PRICE_RANGES}
          onChange={(e) => onChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
        />
      )}
      <Select
        placeholder="Duration"
        value={filters.maxDuration?.toString() ?? ""}
        options={DURATIONS}
        onChange={(e) => onChange({ maxDuration: e.target.value ? Number(e.target.value) : undefined })}
      />
      <Select
        placeholder="Min Rating"
        value={filters.minRating?.toString() ?? ""}
        options={RATINGS}
        onChange={(e) => onChange({ minRating: e.target.value ? Number(e.target.value) : undefined })}
      />
      <div className="sm:col-span-2 lg:col-span-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
        <input
          type="month"
          value={filters.departureMonth ?? ""}
          onChange={(e) => onChange({ departureMonth: e.target.value || undefined })}
          aria-label="Departure month"
          className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-text focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        />
        <Select
          value={filters.sortBy ?? "popular"}
          options={SORT_OPTIONS}
          onChange={(e) => onChange({ sortBy: e.target.value as Filters["sortBy"] })}
          className="w-auto"
        />
      </div>
    </div>
  );
}
