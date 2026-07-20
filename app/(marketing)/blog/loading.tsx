import Section from "@/components/layout/Section";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Section>
      <Skeleton className="mb-8 h-10 w-64" />
      <Skeleton className="mb-8 h-32 w-full rounded-2xl" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-2xl" />
        ))}
      </div>
    </Section>
  );
}
