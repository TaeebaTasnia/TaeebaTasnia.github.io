const { chromium } = require("playwright");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const http = require("http");

const PROJECTS_ROOT = path.resolve(__dirname, "../../projects");
const OUT_DIR = path.resolve(__dirname, "../public/images/projects");

function waitForServer(url, timeoutMs = 120000) {
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

async function capture(id, cwd, entry, port) {
  console.log(`\n[${id}] Starting Streamlit on port ${port}...`);
  const proc = spawn("python", ["-m", "streamlit", "run", entry, "--server.headless", "true", "--server.port", String(port)], {
    cwd, shell: true, stdio: "pipe",
  });
  proc.stdout.on("data", (d) => process.stdout.write("  " + d));
  proc.stderr.on("data", (d) => process.stderr.write("  " + d));
  try {
    await waitForServer(`http://localhost:${port}`);
    await new Promise((r) => setTimeout(r, 6000));
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`http://localhost:${port}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 5000));
    const dest = path.join(OUT_DIR, `${id}.png`);
    await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: 1280, height: 800 } });
    const size = fs.statSync(dest).size;
    console.log(`  ✓ saved ${id}.png (${size} bytes)`);
    await browser.close();
  } finally {
    proc.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 1000));
  }
}

(async () => {
  await capture(
    "slateprep",
    path.join(PROJECTS_ROOT, "SlatePrep/adaptive-prep-system"),
    "streamlit_app.py",
    8502
  );
  await capture(
    "copilot",
    path.join(PROJECTS_ROOT, "copilot"),
    "frontend/app.py",
    8503
  );
  console.log("\nDone.");
})().catch((e) => { console.error("Fatal:", e.message); process.exit(1); });
