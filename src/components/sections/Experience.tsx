"use client";

import { useEffect, useRef, useState } from "react";

const JOBS = [
  {
    date: "Jun 2024 – Jul 2025",
    title: "Undergraduate Teaching Assistant",
    type: "Part-time",
    company: "BRAC University",
    location: "",
    current: false,
    bullets: [
      "Mentored 500+ undergraduate students in Algorithms, Discrete Mathematics, and Mathematics I.",
      "Delivered 15 hours/week of consultations and lab support, resolving conceptual and debugging blockers ahead of assessments.",
    ],
  },
  {
    date: "Nov 2025 – Feb 2026",
    title: "Product Intern",
    type: "Internship",
    company: "AKASH Digital TV",
    location: "",
    current: false,
    bullets: [
      "Participated in vendor and stakeholder meetings on integration scope, blockers, and release requirements; turned business needs into inputs for IT and UX.",
      "Coordinated UAT for the AKASH GO app across product, engineering, and business; validated requirements and logged defects resolved before release.",
      "Analyzed DTH infrastructure, backend systems, and third-party integrations to accelerate issue triage and product decision-making.",
    ],
  },
  {
    date: "Mar 2026 – Present",
    title: "Software Engineering Intern (AI/ML)",
    type: "Internship",
    company: "CloudlyAI",
    location: "",
    current: true,
    bullets: [
      "Engineered components of CloudlyNet — implemented multi-LLM/BYO-LLM architecture, Copilot orchestration, format and label classifier agents, and output-format controls.",
      "Rebuilt the RAG retrieval layer from 0% recall into a hybrid BM25 + semantic search pipeline with Reciprocal Rank Fusion, reaching 41% Recall@5 and 47% MRR on a 20-query benchmark.",
      "Analyzed 3GPP and O-RAN telecom specifications into the knowledge base; strengthened governance via MCP response standardization, guardrails, and data modeling for reusable retrieval.",
    ],
  },
];

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

