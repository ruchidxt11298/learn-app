import { cn } from "@/lib/utils";
import Container from "./Container";

export default function Section({
  className,
  containerClassName,
  children,
  id,
}: {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto mb-12 max-w-2xl",
        align === "center" ? "text-center" : "text-left mx-0",
        className,
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-secondary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-dark dark:text-secondary-light">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold text-dark sm:text-4xl dark:text-white">{title}</h2>
      {description && <p className="mt-4 text-text-muted">{description}</p>}
    </div>
  );
}
