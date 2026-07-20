import Section from "@/components/layout/Section";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-96 w-full rounded-none" />
      <Section>
        <Skeleton className="h-6 w-full mb-3" />
        <Skeleton className="h-6 w-5/6 mb-3" />
        <Skeleton className="h-6 w-2/3" />
      </Section>
    </>
  );
}
