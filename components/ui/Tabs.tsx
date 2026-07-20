"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export default function Tabs({ tabs, className }: { tabs: TabItem[]; className?: string }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const active = tabs.find((t) => t.id === activeId);

  return (
    <div className={className}>
      <div
        role="tablist"
        className="flex gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-700"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeId === tab.id}
            onClick={() => setActiveId(tab.id)}
            className={cn(
              "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none",
              activeId === tab.id
                ? "border-secondary text-primary dark:text-secondary-light"
                : "border-transparent text-text-muted hover:text-text dark:hover:text-slate-200",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-6">
        {active?.content}
      </div>
    </div>
  );
}
