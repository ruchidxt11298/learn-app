import Link from "next/link";
import { Newspaper } from "lucide-react";
import Section from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/Button";

export default function BlogNotFound() {
  return (
    <Section className="flex flex-col items-center gap-4 text-center">
      <Newspaper className="h-14 w-14 text-primary" aria-hidden />
      <h1 className="font-heading text-3xl font-bold text-dark dark:text-white">Article Not Found</h1>
      <p className="max-w-md text-text-muted">This article may have been moved or no longer exists.</p>
      <Link href="/blog" className={buttonVariants()}>
        Browse All Articles
      </Link>
    </Section>
  );
}
