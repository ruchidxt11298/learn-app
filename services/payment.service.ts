import { simulateNetwork } from "@/lib/mockDelay";
import { hasPaymentProvider } from "@/lib/config";
import type { Booking } from "@/types";

export interface PaymentResult {
  success: boolean;
  demo: boolean;
  reference: string;
}

export async function initiatePayment(booking: Booking): Promise<PaymentResult> {
  // MOCK/DEMO now (no NEXT_PUBLIC_PAYMENT_PROVIDER_KEY configured): simulate a successful charge.
  // REAL later: swap this body for the real SDK/checkout call (e.g. Stripe), same signature/return shape.
  if (!hasPaymentProvider) {
    return simulateNetwork({ success: true, demo: true, reference: `DEMO-${booking.id.slice(0, 8).toUpperCase()}` }, 1200);
  }
  return simulateNetwork({ success: true, demo: false, reference: `PAY-${booking.id.slice(0, 8).toUpperCase()}` }, 1200);
}
