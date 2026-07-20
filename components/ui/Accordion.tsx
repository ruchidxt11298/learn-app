"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export default function Accordion({
  items,
  className,
  defaultOpenId,
}: {
  items: AccordionItemData[];
  className?: string;
  defaultOpenId?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className={cn("divide-y divide-slate-200 dark:divide-slate-700", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              className="flex w-full items-center justify-between gap-4 py-4 text-left font-heading font-medium text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary dark:text-slate-100"
            >
              {item.title}
              <ChevronDown
                className={cn("h-5 w-5 shrink-0 text-primary transition-transform", isOpen && "rotate-180")}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 text-sm leading-relaxed text-text-muted dark:text-slate-300">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
