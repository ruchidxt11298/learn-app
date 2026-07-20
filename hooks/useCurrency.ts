import { useCurrencyStore } from "@/store/useCurrencyStore";
import { formatMoney } from "@/utils/formatCurrency";
import type { Money } from "@/types";

export function useCurrency() {
  const { currency, setCurrency } = useCurrencyStore();
  return {
    currency,
    setCurrency,
    format: (money: Money) => formatMoney(money, currency),
  };
}
