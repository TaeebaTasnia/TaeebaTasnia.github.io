import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taeeba Tasnia",
  description:
    "Portfolio of Taeeba Tasnia — Software Engineering Intern (AI/ML) at CloudlyAI. CSE Graduate from BRAC University. Building RAG systems, LLM pipelines, and production AI.",
  keywords: ["AI Engineer", "ML Developer", "RAG", "LLM", "Portfolio", "BRAC University"],
  openGraph: {
    title: "Taeeba Tasnia",
    description: "Building AI systems that reason, retrieve, and adapt.",
    type: "website",
    url: "https://taeebatasnia.github.io",
    images: [
      {
        url: "https://taeebatasnia.github.io/images/taeeba-avatar.jpg",
        width: 1200,
        height: 630,
        alt: "Taeeba Tasnia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taeeba Tasnia",
    description: "Building AI systems that reason, retrieve, and adapt.",
    images: ["https://taeebatasnia.github.io/images/taeeba-avatar.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#080808" />
      </head>
      <body style={{ backgroundColor: "#F4F1EB", color: "#111111" }}>
        {children}
        <Script id="sw-register" strategy="afterInteractive">{`
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
          }
        `}</Script>
      </body>
    </html>
  );
}
