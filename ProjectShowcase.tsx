import Link from "next/link";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { projects } from "@/lib/site";

export default function ProjectShowcase() {
  const featured = projects.slice(0, 3);
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Proof, not promises"
            title={
              <>
                Installations generating{" "}
                <span className="text-aurora">real savings</span>
              </>
            }
          />
          <Button href="/projects" variant="outline">
            All Projects <FiArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {featured.map((p) => (
            <StaggerItem key={p.title}>
              <Link
                href="/projects"
                data-cursor="hover"
                className="group relative block overflow-hidden rounded-3xl"
              >
                <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                  <div className="absolute inset-0 grid-overlay opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
                  {/* stylized panel motif */}
                  <div className="absolute right-6 top-6 grid grid-cols-3 gap-1.5 opacity-70">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span key={i} className="h-6 w-6 rounded-sm border border-white/20 bg-white/5" />
                    ))}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="inline-flex rounded-full glass px-3 py-1 text-xs font-medium text-solar">
                      {p.category}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-frost">{p.title}</h3>
                    <div className="mt-2 flex items-center gap-3 text-sm text-mist">
                      <span className="flex items-center gap-1">
                        <FiMapPin className="h-3.5 w-3.5" /> {p.location}
                      </span>
                      <span className="text-white/30">•</span>
                      <span>{p.capacity}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-sm text-muted-ink">Annual savings</span>
                      <span className="font-display text-lg font-semibold text-volt">{p.savings}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
