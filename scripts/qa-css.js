const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--no-first-run"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/?v=csscheck" + Date.now(), { waitUntil: "networkidle0", timeout: 60000 });
  const css = await page.evaluate(() => {
    const el = document.querySelector(".float-stack");
    const styles = getComputedStyle(el);
    // find matching rules
    const sheets = [...document.styleSheets];
    let hits = [];
    for (const sheet of sheets) {
      let rules;
      try { rules = [...sheet.cssRules]; } catch { continue; }
      for (const rule of rules) {
        if (rule.cssText && rule.cssText.includes("float-stack")) hits.push(rule.cssText.slice(0, 220));
      }
    }
    return { display: styles.display, bottom: styles.bottom, hits };
  });
  console.log(JSON.stringify(css, null, 2));
  await browser.close();
})().catch(e => { console.error(String(e)); process.exit(1); });
