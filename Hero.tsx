"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiPlay, FiSun } from "react-icons/fi";
import HeroCanvas from "@/components/three/HeroCanvas";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* legibility overlays — keep the galaxy visible on the right */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-void via-void/55 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,rgba(4,6,12,0.35)_70%)]" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-t from-void to-transparent" />

      <div className="container-x relative z-10 w-full">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-solar"
          >
            <FiSun className="h-3.5 w-3.5" />
            #1 Solar EPC Contractor · Gujarat
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl"
          >
            Cut your power bill by{" "}
            <span className="text-aurora">70%.</span>{" "}
            <span className="block">Permanently.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mist"
          >
            Premium turnkey solar — engineered by government-sector experts with 18 years of
            electrical mastery. Claim up to{" "}
            <span className="font-semibold text-frost">₹78,000</span> PM Surya Ghar subsidy with
            a free site audit.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/contact">
              Get Free Site Audit <FiArrowUpRight className="h-4 w-4" />
            </Button>
            <Button href="/projects" variant="ghost">
              <FiPlay className="h-4 w-4 text-solar" /> View Our Work
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            {["Tier-1 components", "PM Surya Ghar subsidy", "25-year warranty"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-sm text-mist">
                <span className="h-1.5 w-1.5 rounded-full bg-solar shadow-[0_0_10px_var(--color-solar)]" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-ink md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative h-10 w-6 rounded-full border border-white/20">
          <motion.span
            animate={{ y: [4, 16, 4], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-solar"
          />
        </span>
      </motion.div>

      <span className="sr-only">{site.name} — premium solar EPC in Rajkot, Gujarat</span>
    </section>
  );
}
