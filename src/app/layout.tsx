import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taeeba Tasnia — AI/ML Engineer",
  description:
    "Portfolio of Taeeba Tasnia — Software Engineering Intern (AI/ML) at CloudlyAI. CSE Graduate from BRAC University. Building RAG systems, LLM pipelines, and production AI.",
  keywords: ["AI Engineer", "ML Developer", "RAG", "LLM", "Portfolio", "BRAC University"],
  openGraph: {
    title: "Taeeba Tasnia — AI/ML Engineer",
    description: "Building AI systems that reason, retrieve, and adapt.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#F4F1EB", color: "#111111" }}>
        {children}
      </body>
    </html>
  );
}
