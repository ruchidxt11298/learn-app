import { SearchX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function EmptyState({
  title = "Nothing found",
  description = "Try adjusting your filters or search terms.",
  icon: Icon = SearchX,
  action,
}: {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
      <Icon className="h-10 w-10 text-text-muted" aria-hidden />
      <h3 className="text-lg font-semibold text-dark dark:text-white">{title}</h3>
      <p className="max-w-sm text-sm text-text-muted">{description}</p>
      {action}
    </div>
  );
}
