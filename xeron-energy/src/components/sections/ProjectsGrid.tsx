"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMapPin, FiClipboard, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { projects, site, type Project } from "@/lib/site";

const filters = ["All", "Residential", "Commercial", "Industrial"] as const;
type Filter = (typeof filters)[number];

export default function ProjectsGrid() {
  const [active, setActive] = useState<Filter>("All");
  const list =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  if (projects.length === 0) return <EmptyPortfolio />;

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

/**
 * Shown while `projects` in src/lib/site.ts is empty. Saying "we are new and
 * here is how to check us out" converts better than an invented portfolio and
 * it survives a customer actually verifying the claim.
 */
function EmptyPortfolio() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="glass-strong sheen rounded-3xl p-8 text-center md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-solar/25 to-flux/10 text-solar">
          <FiClipboard className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-frost md:text-3xl">
          Our project portfolio is being published
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-mist">
          Xeron Energy is a young company, and we would rather show you nothing than
          show you work we have not done. Commissioned installations are added here
          with their real capacity and the savings the client&apos;s own bills show —
          only once the client has agreed to be named.
        </p>
        <p className="mt-4 text-pretty leading-relaxed text-mist">
          In the meantime, judge us on the engineering. Call us and ask for our
          credentials, the datasheets of the modules and inverters we would install
          on your roof, and the warranty terms in writing. We will send all three.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={site.phoneHref}
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-solar-bright to-ember px-6 py-3 text-sm font-medium text-void transition-transform hover:-translate-y-0.5"
          >
            <FiPhone className="h-4 w-4" /> {site.phone}
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-frost transition-colors hover:text-solar"
          >
            <FaWhatsapp className="h-4 w-4" /> WhatsApp us
          </a>
        </div>
      </div>
    </div>
  );
}
