"use client";

import { useMemo, forwardRef } from "react";

// Seeded pseudo-random so bars are stable across renders
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const BAR_COUNT = 130;

const DataPlatform = forwardRef<HTMLDivElement>((_, ref) => {
  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, i) => ({
        h: 3 + Math.floor(seededRand(i * 7) * 14),
        op: 0.25 + seededRand(i * 13) * 0.75,
        // slight tint: most acid-yellow, occasional brighter
        bright: seededRand(i * 31) > 0.85,
      })),
    []
  );

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "2px",
        width: "85vw",
        height: 20,
        transform: "scaleX(0)",
        opacity: 0,
        transformOrigin: "center bottom",
        willChange: "transform, opacity",
      }}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className="data-bar"
          style={{
            flex: 1,
            height: `${bar.h}px`,
            background: bar.bright ? "#ffffff" : "#d7ef35",
            opacity: bar.op,
            borderRadius: "1px 1px 0 0",
          }}
        />
      ))}
    </div>
  );
});

DataPlatform.displayName = "DataPlatform";
export default DataPlatform;
