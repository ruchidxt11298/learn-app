import { cn } from "@/lib/utils";

export type BadgeVariant = "primary" | "secondary" | "accent" | "success" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light",
  secondary: "bg-secondary/10 text-secondary-dark dark:bg-secondary/20 dark:text-secondary-light",
  accent: "bg-accent/10 text-accent-dark dark:bg-accent/20 dark:text-accent-light",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  neutral: "bg-slate-100 text-text-muted dark:bg-slate-700 dark:text-slate-300",
};

export default function Badge({
  variant = "neutral",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
