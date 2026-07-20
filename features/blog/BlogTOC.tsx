import { List } from "lucide-react";
import type { Heading } from "@/utils/parseHeadings";

export default function BlogTOC({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-slate-100 p-5 dark:border-slate-700">
      <h3 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-dark dark:text-white">
        <List className="h-4 w-4" /> Table of Contents
      </h3>
      <ul className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
            <a href={`#${h.id}`} className="text-text-muted hover:text-primary dark:hover:text-secondary-light">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
