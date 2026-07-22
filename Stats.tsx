import Counter from "@/components/ui/Counter";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { stats } from "@/lib/site";

export default function Stats() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.label}>
                <div className="sheen glass group relative overflow-hidden rounded-3xl p-6 text-center transition-transform duration-500 hover:-translate-y-1.5 md:p-8">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-solar/20 to-transparent text-solar">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="font-display text-4xl font-semibold text-frost md:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-mist">{s.label}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
