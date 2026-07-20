"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import PaymentOptionSelector from "./PaymentOptionSelector";
import BookingSummary from "./BookingSummary";
import { bookingSchema, type BookingFormInput, type BookingFormSchema } from "@/lib/validations/booking.schema";
import { useCreateBooking } from "@/hooks/mutations/useCreateBooking";
import { useInitiatePayment } from "@/hooks/mutations/useInitiatePayment";
import { useDestinations } from "@/hooks/queries/useDestinations";
import { useToastStore } from "@/store/useToastStore";

export default function BookingForm({
  defaultPackageSlug,
  defaultDestinationSlug,
}: {
  defaultPackageSlug?: string;
  defaultDestinationSlug?: string;
}) {
  const router = useRouter();
  const show = useToastStore((s) => s.show);
  const { data: destinationsData } = useDestinations({ pageSize: 50 });
  const { mutateAsync: createBooking, isPending: isBooking } = useCreateBooking();
  const { mutateAsync: initiatePayment, isPending: isPaying } = useInitiatePayment();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingFormInput, unknown, BookingFormSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      destinationSlug: defaultDestinationSlug,
      packageSlug: defaultPackageSlug,
      adults: 2,
      children: 0,
      paymentOption: "pay-online",
    },
  });

  async function onSubmit(values: BookingFormSchema) {
    try {
      const booking = await createBooking(values);
      if (values.paymentOption === "pay-online") {
        await initiatePayment(booking);
      }
      router.push(`/booking/success?id=${booking.id}`);
    } catch {
      show("Something went wrong while creating your booking. Please try again.", "error");
    }
  }

  const isSubmitting = isBooking || isPaying;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input label="Traveler Name" placeholder="Jane Doe" error={errors.fullName?.message} {...register("fullName")} />
          <Input label="Email" type="email" placeholder="jane@example.com" error={errors.email?.message} {...register("email")} />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input label="Phone" type="tel" placeholder="+1 555 123 4567" error={errors.phone?.message} {...register("phone")} />
          <Input label="Travel Date" type="date" error={errors.travelDate?.message} {...register("travelDate")} />
        </div>

        {!defaultPackageSlug && (
          <Select
            label="Destination"
            placeholder="Select a destination (optional)"
            options={(destinationsData?.items ?? []).map((d) => ({ label: `${d.name}, ${d.country}`, value: d.slug }))}
            {...register("destinationSlug")}
          />
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input label="Adults" type="number" min={1} error={errors.adults?.message} {...register("adults")} />
          <Input label="Children" type="number" min={0} error={errors.children?.message} {...register("children")} />
        </div>

        <Input label="Coupon Code (optional)" placeholder="RJ10" {...register("couponCode")} />
        <Textarea label="Message (optional)" placeholder="Any special requests?" {...register("message")} />

        <div>
          <span className="mb-2 block text-sm font-medium text-text dark:text-slate-200">Payment Option</span>
          <Controller
            control={control}
            name="paymentOption"
            render={({ field }) => <PaymentOptionSelector value={field.value} onChange={field.onChange} />}
          />
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto" loading={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Book Now
        </Button>
      </form>

      <BookingSummary packageSlug={defaultPackageSlug} destinationSlug={defaultDestinationSlug} />
    </div>
  );
}
