import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import SolarCalculator from "@/components/sections/SolarCalculator";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Cta from "@/components/sections/Cta";
import Button from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ASSUMPTIONS } from "@/lib/solar";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solar Calculator",
  description:
    "Free solar calculator for Gujarat. Estimate your rooftop savings from your electricity bill, check your PM Surya Ghar subsidy up to ₹78,000, and see what system size your roof can carry.",
  keywords: [
    "solar calculator",
    "solar savings calculator India",
    "PM Surya Ghar subsidy calculator",
    "rooftop solar cost calculator Gujarat",
    "solar panel price per kW",
    "solar payback period calculator",
  ],
  alternates: { canonical: "/solar-calculator" },
};

const assumptions = [
  {
    label: "Generation",
    value: `${ASSUMPTIONS.generationPerKwPerDay} units per kW per day`,
    note: "Year-round average for Gujarat's irradiance. Summer runs higher, monsoon lower.",
  },
  {
    label: "Bill offset",
    value: `${Math.round(ASSUMPTIONS.billOffset * 100)}% of your current bill`,
    note: "What a correctly sized system typically displaces. Fixed charges stay on your bill.",
  },
  {
    label: "Roof area",
    value: `${ASSUMPTIONS.sqftPerKw} sq ft per kW`,
    note: "Shadow-free area for standard modules, including walkway clearance.",
  },
  {
    label: "System cost",
    value: "₹38,000 – ₹58,000 per kW",
    note: "Before subsidy. Larger plants cost less per kW; small rooftops cost more.",
  },
  {
    label: "Panel degradation",
    value: `${(ASSUMPTIONS.degradationPerYear * 100).toFixed(1)}% per year`,
    note: "Applied to the 25-year total. Tier-1 modules are warranted against faster decline.",
  },
  {
    label: "Tariff escalation",
    value: "Not counted",
    note: "Grid tariffs have historically risen 3–5% a year. Ignoring it keeps the estimate conservative.",
  },
];

export default function SolarCalculatorPage() {
  return (
    <>
      <PageHero
        crumb="Calculator"
        eyebrow="Run the numbers yourself"
        title={
          <>
            Solar <span className="text-aurora">calculator.</span>
          </>
        }
        description="Three calculators in one place: what solar saves on your bill, what subsidy you can claim, and what your roof can actually carry. Every assumption behind them is published below."
      >
        <Button href="/contact">Get an Exact Quote</Button>
      </PageHero>

      <section className="relative py-12 md:py-16">
        <div className="container-x">
          <SolarCalculator />
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="No black box"
            title={
              <>
                What these numbers <span className="text-aurora">assume</span>
              </>
            }
            description="Most solar calculators hide their inputs, which is how they produce flattering results. Here are ours — challenge any of them when you speak to us."
          />

          <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assumptions.map((a) => (
              <StaggerItem key={a.label}>
                <GlassCard className="h-full">
                  <p className="text-xs uppercase tracking-wider text-muted-ink">{a.label}</p>
                  <p className="mt-1.5 font-display text-lg font-semibold text-frost">
                    {a.value}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{a.note}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <GlassCard sheen={false} className="mx-auto mt-6 max-w-3xl text-center">
              <p className="text-sm leading-relaxed text-mist">
                These are planning estimates, not a quotation, and nothing here is a
                guarantee of performance. The only number that means anything is the one on a
                written proposal after an engineer has stood on your roof — that audit is
                free, and there is no obligation attached to it.
              </p>
              <p className="mt-4 text-sm text-mist">
                Questions about a figure?{" "}
                <a href={site.phoneHref} className="text-solar hover:underline">
                  {site.phone}
                </a>
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <Cta />
    </>
  );
}
