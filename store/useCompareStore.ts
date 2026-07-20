import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_COMPARE = 4;

interface CompareState {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  isFull: boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      ids: [],
      isFull: false,
      add: (id) =>
        set((state) => {
          if (state.ids.includes(id) || state.ids.length >= MAX_COMPARE) return state;
          const ids = [...state.ids, id];
          return { ids, isFull: ids.length >= MAX_COMPARE };
        }),
      remove: (id) =>
        set((state) => {
          const ids = state.ids.filter((i) => i !== id);
          return { ids, isFull: ids.length >= MAX_COMPARE };
        }),
      clear: () => set({ ids: [], isFull: false }),
      has: (id) => get().ids.includes(id),
    }),
    { name: "roshijourneys-compare", skipHydration: true },
  ),
);

export { MAX_COMPARE };
