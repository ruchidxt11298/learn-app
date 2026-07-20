import Link from "next/link";
import { PackageX } from "lucide-react";
import Section from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/Button";

export default function PackageNotFound() {
  return (
    <Section className="flex flex-col items-center gap-4 text-center">
      <PackageX className="h-14 w-14 text-primary" aria-hidden />
      <h1 className="font-heading text-3xl font-bold text-dark dark:text-white">Package Not Found</h1>
      <p className="max-w-md text-text-muted">
        We couldn&apos;t find the tour package you were looking for. It may have been retired or renamed.
      </p>
      <Link href="/packages" className={buttonVariants()}>
        Browse All Packages
      </Link>
    </Section>
  );
}
