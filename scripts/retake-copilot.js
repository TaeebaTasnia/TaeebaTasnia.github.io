const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT_DIR = path.resolve(__dirname, "../public/images/projects");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("https://github.com/TaeebaTasnia/copilot", { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 3000));
  const dest = path.join(OUT_DIR, "copilot.png");
  await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: 1280, height: 800 } });
  console.log("saved copilot.png size:", fs.statSync(dest).size);
  await browser.close();
})().catch(console.error);
