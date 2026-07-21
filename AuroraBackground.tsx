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
      {grid && <div className="absolute inset-0 grid-overlay opacity-60" />}
      <div
        className="aurora-blob animate-drift"
        style={{ width: 520, height: 520, left: "-8%", top: "-10%", background: "var(--color-solar)" }}
      />
      <div
        className="aurora-blob animate-drift"
        style={{ width: 460, height: 460, right: "-6%", top: "8%", background: "var(--color-flux)", animationDelay: "-7s" }}
      />
      <div
        className="aurora-blob animate-drift"
        style={{ width: 420, height: 420, left: "42%", bottom: "-14%", background: "var(--color-ember)", animationDelay: "-13s" }}
      />
    </div>
  );
}
