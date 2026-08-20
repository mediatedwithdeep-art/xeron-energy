import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import GlassCard from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book your free solar site audit with Xeron Energy. Call +91 8320545680 or WhatsApp us — solar EPC for homes, businesses and industry in Rajkot and across Gujarat.",
};

const channels = [
  { icon: FiPhone, label: "Call us", value: site.phone, href: site.phoneHref },
  { icon: FaWhatsapp, label: "WhatsApp", value: "Chat instantly", href: site.whatsappHref },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Let's talk"
        title={<>Book your <span className="text-aurora">free site audit.</span></>}
        description="Tell us a little about your property and a Xeron energy consultant will size the right system and show you exactly what it saves — no cost, no obligation."
      />

      <section className="relative pb-20 md:pb-28">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-4">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="glass sheen group flex items-center gap-4 rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-1"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-solar/25 to-flux/10 text-solar">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-ink">{c.label}</p>
                      <p className="text-base font-medium text-frost">{c.value}</p>
                    </div>
                  </a>
                </Reveal>
              );
            })}

            <Reveal delay={0.1}>
              <GlassCard sheen={false} className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiMapPin className="mt-0.5 h-5 w-5 shrink-0 text-solar" />
                  <div>
                    <p className="text-sm font-medium text-frost">Service area</p>
                    <p className="text-sm text-mist">
                      {site.address.city}, {site.address.state} — {site.address.postalCode}
                      <br />Serving all of Gujarat
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-white/8 pt-4">
                  <FiClock className="mt-0.5 h-5 w-5 shrink-0 text-solar" />
                  <div>
                    <p className="text-sm font-medium text-frost">Working hours</p>
                    <p className="text-sm text-mist">{site.hours.label}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
