import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import ProcessSection from "@/components/sections/ProcessSection";
import Subsidy from "@/components/sections/Subsidy";
import Cta from "@/components/sections/Cta";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "Xeron Energy's transparent 6-step solar journey: free site audit, custom design, approvals & subsidy, precision install, commissioning, and lifetime monitoring.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumb="Process"
        eyebrow="How it works"
        title={<>A disciplined path from <span className="text-aurora">audit to activation.</span></>}
        description="No surprises, no jargon. You always know exactly what happens next — and what it means for your savings."
      >
        <Button href="/contact">Begin With a Free Audit</Button>
      </PageHero>

      <section className="relative py-10">
        <div className="container-x">
          <div className="relative mx-auto max-w-3xl">
            {processSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.step} delay={i * 0.05}>
                  <div className="relative flex gap-6 pb-10 last:pb-0">
                    {i < processSteps.length - 1 && (
                      <span className="absolute left-[27px] top-14 h-full w-px bg-gradient-to-b from-solar/40 to-transparent" />
                    )}
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-solar/25 to-flux/10 text-solar glass">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="pt-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-solar">
                        Step {s.step}
                      </span>
                      <h3 className="mt-1 text-xl font-semibold text-frost">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-mist">{s.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Subsidy />
      <ProcessSection />
      <Cta />
    </>
  );
}
