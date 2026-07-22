import { FiArrowUpRight, FiPhone } from "react-icons/fi";
import { Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

export default function Cta() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <div className="glass-strong sheen relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center md:px-16 md:py-24">
          <div className="aurora-bg">
            <div className="aurora-blob animate-drift" style={{ width: 480, height: 480, left: "20%", top: "-40%", background: "var(--color-solar)" }} />
            <div className="aurora-blob animate-drift" style={{ width: 420, height: 420, right: "10%", bottom: "-40%", background: "var(--color-flux)", animationDelay: "-9s" }} />
          </div>
          <div className="relative z-10">
            <Reveal>
              <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
                Ready to own your energy?{" "}
                <span className="text-aurora">Start with a free audit.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mx-auto mt-6 max-w-xl text-lg text-mist">
                No pressure, no obligation. Our engineers assess your site and show you exactly
                what you&apos;ll save — before you spend a rupee.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Button href="/contact">
                  Book Free Audit <FiArrowUpRight className="h-4 w-4" />
                </Button>
                <Button href={site.phoneHref} variant="ghost" magnetic={false}>
                  <FiPhone className="h-4 w-4 text-solar" /> {site.phone}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
