"use client";

import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOp: number;
  flicker: number;
  flickerOff: number;
  r: number;
  g: number;
  b: number;
};

export default function ParticleField({ energized }: { energized: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const energizedRef = useRef(energized);

  useEffect(() => {
    energizedRef.current = energized;
  }, [energized]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Build a deterministic-ish set of particles
    const count = Math.max(180, Math.min(320, Math.floor(window.innerWidth * window.innerHeight / 5800)));

    // colour palette: white / grey / dim acid yellow
    const palette: [number, number, number][] = [
      [255, 255, 255],
      [200, 200, 200],
      [155, 155, 155],
      [215, 239, 53],  // acid yellow
      [170, 170, 170],
    ];

    let particles: P[] = [];
    const init = () => {
      particles = Array.from({ length: count }, (_, i) => {
        const [r, g, b] = palette[i % palette.length];
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.11,
          size: Math.random() < 0.75 ? 1 : 1.5,
          baseOp: 0.08 + Math.random() * 0.5,
          flicker: 0.4 + Math.random() * 1.4,
          flickerOff: Math.random() * Math.PI * 2,
          r, g, b,
        };
      });
    };
    init();
    window.addEventListener("resize", init);

    const draw = () => {
      t += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const boost = energizedRef.current ? 2.2 : 1;

      for (const p of particles) {
        p.x += p.vx * boost;
        p.y += p.vy * boost;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const flicker = 0.55 + 0.45 * Math.sin(t * p.flicker + p.flickerOff);
        const op = Math.min(0.9, p.baseOp * (energizedRef.current ? 1.5 : 1) * flicker);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${op})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
