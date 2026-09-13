/**
 * Final comprehensive screenshot script — with smart wait & full stderr.
 * Run: node scripts/retake-all-final.js
 */
const { chromium } = require("playwright");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const http = require("http");

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

async function snap(page, dest, scrollY = 0) {
  if (scrollY) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollY);
    await new Promise((r) => setTimeout(r, 1500));
  }
  await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: 1280, height: 800 }, timeout: 0 });
  const size = fs.statSync(dest).size;
  console.log(`  ✓ ${path.basename(dest)} (${size} bytes)`);
}

async function withNodeServer(cwd, port, fn) {
  const proc = spawn("npm", ["run", "dev", "--", "--port", String(port)], {
    cwd, shell: true, stdio: "pipe",
  });
  proc.stdout.on("data", (d) => process.stdout.write("  " + d));
  proc.stderr.on("data", (d) => process.stderr.write("  ERR: " + d));
  try {
    await waitForServer(`http://localhost:${port}`);
    await fn(port);
  } finally {
    proc.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 1500));
  }
}

async function withStreamlit(cwd, entry, port, fn) {
  const proc = spawn(
    "D:\\python.exe",
    ["-m", "streamlit", "run", entry, "--server.headless", "true", "--server.port", String(port)],
    { cwd, shell: true, stdio: "pipe" }
  );
  proc.stdout.on("data", (d) => process.stdout.write("  " + d));
  proc.stderr.on("data", (d) => process.stderr.write("  ERR: " + d));
  try {
    await waitForServer(`http://localhost:${port}`, 120000);
    // Wait for Streamlit to execute the script and render (longer wait for heavy apps)
    await new Promise((r) => setTimeout(r, 15000));
    await fn(port);
  } finally {
    proc.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 1500));
  }
}

(async () => {
  const browser = await chromium.launch();

  // ── 1. GlowAura — scroll to FeaturedProducts ──────────────────────────────
  console.log("\n[glowaura] Starting on port 3010...");
  await withNodeServer(
    path.join(PROJECTS_ROOT, "glowaura-skincare-e-commerce"),
    3010,
    async (port) => {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(`http://localhost:${port}`, { waitUntil: "domcontentloaded", timeout: 60000 });
      await new Promise((r) => setTimeout(r, 6000));
      await snap(page, path.join(OUT_DIR, "glowaura.png"), 1200);
      await page.close();
    }
  );

  // ── 2. CryptoVet — login page ─────────────────────────────────────────────
  console.log("\n[cryptovet] Starting on port 5181...");
  await withNodeServer(
    path.join(PROJECTS_ROOT, "cse447/frontend"),
    5181,
    async (port) => {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(`http://localhost:${port}/login`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 4000));
      await snap(page, path.join(OUT_DIR, "cryptovet.png"));
      await page.close();
    }
  );

  // ── 3. SlatePrep — Streamlit (fitz now fixed) ─────────────────────────────
  console.log("\n[slateprep] Starting Streamlit on port 8512...");
  await withStreamlit(
    path.join(PROJECTS_ROOT, "SlatePrep/adaptive-prep-system"),
    "streamlit_app.py",
    8512,
    async (port) => {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(`http://localhost:${port}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      // Wait for Streamlit's stApp element (signals the app rendered)
      await page.waitForSelector('[data-testid="stApp"]', { timeout: 30000 }).catch(() => {});
      await new Promise((r) => setTimeout(r, 3000));
      await snap(page, path.join(OUT_DIR, "slateprep.png"));
      await page.close();
    }
  );

  // ── 4. Copilot — Streamlit ────────────────────────────────────────────────
  console.log("\n[copilot] Starting Streamlit on port 8513...");
  await withStreamlit(
    path.join(PROJECTS_ROOT, "copilot"),
    "frontend/app.py",
    8513,
    async (port) => {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(`http://localhost:${port}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForSelector('[data-testid="stApp"]', { timeout: 30000 }).catch(() => {});
      await new Promise((r) => setTimeout(r, 3000));
      await snap(page, path.join(OUT_DIR, "copilot.png"));
      await page.close();
    }
  );

  await browser.close();
  console.log("\nAll done.");
})().catch((e) => { console.error("Fatal:", e.message); process.exit(1); });
