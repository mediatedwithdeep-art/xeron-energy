import { cn } from "@/lib/utils";

export default function AuroraBackground({
  className,
  grid = true,
}: {
  className?: string;
  grid?: boolean;
}) {
  return (
    <div className={cn("aurora-bg", className)} aria-hidden>
      {grid && <div className="absolute inset-0 grid-overlay opacity-30" />}
      <div
        className="aurora-blob animate-drift"
        style={{ width: 460, height: 460, left: "-6%", top: "-12%", background: "var(--color-solar)", opacity: 0.1 }}
      />
      <div
        className="aurora-blob animate-drift"
        style={{ width: 360, height: 360, right: "-4%", bottom: "-16%", background: "var(--color-flux)", opacity: 0.08, animationDelay: "-9s" }}
      />
    </div>
  );
}
