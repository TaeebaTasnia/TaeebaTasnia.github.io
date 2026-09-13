"use client";

import { useEffect, useRef, useState } from "react";

function TypewriterHeadline({ visible }: { visible: boolean }) {
  const fullText = "I start conversations";
  const splitAt = "I start ".length;
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!visible || started) return;
    const t = setTimeout(() => setStarted(true), 400);
    return () => clearTimeout(t);
  }, [visible, started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) { clearInterval(id); setDone(true); }
    }, 45);
    return () => clearInterval(id);
  }, [started]);

  const showCursor = started && !done;
  const whitePart = displayed.slice(0, splitAt);
  const yellowPart = displayed.length > splitAt ? displayed.slice(splitAt) : "";

  return (
    <div style={{
      fontFamily: "JetBrains Mono, monospace",
      fontWeight: 700,
      fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
      lineHeight: 1.05,
      letterSpacing: "-0.01em",
      marginBottom: "8vh",
    }}>
      <span style={{ color: "#F4F1EB" }}>{whitePart}</span>
      <span style={{ color: "#d7ef35" }}>{yellowPart}</span>
      {showCursor && (
        <span style={{
          display: "inline-block", width: "0.06em", height: "0.82em",
          background: "#d7ef35", marginLeft: "0.04em", verticalAlign: "middle",
          animation: "twBlink 0.7s step-end infinite",
        }} />
      )}
    </div>
  );
}

export default function Personal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="personal"
      style={{
        background: "#080808",
        color: "#F4F1EB",
        padding: "14vh 5vw 16vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`@keyframes twBlink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

      {/* Top separator */}
      <div style={{
        position: "absolute", top: 0, left: "5vw", right: "5vw",
        height: 1, background: "rgba(244,241,235,0.08)",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Section label ── */}
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

        {/* ── Typewriter headline ── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease 0.2s",
        }}>
          <TypewriterHeadline visible={visible} />
        </div>

        {/* ── Two-column: Photo + Shoktikonna ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "clamp(40px, 6vw, 100px)",
          alignItems: "start",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
        }}>

          {/* Photo */}
          <div style={{ position: "relative" }}>
            <img
              src="/images/portrait.jpg"
              alt="Taeeba Tasnia"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
              }}
            />
            {[
              { top: -12, left: -12, borderTop: "2px solid #d7ef35", borderLeft: "2px solid #d7ef35" },
              { top: -12, right: -12, borderTop: "2px solid #d7ef35", borderRight: "2px solid #d7ef35" },
              { bottom: -12, left: -12, borderBottom: "2px solid #d7ef35", borderLeft: "2px solid #d7ef35" },
              { bottom: -12, right: -12, borderBottom: "2px solid #d7ef35", borderRight: "2px solid #d7ef35" },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: 28, height: 28, ...s }} />
            ))}
          </div>

          {/* Shoktikonna text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3.5vh, 44px)", paddingTop: "1vh" }}>

            <div style={{
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 700,
              fontSize: "clamp(1.4rem, 2.2vw, 2.2rem)",
              color: "#d7ef35",
              letterSpacing: "0.04em",
            }}>
              Shoktikonna
            </div>

            <p style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
              color: "rgba(244,241,235,0.55)",
              lineHeight: 1.8,
              margin: 0,
              fontStyle: "italic",
            }}>
              A pioneering leadership programme in Bangladesh designed to empower young women
              pursuing careers in sustainable and renewable energy.
            </p>

            <div style={{ height: 1, background: "rgba(244,241,235,0.10)" }} />

            {[
              "Selected for Shoktikonna — chosen from a competitive cohort of young women in tech and energy sectors across Bangladesh.",
              "Appointed Founding Member of the Alumni Committee, helping build and coordinate network engagement across 300+ graduate members from the ground up.",
            ].map((text, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{
                  display: "inline-block", width: 7, height: 7,
                  borderRadius: "50%", background: "#d7ef35",
                  marginTop: 8, flexShrink: 0,
                }} />
                <p style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
                  color: "rgba(244,241,235,0.85)",
                  lineHeight: 1.8,
                  margin: 0,
                }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
