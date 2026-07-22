"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiPhone, FiMail, FiMessageSquare, FiCheckCircle, FiLoader } from "react-icons/fi";

type Status = "idle" | "loading" | "success" | "error";

const fields = [
  { name: "name", label: "Full name", type: "text", icon: FiUser, required: true, placeholder: "Rajesh Patel" },
  { name: "phone", label: "Phone number", type: "tel", icon: FiPhone, required: true, placeholder: "+91 98XXX XXXXX" },
  { name: "email", label: "Email (optional)", type: "email", icon: FiMail, required: false, placeholder: "you@example.com" },
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send.");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong flex flex-col items-center gap-4 rounded-3xl p-10 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-volt/15 text-volt">
          <FiCheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-semibold text-frost">Request received</h3>
        <p className="max-w-sm text-mist">
          Thank you. A Xeron energy consultant will reach out within one business day to schedule
          your free site audit.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-full glass px-6 py-2.5 text-sm text-frost transition-colors hover:text-solar"
        >
          Send another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-strong sheen space-y-5 rounded-3xl p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.name} className={f.name === "email" ? "sm:col-span-2" : ""}>
              <label htmlFor={f.name} className="mb-1.5 block text-sm text-mist">
                {f.label}
              </label>
              <div className="relative">
                <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-ink" />
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  required={f.required}
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-frost placeholder:text-muted-ink/60 outline-none transition-colors focus:border-solar/60 focus:bg-white/8"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-mist">
          Tell us about your property (optional)
        </label>
        <div className="relative">
          <FiMessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted-ink" />
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Rooftop area, average bill, timeline…"
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-frost placeholder:text-muted-ink/60 outline-none transition-colors focus:border-solar/60 focus:bg-white/8"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        data-cursor="hover"
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-solar-bright via-solar to-ember px-7 py-4 font-medium text-void transition-all hover:brightness-110 disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <FiLoader className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>Book My Free Site Audit</>
        )}
      </button>
      <p className="text-center text-xs text-muted-ink">
        No spam, ever. Your details are used only to arrange your audit.
      </p>
    </form>
  );
}
