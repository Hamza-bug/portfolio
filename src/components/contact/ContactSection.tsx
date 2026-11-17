"use client";

import { useState } from "react";

import { personalProfile } from "@/data/site";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactSection() {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const validate = (values: FormValues) => {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.subject.trim()) {
      nextErrors.subject = "Please add a subject.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Please type a message.";
    }

    return nextErrors;
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(formValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setFeedback("Please correct the highlighted fields and try again.");
      return;
    }

    setStatus("loading");
    setFeedback("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message.");
      }

      setStatus("success");
      setFeedback(data.message || "Your message was sent successfully.");
      setFormValues(initialValues);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "The contact form is not configured yet. Add a real email backend to enable sending.",
      );
    }
  };

  return (
    <section id="contact" data-reveal className="py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.38em] text-[#9fcaf7]">Contact</p>
          <h2 className="mt-5 text-3xl font-medium uppercase tracking-[-0.05em] text-white md:text-5xl">
            LET&apos;S BUILD SOMETHING GREAT.
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6 rounded-[28px] border border-white/10 bg-[rgba(13,16,22,0.84)] p-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-slate-400">Email</p>
              <a href={`mailto:${personalProfile.email}`} className="mt-2 block text-lg text-white hover:text-[#cbe7ff]">
                {personalProfile.email}
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-slate-400">LinkedIn</p>
              <a href={personalProfile.linkedinUrl} target="_blank" rel="noreferrer" className="mt-2 block text-lg text-white hover:text-[#cbe7ff]">
                Professional profile
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-slate-400">GitHub</p>
              <a href={personalProfile.githubUrl} target="_blank" rel="noreferrer" className="mt-2 block text-lg text-white hover:text-[#cbe7ff]">
                github.com/Hamza-bug
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-slate-400">WhatsApp</p>
              <a href={personalProfile.whatsappUrl} target="_blank" rel="noreferrer" className="mt-2 block text-lg text-white hover:text-[#cbe7ff]">
                Message on WhatsApp
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/10 bg-[rgba(13,16,22,0.84)] p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm text-slate-300">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-slate-400">Name</span>
                <input
                  value={formValues.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#8ec5ff]/60"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <span id="name-error" className="mt-2 block text-xs text-red-300">{errors.name}</span>}
              </label>

              <label className="block text-sm text-slate-300">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-slate-400">Email</span>
                <input
                  type="email"
                  value={formValues.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#8ec5ff]/60"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <span id="email-error" className="mt-2 block text-xs text-red-300">{errors.email}</span>}
              </label>
            </div>

            <label className="mt-5 block text-sm text-slate-300">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-slate-400">Subject</span>
              <input
                value={formValues.subject}
                onChange={(event) => handleChange("subject", event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#8ec5ff]/60"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              />
              {errors.subject && <span id="subject-error" className="mt-2 block text-xs text-red-300">{errors.subject}</span>}
            </label>

            <label className="mt-5 block text-sm text-slate-300">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-slate-400">Message</span>
              <textarea
                value={formValues.message}
                onChange={(event) => handleChange("message", event.target.value)}
                rows={6}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-[#8ec5ff]/60"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && <span id="message-error" className="mt-2 block text-xs text-red-300">{errors.message}</span>}
            </label>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center rounded-full bg-[#edf6ff] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#070b11] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {feedback && (
                <p
                  className={`text-xs ${
                    status === "success" ? "text-emerald-300" : status === "error" ? "text-red-300" : "text-slate-300"
                  }`}
                >
                  {feedback}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
