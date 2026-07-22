"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import HeroCanvas from "@/components/three/HeroCanvas";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* legibility overlays — keep the scene visible on the right */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-void via-void/60 to-void/10" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-t from-void to-transparent" />

      <div className="container-x relative z-10 w-full">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-solar"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-solar shadow-[0_0_10px_var(--color-solar)]" />
            Solar EPC · Rajkot, Gujarat
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl"
          >
            Own your power.{" "}
            <span className="block text-aurora">Cut your bills for good.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mist"
          >
            Premium turnkey solar — engineered by government-sector experts with nearly two decades
            of electrical mastery. We handle the full PM Surya Ghar subsidy and every approval, so
            you simply enjoy the savings.
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
            {["Premium components", "Full government subsidy", "Long-term warranty"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-sm text-mist">
                <span className="h-1.5 w-1.5 rounded-full bg-solar" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <span className="sr-only">{site.name} — premium solar EPC in Rajkot, Gujarat</span>
    </section>
  );
}
