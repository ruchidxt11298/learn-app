import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  destinationSlug: z.string().optional(),
  packageSlug: z.string().optional(),
  travelDate: z.string().min(1, "Select a travel date"),
  adults: z.coerce.number().min(1, "At least 1 adult is required"),
  children: z.coerce.number().min(0),
  message: z.string().optional(),
  couponCode: z.string().optional(),
  paymentOption: z.enum(["pay-online", "pay-later", "bank-transfer"]),
});

export type BookingFormInput = z.input<typeof bookingSchema>;
export type BookingFormSchema = z.output<typeof bookingSchema>;
