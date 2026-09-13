const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3001", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 5000));

  // GlowAura card (5th project, each card ~500px, projects start at 8800+200 label = 9000)
  await page.evaluate((y) => window.scrollTo(0, y), 10800);
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: "public/images/ss-glowaura.png" });
  console.log("GlowAura captured");

  await browser.close();
  console.log("Done");
})();
