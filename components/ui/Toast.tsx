"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useToastStore } from "@/store/useToastStore";
import { cn } from "@/lib/utils";

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const variantClasses = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  error: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
  info: "border-secondary/30 bg-secondary/10 text-secondary-dark dark:text-secondary-light",
};

export default function ToastViewport() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div className="pointer-events-none fixed bottom-24 right-6 z-[100] flex w-full max-w-sm flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.variant];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              role="status"
              className={cn(
                "pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg",
                variantClasses[toast.variant],
              )}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              <p className="text-sm font-medium">{toast.message}</p>
              <button
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
                className="ml-auto shrink-0 opacity-60 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
