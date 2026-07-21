"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.x - 3.5}px, ${pos.y - 3.5}px)`;
      }
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [data-cursor='hover'], input, textarea");
      if (ring.current) {
        ring.current.style.width = interactive ? "58px" : "38px";
        ring.current.style.height = interactive ? "58px" : "38px";
        ring.current.style.background = interactive
          ? "color-mix(in oklab, var(--color-solar) 18%, transparent)"
          : "transparent";
      }
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (ring.current) {
        const size = parseFloat(ring.current.style.width || "38");
        ring.current.style.transform = `translate(${ringPos.x - size / 2}px, ${ringPos.y - size / 2}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
