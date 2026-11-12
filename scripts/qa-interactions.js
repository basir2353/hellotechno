const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: ["--no-first-run"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/?v=menu2", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 1200));
  const before = await page.evaluate(() => ({
    labels: [...document.querySelectorAll("header button")].map(b => ({ aria: b.getAttribute("aria-label"), expanded: b.getAttribute("aria-expanded"), text: b.textContent.trim() }))
  }));
  console.log("buttons", JSON.stringify(before));
  await page.click('header button[aria-expanded]');
  await new Promise(r => setTimeout(r, 600));
  const after = await page.evaluate(() => ({
    expanded: document.querySelector('header button[aria-expanded]')?.getAttribute("aria-expanded"),
    hasPricing: [...document.querySelectorAll("header a")].some(a => a.getAttribute("href") === "/pricing" && a.offsetParent !== null),
    mobileLinks: [...document.querySelectorAll("header a")].filter(a => a.closest(".border-t")).map(a => a.textContent.trim()).slice(0,8)
  }));
  console.log("after", JSON.stringify(after, null, 2));
  // form submit smoke on contact
  await page.goto("http://localhost:3000/contact?v=form", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 800));
  const formInfo = await page.evaluate(() => {
    const form = document.querySelector("form");
    if (!form) return { hasForm: false };
    const inputs = [...form.querySelectorAll("input,textarea,select")].map(i => i.getAttribute("name") || i.getAttribute("type") || i.tagName);
    return { hasForm: true, inputs, action: form.getAttribute("action"), method: form.getAttribute("method") };
  });
  console.log("form", JSON.stringify(formInfo));
  await browser.close();
})().catch(e => { console.error(String(e)); process.exit(1); });
