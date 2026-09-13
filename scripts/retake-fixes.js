/**
 * Fix screenshots for glowaura, cryptovet, and slateprep.
 * Run: node scripts/retake-fixes.js
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
        else setTimeout(check, 1500);
      }).on("error", () => {
        if (Date.now() - start > timeoutMs) reject(new Error(`Timeout: ${url}`));
        else setTimeout(check, 1500);
      });
    };
    check();
  });
}

async function withServer(cwd, port, fn) {
  const proc = spawn("npm", ["run", "dev", "--", "--port", String(port)], {
    cwd, shell: true, stdio: "pipe",
  });
  proc.stdout.on("data", (d) => process.stdout.write("  " + d));
  proc.stderr.on("data", (d) => process.stderr.write("  " + d));
  try {
    await waitForServer(`http://localhost:${port}`);
    await fn();
  } finally {
    proc.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 1000));
  }
}

(async () => {
  const browser = await chromium.launch();

  // ── GlowAura: scroll to FeaturedProducts section ──────────────────────────
  console.log("\n[glowaura] Starting server...");
  await withServer(
    path.join(PROJECTS_ROOT, "glowaura-skincare-e-commerce"),
    3001,
    async () => {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto("http://localhost:3001", { waitUntil: "domcontentloaded", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 4000));
      // Scroll past the Hero to show products
      await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
      await new Promise((r) => setTimeout(r, 2000));
      await page.screenshot({ path: path.join(OUT_DIR, "glowaura.png"), clip: { x: 0, y: 0, width: 1280, height: 800 } });
      const size = fs.statSync(path.join(OUT_DIR, "glowaura.png")).size;
      console.log(`  ✓ glowaura.png (${size} bytes)`);
      await page.close();
    }
  );

  // ── CryptoVet: screenshot the vet search page ─────────────────────────────
  console.log("\n[cryptovet] Starting server on port 5176...");
  await withServer(
    path.join(PROJECTS_ROOT, "cse447/frontend"),
    5176,
    async () => {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1280, height: 800 });
      // Try the search/listing page which shows vets with appointment cards
      await page.goto("http://localhost:5176/search", { waitUntil: "domcontentloaded", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 4000));
      await page.screenshot({ path: path.join(OUT_DIR, "cryptovet.png"), clip: { x: 0, y: 0, width: 1280, height: 800 } });
      const size = fs.statSync(path.join(OUT_DIR, "cryptovet.png")).size;
      console.log(`  ✓ cryptovet.png (${size} bytes)`);
      await page.close();
    }
  );

  // ── SlatePrep: GitHub repo (fitz unavailable in script Python context) ─────
  console.log("\n[slateprep] Capturing GitHub repo...");
  {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("https://github.com/TaeebaTasnia/SlatePrep", { waitUntil: "domcontentloaded", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 3000));
    await page.screenshot({ path: path.join(OUT_DIR, "slateprep.png"), clip: { x: 0, y: 0, width: 1280, height: 800 } });
    const size = fs.statSync(path.join(OUT_DIR, "slateprep.png")).size;
    console.log(`  ✓ slateprep.png (${size} bytes)`);
    await page.close();
  }

  await browser.close();
  console.log("\nDone.");
})().catch((e) => { console.error("Fatal:", e.message); process.exit(1); });
