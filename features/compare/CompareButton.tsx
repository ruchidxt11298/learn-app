"use client";

import { GitCompareArrows } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import { useCompareStore, MAX_COMPARE } from "@/store/useCompareStore";
import { useToastStore } from "@/store/useToastStore";

export default function CompareButton({ id }: { id: string }) {
  const { has, add, remove, isFull } = useCompareStore();
  const show = useToastStore((s) => s.show);
  const active = has(id);

  return (
    <IconButton
      aria-label={active ? "Remove from compare" : "Add to compare"}
      active={active}
      onClick={(e) => {
        e.preventDefault();
        if (active) {
          remove(id);
          return;
        }
        if (isFull) {
          show(`You can compare up to ${MAX_COMPARE} items at a time`, "error");
          return;
        }
        add(id);
        show("Added to compare", "success");
      }}
    >
      <GitCompareArrows className="h-4 w-4" />
    </IconButton>
  );
}
