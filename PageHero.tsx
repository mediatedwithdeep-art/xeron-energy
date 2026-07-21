import type { ReactNode } from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import AuroraBackground from "@/components/ui/AuroraBackground";
import { Reveal } from "@/components/ui/Reveal";

export default function PageHero({
  eyebrow,
  title,
  description,
  crumb,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  crumb: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48">
      <AuroraBackground />
      <div className="container-x relative z-10">
        <Reveal>
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-ink" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-solar">
              Home
            </Link>
            <FiChevronRight className="h-3.5 w-3.5" />
            <span className="text-mist">{crumb}</span>
          </nav>
        </Reveal>
        <Reveal delay={0.05}>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-solar">
            <span className="h-1.5 w-1.5 rounded-full bg-solar shadow-[0_0_10px_var(--color-solar)]" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-mist">
              {description}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.22}>
            <div className="mt-9">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
