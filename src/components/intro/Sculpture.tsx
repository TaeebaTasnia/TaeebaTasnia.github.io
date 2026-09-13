"use client";

import { useRef, useMemo, useEffect, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACID      = new THREE.Color("#d7ef35");
const ACID_PLAY = new THREE.Color("#eeff55");  // slightly more neon in play mode

// Torus knot point cloud that reacts to mouse and scroll
function KnotCloud({
  playMode,
  scrollState,
}: {
  playMode: boolean;
  scrollState: MutableRefObject<{ progress: number; playMode: boolean }>;
}) {
  const meshRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const prevMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const tiltX = useRef(0);
  const baseRotY = useRef(0);

  // Build geometry once
  const geometry = useMemo(() => {
    const src = new THREE.TorusKnotGeometry(1, 0.33, 320, 22, 2, 3);
    const pos = src.attributes.position;
    const count = pos.count;
    const arr = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Small random scatter per point for a cloud-like softness
      arr[i * 3]     = pos.getX(i) + (Math.random() - 0.5) * 0.045;
      arr[i * 3 + 1] = pos.getY(i) + (Math.random() - 0.5) * 0.045;
      arr[i * 3 + 2] = pos.getZ(i) + (Math.random() - 0.5) * 0.045;
      sizes[i] = 0.4 + Math.random() * 0.9;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    src.dispose();
    return geo;
  }, []);

  // Mouse tracking (raw, for velocity-based physics in play mode)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = clock.getElapsedTime();
    const isPlay = scrollState.current.playMode;

    // ── Velocity-based physics in PLAY mode ──
    if (isPlay) {
      const dx = mouse.current.x - prevMouse.current.x;
      const dy = mouse.current.y - prevMouse.current.y;
      velocity.current.x += dx * 6;
      velocity.current.y += dy * 6;
    }
    prevMouse.current.x = prevMouse.current.x + (mouse.current.x - prevMouse.current.x) * 0.3;
    prevMouse.current.y = prevMouse.current.y + (mouse.current.y - prevMouse.current.y) * 0.3;

    // Decay velocity
    velocity.current.x *= 0.90;
    velocity.current.y *= 0.90;

    // ── Rotation ──
    const baseSpeed = isPlay ? 0.009 : 0.0035;
    baseRotY.current += baseSpeed + (isPlay ? velocity.current.x * 0.04 : 0);

    // Gentle mouse-influenced tilt (non-play)
    const targetTilt = isPlay ? 0 : mouse.current.y * 0.22;
    tiltX.current += (targetTilt - tiltX.current) * 0.04;

    mesh.rotation.y = baseRotY.current + (isPlay ? velocity.current.x * 0.08 : mouse.current.x * 0.12);
    mesh.rotation.x = tiltX.current + Math.sin(t * 0.19) * 0.3 + (isPlay ? velocity.current.y * 0.08 : 0);
    mesh.rotation.z = Math.sin(t * 0.13) * 0.12;

    // ── Colour + opacity shift in play mode ──
    const mat = mesh.material as THREE.PointsMaterial;
    if (isPlay) {
      mat.color.copy(ACID_PLAY);
      mat.size    = 0.022;
      mat.opacity = 0.82 + Math.sin(t * 3) * 0.10;
    } else {
      mat.color.copy(ACID);
      mat.size    = 0.016;
      mat.opacity = 0.82;
    }
    mat.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color={ACID}
        size={0.016}
        sizeAttenuation
        transparent
        opacity={0.82}
        depthWrite={false}
      />
    </points>
  );
}

export default function Sculpture({
  playMode,
  scrollState,
}: {
  playMode: boolean;
  scrollState: MutableRefObject<{ progress: number; playMode: boolean }>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 46 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.8) : 1}
    >
      <KnotCloud playMode={playMode} scrollState={scrollState} />
    </Canvas>
  );
}
