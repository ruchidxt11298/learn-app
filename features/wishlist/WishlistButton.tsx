"use client";

import { Heart } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useToastStore } from "@/store/useToastStore";

export default function WishlistButton({ id }: { id: string }) {
  const { has, toggle } = useWishlistStore();
  const show = useToastStore((s) => s.show);
  const active = has(id);

  return (
    <IconButton
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      active={active}
      onClick={(e) => {
        e.preventDefault();
        toggle(id);
        show(active ? "Removed from wishlist" : "Added to wishlist", "success");
      }}
    >
      <Heart className="h-4 w-4" fill={active ? "currentColor" : "none"} />
    </IconButton>
  );
}
