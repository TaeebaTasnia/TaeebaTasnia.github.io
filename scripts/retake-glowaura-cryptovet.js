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
    await fn(port);
  } finally {
    proc.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 1500));
  }
}

(async () => {
  const browser = await chromium.launch();

  // ── GlowAura: start fresh on port 3003 ────────────────────────────────────
  console.log("\n[glowaura] Starting fresh server on 3003...");
  await withServer(
    path.join(PROJECTS_ROOT, "glowaura-skincare-e-commerce"),
    3003,
    async (port) => {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(`http://localhost:${port}`, { waitUntil: "domcontentloaded", timeout: 60000 });
      await new Promise((r) => setTimeout(r, 5000));
      // Scroll past hero + trust badges to show product categories/featured products
      await page.evaluate(() => window.scrollTo({ top: 1400, behavior: "instant" }));
      await new Promise((r) => setTimeout(r, 2000));
      await page.screenshot({ path: path.join(OUT_DIR, "glowaura.png"), clip: { x: 0, y: 0, width: 1280, height: 800 }, timeout: 0 });
      const size = fs.statSync(path.join(OUT_DIR, "glowaura.png")).size;
      console.log(`  ✓ glowaura.png (${size} bytes)`);
      await page.close();
    }
  );

  // ── CryptoVet: signup page (distinct from VetConnect's homepage) ──────────
  console.log("\n[cryptovet] Starting server on 5177...");
  await withServer(
    path.join(PROJECTS_ROOT, "cse447/frontend"),
    5177,
    async (port) => {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(`http://localhost:${port}/signup`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 4000));
      await page.screenshot({ path: path.join(OUT_DIR, "cryptovet.png"), clip: { x: 0, y: 0, width: 1280, height: 800 } });
      const size = fs.statSync(path.join(OUT_DIR, "cryptovet.png")).size;
      console.log(`  ✓ cryptovet.png (${size} bytes)`);
      await page.close();
    }
  );

  await browser.close();
  console.log("\nDone.");
})().catch((e) => { console.error("Fatal:", e.message); process.exit(1); });
