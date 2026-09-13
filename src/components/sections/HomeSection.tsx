"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { personal } from "@/lib/data";

const BIO =
  "Engineer and product person by turns. Currently building AI/ML for a telecom copilot at CloudlyAI, working across hybrid RAG pipelines, multi-LLM orchestration, and 3GPP/O-RAN knowledge modeling.\n\nPrior to that, I spent months coordinating cross-functional releases, vendors, and the occasional stakeholder meeting that could've been an email.";

const STATS = [
  { label: "Projects Built", value: "06", desc: "Applied + academic" },
  { label: "Students Tutored", value: "500+", desc: "Algorithms, Discrete Mathematics and Mathematics I" },
  { label: "Certifications", value: "07", desc: "AI, strategy, product" },
];

// ── Tiny acid-yellow dot grid drawn on a canvas ───────────────────────────
function DotGrid({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const spacing = 22;
    const cols = Math.ceil(W / spacing) + 1;
    const rows = Math.ceil(H / spacing) + 1;

    ctx.clearRect(0, 0, W, H);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * spacing + (r % 2) * (spacing / 2);
        const y = r * spacing;
        // randomise opacity per dot (stable — seeded by position)
        const seed = Math.sin(r * 47 + c * 31) * 0.5 + 0.5;
        const alpha = seed * 0.18 + 0.04;
        ctx.beginPath();
        ctx.arc(x, y, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215,239,53,${alpha})`;
        ctx.fill();
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: visible ? 1 : 0,
        transition: "opacity 1.2s ease",
        pointerEvents: "none",
      }}
    />
  );
}

export default function HomeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Phase states
  const [visible, setVisible]   = useState(false); // section in viewport
  const [started, setStarted]   = useState(false); // typewriter started
  const [displayed, setDisplayed] = useState("");
  const [done, setDone]           = useState(false);
  const [statsIn, setStatsIn]     = useState(false);

  // Trigger section entry
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setStarted(true), 300);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Typewriter
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(BIO.slice(0, i));
      if (i >= BIO.length) {
        clearInterval(id);
        setDone(true);
        setTimeout(() => setStatsIn(true), 300);
      }
    }, 22);
    return () => clearInterval(id);
  }, [started]);

  const ctaVisible = done;

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        background: "#080808",
        color: "#F4F1EB",
        minHeight: "100vh",
        padding: "12vh 5vw 12vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot-grid background texture */}
      <DotGrid visible={visible} />

      {/* Main two-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "55fr 45fr",
          gap: "6vw",
          alignItems: "stretch",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── LEFT: bio + CTA + stats ──────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4vh",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Section label */}
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(15px, 1.4vw, 18px)",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#d7ef35",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#d7ef35",
              }}
            />
            <span>00 — Home</span>
          </div>

          {/* Bio typewriter */}
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(15px, 1.5vw, 19px)",
              lineHeight: 1.95,
              color: "rgba(244,241,235,0.88)",
              whiteSpace: "pre-wrap",
              minHeight: "10em",
            }}
          >
            {displayed}
            {!done && (
              <span
                style={{
                  display: "inline-block",
                  width: "0.55em",
                  height: "1.1em",
                  background: "#d7ef35",
                  verticalAlign: "text-bottom",
                  marginLeft: 3,
                  animation: "tw-blink 0.85s step-end infinite",
                }}
              />
            )}
          </div>

          {/* CTA buttons + socials */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2vh",
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            {/* Explore Projects button */}
            <div>
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "clamp(12px, 1.1vw, 14px)",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "#080808",
                  background: "#d7ef35",
                  padding: "14px 30px",
                  borderRadius: 4,
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                }}
              >
                Explore Projects →
              </a>
            </div>

            {/* Social links */}
            <div
              style={{
                display: "flex",
                gap: 24,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(12px, 1.05vw, 15px)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#F4F1EB",
              }}
            >
              {[
                { label: "GitHub",   href: personal.github,           external: true  },
                { label: "LinkedIn", href: personal.linkedin,          external: true  },
                { label: "Gmail",    href: `mailto:${personal.email}`, external: false },
              ].map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  style={{ color: "#F4F1EB", textDecoration: "none" }}
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* ── STATS — below socials ─────────────────────────────────── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              marginTop: "2vh",
              borderTop: "1px solid rgba(244,241,235,0.08)",
              paddingTop: "3vh",
              opacity: statsIn ? 1 : 0,
              transform: statsIn ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.65s ease, transform 0.65s ease",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "0 20px 0 0",
                  borderRight: i < STATS.length - 1
                    ? "1px solid rgba(244,241,235,0.08)"
                    : "none",
                  opacity: statsIn ? 1 : 0,
                  transform: statsIn ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.5s ease ${0.1 + i * 0.1}s, transform 0.5s ease ${0.1 + i * 0.1}s`,
                }}
              >
                {/* Big number */}
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontWeight: 700,
                    fontSize: "clamp(2.4rem, 4.5vw, 5rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "#d7ef35",
                    marginBottom: "0.5rem",
                  }}
                >
                  {s.value}
                </div>
                {/* Label */}
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "clamp(12px, 1vw, 14px)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#F4F1EB",
                    marginBottom: "0.35rem",
                  }}
                >
                  {s.label}
                </div>
                {/* Sub-desc */}
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "clamp(11px, 0.9vw, 13px)",
                    color: "rgba(244,241,235,0.55)",
                    lineHeight: 1.5,
                  }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Divider below stats */}
          <div style={{
            height: 1,
            background: "rgba(244,241,235,0.08)",
            marginTop: "2vh",
            opacity: statsIn ? 1 : 0,
            transition: "opacity 0.6s ease 0.4s",
          }} />
        </div>

        {/* ── RIGHT: photo + current focus ─────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(20px, 3vh, 36px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
            transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
          }}
        >
        <div style={{ position: "relative" }}>
          {/* Outer glow / halo */}
          <div
            style={{
              position: "absolute",
              inset: -1,
              borderRadius: 12,
              boxShadow: "0 0 0 1px rgba(215,239,53,0.35), 0 0 40px rgba(215,239,53,0.06)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Corner accents */}
          {[
            { top: -4, left: -4 },
            { top: -4, right: -4 },
            { bottom: -4, left: -4 },
            { bottom: -4, right: -4 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                ...pos,
                width: 14,
                height: 14,
                borderTop:    pos.bottom === undefined ? "2px solid #d7ef35" : "none",
                borderBottom: pos.top    === undefined ? "2px solid #d7ef35" : "none",
                borderLeft:   pos.right  === undefined ? "2px solid #d7ef35" : "none",
                borderRight:  pos.left   === undefined ? "2px solid #d7ef35" : "none",
                zIndex: 3,
                opacity: visible ? 1 : 0,
                transition: `opacity 0.4s ease ${0.6 + i * 0.08}s`,
              }}
            />
          ))}

          {/* Photo */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3 / 4",
              borderRadius: 10,
              overflow: "hidden",
              background: "#0d0d0d",
              maxHeight: "82vh",
            }}
          >
            <Image
              src="/images/taeeba-home.jpg"
              alt="Taeeba Tasnia"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center bottom" }}
            />
            {/* Subtle top gradient so face area doesn't blow out */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(8,8,8,0.18) 0%, transparent 30%, transparent 70%, rgba(8,8,8,0.45) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

          {/* Current Focus */}
          <div style={{
            border: "1px solid rgba(215,239,53,0.22)",
            padding: "20px 24px",
            background: "rgba(215,239,53,0.03)",
          }}>
            <div style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(10px, 0.85vw, 12px)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#d7ef35",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#d7ef35", animation: "exp-pulse 2s ease-in-out infinite" }} />
              Current Focus
            </div>
            <p style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(13px, 1.05vw, 15px)",
              color: "rgba(244,241,235,0.75)",
              lineHeight: 1.8,
              margin: 0,
            }}>
              Building hybrid RAG systems and multi-LLM architectures. Drawn to the overlap between AI engineering and product strategy, where technical decisions shape what actually ships.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
