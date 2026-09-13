"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";

// ── Background dot grid ───────────────────────────────────────────────────
function DotGrid({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    const sp = 22;
    for (let r = 0; r <= Math.ceil(H / sp) + 1; r++)
      for (let c = 0; c <= Math.ceil(W / sp) + 1; c++) {
        const x = c * sp + (r % 2) * (sp / 2), y = r * sp;
        const alpha = (Math.sin(r * 47 + c * 31) * 0.5 + 0.5) * 0.18 + 0.04;
        ctx.beginPath(); ctx.arc(x, y, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215,239,53,${alpha})`; ctx.fill();
      }
  }, []);
  return <canvas ref={ref} style={{
    position: "absolute", inset: 0, width: "100%", height: "100%",
    opacity: visible ? 1 : 0, transition: "opacity 1.2s ease", pointerEvents: "none",
  }} />;
}

// ── Left visual panel — real image if provided, else pixel placeholder ───────
function ProjectVisual({ name, image, index, hovered }: { name: string; image?: string | null; index: number; hovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Draw a denser dot grid for the visual panel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    const sp = 16;
    for (let r = 0; r <= Math.ceil(H / sp) + 1; r++)
      for (let c = 0; c <= Math.ceil(W / sp) + 1; c++) {
        const x = c * sp + (r % 2) * (sp / 2), y = r * sp;
        const seed = Math.sin(r * 53 + c * 29 + index * 7) * 0.5 + 0.5;
        const alpha = seed * 0.22 + 0.05;
        ctx.beginPath(); ctx.arc(x, y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215,239,53,${alpha})`; ctx.fill();
      }
  }, [index]);

  const num = String(index + 1).padStart(2, "0");

  return (
    <div style={{
      position: "relative",
      width: "100%", height: "100%",
      background: "#080808",
      overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: 280,
    }}>
      <canvas ref={canvasRef} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none",
        opacity: hovered ? 0.9 : 0.6, transition: "opacity 0.3s ease",
      }} />

      {/* Real screenshot — shown on top of dot grid when provided */}
      {image && (
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          style={{
            objectFit: "cover",
            objectPosition: "top",
            opacity: hovered ? 0.92 : 0.80,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Ghost project name — only visible when no image */}
      <div style={{ display: image ? "none" : undefined }}></div>
      <div style={{
        position: "absolute",
        fontFamily: "JetBrains Mono, monospace",
        fontWeight: 700,
        fontSize: "clamp(2.5rem, 6vw, 7rem)",
        color: "rgba(215,239,53,0.06)",
        textTransform: "uppercase",
        letterSpacing: "-0.02em",
        textAlign: "center",
        padding: "0 20px",
        pointerEvents: "none",
        userSelect: "none",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.4s ease",
      }}>
        {name}
      </div>

      {/* Project number — top left */}
      <div style={{
        position: "absolute", top: 20, left: 20,
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "clamp(11px, 1vw, 13px)",
        letterSpacing: "0.16em",
        color: "rgba(215,239,53,0.55)",
      }}>
        {num} /
      </div>

      {/* Acid-yellow top glow line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: hovered
          ? "linear-gradient(to right, transparent, #d7ef35 40%, #d7ef35 60%, transparent)"
          : "linear-gradient(to right, transparent, rgba(215,239,53,0.40) 40%, rgba(215,239,53,0.40) 60%, transparent)",
        boxShadow: hovered ? "0 0 12px rgba(215,239,53,0.40)" : "none",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
      }} />

      {/* Corner L-brackets on visual panel */}
      {[
        { top: -1, left: -1, borderTop: "2px solid #d7ef35", borderLeft: "2px solid #d7ef35" },
        { top: -1, right: -1, borderTop: "2px solid #d7ef35", borderRight: "2px solid #d7ef35" },
        { bottom: -1, left: -1, borderBottom: "2px solid #d7ef35", borderLeft: "2px solid #d7ef35" },
        { bottom: -1, right: -1, borderBottom: "2px solid #d7ef35", borderRight: "2px solid #d7ef35" },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute", width: 16, height: 16,
          opacity: hovered ? 1 : 0.45,
          transition: "opacity 0.3s ease",
          ...s,
        }} />
      ))}
    </div>
  );
}

