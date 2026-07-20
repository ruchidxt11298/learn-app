"use client";

import { useCurrency } from "@/hooks/useCurrency";
import { SHOW_PRICES } from "@/lib/site-config";
import type { Money } from "@/types";

export default function PriceTag({
  price,
  discountPercent,
  amountClassName,
  strikeClassName,
}: {
  price: Money;
  discountPercent?: number;
  amountClassName?: string;
  strikeClassName?: string;
}) {
  const { format } = useCurrency();

  if (!SHOW_PRICES) {
    return <span className={amountClassName}>Contact for Best Price</span>;
  }

  const discountedAmount = discountPercent ? Math.round(price.amount * (1 - discountPercent / 100)) : price.amount;

  return (
    <>
      <span className={amountClassName}>{format({ amount: discountedAmount, currency: price.currency })}</span>
      {discountPercent ? <span className={strikeClassName}>{format(price)}</span> : null}
    </>
  );
}
