"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, CalendarDays, Users, Mail, Phone } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/feedback/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { getBookingById } from "@/services/booking.service";
import { formatDate } from "@/utils/formatDate";
import { SHOW_PRICES } from "@/lib/site-config";
import type { Booking } from "@/types";

export default function BookingSuccessView() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    getBookingById(id).then((b) => {
      setBooking(b);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Skeleton className="h-72 w-full rounded-2xl" />;

  if (!booking) {
    return (
      <EmptyState
        title="Booking not found"
        description="We couldn't find this booking confirmation. Please check your email or make a new booking."
        action={
          <Link href="/booking" className={buttonVariants({ size: "sm" })}>
            New Booking
          </Link>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
      <h1 className="mt-4 font-heading text-3xl font-bold text-dark dark:text-white">Booking Confirmed!</h1>
      <p className="mt-2 text-text-muted">
        Thank you, {booking.fullName}. Your booking reference is <strong>#{booking.id.slice(0, 8).toUpperCase()}</strong>.
        A confirmation has been sent to your email.
      </p>

      <Card hover={false} className="mt-8 p-6 text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-700">
          <span className="text-sm font-semibold text-dark dark:text-white">Status</span>
          <Badge variant={booking.status === "confirmed" ? "success" : "accent"} className="capitalize">
            {booking.status}
          </Badge>
        </div>
        <div className="mt-4 space-y-3 text-sm text-text-muted">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-secondary" /> Travel Date: {formatDate(booking.travelDate)}
          </p>
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4 text-secondary" /> Travelers: {booking.adults} Adults, {booking.children} Children
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-secondary" /> {booking.email}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-secondary" /> {booking.phone}
          </p>
          <p className="flex items-center justify-between border-t border-slate-100 pt-3 font-semibold text-dark dark:border-slate-700 dark:text-white">
            <span>Total</span>
            {SHOW_PRICES ? (
              <span>
                {booking.totalPrice.currency} {booking.totalPrice.amount}
              </span>
            ) : (
              <span className="text-sm font-normal text-text-muted">Our team will confirm the final price shortly</span>
            )}
          </p>
        </div>
      </Card>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Back to Home
        </Link>
        <Link href="/packages" className={buttonVariants()}>
          Explore More Packages
        </Link>
      </div>
    </div>
  );
}
