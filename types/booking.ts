import type { Money } from "./common";

export type PaymentOption = "pay-online" | "pay-later" | "bank-transfer";
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface BookingFormValues {
  fullName: string;
  email: string;
  phone: string;
  destinationSlug?: string;
  packageSlug?: string;
  travelDate: string;
  adults: number;
  children: number;
  message?: string;
  couponCode?: string;
  paymentOption: PaymentOption;
}

export interface Booking extends BookingFormValues {
  id: string;
  status: BookingStatus;
  totalPrice: Money;
  createdAt: string;
}
