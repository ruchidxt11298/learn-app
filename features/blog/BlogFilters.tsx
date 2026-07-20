"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import type { BlogFilters as Filters } from "@/services/blog.service";

export default function BlogFilters({
  filters,
  categories,
  tags,
  onChange,
}: {
  filters: Filters;
  categories: string[];
  tags: string[];
  onChange: (patch: Partial<Filters>) => void;
}) {
  return (
    <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          placeholder="Search articles…"
          defaultValue={filters.search ?? ""}
          onChange={(e) => onChange({ search: e.target.value || undefined })}
        />
        <Select
          placeholder="All Categories"
          value={filters.category ?? ""}
          options={categories.map((c) => ({ label: c, value: c }))}
          onChange={(e) => onChange({ category: e.target.value || undefined })}
        />
      </div>
      <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-700">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onChange({ tag: filters.tag === tag ? undefined : tag })}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
              filters.tag === tag
                ? "bg-primary text-white"
                : "bg-slate-100 text-text-muted hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300",
            )}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
