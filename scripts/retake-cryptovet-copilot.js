const { chromium } = require("playwright");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const http = require("http");
const os = require("os");

const PROJECTS_ROOT = path.resolve(__dirname, "../../projects");
const OUT_DIR = path.resolve(__dirname, "../public/images/projects");

function waitForServer(url, timeoutMs = 90000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode < 500) resolve();
        else setTimeout(check, 2000);
      }).on("error", () => {
        if (Date.now() - start > timeoutMs) reject(new Error(`Timeout: ${url}`));
        else setTimeout(check, 2000);
      });
    };
    check();
  });
}

// ── Copilot: static HTML mock of the Streamlit chat UI ───────────────────────
const COPILOT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1280" />
<title>NetAI Copilot</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: "Source Sans Pro", "Segoe UI", sans-serif; background: #0e1117; color: #fafafa; height: 800px; display: flex; flex-direction: column; }

  /* ── Streamlit top bar ── */
  .st-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 1rem; height: 48px; background: #0e1117;
    border-bottom: 1px solid #262730;
  }
  .st-topbar svg { width: 24px; height: 24px; fill: #fafafa; opacity: 0.7; }
  .st-topbar-right { display: flex; gap: 12px; align-items: center; }
  .st-topbar-icon { width: 20px; height: 20px; opacity: 0.6; cursor: pointer; }

  /* ── Main layout ── */
  .st-main { flex: 1; overflow: hidden; display: flex; flex-direction: column; padding: 2rem 4rem 1rem; max-width: 860px; margin: 0 auto; width: 100%; }

  /* ── Title ── */
  h1 { font-size: 2.25rem; font-weight: 700; color: #fafafa; margin-bottom: 0.25rem; }
  .caption { font-size: 0.9rem; color: #9ea3b0; margin-bottom: 1.5rem; }

  /* ── Chat messages ── */
  .chat-area { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 1.2rem; margin-bottom: 1rem; }
  .msg { display: flex; gap: 0.75rem; align-items: flex-start; }
  .msg.user { flex-direction: row-reverse; }
  .avatar {
    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 600;
  }
  .avatar.ai { background: #ff4b4b; color: white; }
  .avatar.user { background: #262730; color: #fafafa; }
  .bubble {
    background: #262730; border-radius: 12px; padding: 0.65rem 1rem;
    font-size: 0.92rem; line-height: 1.55; max-width: 78%; color: #fafafa;
  }
  .msg.user .bubble { background: #1c3557; }
  .bubble code { background: #0e1117; padding: 2px 5px; border-radius: 4px; font-family: monospace; font-size: 0.82rem; color: #ff4b4b; }

  /* ── Chat input ── */
  .chat-input-wrap {
    border: 1px solid #3d3f4f; border-radius: 10px; background: #262730;
    padding: 0.65rem 1rem; display: flex; align-items: center; gap: 0.5rem;
  }
  .chat-input-wrap input {
    flex: 1; background: transparent; border: none; outline: none;
    color: #9ea3b0; font-size: 0.92rem;
  }
  .send-btn { background: #ff4b4b; border: none; border-radius: 6px; padding: 4px 10px; cursor: pointer; }
  .send-btn svg { width: 16px; height: 16px; fill: white; }

  /* ── Status badge ── */
  .status { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: #4cbb74; margin-bottom: 0.8rem; }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: #4cbb74; }
</style>
</head>
<body>
<!-- Streamlit top bar -->
<div class="st-topbar">
  <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="M14 2L2 9l12 7 12-7L14 2z" opacity=".8"/><path d="M2 19l12 7 12-7" stroke="#fafafa" stroke-width="1.5" fill="none"/><path d="M2 14l12 7 12-7" stroke="#fafafa" stroke-width="1.5" fill="none" opacity=".5"/></svg>
  <div class="st-topbar-right">
    <svg class="st-topbar-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fafafa" stroke-width="1.5" fill="none"/><path d="M12 8v4l3 3" stroke="#fafafa" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
    <svg class="st-topbar-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="#fafafa"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" stroke="#fafafa" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
  </div>
</div>

<div class="st-main">
  <h1>🤖 NetAI Copilot</h1>
  <p class="caption">Ask me anything about the Maveric O-RAN platform.</p>

  <div class="status"><div class="dot"></div> Connected · Session active</div>

  <div class="chat-area">
    <div class="msg ai">
      <div class="avatar ai">🤖</div>
      <div class="bubble">Hello! I'm NetAI Copilot, your AI assistant for the <strong>Maveric O-RAN platform</strong>. I can help you with architecture questions, troubleshooting, API references, and deployment guides. What would you like to know?</div>
    </div>
    <div class="msg user">
      <div class="avatar user">U</div>
      <div class="bubble">How does the RAG pipeline retrieve documents from the FAISS index?</div>
    </div>
    <div class="msg ai">
      <div class="avatar ai">🤖</div>
      <div class="bubble">The retrieval pipeline encodes your query using a <code>SentenceTransformer</code> model, then performs an approximate nearest-neighbour search against the pre-built FAISS index. The top-<em>k</em> chunks are ranked by cosine similarity and passed as context to the Groq LLM, which synthesises a grounded answer with citations.</div>
    </div>
    <div class="msg user">
      <div class="avatar user">U</div>
      <div class="bubble">What LLM is used under the hood?</div>
    </div>
    <div class="msg ai">
      <div class="avatar ai">🤖</div>
      <div class="bubble">The system uses <strong>Groq-hosted LLaMA 3</strong> via LangChain's <code>ChatGroq</code> integration. Groq's inference hardware delivers very low latency, which keeps the chat feel responsive even for long context windows.</div>
    </div>
  </div>

  <div class="chat-input-wrap">
    <input type="text" placeholder="Ask a question about Maveric..." />
    <button class="send-btn">
      <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
    </button>
  </div>
</div>
</body>
</html>`;

(async () => {
  const browser = await chromium.launch();

  // ── 1. Copilot — HTML mock screenshot ─────────────────────────────────────
  console.log("\n[copilot] Rendering HTML mock...");
  {
    const tmpHtml = path.join(os.tmpdir(), "copilot-mock.html");
    fs.writeFileSync(tmpHtml, COPILOT_HTML);
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`file://${tmpHtml}`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 500));
    const dest = path.join(OUT_DIR, "copilot.png");
    await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: 1280, height: 800 }, timeout: 0 });
    console.log(`  ✓ copilot.png (${fs.statSync(dest).size} bytes)`);
    await page.close();
    fs.unlinkSync(tmpHtml);
  }

  // ── 2. CryptoVet — payment cards page (secure card management) ────────────
  console.log("\n[cryptovet] Starting server on 5185...");
  const proc = spawn("npm", ["run", "dev", "--", "--port", "5185"], {
    cwd: path.join(PROJECTS_ROOT, "cse447/frontend"),
    shell: true, stdio: "pipe",
  });
  proc.stdout.on("data", (d) => process.stdout.write("  " + d));
  proc.stderr.on("data", () => {});

  try {
    await waitForServer("http://localhost:5185");

    // First visit home to set auth context, then check a few pages
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });

    // Try the home page scrolled to show vet cards + security badge section
    await page.goto("http://localhost:5185/", { waitUntil: "domcontentloaded", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 4000));
    // Scroll to show the featured vets section (below hero)
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: "instant" }));
    await new Promise((r) => setTimeout(r, 1500));

    const dest = path.join(OUT_DIR, "cryptovet.png");
    await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: 1280, height: 800 }, timeout: 0 });
    console.log(`  ✓ cryptovet.png (${fs.statSync(dest).size} bytes)`);
    await page.close();
  } finally {
    proc.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 1000));
  }

  await browser.close();
  console.log("\nDone.");
})().catch((e) => { console.error("Fatal:", e.message); process.exit(1); });
