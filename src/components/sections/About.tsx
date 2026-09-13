"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ABOUT_TEXT =
  "I build AI/ML systems — RAG pipelines, LLM orchestration, and data infrastructure that performs in production. Computer science graduate from BRAC University with a focus on intelligent systems that reason, retrieve, and adapt.";

export default function About() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = wrapperRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { color: "rgba(244,241,235,0.18)" },
        {
          color: "#F4F1EB",
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const words = ABOUT_TEXT.split(/\s+/);

  return (
    <section
      id="about"
      style={{
        background: "#080808",
        color: "#F4F1EB",
        padding: "18vh 5vw 22vh",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          marginBottom: "10vh",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        <span>01</span>
        <span style={{ flex: 1, height: 1, background: "rgba(244,241,235,0.12)" }} />
        <span>ABOUT</span>
      </div>

      <div ref={wrapperRef} style={{ position: "relative" }}>
        <p
          style={{
            fontWeight: 800,
            fontSize: "clamp(2rem, 6.5vw, 8rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
            maxWidth: "90%",
          }}
        >
          {words.map((w, i) => (
            <span key={i} data-word style={{ color: "rgba(244,241,235,0.18)", display: "inline-block", marginRight: "0.22em" }}>
              {w}
            </span>
          ))}
        </p>

        <div
          data-cursor
          style={{
            position: "absolute",
            right: 0,
            bottom: "-4vh",
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
          }}
        >
          ↓
        </div>
      </div>
    </section>
  );
}
