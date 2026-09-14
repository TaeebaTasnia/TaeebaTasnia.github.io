export const personal = {
  name: "Taeeba Tasnia",
  nameFirst: "TAEEBA",
  nameLast: "TASNIA",
  title: "Software Engineering Intern (AI/ML)",
  company: "CloudlyAI",
  tagline: "I build AI/ML systems — RAG pipelines, LLM orchestration, and data systems that perform in production.",
  bio: "Computer Science & Engineering graduate with hands-on experience building AI/ML and LLM-based systems for telecom and digital media platforms. Skilled in machine learning, RAG and LLM engineering, data analysis, requirement analysis, and stakeholder collaboration.",
  location: "Dhaka, Bangladesh",
  email: "taeebatasnia2001@gmail.com",
  phone: "+8801318961228",
  github: "https://github.com/Taeeba-Tasnia",
  linkedin: "https://linkedin.com/in/taeeba-tasnia",
  photo: "/images/taeeba.png",
};

export const stats = [
  { value: "3.90", suffix: " / 4.0", label: "CGPA" },
  { value: "500", suffix: "+", label: "Students Mentored" },
  { value: "5th", suffix: " / 155", label: "Thesis Placement" },
];

export const experience = [
  {
    company: "CloudlyAI",
    role: "Software Engineering Intern (AI/ML)",
    period: "March 2026 – Present",
    location: "Dhaka, Bangladesh",
    bullets: [
      "Engineered components of CloudlyNet, an AI-driven telecom platform for 4G/5G RAN optimization, implementing its multi-LLM/BYO-LLM architecture and Copilot orchestration, including environment-based model switching, end-to-end orchestration wiring, format and label classifier agents, and response-length and output-format controls",
      "Rebuilt the Copilot's RAG retrieval layer from a non-functional pure-vector implementation (0% recall) into a hybrid BM25 + semantic search pipeline with Reciprocal Rank Fusion, reaching 41% Recall@5 and 47% MRR on a 20-query benchmark",
      "Analyzed and structured 3GPP and O-RAN telecom specifications into the Copilot's knowledge base, and strengthened its governance layer through MCP response standardization, guardrails, and data modeling for reusable knowledge retrieval",
    ],
  },
  {
    company: "AKASH Digital TV",
    role: "Product Intern",
    period: "Nov 2025 – Feb 2026",
    location: "Dhaka, Bangladesh",
    bullets: [
      "Executed User Acceptance Testing (UAT) for the AKASH GO app with cross-functional teams, validating business requirements and logging defects that were resolved before release",
      "Supported product planning across vendor and stakeholder meetings, translating requirements into inputs for enterprise IT operations and UI improvements",
      "Analyzed DTH infrastructure, backend systems, and third-party integrations to support faster issue triage and requirement gathering",
    ],
  },
  {
    company: "BRAC University",
    role: "Undergraduate Teaching Assistant",
    period: "June 2024 – July 2025",
    location: "Dhaka, Bangladesh",
    bullets: [
      "Mentored 500+ undergraduate students in Algorithms, Discrete Mathematics, and Mathematics I",
      "Delivered 15 hours/week of consultations and lab support, resolving conceptual and debugging blockers ahead of assessments",
    ],
  },
];

