"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const GalaxyScene = dynamic(() => import("./GalaxyScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-56 w-56 animate-floaty rounded-full bg-gradient-to-br from-ember/30 via-solar/20 to-transparent blur-3xl" />
    </div>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Suspense fallback={<SceneFallback />}>
        <GalaxyScene />
      </Suspense>
    </div>
  );
}
