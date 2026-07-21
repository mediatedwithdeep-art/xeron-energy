import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { benefits } from "@/lib/site";

export default function Benefits() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          align="left"
          eyebrow="The Xeron advantage"
          title={
            <>
              Why homeowners &amp; industry{" "}
              <span className="text-aurora">trust Xeron</span>
            </>
          }
          description="Real engineering credentials, bankable components and lifetime accountability — the difference between a vendor and a partner."
        />

        <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <StaggerItem key={b.title}>
                <div className="glass sheen group flex h-full items-start gap-4 rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-solar/25 to-transparent text-solar">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-frost">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist">{b.description}</p>
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
