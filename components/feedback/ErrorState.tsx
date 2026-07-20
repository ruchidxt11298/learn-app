import { AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 py-16 text-center dark:border-red-900 dark:bg-red-950/30">
      <AlertTriangle className="h-10 w-10 text-red-500" aria-hidden />
      <h3 className="text-lg font-semibold text-dark dark:text-white">{title}</h3>
      <p className="max-w-sm text-sm text-text-muted">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
