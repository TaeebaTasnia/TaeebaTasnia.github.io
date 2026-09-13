"use client";

import React from "react";

export default function Nav() {
  const link: React.CSSProperties = {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: 13,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#F4F1EB",
    textDecoration: "none",
    position: "relative",
    zIndex: 1,
  };

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "18px 5vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pointerEvents: "none",
        // Glass effect
        background: "rgba(8, 8, 8, 0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(244,241,235,0.08)",
      }}
    >
      <a href="#intro" onClick={go("intro")} style={{ ...link, fontWeight: 700, fontSize: 14, pointerEvents: "auto" }}>
        TAEEBA TASNIA
      </a>
      <nav style={{ display: "flex", gap: "clamp(14px, 2.2vw, 32px)", pointerEvents: "auto" }}>
        <a href="#intro"      onClick={go("intro")}      style={link}>Home</a>
        <a href="#experience" onClick={go("experience")} style={link}>Experience</a>
        <a href="#projects"   onClick={go("projects")}   style={link}>Projects</a>
        <a href="#research"   onClick={go("research")}   style={link}>Research</a>
        <a href="#skills"     onClick={go("skills")}     style={link}>Skills</a>
        <a href="#education"  onClick={go("education")}  style={link}>Education</a>
        <a href="#personal"   onClick={go("personal")}   style={link}>About</a>
        <a href="#contact"    onClick={go("contact")}    style={link}>Contact</a>
      </nav>
    </header>
  );
}
