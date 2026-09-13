"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleField from "./ParticleField";

const Sculpture = dynamic(() => import("./Sculpture"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

// ─── PLAY button — mischievous, not childish ───────────────────────────────
function PlayButton({ onClick }: { onClick: () => void }) {
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setLit(true);
      const off = setTimeout(() => setLit(false), 560);
      return () => clearTimeout(off);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontWeight: 700,
        // PLAY is visually bigger than the surrounding text
        fontSize: "clamp(18px, 2.6vw, 30px)",
        letterSpacing: "0.12em",
        color: lit ? "#ffffff" : "#d7ef35",
        background: "transparent",
        border: "none",
        padding: "0 6px",
        cursor: "none",
        transform: lit ? "scaleX(1.1)" : "scaleX(1)",
        transition: "color 0.4s ease, transform 0.35s ease",
        willChange: "transform, color",
        outline: "none",
        lineHeight: 1,
        display: "inline",
        verticalAlign: "middle",
      }}
    >
      PLAY
    </button>
  );
}

// ─── Main experience ───────────────────────────────────────────────────────
export default function IntroExperience() {
  const outerRef         = useRef<HTMLElement>(null);
  const sculptureBoxRef  = useRef<HTMLDivElement>(null);
  const playRowRef       = useRef<HTMLDivElement>(null);
  const scrollHintRef    = useRef<HTMLDivElement>(null);
  const taglineInnerRef  = useRef<HTMLDivElement>(null);
  const nameInnerRef     = useRef<HTMLDivElement>(null);
  const descriptorRef    = useRef<HTMLDivElement>(null);
  // Direct DOM ref so GSAP can hide it on scroll without a React re-render
  const backToWorkRef    = useRef<HTMLButtonElement>(null);

  const scrollState = useRef({ progress: 0, playMode: false });
  const [playMode, setPlayMode] = useState<"idle" | "play">("idle");
  const [showBackToWork, setShowBackToWork] = useState(false);

  const handlePlay = useCallback(() => {
    if (playMode !== "idle") return;
    setPlayMode("play");
    scrollState.current.playMode = true;
    const t = setTimeout(() => setShowBackToWork(true), 8000);
    return () => clearTimeout(t);
  }, [playMode]);

  const handleExitPlay = useCallback(() => {
    setPlayMode("idle");
    scrollState.current.playMode = false;
    setShowBackToWork(false);
  }, []);

  // ── Scroll-driven choreography ──────────────────────────────────────────
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.9,
        onUpdate(self) {
          const p = self.progress;
          scrollState.current.progress = p;

          // Hide "back to work" the instant scrolling starts ──────────────
          if (p > 0.02 && backToWorkRef.current) {
            backToWorkRef.current.style.opacity = "0";
            backToWorkRef.current.style.pointerEvents = "none";
          }

          // "tap PLAY" row + scroll hint fade ────────────────────────────
          if (playRowRef.current) {
            playRowRef.current.style.opacity = String(Math.max(0, 1 - p / 0.10));
          }
          if (scrollHintRef.current) {
            scrollHintRef.current.style.opacity = String(Math.max(0, 1 - p / 0.08));
          }

          // Sculpture descends + shrinks (0.18 → 0.60) ──────────────────
          if (sculptureBoxRef.current) {
            const raw = Math.max(0, Math.min(1, (p - 0.18) / 0.42));
            const e = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
            const yVh = e * 14;
            const scale = 1 - e * 0.24;
            sculptureBoxRef.current.style.transform =
              `translateY(${yVh}vh) scale(${scale})`;
          }

          // ── "TEACHING MACHINES TO THINK." rises (0.52 → 0.68) ────────
          if (taglineInnerRef.current) {
            const tp = Math.max(0, Math.min(1, (p - 0.55) / 0.15));
            const te = 1 - Math.pow(1 - tp, 3);
            taglineInnerRef.current.style.transform = `translateY(${(1 - te) * 108}%)`;
          }

          // ── "TAEEBA TASNIA" rises (0.65 → 0.82) ──────────────────────
          if (nameInnerRef.current) {
            const np = Math.max(0, Math.min(1, (p - 0.65) / 0.17));
            const ne = 1 - Math.pow(1 - np, 3);
            nameInnerRef.current.style.transform = `translateY(${(1 - ne) * 108}%)`;
          }

          // Descriptor tags (0.76 → 0.88) ───────────────────────────────
          if (descriptorRef.current) {
            const dp = Math.max(0, Math.min(1, (p - 0.76) / 0.12));
            descriptorRef.current.style.opacity   = String(dp);
            descriptorRef.current.style.transform = `translateY(${(1 - dp) * 14}px)`;
          }

        },
      });
    }, outer);

    return () => ctx.revert();
  }, []);

  // Bigger sculpture — fills more of the viewport for visual impact
  const SIZE = "min(700px, 78vmin)";

  return (
    <section
      ref={outerRef}
      id="intro"
      style={{ height: "490vh", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          overflow: "hidden",
          background: "#070807",
        }}
      >
        {/* ── Particle field ────────────────────────────────────────────── */}
        <ParticleField energized={playMode === "play"} />

        {/* ── Three.js sculpture ─────────────────────────────────────────
            Flex-centered so only Y+scale are animated; X stays locked.    */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          <div
            ref={sculptureBoxRef}
            style={{ width: SIZE, height: SIZE, willChange: "transform", pointerEvents: "auto" }}
          >
            <Sculpture playMode={playMode === "play"} scrollState={scrollState} />
          </div>
        </div>

        {/* ── "tap PLAY for fun · or scroll for work" ─────────────────────
            Placed clearly above sculpture.  PLAY is visually dominant.   */}
        <div
          ref={playRowRef}
          style={{
            position: "absolute",
            top: "calc(50% - min(300px, 37vmin) - 56px)",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          {playMode === "idle" ? (
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                // surrounding words at readable size
                fontSize: "clamp(14px, 1.8vw, 20px)",
                letterSpacing: "0.08em",
                color: "rgba(244,241,235,0.70)",
                display: "flex",
                alignItems: "center",
                gap: "0.4ch",
                lineHeight: 1,
              }}
            >
              <span>tap</span>
              {/* PLAY is bigger and acid-yellow */}
              <PlayButton onClick={handlePlay} />
              <span>for fun &nbsp;·&nbsp; or scroll for work</span>
            </div>
          ) : (
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(13px, 1.6vw, 18px)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#d7ef35",
              }}
            >
              Push the object — move your cursor
            </div>
          )}
        </div>

        {/* BACK TO WORK (play mode exit — hidden instantly on scroll via ref) */}
        {showBackToWork && (
          <button
            ref={backToWorkRef}
            onClick={handleExitPlay}
            style={{
              position: "absolute",
              bottom: "14vh",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(11px, 1.3vw, 14px)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#F4F1EB",
              background: "transparent",
              border: "1px solid rgba(244,241,235,0.25)",
              borderRadius: 100,
              padding: "13px 32px",
              cursor: "none",
              zIndex: 30,
            }}
          >
            Okay, back to work →
          </button>
        )}

        {/* ── "SCROLL ↓" — bottom centre, clearly readable ─────────────── */}
        <div
          ref={scrollHintRef}
          style={{
            position: "absolute",
            bottom: "5vh",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(12px, 1.4vw, 16px)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#F4F1EB",
            opacity: 0.55,
            zIndex: 10,
            whiteSpace: "nowrap",
          }}
        >
          SCROLL ↓
        </div>

        {/* ── Identity block — rises from below during scroll ───────────── */}
        <div
          style={{
            position: "absolute",
            bottom: "8vh",
            left: "5vw",
            zIndex: 12,
          }}
        >
          {/* TEACHING MACHINES TO THINK. */}
          <div style={{ overflow: "hidden" }}>
            <div
              ref={taglineInnerRef}
              style={{
                transform: "translateY(108%)",
                willChange: "transform",
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 900,
                fontSize: "clamp(2rem, 5.5vw, 7rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#d7ef35",
                marginBottom: "1.2vh",
              }}
            >
              Teaching machines to think.
            </div>
          </div>

          {/* TAEEBA TASNIA */}
          <div style={{ overflow: "hidden" }}>
            <div
              ref={nameInnerRef}
              style={{
                transform: "translateY(108%)",
                willChange: "transform",
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 900,
                fontSize: "clamp(3.4rem, 9.5vw, 12rem)",
                lineHeight: 0.84,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                color: "#F4F1EB",
              }}
            >
              TAEEBA TASNIA
            </div>
          </div>

          {/* Descriptor tags */}
          <div
            ref={descriptorRef}
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(10px, 1.1vw, 13px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(244,241,235,0.55)",
              marginTop: "1.5vh",
              opacity: 0,
              transform: "translateY(14px)",
              willChange: "opacity, transform",
            }}
          >
            AI/ML Engineering &nbsp;·&nbsp; LLM Research &nbsp;·&nbsp; RAG Systems &nbsp;·&nbsp; Product Thinking
          </div>
        </div>

      </div>
    </section>
  );
}
