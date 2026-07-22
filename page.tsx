import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Button from "@/components/ui/Button";
import Cta from "@/components/sections/Cta";
import { stats, site } from "@/lib/site";
import { FiTarget, FiEye, FiHeart } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Xeron Energy is Gujarat's premium Solar EPC contractor, founded by government-sector electrical engineers with 18 years of expertise. Discover our mission, values and track record.",
};

const values = [
  { icon: FiTarget, title: "Engineering First", desc: "Every plant is designed by qualified electrical engineers — never templated, never guessed." },
  { icon: FiEye, title: "Radical Transparency", desc: "Honest ROI, clear timelines and no hidden costs. You see exactly what you pay for." },
  { icon: FiHeart, title: "Lifetime Ownership", desc: "We don't disappear after handover. We monitor and maintain your plant for decades." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="Our story"
        title={
          <>
            18 years of electrical mastery,{" "}
            <span className="text-aurora">now powering solar.</span>
          </>
        }
        description="Xeron Energy was founded by engineers who spent nearly two decades in India's government power sector. We bring that rare rigour to rooftop and industrial solar."
      >
        <Button href="/contact">Work With Us</Button>
      </PageHero>

      <section className="relative py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5 text-mist">
              <p className="text-lg leading-relaxed">
                For 18 years, our founders engineered and maintained electrical infrastructure for
                the government sector — substations, distribution networks and high-stakes power
                systems where failure was never an option.
              </p>
              <p className="leading-relaxed">
                Xeron Energy was born to bring that same discipline to India&apos;s solar
                revolution. While many installers are resellers chasing volume, we are engineers
                obsessed with generation, safety and longevity. Every Xeron plant is designed,
                built and maintained to utility-grade standards.
              </p>
              <p className="leading-relaxed">
                Headquartered in {site.address.city}, {site.address.state}, we serve homeowners,
                businesses and industry across Gujarat — and we treat every rooftop like our own.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <GlassCard key={s.label} className="text-center">
                  <div className="font-display text-4xl font-semibold text-frost">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-mist">{s.label}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we stand for"
            title={<>Values that <span className="text-aurora">generate trust</span></>}
          />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.title}>
                  <GlassCard interactive className="h-full">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-solar/25 to-flux/10 text-solar">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-frost">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{v.desc}</p>
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
