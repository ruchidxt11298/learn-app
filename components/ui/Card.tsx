import { cn } from "@/lib/utils";

export default function Card({
  className,
  children,
  hover = true,
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 dark:bg-slate-800 dark:ring-white/10",
        hover && "hover:-translate-y-1 hover:shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
