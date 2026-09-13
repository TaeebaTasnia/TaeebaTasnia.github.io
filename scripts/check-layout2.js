const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3001", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 5000));

  // Get section positions
  const sections = await page.evaluate(() => {
    const result = [];
    const allSections = document.querySelectorAll("section");
    allSections.forEach(s => {
      const rect = s.getBoundingClientRect();
      const id = s.id || "(no id)";
      result.push({
        id,
        top: Math.round(rect.top + window.scrollY),
        height: Math.round(s.scrollHeight),
        text: s.textContent?.slice(0, 80).trim()
      });
    });
    return result;
  });

  console.log("Total page height:", await page.evaluate(() => document.body.scrollHeight));
  console.log("Sections:");
  sections.forEach(s => console.log(JSON.stringify(s)));

  await browser.close();
})();
