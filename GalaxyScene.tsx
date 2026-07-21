"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

/* Soft circular sprite so particles read as glowing dust, not squares */
function useSoftTexture() {
  return useMemo(() => {
    const size = 64;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/* A sun-like glow: hot white core → electric blue → transparent falloff */
function useSunTexture() {
  return useMemo(() => {
    const size = 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0.0, "rgba(240,250,255,1)");
    g.addColorStop(0.14, "rgba(190,228,255,1)");
    g.addColorStop(0.3, "rgba(110,196,255,0.85)");
    g.addColorStop(0.52, "rgba(40,160,255,0.42)");
    g.addColorStop(0.78, "rgba(18,112,224,0.13)");
    g.addColorStop(1.0, "rgba(10,90,200,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/* ---------------- Spiral galaxy ---------------- */
function Galaxy() {
  const points = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const sprite = useSoftTexture();

  const params = {
    count: 11000,
    radius: 9,
    branches: 5,
    spin: 1.05,
    randomness: 0.42,
    randomnessPower: 2.6,
    insideColor: "#bfe6ff", // bright blue-white core
    outsideColor: "#0a7ce8", // deep electric blue arms
  };

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(params.count * 3);
    const colors = new Float32Array(params.count * 3);
    const inside = new THREE.Color(params.insideColor);
    const outside = new THREE.Color(params.outsideColor);

    for (let i = 0; i < params.count; i++) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 1.4) * params.radius;
      const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2;
      const spinAngle = radius * params.spin;

      const rand = () =>
        Math.pow(Math.random(), params.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        params.randomness *
        radius;

      const rx = rand();
      const ry = rand() * 0.42;
      const rz = rand();

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + rx;
      positions[i3 + 1] = ry;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rz;

      const mixed = inside.clone().lerp(outside, radius / params.radius);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }
    return { positions, colors };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.06;
    // gentle mouse parallax tilt
    const targetX = pointer.y * 0.25 - 0.35;
    const targetZ = pointer.x * 0.15;
    points.current.rotation.x += (targetX - points.current.rotation.x) * 0.04;
    points.current.rotation.z += (targetZ - points.current.rotation.z) * 0.04;
  });

  return (
    <points ref={points} rotation={[-0.35, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.11}
        map={sprite}
        alphaMap={sprite}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        transparent
        opacity={0.95}
      />
    </points>
  );
}

/* ---------------- Glowing central sun ---------------- */
function Sun() {
  const halo = useRef<THREE.Sprite>(null);
  const core = useRef<THREE.Sprite>(null);
  const sun = useSunTexture();
  const soft = useSoftTexture();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (halo.current) {
      const h = 7.6 + Math.sin(t * 0.85) * 0.5;
      halo.current.scale.set(h, h, 1);
    }
    if (core.current) {
      const s = 2.3 + Math.sin(t * 1.7) * 0.16;
      core.current.scale.set(s, s, 1);
    }
  });

  return (
    <group>
      {/* single soft sun glow — billboarded, additive so it radiates cleanly */}
      <sprite ref={halo} scale={[8, 8, 1]}>
        <spriteMaterial map={sun} blending={THREE.AdditiveBlending} transparent opacity={1} depthWrite={false} />
      </sprite>
      {/* hot white core — soft sprite (no geometry edge → clean, ring-free) */}
      <sprite ref={core} scale={[1.6, 1.6, 1]}>
        <spriteMaterial map={soft} color="#f2fbff" blending={THREE.AdditiveBlending} transparent opacity={1} depthWrite={false} />
      </sprite>

      <pointLight color="#cfe8ff" intensity={30} distance={28} />
    </group>
  );
}

/* ---------------- Deep starfield ---------------- */
function Stars({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const sprite = useSoftTexture();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 16 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        map={sprite}
        alphaMap={sprite}
        color="#dbeaff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GalaxyScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 2.2, 8.5], fov: 50 }}
    >
      <AdaptiveDpr pixelated />
      <color attach="background" args={["#04060c"]} />
      <fog attach="fog" args={["#04060c", 11, 24]} />
      <ambientLight intensity={0.4} />
      <Sun />
      <Galaxy />
      <Stars />
    </Canvas>
  );
}
