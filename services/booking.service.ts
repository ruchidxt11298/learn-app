import { simulateNetwork } from "@/lib/mockDelay";
import { getPackageBySlug } from "@/services/packages.service";
import { getDestinationBySlug } from "@/services/destinations.service";
import type { Booking, BookingFormValues } from "@/types";

const STORAGE_KEY = "roshijourneys_bookings";

function readBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeBookings(bookings: Booking[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

async function estimateTotalPrice(values: BookingFormValues) {
  const travelers = values.adults + values.children * 0.5;
  if (values.packageSlug) {
    const pkg = await getPackageBySlug(values.packageSlug);
    if (pkg) {
      const discount = pkg.discountPercent ? 1 - pkg.discountPercent / 100 : 1;
      return { amount: Math.round(pkg.price.amount * discount * travelers), currency: pkg.price.currency };
    }
  }
  if (values.destinationSlug) {
    const dest = await getDestinationBySlug(values.destinationSlug);
    if (dest) return { amount: Math.round(dest.startingPrice.amount * travelers), currency: dest.startingPrice.currency };
  }
  return { amount: 0, currency: "INR" as const };
}

export async function createBooking(values: BookingFormValues): Promise<Booking> {
  // MOCK now: persist to localStorage. REAL later:
  // const { data } = await api.post('/booking', values); return data;
  const totalPrice = await estimateTotalPrice(values);
  const booking: Booking = {
    ...values,
    id: crypto.randomUUID(),
    status: values.paymentOption === "pay-online" ? "confirmed" : "pending",
    totalPrice,
    createdAt: new Date().toISOString(),
  };

  const bookings = readBookings();
  writeBookings([booking, ...bookings]);

  return simulateNetwork(booking, 800);
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = readBookings();
  return simulateNetwork(bookings.find((b) => b.id === id) ?? null, 0);
}
