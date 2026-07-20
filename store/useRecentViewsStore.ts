import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_RECENT = 10;

export interface RecentViewItem {
  type: "destination" | "package";
  slug: string;
  viewedAt: string;
}

interface RecentViewsState {
  items: RecentViewItem[];
  track: (type: RecentViewItem["type"], slug: string) => void;
}

export const useRecentViewsStore = create<RecentViewsState>()(
  persist(
    (set) => ({
      items: [],
      track: (type, slug) =>
        set((state) => {
          const deduped = state.items.filter((i) => !(i.type === type && i.slug === slug));
          const items = [{ type, slug, viewedAt: new Date().toISOString() }, ...deduped].slice(
            0,
            MAX_RECENT,
          );
          return { items };
        }),
    }),
    { name: "roshijourneys-recent", skipHydration: true },
  ),
);
