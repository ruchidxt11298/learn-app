import type { CurrencyCode, Money } from "@/types";

// Static illustrative rates relative to USD — no live FX per product spec.
const RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.3,
};

const LOCALES: Record<CurrencyCode, string> = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  INR: "en-IN",
};

export function convertCurrency(money: Money, to: CurrencyCode): number {
  const inUsd = money.amount / RATES[money.currency];
  return Math.round(inUsd * RATES[to]);
}

export function formatMoney(money: Money, displayCurrency?: CurrencyCode): string {
  const currency = displayCurrency ?? money.currency;
  const amount = displayCurrency ? convertCurrency(money, displayCurrency) : money.amount;
  return new Intl.NumberFormat(LOCALES[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
