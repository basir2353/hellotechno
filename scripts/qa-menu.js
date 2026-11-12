const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--no-first-run"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/?v=menu3", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 1200));
  await page.click('header button[aria-label="Menu"]');
  await new Promise(r => setTimeout(r, 700));
  const after = await page.evaluate(() => ({
    expanded: document.querySelector('header button[aria-label="Menu"]')?.getAttribute("aria-expanded"),
    mobileLinks: [...document.querySelectorAll("header .border-t a")].map(a => a.textContent.trim()).filter(Boolean).slice(0, 12)
  }));
  console.log(JSON.stringify(after, null, 2));
  await page.screenshot({ path: process.env.TEMP + "/ht-360-final/home-menu.png" });

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/?v=390", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 1000));
  const m390 = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    floatDisplay: getComputedStyle(document.querySelector(".float-stack")).display,
    stickyText: document.querySelector(".sticky-mobile-cta")?.innerText.replace(/\s+/g," ")
  }));
  console.log("390", JSON.stringify(m390));
  await page.screenshot({ path: process.env.TEMP + "/ht-360-final/home-390.png" });
  await browser.close();
})().catch(e => { console.error(String(e)); process.exit(1); });
