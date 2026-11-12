const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const outDir = path.join(process.env.TEMP, "ht-final-verify");
fs.mkdirSync(outDir, { recursive: true });
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--no-first-run"]
  });
  const page = await browser.newPage();
  const check = async (w, h, name) => {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto("http://localhost:3000/?v=final" + w, { waitUntil: "domcontentloaded" });
    await new Promise(r => setTimeout(r, 1200));
    const info = await page.evaluate(() => {
      const float = document.querySelector(".float-stack");
      const sticky = document.querySelector(".sticky-mobile-cta");
      return {
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        floatDisplay: float ? getComputedStyle(float).display : null,
        stickyText: sticky ? sticky.innerText.replace(/\s+/g, " ") : null,
        stickyChildrenOk: sticky ? [...sticky.querySelectorAll("a")].every(a => a.getBoundingClientRect().right <= window.innerWidth + 1) : null,
        wa: [...document.querySelectorAll("a[href]")].some(a => /wa\.me|whatsapp\.com/i.test(a.href)),
        unsplash: [...document.querySelectorAll("img")].map(i => i.currentSrc || i.src).filter(s => /unsplash/i.test(s))
      };
    });
    await page.screenshot({ path: path.join(outDir, name + ".png") });
    return info;
  };
  const r360 = await check(360, 780, "home-360");
  const r390 = await check(390, 844, "home-390");
  const r1280 = await check(1280, 800, "home-desktop");
  // slug routes
  const slugs = ["/blog/overnight-booking-leakage", "/news/manama-office", "/login"];
  const slugResults = [];
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 1 });
  for (const s of slugs) {
    const res = await page.goto("http://localhost:3000" + s, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise(r => setTimeout(r, 600));
    slugResults.push({ s, status: res.status(), overflow: await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1) });
  }
  console.log(JSON.stringify({ r360, r390, r1280, slugResults }, null, 2));
  await browser.close();
})().catch(e => { console.error(String(e)); process.exit(1); });
