import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms on which Xeron Energy provides this website, savings estimates and solar EPC proposals.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    h: "About this website",
    p: [
      `This website is operated by ${site.legalName}, based in ${site.address.line}, India. By using it you accept the terms set out on this page.`,
    ],
  },
  {
    h: "Savings estimates are estimates",
    p: [
      "The savings calculator and any figures shown on this site are indicative models based on typical Gujarat tariffs and irradiance. They are not a quotation, an offer, or a guarantee of performance.",
      "Your actual generation and savings depend on your roof orientation and shading, your consumption pattern, your DISCOM's tariff and net-metering rules, and the weather. Binding numbers are given only in a written proposal issued after a physical site audit.",
    ],
  },
  {
    h: "Subsidy",
    p: [
      "PM Surya Ghar: Muft Bijli Yojana subsidy amounts, the ₹78,000 ceiling and eligibility rules are set by the Government of India and can change at any time without notice to us. We file your application and pursue it diligently, but the sanction decision and the disbursed amount rest entirely with the government and the DISCOM.",
      "We do not charge for filing your subsidy application and we never ask you to route subsidy money through us.",
    ],
  },
  {
    h: "Warranties",
    p: [
      "Module, inverter and balance-of-system warranties are issued by the respective manufacturers, on their terms, and we pass them through to you in full along with the documentation. Our own workmanship warranty is stated in your signed contract.",
      "Nothing on this website varies the terms of a signed contract between us. Where this page and your contract differ, your contract governs.",
    ],
  },
  {
    h: "Third-party brand names",
    p: [
      "Component brands named on this site are manufacturers whose products we procure and install. Naming them indicates procurement, not sponsorship, dealership or endorsement, unless we state otherwise in writing. All trademarks belong to their respective owners.",
    ],
  },
  {
    h: "Governing law",
    p: [
      "These terms are governed by the laws of India, and the courts at Rajkot, Gujarat have exclusive jurisdiction over any dispute arising from this website.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumb="Terms"
        eyebrow="The fine print"
        title={<>Terms of <span className="text-aurora">service.</span></>}
        description="What our estimates do and do not promise, and what governs the work when you engage us."
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
              <h2 className="text-xl font-semibold text-frost">Questions</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                Call or WhatsApp{" "}
                <a href={site.phoneHref} className="text-solar hover:underline">
                  {site.phone}
                </a>{" "}
                — {site.hours.label}.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}
