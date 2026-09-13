"use client";

import { useEffect, useRef, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2600;

    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 2.2);
      const value = Math.floor(eased * 100);
      setCount(value);
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setCount(100);
        finish();
      }
    };

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setLeaving(true);
      setTimeout(() => onComplete(), 900);
    };

    raf = requestAnimationFrame(step);
    const skip = () => finish();
    window.addEventListener("click", skip);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("click", skip);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#0A0A0A",
        color: "#F4F1EB",
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 5vw",
        overflow: "hidden",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            paddingBottom: 14,
            borderBottom: "1px solid rgba(244,241,235,0.18)",
          }}
        >
          <span>TAEEBA TASNIA</span>
          <span>AI / ML ENGINEER</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          fontWeight: 900,
          fontSize: "clamp(3rem, 18vw, 20rem)",
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
        }}
      >
        <span>TAEEBA</span>
        <span>TASNIA</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          LOADING EXPERIENCE
        </span>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
