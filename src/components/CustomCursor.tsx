"use client";

import { useEffect, useRef, useState } from "react";

function lerpAngle(a: number, b: number, t: number) {
  let diff = b - a;
  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;
  return a + diff * t;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // Only show on pointer-capable devices
  useEffect(() => {
    setActive(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!active) return;

    // mouse = true target position
    const mouse = { x: -100, y: -100 };
    // pos = interpolated cursor position
    const pos = { x: -100, y: -100 };
    // angle state
    let prevX = -100;
    let prevY = -100;
    let targetAngle = 0;
    let currentAngle = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // Smooth position — fast enough to feel responsive
      pos.x = lerp(pos.x, mouse.x, 0.25);
      pos.y = lerp(pos.y, mouse.y, 0.25);

      // Velocity from mouse directly (not pos) for snappy rotation
      const dx = mouse.x - prevX;
      const dy = mouse.y - prevY;
      if (Math.hypot(dx, dy) > 1.5) {
        targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
      }
      prevX = lerp(prevX, mouse.x, 0.35);
      prevY = lerp(prevY, mouse.y, 0.35);

      // Smooth rotation with wraparound
      currentAngle = lerpAngle(currentAngle, targetAngle, 0.12);

      const c = cursorRef.current;
      if (c) {
        c.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) rotate(${currentAngle}deg)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 26,
        height: 26,
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: "difference",
        willChange: "transform",
      }}
    >
      {/* Sharp triangular arrowhead — white so difference blend inverts on dark/text */}
      <svg
        viewBox="0 0 26 26"
        style={{ width: "100%", height: "100%", display: "block", fill: "white" }}
      >
        <polygon points="2,2 24,13 2,24 7,13" />
      </svg>
    </div>
  );
}
