import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Loader({ className, label = "Loading" }: { className?: string; label?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2 py-12 text-text-muted", className)} role="status">
      <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden />
      <span className="text-sm">{label}…</span>
    </div>
  );
}
