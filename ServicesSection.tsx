import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import AuroraBackground from "@/components/ui/AuroraBackground";
import { services } from "@/lib/site";

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <AuroraBackground grid={false} />
      <div className="container-x relative z-10">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              End-to-end solar, <span className="text-aurora">engineered to last</span>
            </>
          }
          description="From a single accountable EPC partner: feasibility, design, Tier-1 procurement, installation and lifetime O&M — for homes, businesses and industry."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/${s.slug === "installation-setup" || s.slug === "consultation" ? "services" : s.slug}`}
                  data-cursor="hover"
                  className="sheen glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-solar/25 to-flux/10 text-solar transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-frost">{s.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-mist">{s.short}</p>
                  <ul className="mt-5 space-y-2">
                    {s.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-mist">
                        <span className="h-1.5 w-1.5 rounded-full bg-solar" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-solar">
                    Explore
                    <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
