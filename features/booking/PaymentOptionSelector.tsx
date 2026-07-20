"use client";

import { CreditCard, Landmark, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { hasPaymentProvider } from "@/lib/config";
import type { PaymentOption } from "@/types";

const OPTIONS: { value: PaymentOption; label: string; description: string; icon: typeof CreditCard }[] = [
  {
    value: "pay-online",
    label: "Pay Online",
    description: hasPaymentProvider ? "Secure card payment at checkout." : "Demo checkout — no real payment is processed.",
    icon: CreditCard,
  },
  { value: "pay-later", label: "Pay Later", description: "Reserve now, pay 30 days before departure.", icon: Clock3 },
  { value: "bank-transfer", label: "Bank Transfer", description: "We'll email transfer instructions.", icon: Landmark },
];

export default function PaymentOptionSelector({
  value,
  onChange,
}: {
  value: PaymentOption;
  onChange: (value: PaymentOption) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors",
            value === opt.value
              ? "border-secondary bg-secondary/5 ring-1 ring-secondary"
              : "border-slate-200 hover:border-secondary/50 dark:border-slate-600",
          )}
        >
          <opt.icon className={cn("h-5 w-5", value === opt.value ? "text-secondary" : "text-text-muted")} />
          <span className="text-sm font-semibold text-dark dark:text-white">{opt.label}</span>
          <span className="text-xs text-text-muted">{opt.description}</span>
        </button>
      ))}
    </div>
  );
}
