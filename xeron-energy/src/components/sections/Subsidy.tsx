import { FiCheckCircle, FiFileText, FiAward } from "react-icons/fi";
import { Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

const points = [
  "Up to ₹78,000 direct subsidy under PM Surya Ghar: Muft Bijli Yojana",
  "We prepare and file your entire application end-to-end",
  "DISCOM net-metering & sanction handled for you",
  "Subsidy credited directly to your bank account",
];

export default function Subsidy() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <div className="glass-strong sheen relative overflow-hidden rounded-[2.5rem] p-8 md:p-14">
          <div className="aurora-bg opacity-70">
            <div className="aurora-blob animate-drift" style={{ width: 420, height: 420, right: "-6%", top: "-20%", background: "var(--color-solar)" }} />
            <div className="aurora-blob animate-drift" style={{ width: 360, height: 360, left: "-4%", bottom: "-30%", background: "var(--color-halo)", animationDelay: "-8s" }} />
          </div>

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-solar">
                  <FiAward className="h-3.5 w-3.5" /> Government of India
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                  Claim your <span className="text-aurora">₹78,000</span> solar subsidy —
                  paperwork on us.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-xl text-mist">
                  The PM Surya Ghar scheme makes premium rooftop solar more affordable than ever.
                  Xeron handles every form, approval and inspection so you simply enjoy the savings.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact">Check My Eligibility</Button>
                  <Button href="/faq" variant="outline">
                    <FiFileText className="h-4 w-4" /> Subsidy FAQ
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="space-y-3">
              {points.map((p, i) => (
                <Reveal key={p} delay={0.1 + i * 0.08}>
                  <div className="flex items-start gap-3 rounded-2xl glass p-4">
                    <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-volt" />
                    <p className="text-sm text-frost">{p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
