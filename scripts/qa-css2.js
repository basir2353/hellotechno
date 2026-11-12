const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--no-first-run"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/?v=css2" + Date.now(), { waitUntil: "networkidle0", timeout: 60000 });
  const css = await page.evaluate(() => {
    const sheets = [...document.styleSheets];
    let hits = [];
    for (const sheet of sheets) {
      let rules;
      try { rules = [...sheet.cssRules]; } catch { continue; }
      for (const rule of rules) {
        const t = rule.cssText || "";
        if (/419px|sticky-cta|promo-cta-mobile|0\.7rem/.test(t)) hits.push(t.slice(0, 300));
      }
    }
    return hits;
  });
  console.log(JSON.stringify(css, null, 2));
  // also fetch css file urls
  const hrefs = await page.evaluate(() => [...document.querySelectorAll('link[rel=stylesheet]')].map(l => l.href));
  console.log("hrefs", hrefs);
  await browser.close();
})().catch(e => { console.error(String(e)); process.exit(1); });
