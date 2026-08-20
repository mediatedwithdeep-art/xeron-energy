"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiZap, FiTrendingUp, FiClock, FiSun, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { estimateSavings, inr, inrCompact } from "@/lib/solar";

export default function RoiCalculator() {
  const [bill, setBill] = useState(6000);

  // Shared with /solar-calculator via lib/solar.ts so the two can never disagree.
  const result = useMemo(
    () => estimateSavings({ monthlyBill: bill, propertyType: "residential" }),
    [bill]
  );

  return (
    <section id="roi" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Instant savings estimate"
          title={
            <>
              How much can <span className="text-aurora">you save?</span>
            </>
          }
          description="Move the slider to your average monthly electricity bill. Indicative only — the full calculator lets you set your own tariff, check your subsidy and size your roof."
        />

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="glass-strong sheen overflow-hidden rounded-[2rem] p-6 md:p-10">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
                {/* Input */}
                <div className="flex flex-col justify-center">
                  <label htmlFor="bill" className="text-sm text-mist">
                    Your average monthly bill
                  </label>
                  <div className="mt-2 font-display text-5xl font-semibold text-frost">
                    {inr(bill)}
                    <span className="text-lg font-normal text-muted-ink"> / mo</span>
                  </div>
                  <input
                    id="bill"
                    type="range"
                    min={1000}
                    max={200000}
                    step={500}
                    value={bill}
                    onChange={(e) => setBill(Number(e.target.value))}
                    className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-solar"
                    style={{
                      background: `linear-gradient(to right, var(--color-solar), var(--color-ember) ${
                        ((bill - 1000) / 199000) * 100
                      }%, rgba(255,255,255,0.1) ${((bill - 1000) / 199000) * 100}%)`,
                    }}
                    aria-valuetext={`${inr(bill)} per month`}
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted-ink">
                    <span>₹1,000</span>
                    <span>₹2,00,000</span>
                  </div>

                  <div className="mt-8 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-solar/15 to-transparent p-4">
                    <FiSun className="h-6 w-6 shrink-0 text-solar" />
                    <p className="text-sm text-mist">
                      Recommended system:{" "}
                      <span className="font-semibold text-frost">{result.systemKw} kW</span> rooftop
                      solar plant
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button href="/contact">Get My Exact Quote</Button>
                    <Button href="/solar-calculator" variant="ghost">
                      More calculators <FiArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Output */}
                <div className="grid grid-cols-2 gap-4">
                  <ResultCard
                    icon={<FiTrendingUp />}
                    label="Monthly savings"
                    value={inr(result.monthlySaving)}
                    accent="text-volt"
                  />
                  <ResultCard
                    icon={<FiZap />}
                    label="Yearly savings"
                    value={inr(result.yearlySaving)}
                    accent="text-solar"
                  />
                  <ResultCard
                    icon={<FiClock />}
                    label="Payback period"
                    value={`${result.paybackYears.toFixed(1)} yrs`}
                    accent="text-flux"
                  />
                  <ResultCard
                    icon={<FiSun />}
                    label="Govt. subsidy"
                    value={inr(result.subsidy)}
                    accent="text-halo"
                  />
                  <div className="col-span-2 rounded-2xl bg-gradient-to-br from-volt/20 via-transparent to-transparent p-5">
                    <p className="text-sm text-mist">25-year net wealth created</p>
                    <p className="mt-1 font-display text-3xl font-semibold text-volt md:text-4xl">
                      {inrCompact(result.lifetimeNet)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ResultCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0.4, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl p-5"
    >
      <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ${accent}`}>
        {icon}
      </div>
      <p className="text-xs text-muted-ink">{label}</p>
      <p className={`mt-0.5 font-display text-xl font-semibold ${accent}`}>{value}</p>
    </motion.div>
  );
}
