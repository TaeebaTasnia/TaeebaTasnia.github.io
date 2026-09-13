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
        if (Date.now() - start > timeoutMs) reject(new Error("Timeout"));
        else setTimeout(check, 2000);
      });
    };
    check();
  });
}

(async () => {
  const proc = spawn(
    "D:\\python.exe",
    ["-m", "streamlit", "run", "streamlit_app.py", "--server.headless", "true", "--server.port", "8520"],
    { cwd: path.join(PROJECTS_ROOT, "SlatePrep/adaptive-prep-system"), shell: true, stdio: "pipe" }
  );
  proc.stdout.on("data", (d) => process.stdout.write("  " + d));
  proc.stderr.on("data", (d) => process.stderr.write("  ERR: " + d));

  try {
    await waitForServer("http://localhost:8520");
    console.log("Server up, launching browser...");

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("http://localhost:8520", { waitUntil: "domcontentloaded", timeout: 30000 });

    // Wait for the stApp to appear
    await page.waitForSelector('[data-testid="stApp"]', { timeout: 30000 });
    console.log("stApp found, waiting for spinner to clear...");

    // Wait until the spinner/loading element is gone (Streamlit shows stSpinner while processing)
    await page.waitForFunction(() => {
      const spinners = document.querySelectorAll('[data-testid="stSpinner"]');
      const statusWidget = document.querySelector('[data-testid="stStatusWidget"]');
      return spinners.length === 0 && !statusWidget;
    }, { timeout: 60000 }).catch(() => console.log("  spinner timeout — shooting anyway"));

    await new Promise((r) => setTimeout(r, 2000));
    const dest = path.join(OUT_DIR, "slateprep.png");
    await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: 1280, height: 800 }, timeout: 0 });
    console.log(`✓ slateprep.png (${fs.statSync(dest).size} bytes)`);
    await browser.close();
  } finally {
    proc.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 1000));
  }
})().catch((e) => { console.error("Fatal:", e.message); process.exit(1); });
