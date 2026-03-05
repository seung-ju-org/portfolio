"use client";

import { useState } from "react";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactFormLabels = {
  email: string;
  phone: string;
  subject: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

type ContactFormProps = {
  labels: ContactFormLabels;
};

export function ContactForm({ labels }: ContactFormProps) {
  const [form, setForm] = useState({ email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        let serverMessage = "Failed to send";
        try {
          const body = (await response.json()) as { error?: string };
          if (body.error) {
            serverMessage = body.error;
          }
        } catch {
          // Ignore invalid JSON and keep fallback message.
        }
        throw new Error(serverMessage);
      }

      toast.success(labels.success);
      setForm({ email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send";
      toast.error(labels.error, { description: message });
    } finally {
      setStatus("idle");
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">{labels.email}</span>
          <input
            className="w-full rounded-md border bg-background px-3 py-2 text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
            type="email"
            value={form.email}
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">{labels.phone}</span>
          <input
            className="w-full rounded-md border bg-background px-3 py-2 text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            required
            type="tel"
            value={form.phone}
          />
        </label>
      </div>
      <label className="space-y-1 text-sm">
        <span className="text-muted-foreground">{labels.subject}</span>
        <input
          className="w-full rounded-md border bg-background px-3 py-2 text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
          onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
          required
          type="text"
          value={form.subject}
        />
      </label>
      <label className="space-y-1 text-sm">
        <span className="text-muted-foreground">{labels.message}</span>
        <textarea
          className="min-h-36 w-full rounded-md border bg-background px-3 py-2 text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          required
          value={form.message}
        />
      </label>
      <div className="flex items-center gap-3">
        <button className={cn(buttonVariants({ variant: "default" }))} disabled={status === "sending"} type="submit">
          {status === "sending" ? labels.sending : labels.submit}
        </button>
      </div>
    </form>
  );
}
