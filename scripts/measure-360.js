const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--window-size=360,780", "--force-device-scale-factor=1", "--no-first-run"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/?v=dom360b", { waitUntil: "domcontentloaded", timeout: 60000 });
  await new Promise(r => setTimeout(r, 2500));
  const metrics = await page.evaluate(() => {
    const sticky = document.querySelector(".sticky-mobile-cta");
    const menu = document.querySelector("header button[aria-expanded]");
    return {
      docSW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      stickyText: sticky ? sticky.innerText.replace(/\s+/g," ") : null,
      stickyChildren: sticky ? [...sticky.querySelectorAll("a")].map(a => ({
        text: a.textContent.trim(),
        w: Math.round(a.getBoundingClientRect().width),
        right: Math.round(a.getBoundingClientRect().right),
        overflow: a.scrollWidth > a.clientWidth + 1
      })) : [],
      menuRight: menu ? Math.round(menu.getBoundingClientRect().right) : null,
      pills: [...document.querySelectorAll(".pill")].slice(0,4).map(el => ({
        text: el.textContent.trim().slice(0,50),
        w: Math.round(el.getBoundingClientRect().width),
        right: Math.round(el.getBoundingClientRect().right),
        wrapOk: el.scrollWidth <= el.clientWidth + 2
      }))
    };
  });
  console.log(JSON.stringify(metrics, null, 2));
  await page.screenshot({ path: process.env.TEMP + "/ht-360-v4-home.png" });
  await browser.close();
})().catch(e => { console.error(String(e)); process.exit(1); });
