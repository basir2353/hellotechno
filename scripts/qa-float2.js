const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--no-first-run"]
  });
  const page = await browser.newPage();
  const run = async (w,h,file) => {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto("http://localhost:3000/?v=g" + w + Date.now(), { waitUntil: "networkidle0", timeout: 60000 });
    const info = await page.evaluate(() => ({
      floatDisplay: getComputedStyle(document.querySelector(".float-stack")).display,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      stickyOk: [...document.querySelectorAll(".sticky-mobile-cta a")].every(a => a.getBoundingClientRect().right <= window.innerWidth + 1),
      h1Right: Math.round(document.querySelector("h1").getBoundingClientRect().right),
      innerW: window.innerWidth
    }));
    if (file) await page.screenshot({ path: process.env.TEMP + "/ht-final-verify/" + file });
    return info;
  };
  const r360 = await run(360,780,"home-360-final.png");
  const r390 = await run(390,844,"home-390-final.png");
  const r1280 = await run(1280,800,"home-desktop-final.png");
  console.log(JSON.stringify({ r360, r390, r1280 }, null, 2));
  await browser.close();
})().catch(e => { console.error(String(e)); process.exit(1); });
