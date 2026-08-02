"use client";

import { useState } from "react";
import { useSubmitContact } from "@/hooks/mutations/useSubmitContact";
import { useToastStore } from "@/store/useToastStore";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import type { ContactMessage } from "@/types";

const initialFormState: ContactMessage = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactMessage>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const contactMutation = useSubmitContact();
  const isLoading = contactMutation.status === "pending";
  const { mutateAsync } = contactMutation;
  const show = useToastStore((s) => s.show);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) {
      show("Please complete all required fields.", "error");
      return;
    }

    try {
      await mutateAsync(formData);
      setFormData(initialFormState);
      setErrors({});
      show("Your message has been sent successfully.", "success");
    } catch {
      show("There was an error sending your message. Please try again.", "error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
          error={errors.email}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
        />
        <Input
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={(event) => setFormData((prev) => ({ ...prev, subject: event.target.value }))}
          error={errors.subject}
        />
      </div>

      <Textarea
        label="Message"
        name="message"
        rows={6}
        value={formData.message}
        onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
        error={errors.message}
      />

      <Button type="submit" size="lg" loading={isLoading} className="w-full sm:w-auto">
        Send Message
      </Button>
    </form>
  );
}
