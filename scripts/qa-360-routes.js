const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const outDir = path.join(process.env.TEMP, "ht-360-final");
fs.mkdirSync(outDir, { recursive: true });
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--window-size=360,780", "--force-device-scale-factor=1", "--no-first-run"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 1 });
  const routes = ["/", "/pricing", "/team", "/ai-employee", "/industries/hospitality", "/contact", "/demo", "/trial", "/blog", "/news", "/faq", "/partnerships", "/privacy", "/terms", "/use-cases", "/industries/aesthetics-dental", "/industries/restaurants-cafes-bakeries", "/industries/smb"];
  const results = [];
  for (const route of routes) {
    const res = await page.goto("http://localhost:3000" + route + "?v=qa1", { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise(r => setTimeout(r, 900));
    const info = await page.evaluate(() => ({
      title: document.title,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      sw: document.documentElement.scrollWidth,
      menuRight: (() => {
        const b = [...document.querySelectorAll("header button")].find(x => x.getAttribute("aria-label"));
        return b ? Math.round(b.getBoundingClientRect().right) : null;
      })(),
      hasSticky: !!document.querySelector(".sticky-mobile-cta"),
      waLinks: [...document.querySelectorAll("a[href]")].map(a => a.href).filter(h => /wa\.me|whatsapp/i.test(h))
    }));
    results.push({ route, status: res.status(), ...info });
    const safe = route === "/" ? "home" : route.replace(/\W+/g, "_").replace(/^_/, "");
    if (["/", "/pricing", "/team", "/contact", "/ai-employee"].includes(route)) {
      await page.screenshot({ path: path.join(outDir, safe + ".png") });
    }
  }
  // interaction smoke: open menu on home
  await page.goto("http://localhost:3000/?v=menu", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 800));
  await page.click('header button[aria-label]');
  await new Promise(r => setTimeout(r, 500));
  const menuOpen = await page.evaluate(() => !!document.querySelector('header a[href="/pricing"]') && document.body.innerText.includes("Pricing"));
  await page.screenshot({ path: path.join(outDir, "home-menu.png") });
  console.log(JSON.stringify({ results, menuOpen }, null, 2));
  await browser.close();
})().catch(e => { console.error(String(e)); process.exit(1); });