// ── Single project card ───────────────────────────────────────────────────
function ProjectCard({ project, index, visible }: {
  project: typeof projects[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.2 + index * 0.12;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        border: `2px solid ${hovered ? "rgba(215,239,53,0.70)" : "rgba(215,239,53,0.18)"}`,
        borderRadius: 0,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: visible
          ? `border-color 0.25s ease, box-shadow 0.3s ease, opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`
          : `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        boxShadow: hovered ? "0 0 40px rgba(215,239,53,0.10)" : "none",
      }}
    >
      {/* ── Left: visual ── */}
      <ProjectVisual name={project.name} image={project.image} index={index} hovered={hovered} />

      {/* ── Right: details ── */}
      <div style={{
        background: "#0b0b0b",
        backgroundImage: "radial-gradient(circle, rgba(215,239,53,0.05) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
        borderLeft: `1px solid ${hovered ? "rgba(215,239,53,0.30)" : "rgba(215,239,53,0.10)"}`,
        transition: "border-color 0.25s ease",
        padding: "32px 36px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}>
        {/* Project name */}
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700,
          fontSize: "clamp(22px, 2.2vw, 32px)",
          color: "#F4F1EB",
          lineHeight: 1.15,
          marginBottom: 16,
          textShadow: hovered ? "0 0 24px rgba(215,239,53,0.20)" : "none",
          transition: "text-shadow 0.3s ease",
        }}>
          {project.name}
        </div>

        {/* Description */}
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "clamp(13px, 1.1vw, 15px)",
          color: "rgba(244,241,235,0.80)",
          lineHeight: 1.75,
          marginBottom: 28,
        }}>
          {project.description}
        </div>

        {/* GITHUB button */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(11px, 0.9vw, 13px)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#080808",
              background: "#d7ef35",
              padding: "10px 22px",
              borderRadius: 0,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ↗ GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(11px, 0.9vw, 13px)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#F4F1EB",
                border: "1px solid rgba(244,241,235,0.30)",
                padding: "10px 22px",
                borderRadius: 0,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              ↗ Live
            </a>
          )}
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(10px, 0.85vw, 12px)",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "#F4F1EB",
              border: "1px solid rgba(244,241,235,0.28)",
              padding: "5px 12px",
              borderRadius: 0,
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Pixel dashed divider */}
        <div style={{
          height: 1, marginBottom: 20,
          background: "repeating-linear-gradient(to right, rgba(244,241,235,0.35) 0px, rgba(244,241,235,0.35) 6px, transparent 6px, transparent 14px)",
        }} />

        {/* Outcome */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(11px, 0.9vw, 12px)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(215,239,53,0.70)",
            flexShrink: 0,
            marginTop: 2,
          }}>
            Outcome
          </span>
          <span style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(13px, 1.05vw, 15px)",
            color: "rgba(244,241,235,0.80)",
            lineHeight: 1.6,
          }}>
            {project.outcome}
          </span>
        </div>
      </div>
    </article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function Projects() {
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
      id="projects"
      style={{
        background: "#080808",
        color: "#F4F1EB",
        padding: "16vh 5vw 18vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <DotGrid visible={visible} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Section label */}
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: "#d7ef35", display: "flex", alignItems: "center", gap: 14,
          marginBottom: "8vh",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#d7ef35" }} />
          02 — Projects
        </div>

        {/* Section heading */}
        <div style={{
          marginBottom: "6vh",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 700,
            color: "#F4F1EB",
            lineHeight: 1.15,
            marginBottom: "0.75rem",
          }}>
            Built for depth, not demos.
          </div>
          <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
            fontWeight: 400,
            color: "rgba(244,241,235,0.55)",
            lineHeight: 1.65,
            maxWidth: "62ch",
          }}>
            From study systems to encrypted platforms, the common thread is building things that actually hold up.
          </div>
        </div>

        {/* Project cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
