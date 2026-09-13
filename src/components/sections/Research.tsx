"use client";

import { useEffect, useRef, useState } from "react";

const TAGS = ["BIAS DETECTION", "LLMS", "NLP", "BENGALI NLP", "FAIRNESS", "BENCHMARKING"];

const DESCRIPTION =
  "A bilingual benchmark and mitigation pipeline for measuring and reducing socio-cultural bias in large language models. BanglaBBQ tests nine bias categories in English and Bengali, five of them newly built for the Bangladeshi context, while SafeLLM tackles bias at inference time through prompt rewriting, bias flagging, and counterfactual identity-swapping, with no retraining required. Evaluated across four multilingual LLMs, the work finds that inference-time debiasing helps larger models but backfires on smaller ones, and that performance drops sharply on culturally specific prompts.";

function ZoomIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.90)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(8px)",
        animation: "lbFadeIn 0.2s ease",
        cursor: "zoom-out",
      }}
    >
      <style>{`
        @keyframes lbFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes lbScaleIn { from { opacity: 0; transform: scale(0.90) } to { opacity: 1; transform: scale(1) } }
      `}</style>

      <button
        onClick={onClose}
        style={{
          position: "fixed", top: 24, right: 28,
          background: "rgba(244,241,235,0.08)", border: "1px solid rgba(244,241,235,0.2)",
          borderRadius: "50%", width: 44, height: 44,
          color: "#F4F1EB", fontSize: 20, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s",
          zIndex: 10000,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(215,239,53,0.2)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(244,241,235,0.08)")}
      >
        ✕
      </button>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#ffffff",
          borderRadius: 6,
          padding: 24,
          cursor: "default",
          animation: "lbScaleIn 0.22s ease",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ display: "block", maxWidth: "82vw", maxHeight: "82vh", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

function ZoomableImage({
  src, alt, height, objectFit = "contain", objectPosition = "center",
}: {
  src: string; alt: string; height: number;
  objectFit?: "contain" | "cover";
  objectPosition?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div
        onClick={() => setLightbox(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          background: "#ffffff",
          height,
          cursor: "zoom-in",
          flexShrink: 0,
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          transform: hovered ? "scale(1.015)" : "scale(1)",
          boxShadow: hovered ? "0 8px 32px rgba(215,239,53,0.18)" : "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        {/* The actual image */}
        <img
          src={src}
          alt={alt}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit,
            objectPosition,
            padding: objectFit === "contain" ? 12 : 0,
            boxSizing: "border-box",
          }}
        />

        {/* Hover overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "rgba(8,8,8,0.52)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 10,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease",
            color: "#F4F1EB",
            pointerEvents: "none",
          }}
        >
          <ZoomIcon />
          <span style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            click to enlarge
          </span>
        </div>
      </div>

      {lightbox && <Lightbox src={src} alt={alt} onClose={() => setLightbox(false)} />}
    </>
  );
}

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="research"
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
          03 — Research
        </div>

        {/* Big heading */}
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
            maxWidth: "28ch",
          }}>
            Undergraduate thesis on bilingual socio-cultural bias in LLMs using BanglaBBQ.
          </div>
        </div>

        {/* Card */}
        <div
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => setCardHovered(false)}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px, 3vw, 48px)",
            background: cardHovered ? "#111111" : "#0d0d0d",
            border: `1px solid ${cardHovered ? "rgba(215,239,53,0.40)" : "rgba(244,241,235,0.08)"}`,
            borderRadius: 4,
            padding: "clamp(24px, 3vw, 48px)",
            boxShadow: cardHovered
              ? "0 0 48px rgba(215,239,53,0.08), inset 0 0 80px rgba(215,239,53,0.02)"
              : "none",
            transition: "border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
          }}
        >
          {/* Left — title + tags + description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Title */}
            <div style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
              fontWeight: 700,
              color: cardHovered ? "#F4F1EB" : "rgba(244,241,235,0.90)",
              lineHeight: 1.55,
              transition: "color 0.3s ease",
            }}>
              Undergraduate Thesis: A Bilingual Study of Socio-Cultural Bias in Large Language Models through BanglaBBQ and a Post Processing Mitigation Pipeline
            </div>

            {/* Institution + year */}
            <div style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(0.72rem, 0.9vw, 0.82rem)",
              color: cardHovered ? "rgba(215,239,53,0.9)" : "rgba(215,239,53,0.65)",
              letterSpacing: "0.06em",
              transition: "color 0.3s ease",
            }}>
              BRAC University · 2026
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TAGS.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "clamp(0.62rem, 0.75vw, 0.72rem)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: cardHovered ? "rgba(244,241,235,0.75)" : "rgba(244,241,235,0.45)",
                  border: `1px solid ${cardHovered ? "rgba(244,241,235,0.25)" : "rgba(244,241,235,0.12)"}`,
                  borderRadius: 2,
                  padding: "3px 8px",
                  transition: "color 0.3s ease, border-color 0.3s ease",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(0.78rem, 0.95vw, 0.9rem)",
              color: cardHovered ? "rgba(244,241,235,0.75)" : "rgba(244,241,235,0.50)",
              lineHeight: 1.75,
              transition: "color 0.3s ease",
            }}>
              {DESCRIPTION}
            </div>

            {/* Paper link */}
            <div style={{ paddingTop: 8 }}>
              <span style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(0.72rem, 0.88vw, 0.82rem)",
                color: "rgba(244,241,235,0.40)",
              }}>
                You can read the paper here —{" "}
              </span>
              <a
                href="https://hdl.handle.net/10361/28912"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "clamp(0.72rem, 0.88vw, 0.82rem)",
                  color: "#d7ef35",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  opacity: 0.80,
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.80")}
                target="_blank"
                rel="noopener noreferrer"
              >
                A Bilingual Study of Socio-Cultural Bias in Large Language Models through BanglaBBQ and a Post Processing Mitigation Pipeline
              </a>
            </div>
          </div>

          {/* Right — stacked zoomable images */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <ZoomableImage
              src="/images/research/pipeline.png"
              alt="SafeLLM Pipeline"
              height={340}
              objectFit="contain"
            />
            <ZoomableImage
              src="/images/research/banglabbq-table.png"
              alt="BanglaBBQ Table"
              height={220}
              objectFit="cover"
              objectPosition="center top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
