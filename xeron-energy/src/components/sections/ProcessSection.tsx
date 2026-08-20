import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/site";

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From audit to activation in <span className="text-aurora">6 steps</span>
            </>
          }
          description="A disciplined, transparent process. You always know exactly what happens next."
        />

        <Stagger className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.step}>
                <div className="glass sheen group relative h-full overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5">
                  <span className="pointer-events-none absolute -right-2 -top-4 font-display text-8xl font-bold text-white/5 transition-colors duration-500 group-hover:text-solar/10">
                    {s.step}
                  </span>
                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-solar/25 to-flux/10 text-solar">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-frost">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{s.description}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
