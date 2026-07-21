// Fixed, full-page dark-black backdrop with slow electric-blue shade motion.
// Sits behind all content (transparent sections let it show through).
export default function SpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden>
      <div
        className="aurora-blob animate-drift"
        style={{
          width: 620,
          height: 620,
          left: "-10%",
          top: "6%",
          background: "var(--color-solar)",
          opacity: 0.16,
        }}
      />
      <div
        className="aurora-blob animate-drift"
        style={{
          width: 560,
          height: 560,
          right: "-8%",
          top: "40%",
          background: "var(--color-flux)",
          opacity: 0.14,
          animationDelay: "-8s",
        }}
      />
      <div
        className="aurora-blob animate-drift"
        style={{
          width: 520,
          height: 520,
          left: "35%",
          bottom: "-6%",
          background: "var(--color-ember)",
          opacity: 0.12,
          animationDelay: "-15s",
        }}
      />
      {/* faint moving grid for depth */}
      <div className="absolute inset-0 grid-overlay opacity-[0.35]" />
    </div>
  );
}
