"use client";

export default function TellUs() {
  return (
    <section
      style={{
        background: "#1D3832",
        color: "#F4F1EB",
        minHeight: "100vh",
        padding: "12vh 5vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          opacity: 0.7,
        }}
      >
        ONE LAST THING
      </div>

      <div
        style={{
          fontWeight: 900,
          fontSize: "clamp(4rem, 12vw, 14rem)",
          lineHeight: 0.85,
          letterSpacing: "-0.035em",
          textTransform: "uppercase",
        }}
      >
        <div>TELL US</div>
        <div
          style={{
            color: "transparent",
            WebkitTextStroke: "2px #F4F1EB",
          }}
        >
          WHAT&rsquo;S NEXT.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          CONTINUE SCROLLING ↓
        </span>
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            border: "1px solid rgba(244,241,235,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
          }}
        >
          ↗
        </div>
      </div>
    </section>
  );
}
