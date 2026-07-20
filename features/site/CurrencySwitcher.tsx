"use client";

import { useCurrencyStore } from "@/store/useCurrencyStore";
import type { CurrencyCode } from "@/types";

const CURRENCIES: CurrencyCode[] = ["INR", "USD", "EUR", "GBP"];

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrencyStore();

  return (
    <label>
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        aria-label="Select currency"
        className="rounded-full border border-slate-200 bg-transparent px-2 py-1.5 text-xs font-semibold text-text focus:outline-none focus:ring-2 focus:ring-secondary dark:border-slate-600 dark:text-slate-200"
      >
        {CURRENCIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </label>
  );
}
