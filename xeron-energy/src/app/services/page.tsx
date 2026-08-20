import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Cta from "@/components/sections/Cta";
import { services, serviceRoute } from "@/lib/site";
import { FiArrowUpRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Xeron Energy's full-spectrum solar services: EPC, commercial and industrial solar, installation & setup, maintenance & support, and bankable consultation & advisory.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="Full-spectrum solar"
        title={<>Everything you need, <span className="text-aurora">under one roof.</span></>}
        description="From the first feasibility study to lifetime operations, Xeron delivers every discipline of a solar project in-house — with a single point of accountability."
      >
        <Button href="/contact">Talk to an Engineer</Button>
      </PageHero>

      <section className="relative py-16 md:py-24">
        <div className="container-x">
          <Stagger className="grid gap-5 md:grid-cols-2">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.slug}>
                  <GlassCard interactive className="h-full">
                    <div className="flex items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-solar/25 to-flux/10 text-solar">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-frost">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-mist">{s.description}</p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {s.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-mist">
                              <span className="h-1.5 w-1.5 rounded-full bg-solar" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={serviceRoute(s.slug)}
                          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-solar"
                        >
                          Learn more
                          <FiArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <Cta />
    </>
  );
}
