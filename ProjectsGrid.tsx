"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { projects, type Project } from "@/lib/site";

const filters = ["All", "Residential", "Commercial", "Industrial"] as const;
type Filter = (typeof filters)[number];

export default function ProjectsGrid() {
  const [active, setActive] = useState<Filter>("All");
  const list =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            data-cursor="hover"
            className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              active === f ? "text-void" : "text-mist hover:text-frost"
            }`}
          >
            {active === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-solar-bright to-ember"
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl"
    >
      <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${p.gradient}`}>
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
        <div className="absolute right-6 top-6 grid grid-cols-3 gap-1.5 opacity-70 transition-transform duration-500 group-hover:scale-110">
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
    </motion.div>
  );
}
