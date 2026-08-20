import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Benefits from "@/components/sections/Benefits";
import Partners from "@/components/sections/Partners";
import Cta from "@/components/sections/Cta";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { FiX, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "What sets Xeron Energy apart: 18 years of government-sector electrical engineering, in-house certified crews, Tier-1 components, long-term monitoring and radical transparency.",
};

/**
 * What Xeron commits to. The right-hand column is deliberately labelled as the
 * cut-price end of the market rather than "everyone else" — plenty of good
 * installers do this properly, and a comparison you cannot defend costs trust.
 */
const comparison = [
  { point: "Designed by qualified electrical engineers", xeron: true, others: false },
  { point: "In-house crews — never subcontracted", xeron: true, others: false },
  { point: "Only Tier-1, bankable components", xeron: true, others: false },
  { point: "Subsidy & net-metering fully handled", xeron: true, others: false },
  { point: "24×7 remote monitoring after handover", xeron: true, others: false },
  { point: "Written generation estimate before you sign", xeron: true, others: false },
  { point: "Cheapest possible upfront price", xeron: false, others: true },
];

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        crumb="Why Us"
        eyebrow="The Xeron difference"
        title={<>Not a reseller. <span className="text-aurora">An engineering partner.</span></>}
        description="Anyone can bolt panels to a roof. Xeron engineers plants that generate, endure and pay you back — and we put every number in writing before you sign."
      >
        <Button href="/contact">See the Difference</Button>
      </PageHero>

      <Benefits />

      <section className="relative py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Honest comparison"
            title={<>Xeron vs. <span className="text-aurora">a cut-price quote</span></>}
          />
          <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl glass-strong">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-mist">
              <span>Capability</span>
              <span className="w-16 text-center text-solar">Xeron</span>
              <span className="w-16 text-center">Budget</span>
            </div>
            <Stagger>
              {comparison.map((c) => (
                <StaggerItem key={c.point}>
                  <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-white/5 px-6 py-4 text-sm">
                    <span className="text-frost">{c.point}</span>
                    <span className="flex w-16 justify-center">
                      {c.xeron ? (
                        <FiCheck className="h-5 w-5 text-volt" />
                      ) : (
                        <FiX className="h-5 w-5 text-muted-ink" />
                      )}
                    </span>
                    <span className="flex w-16 justify-center">
                      {c.others ? (
                        <FiCheck className="h-5 w-5 text-muted-ink" />
                      ) : (
                        <FiX className="h-5 w-5 text-muted-ink" />
                      )}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <GlassCard className="mx-auto mt-6 max-w-3xl text-center">
            <p className="text-sm text-mist">
              We&apos;re rarely the cheapest quote — and always the best value over 25 years.
              That&apos;s a trade every serious buyer makes.
            </p>
          </GlassCard>
        </div>
      </section>

      <Partners />
      <Cta />
    </>
  );
}