export const projects = [
  {
    id: "ai-copilot-lite",
    name: "AI Copilot Lite",
    year: "2026",
    description:
      "Two-agent AI assistant for a telco platform, combining RAG-based document Q&A with MCP-driven log debugging to resolve operational queries.",
    role: "AI/ML Engineer",
    outcome: "Hybrid retrieval pipeline achieving 41% Recall@5 and 47% MRR on a 20-query benchmark.",
    tech: ["LangChain", "LangGraph", "FAISS", "FastAPI", "Streamlit", "MongoDB", "Docker"],
    github: "https://github.com/TaeebaTasnia/copilot",
    live: null,
    image: "/images/projects/copilot.png",
  },
  {
    id: "churnguard",
    name: "ChurnGuard",
    year: "2025",
    description:
      "End-to-end ML pipeline predicting telco customer churn with 90% recall, combining engineered features, tuned gradient boosting, and SHAP interpretability into a production-ready REST API.",
    role: "ML Engineer",
    outcome: "90% recall churn model deployed as a REST API with full SHAP explainability layer.",
    tech: ["XGBoost", "scikit-learn", "SHAP", "FastAPI", "Docker", "pandas"],
    github: "https://github.com/TaeebaTasnia/telco-churn-prediction",
    live: null,
    image: "/images/projects/churnguard.png",
  },
  {
    id: "adaptive-prep",
    name: "Adaptive Prep System",
    year: "2025",
    description:
      "MCQ study assistant that adapts question difficulty and topic focus in real time based on user performance.",
    role: "Full-Stack Developer",
    outcome: "Real-time adaptive difficulty engine serving personalized study sessions end-to-end.",
    tech: ["FastAPI", "Next.js", "TypeScript", "Tailwind CSS", "SQLite"],
    github: "https://github.com/TaeebaTasnia/SlatePrep",
    live: null,
    image: "/images/projects/slateprep.png",
  },
  {
    id: "cryptovet",
    name: "CryptoVet",
    year: "2024",
    description:
      "Pet-care service platform with strong data and payment protection, enabling users to securely manage appointments and sensitive information.",
    role: "Full-Stack Developer",
    outcome: "AES/RSA-encrypted platform for secure pet appointment management and record handling.",
    tech: ["React", "Node.js", "Express", "MongoDB", "AES/RSA"],
    github: "https://github.com/TaeebaTasnia/cse447",
    live: null,
    image: "/images/projects/cryptovet.png",
  },
  {
    id: "glowaura",
    name: "GlowAura",
    year: "2025",
    description:
      "Full-stack skincare e-commerce storefront with product search, filtering, and complete cart-to-checkout flows.",
    role: "Full-Stack Developer",
    outcome: "Production-ready storefront with containerised backend and type-safe frontend.",
    tech: ["FastAPI", "PostgreSQL", "Docker", "Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/TaeebaTasnia/skincare-ecommerce",
    live: null,
    image: "/images/projects/glowaura.png",
  },
  {
    id: "vetconnect",
    name: "VetConnect",
    year: "2024",
    description:
      "Complete platform for pet owners to find veterinarians, manage pet profiles, book appointments, and handle payments from one integrated interface.",
    role: "Full-Stack Developer",
    outcome: "Integrated vet-discovery and booking platform built as a collaborative project.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/provatsaha/online-vet-finder",
    live: null,
    image: "/images/projects/vetconnect.png",
  },
];

export const research = {
  title: "A Bilingual Study of Socio-Cultural Bias in Large Language Models through BanglaBBQ and a Post Processing Mitigation Pipeline",
  institution: "BRAC University",
  year: "2026",
  type: "Undergraduate Thesis",
  description:
    "A comprehensive investigation into socio-cultural bias in large language models evaluated across Bengali and English. The work introduces BanglaBBQ, a bilingual benchmark derived from BBQ, and proposes a post-processing mitigation pipeline to reduce bias in LLM outputs without retraining.",
  achievement: "5th place out of 155 teams — Pre-Thesis II Poster Presentation",
  keywords: ["LLM Bias", "Bengali NLP", "BanglaBBQ", "Socio-Cultural Bias", "Mitigation Pipeline", "Bilingual Evaluation"],
};

export const skills = [
  {
    category: "LLM Engineering",
    items: ["LangChain", "LangGraph", "LlamaIndex", "RAG", "MCP"],
  },
  {
    category: "AI & Machine Learning",
    items: ["scikit-learn", "PyTorch", "pandas", "NumPy"],
  },
  {
    category: "Programming Languages",
    items: ["Python", "SQL", "C", "Assembly"],
  },
  {
    category: "Backend Development",
    items: ["FastAPI", "REST API Development"],
  },
  {
    category: "Databases & Vector Stores",
    items: ["PostgreSQL", "MongoDB", "SQLite", "ChromaDB", "FAISS"],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "Git", "GitHub Actions", "Linux", "Postman", "JIRA"],
  },
  {
    category: "Digital & Visualization",
    items: ["Power BI", "Tableau", "Streamlit", "Figma"],
  },
];

export const education = {
  institution: "BRAC University",
  degree: "B.Sc. in Computer Science & Engineering",
  period: "2022 — 2026",
  cgpa: "3.90 / 4.0",
  thesis: "A Bilingual Study of Socio-Cultural Bias in Large Language Models",
};

export const certifications = [
  { issuer: "IBM", courses: ["Introduction to Agentic AI", "Docker Essentials: A Developer Introduction"] },
  { issuer: "Stanford (Andrew Ng)", courses: ["Supervised Machine Learning: Regression and Classification"] },
  { issuer: "Anthropic", courses: ["Claude Code 101", "Introduction to Claude", "Claude Code in Action"] },
  { issuer: "DataCamp", courses: ["Intermediate Python", "NLP", "Machine Learning", "AI Fundamentals"] },
];

export const leadership = [
  {
    org: "Shoktikonna",
    role: "Founding Member — Alumni Committee",
    period: "2025 – Present",
    description: "Selected for a women's leadership program. Appointed Founding Member of the Alumni Committee, coordinating network engagement across 300+ graduate members.",
  },
  {
    org: "Competitions & Achievements",
    role: "Finalist / Semi-Finalist",
    period: "2020 – 2025",
    description: "Finalist, Huawei Seeds for the Future Bangladesh 2025. Semi-Finalist, Marico Over the Wall S4 & Sheba Solvio AI Hackathon 2025. 40% merit scholarship, ISCEA Supply Chain Competition 2025. Exhibited artwork at KPR International Art Exhibition across 5 countries (2020).",
  },
  {
    org: "BRAC University Entrepreneur Development Forum",
    role: "Assistant Secretary of Marketing and Communications",
    period: "2023 – 2024",
    description: "Led cross-functional branding and marketing initiatives, coordinating team efforts to drive student engagement and organizational outreach.",
  },
  {
    org: "HANS · Publication Secretary · VP YWCA Science Club",
    role: "Student Leader",
    period: "2017 – 2020",
    description: "Led inclusive community initiatives supporting autism awareness (HANS). Managed end-to-end publication workflows at Dhaka City College Cultural Club. Directed team operations as VP of YWCA Youngers Science Club.",
  },
];

export const marqueeItems =
  "AI/ML ENGINEERING · RAG SYSTEMS · LLM ORCHESTRATION · MACHINE LEARNING · BACKEND DEVELOPMENT · OPEN TO OPPORTUNITIES · BRAC UNIVERSITY · DHAKA, BANGLADESH · ";
