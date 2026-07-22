// Fixed, full-page near-black backdrop with one faint electric-blue glow.
// Deliberately minimal: the theme is mostly black with blue as a rare accent.
export default function SpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden>
      <div
        className="aurora-blob animate-drift"
        style={{
          width: 560,
          height: 560,
          left: "50%",
          top: "-12%",
          transform: "translateX(-50%)",
          background: "var(--color-solar)",
          opacity: 0.08,
        }}
      />
    </div>
  );
}
