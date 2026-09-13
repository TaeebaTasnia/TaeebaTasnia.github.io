/**
 * Run: node scripts/capture-screenshots.js
 * Requires: npm install -D playwright && npx playwright install chromium
 *
 * Visits each project's GitHub repo and saves a screenshot to
 * public/images/projects/ with the correct filename.
 */

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const PROJECTS = [
  { id: "copilot",    url: "https://github.com/TaeebaTasnia/copilot" },
  { id: "churnguard", url: "https://github.com/TaeebaTasnia/telco-churn-prediction" },
  { id: "slateprep",  url: "https://github.com/TaeebaTasnia/SlatePrep" },
  { id: "cryptovet",  url: "https://github.com/TaeebaTasnia/cse447" },
  { id: "glowaura",   url: "https://github.com/TaeebaTasnia/glowaura-skincare-e-commerce" },
  { id: "vetconnect", url: "https://github.com/provatsaha/online-vet-finder" },
];

const OUT_DIR = path.join(__dirname, "../public/images/projects");

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });

  for (const { id, url } of PROJECTS) {
    console.log(`Capturing ${id}...`);
    await page.goto(url, { waitUntil: "networkidle" });
    // Wait for GitHub repo content to load
    await page.waitForTimeout(1500);
    const dest = path.join(OUT_DIR, `${id}.png`);
    await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: 1280, height: 720 } });
    console.log(`  ✓ saved → public/images/projects/${id}.png`);
  }

  await browser.close();
  console.log("\nDone! Now update data.ts image fields.");
})();
