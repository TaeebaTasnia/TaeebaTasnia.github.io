"use client";

import { useEffect, useRef, useState } from "react";

const SKILL_GROUPS = [
  {
    category: "Product & Delivery",
    skills: [
      "Requirement Analysis & Elicitation",
      "UAT & Defect Tracking",
      "Functional Specification & Documentation",
      "Process & Systems Analysis",
      "Stakeholder & Vendor Engagement",
      "SDLC",
      "Cross-functional Collaboration",
    ],
  },
  {
    category: "AI & LLM Engineering",
    skills: [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "RAG",
      "MCP",
      "scikit-learn",
      "PyTorch",
      "pandas",
      "NumPy",
    ],
  },
  {
    category: "Backend & Languages",
    skills: [
      "FastAPI",
      "REST API Development",
      "Python",
      "SQL",
      "C",
      "Assembly",
    ],
  },
  {
    category: "Databases & Vector Stores",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "SQLite",
      "ChromaDB",
      "FAISS",
    ],
  },
  {
    category: "DevOps & Dev Tools",
    skills: [
      "Docker",
      "Git",
      "JIRA",
      "GitHub Actions (CI/CD)",
      "Linux",
      "Postman",
    ],
  },
  {
    category: "Digital Tools & Platforms",
    skills: [
      "Power BI",
      "Tableau",
      "Streamlit",
      "Figma",
    ],
  },
];

function SkillCard({
  group, index, visible,
}: {
  group: typeof SKILL_GROUPS[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.15 + index * 0.08;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#161616" : "#0e0e0e",
        border: `1px solid ${hovered ? "rgba(215,239,53,0.80)" : "rgba(215,239,53,0.22)"}`,
        borderRadius: 0,
        padding: "28px 28px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(28px)",
        transition: visible
          ? `border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease, transform 0.22s ease, opacity 0.6s ease ${delay}s`
          : `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        boxShadow: hovered
          ? "0 8px 48px rgba(215,239,53,0.16), inset 0 0 60px rgba(215,239,53,0.04)"
          : "none",
        backgroundImage: "radial-gradient(circle, rgba(215,239,53,0.08) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: hovered
          ? "linear-gradient(to right, transparent, #d7ef35 20%, #d7ef35 80%, transparent)"
          : "linear-gradient(to right, transparent, rgba(215,239,53,0.35) 30%, rgba(215,239,53,0.35) 70%, transparent)",
        boxShadow: hovered ? "0 0 12px rgba(215,239,53,0.5)" : "none",
        transition: "background 0.22s ease, box-shadow 0.22s ease",
      }} />

      {/* Category header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          color: "#d7ef35", fontSize: 11, lineHeight: 1,
          textShadow: hovered ? "0 0 10px rgba(215,239,53,0.8)" : "none",
          transition: "text-shadow 0.22s ease",
        }}>◆</span>
        <span style={{
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700,
          fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
          letterSpacing: "0.05em",
          color: hovered ? "#F4F1EB" : "rgba(244,241,235,0.88)",
          textShadow: hovered ? "0 0 20px rgba(244,241,235,0.25)" : "none",
          transition: "color 0.22s ease, text-shadow 0.22s ease",
        }}>
          {group.category}
        </span>
      </div>

      {/* Skill chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {group.skills.map((skill) => (
          <span
            key={skill}
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(0.78rem, 0.95vw, 0.92rem)",
              letterSpacing: "0.03em",
              color: hovered ? "#F4F1EB" : "rgba(244,241,235,0.80)",
              border: `1px solid ${hovered ? "rgba(244,241,235,0.50)" : "rgba(244,241,235,0.22)"}`,
              borderRadius: 2,
              padding: "6px 13px",
              lineHeight: 1,
              boxShadow: hovered ? "0 0 8px rgba(244,241,235,0.08)" : "none",
              transition: "color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease",
              whiteSpace: "nowrap",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        background: "#080808",
        color: "#F4F1EB",
        padding: "16vh 5vw 18vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top border separator */}
      <div style={{
        position: "absolute", top: 0, left: "5vw", right: "5vw",
        height: 1, background: "rgba(244,241,235,0.08)",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Section label */}
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
          04 — Skills
        </div>

        {/* Heading */}
        <div style={{
          marginBottom: "6vh",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(1.6rem, 3.2vw, 3rem)",
            fontWeight: 700,
            color: "#F4F1EB",
            lineHeight: 1.2,
            marginBottom: "0.6rem",
          }}>
            What I actually work with.
          </div>
          <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
            color: "rgba(244,241,235,0.45)",
            lineHeight: 1.65,
            maxWidth: "58ch",
          }}>
            Across product delivery, AI engineering, and backend systems.
          </div>
        </div>

        {/* 3-column grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}>
          {SKILL_GROUPS.map((g, i) => (
            <SkillCard key={g.category} group={g} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
