"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiZap,
  FiCheckCircle,
  FiExternalLink,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { site } from "@/lib/site";

const fields = [
  { name: "name", label: "Full name", type: "text", icon: FiUser, required: true, placeholder: "Your name" },
  { name: "phone", label: "Phone number", type: "tel", icon: FiPhone, required: true, placeholder: "+91 98XXX XXXXX" },
  { name: "city", label: "City / area", type: "text", icon: FiMapPin, required: true, placeholder: "Rajkot" },
  { name: "bill", label: "Average monthly bill (optional)", type: "text", icon: FiZap, required: false, placeholder: "₹6,000" },
] as const;

const propertyTypes = ["Home", "Shop / Office", "Factory / Industrial"] as const;

/**
 * Leads are handed to WhatsApp rather than posted to a server.
 *
 * The previous version POSTed to /api/contact, which only wrote the enquiry to a
 * server log — every lead was silently lost. Opening a pre-filled wa.me message
 * puts the enquiry in the owner's chat instantly, needs no mailbox, API key or
 * database, and leaves the customer holding a copy of what they sent.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();

    const lines = [
      "Hi Xeron Energy, I'd like a free solar site audit.",
      "",
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      `City: ${get("city")}`,
      `Property: ${get("property") || "Not specified"}`,
    ];
    if (get("bill")) lines.push(`Monthly bill: ${get("bill")}`);
    if (get("message")) lines.push("", `Details: ${get("message")}`);

    const url = `${site.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong flex flex-col items-center gap-4 rounded-3xl p-10 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-volt/15 text-volt">
          <FiCheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-semibold text-frost">WhatsApp is open</h3>
        <p className="max-w-sm text-mist">
          Your enquiry is typed out and waiting in WhatsApp — press send there and it
          reaches us directly. A Xeron engineer replies within one working day.
        </p>
        <a
          href={site.phoneHref}
          className="text-sm text-solar transition-opacity hover:opacity-80"
        >
          Or call us now on {site.phone}
        </a>
        <button
          onClick={() => setSent(false)}
          className="mt-2 rounded-full glass px-6 py-2.5 text-sm text-frost transition-colors hover:text-solar"
        >
          Send another enquiry
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
            <div key={f.name}>
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
                  autoComplete={
                    f.name === "name" ? "name" : f.name === "phone" ? "tel" : "off"
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-frost placeholder:text-muted-ink/60 outline-none transition-colors focus:border-solar/60 focus:bg-white/8"
                />
              </div>
            </div>
          );
        })}
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm text-mist">Property type</legend>
        <div className="flex flex-wrap gap-2">
          {propertyTypes.map((t, i) => (
            <label
              key={t}
              className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-mist transition-colors has-[:checked]:border-solar/60 has-[:checked]:bg-solar/10 has-[:checked]:text-frost"
            >
              <input
                type="radio"
                name="property"
                value={t}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-mist">
          Anything else? (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Roof type, approximate area, or any questions you have."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-frost placeholder:text-muted-ink/60 outline-none transition-colors focus:border-solar/60 focus:bg-white/8"
        />
      </div>

      <button
        type="submit"
        data-cursor="hover"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-solar-bright to-ember px-8 py-4 font-medium text-void transition-transform hover:-translate-y-0.5"
      >
        <FaWhatsapp className="h-5 w-5" />
        Send on WhatsApp
        <FiExternalLink className="h-4 w-4" />
      </button>

      <p className="text-center text-xs leading-relaxed text-muted-ink">
        Opens WhatsApp with your enquiry ready to send. We use your details only to
        respond to this enquiry — see our{" "}
        <a href="/privacy" className="underline transition-colors hover:text-solar">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
