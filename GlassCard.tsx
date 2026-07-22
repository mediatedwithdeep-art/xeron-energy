import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function GlassCard({
  children,
  className,
  sheen = true,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  sheen?: boolean;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-3xl p-6 md:p-8",
        sheen && "sheen",
        interactive &&
          "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5",
        className
      )}
    >
      {children}
    </div>
  );
}
