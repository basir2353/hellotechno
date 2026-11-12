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
    await page.goto("http://localhost:3000/?v=h" + w + Date.now(), { waitUntil: "networkidle0", timeout: 60000 });
    const info = await page.evaluate(() => ({
      cls: document.querySelector(".float-stack")?.className,
      floatDisplay: getComputedStyle(document.querySelector(".float-stack")).display,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      stickyOk: [...document.querySelectorAll(".sticky-mobile-cta a")].every(a => a.getBoundingClientRect().right <= window.innerWidth + 1)
    }));
    await page.screenshot({ path: process.env.TEMP + "/ht-final-verify/" + file });
    return info;
  };
  console.log(JSON.stringify({
    r360: await run(360,780,"home-360-final.png"),
    r390: await run(390,844,"home-390-final.png"),
    r1280: await run(1280,800,"home-desktop-final.png")
  }, null, 2));
  await browser.close();
})().catch(e => { console.error(String(e)); process.exit(1); });
