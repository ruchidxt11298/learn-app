"use client";

import { Search } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { SHOW_PRICES } from "@/lib/site-config";
import { ADVENTURE_CATEGORIES } from "@/types";
import type { DestinationFilters as Filters } from "@/services/destinations.service";

const SEASONS = [
  { label: "Summer", value: "summer" },
  { label: "Winter", value: "winter" },
  { label: "Monsoon", value: "monsoon" },
  { label: "All Year", value: "all-year" },
];

const DURATIONS = [
  { label: "Up to 4 days", value: "4" },
  { label: "Up to 7 days", value: "7" },
  { label: "Up to 10 days", value: "10" },
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

export default function DestinationFilters({
  filters,
  countries,
  onChange,
}: {
  filters: Filters;
  countries: string[];
  onChange: (patch: Partial<Filters>) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:grid-cols-2 lg:grid-cols-6 dark:bg-slate-800 dark:ring-white/10">
      <div className="lg:col-span-2">
        <Input
          placeholder="Search destinations…"
          defaultValue={filters.search ?? ""}
          onChange={(e) => onChange({ search: e.target.value || undefined })}
        />
      </div>
      <Select
        placeholder="Country"
        value={filters.country ?? ""}
        options={countries.map((c) => ({ label: c, value: c }))}
        onChange={(e) => onChange({ country: e.target.value || undefined })}
      />
      <Select
        placeholder="Activity"
        value={filters.activity ?? ""}
        options={ADVENTURE_CATEGORIES.map((c) => ({ label: c.label, value: c.value }))}
        onChange={(e) => onChange({ activity: e.target.value || undefined })}
      />
      <Select
        placeholder="Season"
        value={filters.season ?? ""}
        options={SEASONS}
        onChange={(e) => onChange({ season: e.target.value || undefined })}
      />
      <Select
        placeholder="Duration"
        value={filters.maxDuration?.toString() ?? ""}
        options={DURATIONS}
        onChange={(e) => onChange({ maxDuration: e.target.value ? Number(e.target.value) : undefined })}
      />
      <div className="sm:col-span-2 lg:col-span-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Search className="h-3.5 w-3.5" /> Refine your search using any combination of filters
        </div>
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
