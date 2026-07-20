import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrencyCode } from "@/types";

interface CurrencyState {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: "INR",
      setCurrency: (currency) => set({ currency }),
    }),
    { name: "roshijourneys-currency", skipHydration: true },
  ),
);
