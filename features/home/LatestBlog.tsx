"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section, { SectionHeading } from "@/components/layout/Section";
import Skeleton from "@/components/ui/Skeleton";
import { buttonVariants } from "@/components/ui/Button";
import BlogCard from "@/features/blog/BlogCard";
import { useLatestBlogPosts } from "@/hooks/queries/useBlog";

export default function LatestBlog() {
  const { data: posts, isLoading } = useLatestBlogPosts(3);

  return (
    <Section className="bg-white dark:bg-slate-900">
      <SectionHeading eyebrow="From the Blog" title="Latest Travel Stories" description="Tips, guides and inspiration for your next trip." />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-2xl" />)}

        {posts?.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
          Read More Articles
        </Link>
      </div>
    </Section>
  );
}
