const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--no-first-run"]
  });
  const page = await browser.newPage();
  const run = async (w,h) => {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto("http://localhost:3000/?v=f" + w + Date.now(), { waitUntil: "networkidle0", timeout: 60000 });
    return page.evaluate(() => {
      const float = document.querySelector(".float-stack");
      const h1 = document.querySelector("h1");
      return {
        floatDisplay: float ? getComputedStyle(float).display : null,
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        h1Right: h1 ? Math.round(h1.getBoundingClientRect().right) : null,
        innerW: window.innerWidth,
        stickyOk: [...document.querySelectorAll(".sticky-mobile-cta a")].every(a => a.getBoundingClientRect().right <= window.innerWidth + 1)
      };
    });
  };
  const r360 = await run(360,780);
  await page.screenshot({ path: process.env.TEMP + "/ht-final-verify/home-360b.png" });
  const r390 = await run(390,844);
  const r1280 = await run(1280,800);
  console.log(JSON.stringify({ r360, r390, r1280 }, null, 2));
  await browser.close();
})().catch(e => { console.error(String(e)); process.exit(1); });
