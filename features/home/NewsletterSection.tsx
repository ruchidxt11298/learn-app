"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import { useSubscribeNewsletter } from "@/hooks/mutations/useSubscribeNewsletter";
import { useToastStore } from "@/store/useToastStore";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export default function NewsletterSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { mutate, isPending } = useSubscribeNewsletter();
  const show = useToastStore((s) => s.show);

  function onSubmit(values: FormValues) {
    mutate(values.email, {
      onSuccess: () => {
        show("You're subscribed! Watch your inbox for travel deals.", "success");
        reset();
      },
      onError: () => show("Something went wrong. Please try again.", "error"),
    });
  }

  return (
    <Section className="bg-primary">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Never Miss a Deal</h2>
        <p className="text-primary-light/90 text-white/80">
          Subscribe to get exclusive offers, new destinations and travel inspiration straight to your inbox.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 flex w-full max-w-md flex-col gap-2 sm:flex-row">
          <div className="flex-1">
            <input
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              className="h-12 w-full rounded-full border-0 px-5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="mt-1 text-left text-xs text-accent-light">{errors.email.message}</p>}
          </div>
          <Button type="submit" variant="accent" loading={isPending} className="h-12 shrink-0">
            <Send className="h-4 w-4" /> Subscribe
          </Button>
        </form>
      </div>
    </Section>
  );
}