function JobCard({ job, index, visible }: { job: typeof JOBS[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.5 + index * 0.2;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        border: `2px solid ${hovered ? "rgba(215,239,53,0.85)" : job.current ? "rgba(215,239,53,0.50)" : "rgba(215,239,53,0.22)"}`,
        borderRadius: 0,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateX(6px) scale(1.008)" : "translateX(0) scale(1)"
          : "translateX(-20px) scale(1)",
        transition: visible
          ? "border-color 0.25s ease, transform 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ease"
          : `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        boxShadow: hovered
          ? "0 0 32px rgba(215,239,53,0.18), inset 0 0 60px rgba(215,239,53,0.04)"
          : "none",
        backgroundImage: "radial-gradient(circle, rgba(215,239,53,0.09) 1.2px, transparent 1.2px)",
        backgroundSize: "18px 18px",
        backgroundColor: hovered ? "#0e0e0e" : "#0a0a0a",
      }}
    >
      {/* Left edge accent — grows on hover */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: hovered ? 4 : job.current ? 3 : 2,
        background: hovered
          ? "linear-gradient(to bottom, #d7ef35, rgba(215,239,53,0.5), #d7ef35)"
          : "linear-gradient(to bottom, transparent, rgba(215,239,53,0.45), transparent)",
        transition: "width 0.25s ease, background 0.25s ease",
      }} />

      {/* ── Header bar ── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 32px",
        borderBottom: `1px solid ${hovered ? "rgba(244,241,235,0.55)" : "rgba(244,241,235,0.18)"}`,
        background: hovered ? "rgba(215,239,53,0.07)" : "rgba(215,239,53,0.03)",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 10, height: 10,
            background: job.current ? "#d7ef35" : "transparent",
            border: job.current ? "none" : "2px solid rgba(215,239,53,0.55)",
            animation: job.current ? "exp-pulse 2s ease-in-out infinite" : "none",
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "JetBrains Mono, monospace",
            fontWeight: 700,
            fontSize: "clamp(14px, 1.2vw, 16px)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#d7ef35",
          }}>
            {job.date}
          </span>
        </div>
        <span style={{
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700,
          fontSize: "clamp(13px, 1.1vw, 15px)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#F4F1EB",
          border: "1px solid rgba(215,239,53,0.45)",
          padding: "4px 14px",
        }}>
          {job.type}
        </span>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "28px 32px 34px" }}>
        {/* Title */}
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700,
          fontSize: "clamp(22px, 2.2vw, 30px)",
          color: "#F4F1EB",
          lineHeight: 1.2,
          marginBottom: 14,
          textShadow: hovered ? "0 0 20px rgba(215,239,53,0.25)" : "none",
          transition: "text-shadow 0.3s ease",
        }}>
          {job.title}
        </div>

        {/* Company */}
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700,
          fontSize: "clamp(16px, 1.4vw, 19px)",
          color: "#F4F1EB",
          marginBottom: job.location ? 6 : 26,
        }}>
          {job.company}
          {job.location && (
            <span style={{
              fontWeight: 400,
              color: "rgba(244,241,235,0.50)",
              fontSize: "clamp(13px, 1.1vw, 15px)",
              marginLeft: 12,
            }}>
              · {job.location}
            </span>
          )}
        </div>
        {!job.location && <div style={{ height: 12 }} />}

        {/* Pixel dashed divider */}
        <div style={{
          height: 1, marginBottom: 24,
          background: hovered
            ? "repeating-linear-gradient(to right, rgba(244,241,235,0.90) 0px, rgba(244,241,235,0.90) 6px, transparent 6px, transparent 14px)"
            : "repeating-linear-gradient(to right, rgba(244,241,235,0.55) 0px, rgba(244,241,235,0.55) 6px, transparent 6px, transparent 14px)",
          transition: "background 0.3s ease",
        }} />

        {/* Bullets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {job.bullets.map((b, bi) => (
            <div
              key={bi}
              style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                opacity: hovered ? 1 : 0.88,
                transform: hovered ? "translateX(4px)" : "translateX(0)",
                transition: `opacity 0.2s ease ${bi * 0.05}s, transform 0.25s ease ${bi * 0.05}s`,
              }}
            >
              <span style={{
                fontFamily: "JetBrains Mono, monospace",
                color: "#d7ef35", fontSize: 20, flexShrink: 0, lineHeight: 1, marginTop: 2,
              }}>›</span>
              <span style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "#F4F1EB",
                lineHeight: 1.8,
              }}>
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const timelineItems = [
    ...JOBS.map(j => ({ label: j.company, role: j.title, date: j.date, ghost: false })),
    { label: "", role: "next: AI/ML or product role", date: "", ghost: true },
  ];

  return (
    <section ref={sectionRef} id="experience" style={{
      background: "#080808", color: "#F4F1EB",
      padding: "16vh 5vw 18vh", position: "relative", overflow: "hidden",
    }}>
      <DotGrid visible={visible} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Section label */}
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: "#d7ef35", display: "flex", alignItems: "center", gap: 14,
          marginBottom: "8vh",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#d7ef35" }} />
          01 — Experience
        </div>

        {/* ── Timeline ── */}
        <div style={{ position: "relative", marginBottom: "8vh" }}>
          <div style={{
            position: "absolute", top: 9, left: 0, right: 0,
            height: 1, background: "rgba(215,239,53,0.10)", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, #d7ef35, rgba(215,239,53,0.40) 78%, rgba(215,239,53,0.06))",
              transformOrigin: "left center",
              transform: visible ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 1.1s cubic-bezier(0.22,0.61,0.36,1) 0.25s",
            }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: `repeat(${timelineItems.length}, 1fr)` }}>
            {timelineItems.map((item, i) => {
              const d = 0.4 + i * 0.16;
              return (
                <div key={i} style={{
                  paddingRight: 24,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.55s ease ${d}s, transform 0.55s ease ${d}s`,
                }}>
                  <div style={{ marginBottom: 20, position: "relative", zIndex: 2 }}>
                    <div style={{
                      width: 14, height: 14,
                      background: item.ghost ? "transparent" : "#d7ef35",
                      border: item.ghost ? "2px solid rgba(215,239,53,0.40)" : "none",
                      transform: "rotate(45deg)",
                    }} />
                  </div>

                  {item.ghost ? (
                    <div style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "clamp(15px, 1.3vw, 17px)",
                      color: "rgba(244,241,235,0.50)",
                      lineHeight: 1.7,
                    }}>
                      <span style={{ color: "rgba(215,239,53,0.40)" }}>{">"}</span>{" "}{item.role}
                    </div>
                  ) : (
                    <div style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 7 }}>
                        <span style={{ color: "#d7ef35", fontSize: 16 }}>{">"}</span>
                        <span style={{ fontWeight: 700, fontSize: "clamp(18px, 1.7vw, 22px)", color: "#F4F1EB" }}>
                          {item.label}
                        </span>
                      </div>
                      <div style={{ paddingLeft: 24, fontSize: "clamp(14px, 1.2vw, 16px)", color: "#F4F1EB", marginBottom: 5, lineHeight: 1.5 }}>
                        <span style={{ color: "rgba(215,239,53,0.55)", marginRight: 8 }}>·</span>{item.role}
                      </div>
                      <div style={{ paddingLeft: 24, fontSize: "clamp(13px, 1.05vw, 15px)", color: "rgba(215,239,53,0.80)" }}>
                        <span style={{ color: "rgba(215,239,53,0.55)", marginRight: 8 }}>·</span>{item.date}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Detail boxes ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[...JOBS].reverse().map((job, i) => (
            <JobCard key={i} job={job} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
