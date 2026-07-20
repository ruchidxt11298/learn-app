import { MessageCircle } from "lucide-react";
import ImageWithFallback from "@/components/media/ImageWithFallback";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { formatDate } from "@/utils/formatDate";
import type { BlogComment } from "@/types";

export default function CommentsSection({ comments }: { comments: BlogComment[] }) {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-dark dark:text-white">
        <MessageCircle className="h-5 w-5" /> Comments ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <p className="text-sm text-text-muted">No comments yet. Be the first to share your thoughts.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              {comment.avatar && (
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  <ImageWithFallback image={comment.avatar} fill className="object-cover" sizes="36px" />
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-dark dark:text-white">
                  {comment.author} <span className="ml-2 text-xs font-normal text-text-muted">{formatDate(comment.date)}</span>
                </p>
                <p className="mt-1 text-sm text-text-muted">{comment.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-5 dark:border-slate-700">
        <Textarea label="Leave a comment" placeholder="Comments are coming soon…" disabled />
        <Button className="mt-3" disabled>
          Post Comment (Coming Soon)
        </Button>
      </div>
    </div>
  );
}
