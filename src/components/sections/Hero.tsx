"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "var(--off-white)",
        color: "var(--text-dark)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "80px 5vw 40px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 80,
          left: "5vw",
          right: "5vw",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-dark)",
          opacity: 0.7,
        }}
      >
        <span>TAEEBA TASNIA — AI / ML ENGINEER</span>
        <span>DHAKA, BANGLADESH</span>
      </div>

      <h1
        style={{
          fontWeight: 900,
          fontSize: "clamp(4rem, 11vw, 13rem)",
          lineHeight: 0.86,
          letterSpacing: "-0.035em",
          textTransform: "uppercase",
          marginBottom: "8vh",
        }}
      >
        <span style={{ display: "block" }}>BUILDING</span>
        <span style={{ display: "block" }}>SYSTEMS</span>
        <span style={{ display: "block" }}>THAT THINK.</span>
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 12,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        <div>
          <div style={{ opacity: 0.5, marginBottom: 6 }}>PORTFOLIO / 2026</div>
          <div>TAEEBA TASNIA</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ opacity: 0.5, marginBottom: 6 }}>[ 001 ]</div>
          <div>SCROLL TO EXPLORE ↓</div>
        </div>
      </div>
    </section>
  );
}
