import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import Container from "@/components/layout/Container";
import Section, { SectionHeading } from "@/components/layout/Section";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Badge from "@/components/ui/Badge";
import ImageWithFallback from "@/components/media/ImageWithFallback";
import JsonLd from "@/components/seo/JsonLd";
import BlogTOC from "@/features/blog/BlogTOC";
import ShareButtons from "@/features/blog/ShareButtons";
import CommentsSection from "@/features/blog/CommentsSection";
import RelatedArticles from "@/features/blog/RelatedArticles";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/services/blog.service";
import { parseHeadings } from "@/utils/parseHeadings";
import { formatDate } from "@/utils/formatDate";
import { siteConfig } from "@/lib/site-config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.seo.title,
      description: post.seo.description,
      images: [{ url: post.coverImage.url }],
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const { html, headings } = parseHeadings(post.content);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: post.coverImage.url,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          author: { "@type": "Person", name: post.author.name },
          url,
        }}
      />

      <div className="relative h-96 w-full">
        <ImageWithFallback image={post.coverImage} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-8">
          <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
          <Badge variant="secondary" className="mt-4">
            {post.category}
          </Badge>
          <h1 className="mt-2 max-w-3xl font-heading text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-200">
            <span className="flex items-center gap-2">
              <div className="relative h-7 w-7 overflow-hidden rounded-full">
                <ImageWithFallback image={post.author.avatar} fill className="object-cover" sizes="28px" />
              </div>
              {post.author.name}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" /> {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {post.readTimeMinutes} min read
            </span>
          </div>
        </Container>
      </div>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
          <article>
            <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
            <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-700">
              <ShareButtons url={url} title={post.title} />
            </div>
            <div className="mt-10 border-t border-slate-100 pt-8 dark:border-slate-700">
              <CommentsSection comments={post.comments} />
            </div>
          </article>
          <aside className="space-y-6">
            <BlogTOC headings={headings} />
            {post.author.bio && (
              <div className="rounded-2xl border border-slate-100 p-5 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <ImageWithFallback image={post.author.avatar} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark dark:text-white">{post.author.name}</p>
                    <p className="text-xs text-text-muted">Author</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-text-muted">{post.author.bio}</p>
              </div>
            )}
          </aside>
        </div>
      </Section>

      <Section className="bg-background dark:bg-dark">
        <SectionHeading eyebrow="Keep Reading" title="Related Articles" align="left" />
        <RelatedArticles post={post} />
      </Section>
    </>
  );
}
