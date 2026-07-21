import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import MagneticButton from "./MagneticButton";

type Variant = "primary" | "ghost" | "outline";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "text-void bg-gradient-to-r from-solar-bright via-solar to-ember shadow-[0_10px_40px_-10px_rgba(0,144,240,0.65)] hover:shadow-[0_16px_50px_-8px_rgba(0,194,255,0.8)] hover:brightness-110",
  ghost:
    "text-frost glass hover:bg-white/10",
  outline:
    "text-frost border border-white/15 hover:border-solar/60 hover:text-solar",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  magnetic = true,
  ...props
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
} & React.ComponentProps<typeof Link>) {
  const inner = (
    <Link
      href={href}
      data-cursor="hover"
      className={cn(base, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full bg-white/25 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </Link>
  );

  return magnetic ? <MagneticButton strength={0.35}>{inner}</MagneticButton> : inner;
}
