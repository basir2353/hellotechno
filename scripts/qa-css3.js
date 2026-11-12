const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--no-first-run"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/?v=css3" + Date.now(), { waitUntil: "networkidle0", timeout: 60000 });
  const css = await page.evaluate(() => {
    const sheets = [...document.styleSheets];
    for (const sheet of sheets) {
      let rules;
      try { rules = [...sheet.cssRules]; } catch { continue; }
      for (const rule of rules) {
        if ((rule.cssText || "").includes("max-width: 419px")) {
          return rule.cssText;
        }
      }
    }
    return null;
  });
  console.log(css);
  await browser.close();
})().catch(e => { console.error(String(e)); process.exit(1); });
