"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import ImageWithFallback from "@/components/media/ImageWithFallback";
import { getDestinations } from "@/services/destinations.service";
import { getPackages } from "@/services/packages.service";
import { getBlogPosts } from "@/services/blog.service";

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function GlobalSearchBar() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const debounced = useDebouncedValue(term);

  const { data, isFetching } = useQuery({
    queryKey: ["global-search", debounced],
    queryFn: async () => {
      const [destinations, packages, blogs] = await Promise.all([
        getDestinations({ search: debounced, pageSize: 4 }),
        getPackages({ search: debounced, pageSize: 4 }),
        getBlogPosts({ search: debounced, pageSize: 3 }),
      ]);
      return { destinations: destinations.items, packages: packages.items, blogs: blogs.items };
    },
    enabled: open && debounced.length > 1,
  });

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="rounded-full p-2 text-text hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
      >
        <Search className="h-5 w-5" />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Search Roshi Journeys" className="max-w-xl">
        <Input
          autoFocus
          placeholder="Search destinations, packages, or articles…"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        <div className="mt-4 max-h-96 space-y-5 overflow-y-auto">
          {isFetching && <p className="py-6 text-center text-sm text-text-muted">Searching…</p>}

          {!isFetching && debounced.length > 1 && data && (
            <>
              {data.destinations.length === 0 && data.packages.length === 0 && data.blogs.length === 0 && (
                <p className="py-6 text-center text-sm text-text-muted">No results for &ldquo;{debounced}&rdquo;.</p>
              )}

              {data.destinations.length > 0 && (
                <SearchGroup title="Destinations">
                  {data.destinations.map((d) => (
                    <SearchResultLink key={d.id} href={`/destinations/${d.slug}`} image={d.heroImage} title={d.name} subtitle={d.country} onNavigate={() => setOpen(false)} />
                  ))}
                </SearchGroup>
              )}

              {data.packages.length > 0 && (
                <SearchGroup title="Packages">
                  {data.packages.map((p) => (
                    <SearchResultLink key={p.id} href={`/packages/${p.slug}`} image={p.images[0]} title={p.name} subtitle={`${p.durationDays} days`} onNavigate={() => setOpen(false)} />
                  ))}
                </SearchGroup>
              )}

              {data.blogs.length > 0 && (
                <SearchGroup title="Articles">
                  {data.blogs.map((b) => (
                    <SearchResultLink key={b.id} href={`/blog/${b.slug}`} image={b.coverImage} title={b.title} subtitle={b.category} onNavigate={() => setOpen(false)} />
                  ))}
                </SearchGroup>
              )}
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

function SearchGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">{title}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SearchResultLink({
  href,
  image,
  title,
  subtitle,
  onNavigate,
}: {
  href: string;
  image: { url: string; alt: string; publicId?: string };
  title: string;
  subtitle: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
        <ImageWithFallback image={image} fill className="object-cover" sizes="48px" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-dark dark:text-white">{title}</p>
        <p className="truncate text-xs text-text-muted">{subtitle}</p>
      </div>
    </Link>
  );
}
