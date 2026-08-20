"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

/* Soft round sprite for glow + particles */
function useSoftTexture() {
  return useMemo(() => {
    const size = 128;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.4)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/* Orange sun texture: hot yellow-white core → orange → transparent */
function useSunTexture() {
  return useMemo(() => {
    const size = 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0.0, "rgba(255,244,214,1)");
    g.addColorStop(0.16, "rgba(255,196,92,1)");
    g.addColorStop(0.38, "rgba(255,140,32,0.85)");
    g.addColorStop(0.62, "rgba(240,110,20,0.35)");
    g.addColorStop(1.0, "rgba(220,90,12,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/* ---------------- Orange rotating, pulsing sun ---------------- */
function Sun({ position }: { position: [number, number, number] }) {
  const core = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Sprite>(null);
  const light = useRef<THREE.PointLight>(null);
  const sun = useSunTexture();

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    if (core.current) core.current.rotation.y += delta * 0.35;
    if (halo.current) {
      const h = 5 + Math.sin(t * 1.1) * 0.35;
      halo.current.scale.set(h, h, 1);
    }
    if (light.current) light.current.intensity = 90 + Math.sin(t * 1.4) * 14;
  });

  return (
    <group position={position}>
      <sprite ref={halo} scale={[5, 5, 1]}>
        <spriteMaterial map={sun} blending={THREE.AdditiveBlending} transparent depthWrite={false} />
      </sprite>
      {/* rotating molten core */}
      <mesh ref={core}>
        <sphereGeometry args={[0.8, 48, 48]} />
        <meshStandardMaterial
          color="#ff8a1e"
          emissive="#ff6a08"
          emissiveIntensity={3}
          roughness={0.5}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={light} color="#ffb257" intensity={120} distance={44} decay={1.3} castShadow />
    </group>
  );
}

/* ---------------- Rotating / floating 3D solar panel ---------------- */
function SolarPanel() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const cells = useMemo(() => {
    const arr: [number, number][] = [];
    const cols = 6;
    const rows = 4;
    for (let c = 0; c < cols; c++)
      for (let r = 0; r < rows; r++)
        arr.push([(c - (cols - 1) / 2) * 0.62, (r - (rows - 1) / 2) * 0.62]);
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    // gentle rock around a face-on angle (stays readable, always in motion)
    const targetY = Math.sin(clock.elapsedTime * 0.4) * 0.6 + pointer.x * 0.25;
    const targetX = -0.18 + pointer.y * 0.2;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.8}>
      <group ref={group} rotation={[-0.18, 0.2, 0]} position={[0.3, -0.1, 0.5]}>
        {/* frame */}
        <mesh castShadow receiveShadow position={[0, 0, -0.07]}>
          <boxGeometry args={[4.1, 2.85, 0.14]} />
          <meshStandardMaterial color="#0c1018" metalness={0.85} roughness={0.4} />
        </mesh>
        {/* cells */}
        {cells.map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.02]} castShadow>
            <boxGeometry args={[0.54, 0.54, 0.05]} />
            <meshStandardMaterial
              color="#123a7e"
              emissive="#1e63d8"
              emissiveIntensity={0.9}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        ))}
        {/* support pole */}
        <mesh position={[0, -1.8, -0.5]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 1.6, 12]} />
          <meshStandardMaterial color="#1a1d26" metalness={0.8} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

/* ---------------- Sparse particles for depth ---------------- */
function Particles({ count = 1400 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const sprite = useSoftTexture();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        map={sprite}
        alphaMap={sprite}
        color="#4a7fd0"
        transparent
        opacity={0.6}
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
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0.4, 8], fov: 46 }}
    >
      <AdaptiveDpr pixelated />
      <fog attach="fog" args={["#050506", 12, 26]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 1, 6]} intensity={0.8} color="#6f9fe0" />
      <Sun position={[3.6, 2.4, -1.5]} />
      <SolarPanel />
      <Particles />
    </Canvas>
  );
}
