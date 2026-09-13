const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 5000));

  const height = await page.evaluate(() => document.body.scrollHeight);
  console.log("Total height:", height);

  for (const y of [0, 1000, 2000, 3000, 4000, 5000]) {
    await page.evaluate((sy) => window.scrollTo(0, sy), y);
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: `public/images/check-${y}.png`, fullPage: false });
    console.log("Captured y=" + y);
  }

  await browser.close();
  console.log("Done");
})();
