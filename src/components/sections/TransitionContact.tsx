"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function StaticHeadline() {
  return (
    <div style={{
      fontFamily: "JetBrains Mono, monospace",
      fontWeight: 700,
      fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
      lineHeight: 1.05,
      letterSpacing: "-0.01em",
      marginBottom: "8vh",
    }}>
      <span style={{ color: "#F4F1EB" }}>I start </span>
      <span style={{ color: "#d7ef35" }}>conversations.</span>
    </div>
  );
}

function TypewriterContact({ visible }: { visible: boolean }) {
  const fullText = "Open to AI/ML, product roles, and conversations that lead somewhere interesting.";
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!visible || started) return;
    const t = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(t);
  }, [visible, started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) { clearInterval(id); setDone(true); }
    }, 28);
    return () => clearInterval(id);
  }, [started]);

  const showCursor = started && !done;

  return (
    <div style={{
      fontFamily: "JetBrains Mono, monospace",
      fontWeight: 700,
      fontSize: "clamp(1.4rem, 2.8vw, 3rem)",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
      color: "#111111",
      marginBottom: "8vh",
      minHeight: "3.6em",
    }}>
      {displayed}
      {showCursor && (
        <span style={{
          display: "inline-block", width: "0.06em", height: "0.85em",
          background: "#111111", marginLeft: "0.04em", verticalAlign: "middle",
          animation: "twBlinkB 0.7s step-end infinite",
        }} />
      )}
    </div>
  );
}

const LINKS = [
  { label: "linkedin", href: "https://www.linkedin.com/in/taeeba-tasnia/" },
  { label: "github",   href: "https://github.com/TaeebaTasnia" },
  { label: "email",    href: "mailto:taeebatasnia2001@gmail.com" },
];

const RESUMES = [
  { label: "AI / ML Resume",       href: "/cv/TaeebaTasnia_Resume_AI_ML.pdf" },
  { label: "Product Owner Resume",  href: "/cv/TaeebaTasnia_Resume_ProductOwner.pdf" },
];


function LinkRow({ items }: { items: { label: string; href: string }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 3vw, 48px)", alignItems: "center" }}>
      {items.map(({ label, href }, i) => (
        <a
          key={i}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(0.85rem, 1.2vw, 1.1rem)",
            fontWeight: 700,
            color: "#111111",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
            opacity: hovered === null || hovered === i ? 1 : 0.4,
            transition: "opacity 180ms ease",
          }}
        >
          <span style={{
            display: "inline-block",
            transform: hovered === i ? "translate(2px, -2px)" : "none",
            transition: "transform 180ms ease",
          }}>↗</span>
          {label}
        </a>
      ))}
    </div>
  );
}

export default function TransitionContact() {
  const wrapRef = useRef<HTMLElement>(null);
  const personalLayerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    setVisible(true);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        scrub: reduced ? 0 : 0.9,
        onUpdate(self) {
          const p = self.progress;

          // Personal fades to dark quickly over first 10%
          if (personalLayerRef.current) {
            personalLayerRef.current.style.opacity = String(Math.max(0, 1 - p / 0.10));
          }

          // Contact panel rises over last 35%
          if (contactRef.current) {
            const cp = Math.max(0, (p - 0.65) / 0.35);
            contactRef.current.style.transform = `translateY(${(1 - cp) * 100}%)`;
          }

          // Trigger contact typewriter once panel is fully risen
          if (p >= 0.98) setContactVisible(true);
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      id="personal"
      style={{ height: "350vh", position: "relative" }}
    >
      <style>{`
        @keyframes twBlink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes twBlinkB { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#080808" }}>

        {/* ── Layer 1: Personal / Shoktikonna — fades out ── */}
        <div
          ref={personalLayerRef}
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "#080808", color: "#F4F1EB",
            padding: "14vh 5vw 16vh", overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: "5vw", right: "5vw", height: 1, background: "rgba(244,241,235,0.08)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#d7ef35", display: "flex", alignItems: "center", gap: 14,
              marginBottom: "5vh",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#d7ef35" }} />
              06 — Beyond the Work
            </div>

            <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease 0.2s" }}>
              <StaticHeadline />
            </div>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1.5fr",
              gap: "clamp(40px, 6vw, 100px)", alignItems: "start",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
            }}>
              <div style={{ position: "relative" }}>
                <img src="/images/portrait.jpg" alt="Taeeba Tasnia" style={{ display: "block", width: "100%", height: "auto" }} />
                {[
                  { top: -12, left: -12, borderTop: "2px solid #d7ef35", borderLeft: "2px solid #d7ef35" },
                  { top: -12, right: -12, borderTop: "2px solid #d7ef35", borderRight: "2px solid #d7ef35" },
                  { bottom: -12, left: -12, borderBottom: "2px solid #d7ef35", borderLeft: "2px solid #d7ef35" },
                  { bottom: -12, right: -12, borderBottom: "2px solid #d7ef35", borderRight: "2px solid #d7ef35" },
                ].map((s, i) => (
                  <div key={i} style={{ position: "absolute", width: 28, height: 28, ...s }} />
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3.5vh, 44px)", paddingTop: "1vh" }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: "clamp(1.4rem, 2.2vw, 2.2rem)", color: "#d7ef35", letterSpacing: "0.04em" }}>
                  Shoktikonna
                </div>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", color: "rgba(244,241,235,0.55)", lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
                  A pioneering leadership programme in Bangladesh designed to empower young women pursuing careers in sustainable and renewable energy.
                </p>
                <div style={{ height: 1, background: "rgba(244,241,235,0.10)" }} />
                {[
                  "Selected for Shoktikonna — chosen from a competitive cohort of young women in tech and energy sectors across Bangladesh.",
                  "Appointed Founding Member of the Alumni Committee, helping build and coordinate network engagement across 300+ graduate members from the ground up.",
                ].map((text, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#d7ef35", marginTop: 8, flexShrink: 0 }} />
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", color: "rgba(244,241,235,0.85)", lineHeight: 1.8, margin: 0 }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Layer 2: Contact — rises from below ── */}
        <div
          ref={contactRef}
          style={{
            position: "absolute", inset: 0, zIndex: 2,
            background: "#d7ef35", color: "#111111",
            padding: "10vh 5vw 5vh", overflow: "hidden",
            transform: "translateY(100%)", willChange: "transform",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}
        >
          {/* Top block */}
          <div>
            {/* Section label */}
            <div style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#111111", marginBottom: "5vh",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#111111" }} />
              07 — Contact
            </div>

            {/* Typewriter subtitle */}
            <TypewriterContact visible={contactVisible} />

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(17,17,17,0.2)", marginBottom: "4vh" }} />

            {/* Social links */}
            <div style={{ marginBottom: "4vh" }}>
              <LinkRow items={LINKS} />
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(17,17,17,0.2)", marginBottom: "3vh" }} />

            {/* Resume links */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(20px, 3vw, 48px)", flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
                color: "#111111", opacity: 0.55,
                letterSpacing: "0.04em",
              }}>
                Prefer a document?
              </span>
              <LinkRow items={RESUMES} />
            </div>

          </div>

          {/* Footer */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontFamily: "JetBrains Mono, monospace", fontSize: 11,
            letterSpacing: "0.08em",
            paddingTop: 20, borderTop: "1px solid rgba(17,17,17,0.2)",
            color: "#111111",
          }}>
            <span>© 2026 Taeeba Tasnia</span>
            <span>hosted on github.io</span>
          </div>
        </div>

      </div>
    </section>
  );
}
