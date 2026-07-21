import { Reveal } from "@/components/ui/Reveal";
import { partners } from "@/lib/site";

export default function Partners() {
  const row = [...partners, ...partners];
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="container-x">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-muted-ink">
            Powered by Tier-1 global partners
          </p>
        </Reveal>
      </div>

      <div className="relative mt-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-4 pr-4">
          {row.map((p, i) => (
            <div
              key={i}
              className="flex h-16 min-w-[180px] items-center justify-center rounded-2xl glass px-8"
            >
              <span className="font-display text-lg font-semibold tracking-tight text-mist">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
