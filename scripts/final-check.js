const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3001", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 5000));

  // Experience
  await page.evaluate(() => window.scrollTo(0, 5352));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: "public/images/final-experience.png" });

  // Projects - first two cards
  await page.evaluate(() => window.scrollTo(0, 8800));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: "public/images/final-projects1.png" });

  // Projects - GlowAura
  await page.evaluate(() => window.scrollTo(0, 10900));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: "public/images/final-projects2.png" });

  await browser.close();
  console.log("Done");
})();
