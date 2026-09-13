const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3001", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 5000));

  // Home section at 4410
  await page.evaluate((y) => window.scrollTo(0, y), 4410);
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: "public/images/ss-home.png" });
  console.log("Home captured");

  // Experience section at 5352
  await page.evaluate((y) => window.scrollTo(0, y), 5352);
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: "public/images/ss-experience.png" });
  console.log("Experience captured");

  // Projects section at 8800
  await page.evaluate((y) => window.scrollTo(0, y), 8800);
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: "public/images/ss-projects.png" });
  console.log("Projects captured");

  // Projects mid (2nd card)
  await page.evaluate((y) => window.scrollTo(0, y), 9400);
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: "public/images/ss-projects2.png" });
  console.log("Projects2 captured");

  await browser.close();
  console.log("Done");
})();
