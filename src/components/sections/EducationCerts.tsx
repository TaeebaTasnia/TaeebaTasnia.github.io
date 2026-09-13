"use client";

import { useEffect, useRef, useState } from "react";

const CERTS = [
  { issuer: "IBM",      name: "Introduction to Agentic AI" },
  { issuer: "IBM",      name: "Docker Essentials: A Developer Introduction" },
  { issuer: "Stanford", name: "Supervised Machine Learning: Regression & Classification" },
  { issuer: "Anthropic",name: "Claude Code 101" },
  { issuer: "Anthropic",name: "Claude Code in Action" },
  { issuer: "Coursera", name: "Introduction to Business Analytics", href: "/cv/Introduction_to_Business_Analytics.pdf" },
  { issuer: "Coursera", name: "Leading Teams: Developing as a Leader", href: "/cv/Leading_Teams_Developing_as_a_Leader.pdf" },
];

function EduCard({ visible }: { visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        border: `2px solid ${hovered ? "rgba(215,239,53,0.85)" : "rgba(215,239,53,0.22)"}`,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateX(6px)" : "translateX(0)"
          : "translateX(-20px)",
        transition: visible
          ? "border-color 0.25s ease, transform 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ease 0.3s"
          : "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
        boxShadow: hovered
          ? "0 0 40px rgba(215,239,53,0.16), inset 0 0 60px rgba(215,239,53,0.04)"
          : "none",
        backgroundImage: "radial-gradient(circle, rgba(215,239,53,0.09) 1.2px, transparent 1.2px)",
        backgroundSize: "18px 18px",
        backgroundColor: hovered ? "#0e0e0e" : "#0a0a0a",
      }}
    >
      {/* Left accent strip */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: hovered ? 4 : 3,
        background: hovered
          ? "linear-gradient(to bottom, #d7ef35, rgba(215,239,53,0.5), #d7ef35)"
          : "linear-gradient(to bottom, transparent, rgba(215,239,53,0.45), transparent)",
        boxShadow: hovered ? "0 0 10px rgba(215,239,53,0.5)" : "none",
        transition: "width 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
      }} />

      {/* Header bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 28px",
        borderBottom: `1px solid ${hovered ? "rgba(244,241,235,0.50)" : "rgba(244,241,235,0.12)"}`,
        background: hovered ? "rgba(215,239,53,0.07)" : "rgba(215,239,53,0.03)",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}>
        <span style={{
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700,
          fontSize: "clamp(13px, 1.1vw, 15px)",
          letterSpacing: "0.08em",
          color: "#d7ef35",
          textShadow: hovered ? "0 0 12px rgba(215,239,53,0.5)" : "none",
          transition: "text-shadow 0.25s ease",
        }}>
          2022 – 2026
        </span>
        <span style={{
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700,
          fontSize: "clamp(11px, 0.9vw, 13px)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#F4F1EB",
          border: "1px solid rgba(215,239,53,0.45)",
          padding: "4px 12px",
        }}>
          Undergraduate
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 28px 28px" }}>
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700,
          fontSize: "clamp(18px, 2vw, 26px)",
          color: "#F4F1EB",
          lineHeight: 1.25,
          marginBottom: 12,
          textShadow: hovered ? "0 0 24px rgba(244,241,235,0.18)" : "none",
          transition: "text-shadow 0.25s ease",
        }}>
          B.Sc. in Computer Science and Engineering
        </div>
        <div style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "clamp(13px, 1.1vw, 15px)",
          color: hovered ? "rgba(244,241,235,0.85)" : "rgba(244,241,235,0.60)",
          marginBottom: 16,
          transition: "color 0.25s ease",
        }}>
          BRAC University
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            display: "inline-block", width: 6, height: 6,
            borderRadius: "50%", background: "#d7ef35", flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(13px, 1.05vw, 15px)",
            color: hovered ? "rgba(244,241,235,0.85)" : "rgba(244,241,235,0.65)",
            transition: "color 0.25s ease",
          }}>
            CGPA{" "}
            <span style={{
              color: "#d7ef35", fontWeight: 700,
              textShadow: hovered ? "0 0 10px rgba(215,239,53,0.6)" : "none",
              transition: "text-shadow 0.25s ease",
            }}>
              3.90
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

function CertsCard({ visible }: { visible: boolean }) {
  const [cardHovered, setCardHovered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      style={{
        position: "relative",
        border: `2px solid ${cardHovered ? "rgba(215,239,53,0.70)" : "rgba(215,239,53,0.22)"}`,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(20px)",
        transition: visible
          ? "border-color 0.25s ease, box-shadow 0.25s ease, opacity 0.6s ease 0.4s"
          : "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
        boxShadow: cardHovered
          ? "0 0 40px rgba(215,239,53,0.10), inset 0 0 60px rgba(215,239,53,0.03)"
          : "none",
        backgroundImage: "radial-gradient(circle, rgba(215,239,53,0.09) 1.2px, transparent 1.2px)",
        backgroundSize: "18px 18px",
        backgroundColor: cardHovered ? "#0e0e0e" : "#0a0a0a",
      }}
    >
      {/* Left accent */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: cardHovered ? 4 : 3,
        background: cardHovered
          ? "linear-gradient(to bottom, #d7ef35, rgba(215,239,53,0.5), #d7ef35)"
          : "linear-gradient(to bottom, transparent, rgba(215,239,53,0.45), transparent)",
        boxShadow: cardHovered ? "0 0 10px rgba(215,239,53,0.5)" : "none",
        transition: "width 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
      }} />

      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 28px",
        borderBottom: `1px solid ${cardHovered ? "rgba(244,241,235,0.50)" : "rgba(244,241,235,0.12)"}`,
        background: cardHovered ? "rgba(215,239,53,0.07)" : "rgba(215,239,53,0.03)",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}>
        <span style={{
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700,
          fontSize: "clamp(13px, 1.1vw, 15px)",
          letterSpacing: "0.08em",
          color: "#d7ef35",
        }}>
          Certifications
        </span>
        <span style={{
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700,
          fontSize: "clamp(11px, 0.9vw, 13px)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#F4F1EB",
          border: "1px solid rgba(215,239,53,0.45)",
          padding: "4px 12px",
        }}>
          {CERTS.length} courses
        </span>
      </div>

      {/* Cert list */}
      <div style={{ padding: "8px 0" }}>
        {CERTS.map((cert, i) => {
          const isHovered = hoveredIdx === i;
          const delay = 0.4 + i * 0.05;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "13px 28px",
                borderBottom: i < CERTS.length - 1
                  ? `1px solid ${isHovered ? "rgba(215,239,53,0.20)" : "rgba(244,241,235,0.06)"}`
                  : "none",
                background: isHovered ? "rgba(215,239,53,0.05)" : "transparent",
                transition: "background 0.18s ease, border-color 0.18s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateX(12px)",
                transitionDelay: visible ? `${delay}s` : `${delay}s`,
              }}
            >
              {/* Issuer badge */}
              <span style={{
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 700,
                fontSize: "clamp(10px, 0.8vw, 11px)",
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: isHovered ? "#d7ef35" : "rgba(215,239,53,0.60)",
                border: `1px solid ${isHovered ? "rgba(215,239,53,0.55)" : "rgba(215,239,53,0.22)"}`,
                padding: "3px 10px",
                flexShrink: 0,
                textShadow: isHovered ? "0 0 10px rgba(215,239,53,0.5)" : "none",
                transition: "color 0.18s ease, border-color 0.18s ease, text-shadow 0.18s ease",
                minWidth: "7ch",
                textAlign: "center",
              }}>
                {cert.issuer}
              </span>

              {/* Cert name */}
              <span style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(13px, 1.05vw, 15px)",
                color: isHovered ? "#F4F1EB" : "rgba(244,241,235,0.80)",
                lineHeight: 1.4,
                transition: "color 0.18s ease",
              }}>
                {cert.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EducationCerts() {
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
      id="education"
      style={{
        background: "#080808",
        color: "#F4F1EB",
        padding: "16vh 5vw 18vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
          05 — Education & Certifications
        </div>

        {/* Heading */}
        <div style={{
          marginBottom: "7vh",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          <div style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
            fontWeight: 700,
            color: "#F4F1EB",
            lineHeight: 1.2,
          }}>
            Education and{" "}
            <span style={{ color: "#d7ef35" }}>certifications.</span>
          </div>
        </div>

        {/* Two-column grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "clamp(16px, 2vw, 28px)",
          alignItems: "start",
        }}>
          <EduCard visible={visible} />
          <CertsCard visible={visible} />
        </div>

      </div>
    </section>
  );
}
