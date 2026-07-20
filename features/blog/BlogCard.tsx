import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ImageWithFallback from "@/components/media/ImageWithFallback";
import { formatShortDate } from "@/utils/formatDate";
import type { BlogPost } from "@/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="flex h-full flex-col">
      <Link href={`/blog/${post.slug}`} className="relative block h-44 w-full overflow-hidden">
        <ImageWithFallback image={post.coverImage} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="secondary" className="w-fit">
          {post.category}
        </Badge>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mt-2 line-clamp-2 font-heading text-lg font-semibold text-dark hover:text-primary dark:text-white">
            {post.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-text-muted">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-4 text-xs text-text-muted dark:border-slate-700">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" /> {formatShortDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.readTimeMinutes} min read
          </span>
        </div>
      </div>
    </Card>
  );
}
