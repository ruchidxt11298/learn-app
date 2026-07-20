import Section from "@/components/layout/Section";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-[50vh] min-h-96 w-full rounded-none" />
      <Section>
        <Skeleton className="h-10 w-64 mb-6" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </Section>
    </>
  );
}
