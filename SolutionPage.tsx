import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import PageHero from "@/components/layout/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Counter from "@/components/ui/Counter";
import Button from "@/components/ui/Button";
import CheckList from "@/components/sections/CheckList";
import ProcessSection from "@/components/sections/ProcessSection";
import Cta from "@/components/sections/Cta";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export type SolutionData = {
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  metrics: { value: number; suffix: string; label: string }[];
  overviewTitle: ReactNode;
  overview: string[];
  deliverables: string[];
  features: { icon: IconType; title: string; desc: string }[];
};

export default function SolutionPage({ data }: { data: SolutionData }) {
  return (
    <>
      <PageHero
        crumb={data.crumb}
        eyebrow={data.eyebrow}
        title={data.title}
        description={data.description}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Request a Proposal</Button>
          <Button href="/projects" variant="outline">
            See Live Projects
          </Button>
        </div>
      </PageHero>

      <section className="relative py-14">
        <div className="container-x">
          <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {data.metrics.map((m) => (
              <StaggerItem key={m.label}>
                <GlassCard className="text-center">
                  <div className="font-display text-4xl font-semibold text-frost">
                    <Counter value={m.value} suffix={m.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-mist">{m.label}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Overview" title={data.overviewTitle} />
            <div className="mt-6 space-y-4 text-mist">
              {data.overview.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <h3 className="mb-5 text-lg font-semibold text-frost">What&apos;s included</h3>
            </Reveal>
            <CheckList items={data.deliverables} columns={1} />
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Capabilities"
            title={<>Engineered for <span className="text-aurora">performance</span></>}
          />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {data.features.map((f) => {
              const Icon = f.icon;
              return (
                <StaggerItem key={f.title}>
                  <GlassCard interactive className="h-full">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-solar/25 to-flux/10 text-solar">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-frost">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{f.desc}</p>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <ProcessSection />
      <Cta />
    </>
  );
}
