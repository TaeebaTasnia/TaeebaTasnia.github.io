"use client";

import { useState } from "react";
import { personal } from "@/lib/data";

export default function Contact() {
  const [hover, setHover] = useState(false);

  return (
    <section
      id="contact"
      style={{
        background: "#3DD9A4",
        color: "#111111",
        padding: "10vh 5vw 6vh",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-2vw",
          bottom: "-8vw",
          fontWeight: 900,
          fontSize: "30vw",
          lineHeight: 1,
          color: "#111111",
          opacity: 0.06,
          pointerEvents: "none",
          letterSpacing: "-0.04em",
        }}
      >
        03
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ height: 1, background: "rgba(17,17,17,0.25)", marginBottom: 18 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "12vh",
          }}
        >
          <span>03 &nbsp; CONTACT</span>
          <span>HAVE A PROJECT IN MIND?</span>
        </div>

        <h2
          style={{
            fontWeight: 900,
            fontSize: "clamp(3rem, 8vw, 10rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            marginBottom: "8vh",
          }}
        >
          <div>Let&rsquo;s create</div>
          <div>something meaningful</div>
          <div
            style={{
              color: "transparent",
              WebkitTextStroke: "2.5px #111111",
            }}
          >
            together.
          </div>
        </h2>

        <a
          href={`mailto:${personal.email}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            border: "1.5px solid #111111",
            borderRadius: 100,
            padding: "22px 22px 22px 40px",
            marginBottom: "8vh",
            background: "transparent",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.65,
                marginBottom: 6,
              }}
            >
              START A CONVERSATION
            </div>
            <div
              style={{
                fontSize: "clamp(1.2rem, 2.4vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {personal.email}
            </div>
          </div>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "1.5px solid #111111",
              background: hover ? "#111111" : "transparent",
              color: hover ? "#3DD9A4" : "#111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              transition: "background 250ms ease, color 250ms ease",
              flexShrink: 0,
            }}
          >
            ↗
          </div>
        </a>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            paddingTop: 24,
            borderTop: "1px solid rgba(17,17,17,0.25)",
          }}
        >
          <span>© 2026 TAEEBA TASNIA</span>
          <span>DHAKA, BANGLADESH</span>
        </div>
      </div>
    </section>
  );
}
