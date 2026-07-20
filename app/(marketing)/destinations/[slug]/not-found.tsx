import Link from "next/link";
import { Compass } from "lucide-react";
import Section from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/Button";

export default function DestinationNotFound() {
  return (
    <Section className="flex flex-col items-center gap-4 text-center">
      <Compass className="h-14 w-14 text-primary" aria-hidden />
      <h1 className="font-heading text-3xl font-bold text-dark dark:text-white">Destination Not Found</h1>
      <p className="max-w-md text-text-muted">
        We couldn&apos;t find the destination you were looking for. It may have moved or no longer exists.
      </p>
      <Link href="/destinations" className={buttonVariants()}>
        Browse All Destinations
      </Link>
    </Section>
  );
}
