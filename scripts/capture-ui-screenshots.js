/**
 * Captures real UI screenshots of each portfolio project.
 * Run: node scripts/capture-ui-screenshots.js
 *
 * Starts each project's dev server, screenshots the main page, then shuts it down.
 */

const { chromium } = require("playwright");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const http = require("http");

const PROJECTS_ROOT = path.resolve(__dirname, "../../projects");
const OUT_DIR = path.resolve(__dirname, "../public/images/projects");

fs.mkdirSync(OUT_DIR, { recursive: true });

function waitForServer(url, timeoutMs = 90000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      http
        .get(url, (res) => {
          if (res.statusCode < 500) resolve();
          else setTimeout(check, 1500);
        })
        .on("error", () => {
          if (Date.now() - start > timeoutMs)
            reject(new Error(`Timeout waiting for ${url}`));
          else setTimeout(check, 1500);
        });
    };
    check();
  });
}

function startServer(cmd, args, cwd, env = {}) {
  const proc = spawn(cmd, args, {
    cwd,
    shell: true,
    stdio: "pipe",
    env: { ...process.env, ...env },
  });
  proc.stdout.on("data", (d) => process.stdout.write(`  [server] ${d}`));
  proc.stderr.on("data", (d) => process.stderr.write(`  [server] ${d}`));
  return proc;
}

async function screenshot(page, url, dest) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: 1280, height: 800 } });
  console.log(`  ✓ saved → ${path.basename(dest)}`);
}

async function installIfNeeded(cwd) {
  if (!fs.existsSync(path.join(cwd, "node_modules"))) {
    console.log("  Installing dependencies...");
    await new Promise((resolve, reject) => {
      const p = spawn("npm", ["install"], { cwd, shell: true, stdio: "inherit" });
      p.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`npm install failed with code ${code}`))));
    });
  }
}

async function captureNodeProject({ id, folder, port, urlPath = "/" }) {
  const cwd = path.join(PROJECTS_ROOT, folder);
  console.log(`\n[${id}] Starting dev server in ${folder}...`);
  await installIfNeeded(cwd);
  const proc = startServer("npm", ["run", "dev", "--", "--port", String(port)], cwd);
  try {
    await waitForServer(`http://localhost:${port}`);
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    await screenshot(page, `http://localhost:${port}${urlPath}`, path.join(OUT_DIR, `${id}.png`));
    await browser.close();
  } finally {
    proc.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 1000));
  }
}

async function captureStreamlitProject({ id, folder, entry }) {
  const cwd = path.join(PROJECTS_ROOT, folder);
  console.log(`\n[${id}] Starting Streamlit in ${folder}...`);
  const proc = startServer(
    "python",
    ["-m", "streamlit", "run", entry, "--server.headless", "true", "--server.port", "8501"],
    cwd
  );
  try {
    await waitForServer("http://localhost:8501", 120000);
    await new Promise((r) => setTimeout(r, 3000)); // extra wait for Streamlit render
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    await screenshot(page, "http://localhost:8501", path.join(OUT_DIR, `${id}.png`));
    await browser.close();
  } finally {
    proc.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 1000));
  }
}

(async () => {
  // CryptoVet — React+Vite vet finder (cse447)
  await captureNodeProject({
    id: "cryptovet",
    folder: "cse447/frontend",
    port: 5173,
  });

  // VetConnect — React+Vite vet finder (online-vet-finder)
  await captureNodeProject({
    id: "vetconnect",
    folder: "online-vet-finder/frontend",
    port: 5174,
  });

  // AI Copilot — Streamlit
  await captureStreamlitProject({
    id: "copilot",
    folder: "copilot",
    entry: "frontend/app.py",
  });

  // SlatePrep — Streamlit
  await captureStreamlitProject({
    id: "slateprep",
    folder: "SlatePrep",
    entry: "streamlit_app.py",
  });

  console.log("\nAll screenshots captured!");
})().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
