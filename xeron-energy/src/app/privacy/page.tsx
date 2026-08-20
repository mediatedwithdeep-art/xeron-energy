import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Xeron Energy collects, uses and protects the personal information you share when you request a solar site audit.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    h: "What we collect",
    p: [
      "When you submit the enquiry form we collect the details you type into it: your name, phone number, city, property type and, if you choose to share them, your average monthly electricity bill and any notes you add.",
      "We do not ask for and do not want your Aadhaar number, bank details, passwords, or any payment information through this website.",
    ],
  },
  {
    h: "How your enquiry reaches us",
    p: [
      "The enquiry form does not store anything on this website or on a server we control. Pressing 'Send on WhatsApp' opens WhatsApp on your own device with the message pre-written, and nothing is sent until you press send there. Your message is then delivered to us by WhatsApp, and WhatsApp's own privacy terms apply to it in transit.",
      "This means you always hold a copy of exactly what you sent us, in your own chat history.",
    ],
  },
  {
    h: "What we use it for",
    p: [
      "Only to respond to your enquiry: to call or message you back, to arrange a site audit, and to prepare and send you a proposal. We do not sell, rent or share your details with third parties for their own marketing.",
      "If you engage us for an installation, we share the minimum details necessary with your electricity distribution company (DISCOM) and the PM Surya Ghar portal to file your net-metering application and subsidy claim on your behalf. That sharing happens only with your consent and only for your own application.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      "Enquiries that do not proceed are kept for up to 24 months so we can pick up the conversation if you come back to us, then deleted. Records relating to completed installations are kept for as long as statutory, warranty and tax obligations require.",
    ],
  },
  {
    h: "Cookies and analytics",
    p: [
      "This site sets no advertising or tracking cookies of its own. If website analytics are enabled, they are provided by Google Analytics, which sets its own cookies to count visits and see which pages are read. You can block these in your browser settings without losing any functionality on this site.",
      "Fonts are served from Google Fonts, which receives your IP address as part of that request.",
    ],
  },
  {
    h: "Your rights",
    p: [
      "You can ask us at any time what information we hold about you, ask us to correct it, or ask us to delete it. Call or WhatsApp us on the number below and we will action the request. There is no charge.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumb="Privacy"
        eyebrow="Your data"
        title={<>Privacy <span className="text-aurora">policy.</span></>}
        description="Plain language, no legal padding. This is exactly what happens to the details you share with us."
      />

      <section className="relative pb-20 md:pb-28">
        <div className="container-x mx-auto max-w-3xl space-y-5">
          {sections.map((s) => (
            <Reveal key={s.h}>
              <GlassCard sheen={false}>
                <h2 className="text-xl font-semibold text-frost">{s.h}</h2>
                {s.p.map((para) => (
                  <p key={para} className="mt-3 text-sm leading-relaxed text-mist">
                    {para}
                  </p>
                ))}
              </GlassCard>
            </Reveal>
          ))}

          <Reveal>
            <GlassCard sheen={false}>
              <h2 className="text-xl font-semibold text-frost">Contact us about privacy</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                {site.legalName}, {site.address.line} — {site.address.postalCode}, India.
                <br />
                Phone / WhatsApp:{" "}
                <a href={site.phoneHref} className="text-solar hover:underline">
                  {site.phone}
                </a>
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}
