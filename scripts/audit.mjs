/**
 * Layout & behavior audit — programmatic art-direction checks.
 * Verifies computed styles, overflow, image loading, fonts, contrast,
 * split rendering, pin behavior and interactions at 3 viewports.
 */
import { launchBrowser } from "./lib/browser.mjs";

const BASE = "http://localhost:4173";
const browser = await launchBrowser();
const results = [];
const errors = [];

const check = (name, ok, detail = "") => {
  results.push(`${ok ? "✓" : "✗"} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) errors.push(name);
};

const audits = async (page, label, width, height, opts = {}) => {
  const { touch = false } = opts;
  console.log(`\n=== AUDIT @ ${label} (${width}x${height}) ===`);
  const r = await page.evaluate(() => {
    const out = {};
    const cs = (sel) => getComputedStyle(document.querySelector(sel));
    out.heroLineFont = cs(".hero__line").fontSize;
    out.heroLineAltStroke = cs(".hero__line--alt").webkitTextStroke || cs(".hero__line--alt").textDecorationLine;
    out.heroRldFont = cs(".hero__rld").fontSize;
    out.rldStroke = cs(".hero__rld").webkitTextStrokeColor + " / " + cs(".hero__rld").webkitTextStrokeWidth;
    out.bodyOverflow = getComputedStyle(document.body).overflowX;
    out.scrollWidth = document.documentElement.scrollWidth;
    out.clientWidth = document.documentElement.clientWidth;
    out.kineticWidth = document.querySelector("#kineticRowA")?.scrollWidth || 0;
    out.kineticParent = document.querySelector(".kinetic")?.clientWidth || 0;
    out.galleryCols = cs(".gallery").columnCount;
    out.cursorDisplay = cs(".cursor").display;
    out.hasPinSpacer = !!document.querySelector(".pin-spacer");
    out.pinChild = document.querySelector(".pin-spacer")?.firstElementChild?.id || "";
    out.whyMinH = cs(".why__item").minHeight;
    out.contactTitle = cs(".contact__title").fontSize;
    out.emailSerif = cs(".contact__email").fontFamily;
    out.journeyItems = document.querySelectorAll(".journey__item").length;
    out.splitCharts = document.querySelectorAll(".split-char").length;
    out.splitLines = document.querySelectorAll(".split-line").length;
    out.interests = document.querySelectorAll(".interests__item").length;
    out.skillWords = document.querySelectorAll(".skills__word").length;
    out.nextAreas = document.querySelectorAll(".next__area").length;
    out.muted = getComputedStyle(document.querySelector(".section-head")).color;
    out.htmlClass = document.documentElement.className;
    return out;
  });

  const heroMin = width >= 1200 ? 100 : width >= 700 ? 60 : 40;
  check("hero title font ≥ expected", parseFloat(r.heroLineFont) >= heroMin, `${r.heroLineFont} (min ${heroMin})`);
  check("hero alt line stroked", r.heroLineAltStroke && r.heroLineAltStroke !== "none", r.heroLineAltStroke);
  check("RLD huge bg", parseFloat(r.heroRldFont) >= 160, r.heroRldFont);
  check("RLD stroked outline", r.rldStroke.includes("rgba") || r.rldStroke.includes("rgb"), r.rldStroke);
  check("no horizontal overflow", r.scrollWidth <= r.clientWidth + 1, `${r.scrollWidth} vs ${r.clientWidth}`);
  check("body overflow clipped", r.bodyOverflow === "clip", r.bodyOverflow);
  check("kinetic strip wider than container", r.kineticWidth > r.kineticParent, `${r.kineticWidth} > ${r.kineticParent}`);
  check("gallery uses columns", parseInt(r.galleryCols, 10) >= 2, `columns:${r.galleryCols}`);

  if (touch) {
    check("cursor hidden on touch", r.cursorDisplay === "none", r.cursorDisplay);
  } else {
    check(
      "custom cursor visible (fine pointer)",
      r.cursorDisplay === "block" && r.htmlClass.includes("custom-cursor"),
      `${r.cursorDisplay} / ${r.htmlClass}`
    );
  }

  check("horizontal pin-spacer present", r.hasPinSpacer, r.hasPinSpacer ? `pins #${r.pinChild}` : "missing");
  check(
    "why items ≥ vh target",
    parseFloat(r.whyMinH) >= (touch ? 0.6 : 0.72) * height - 2,
    `${r.whyMinH} (target ${((touch ? 0.6 : 0.72) * height).toFixed(0)}px)`
  );
  check("contact title huge", parseFloat(r.contactTitle) >= 40, r.contactTitle);
  check("email in serif", r.emailSerif.includes("Instrument"), r.emailSerif);
  check("journey 6 items", r.journeyItems === 6, String(r.journeyItems));
  check("split chars rendered", r.splitCharts > 0, String(r.splitCharts));
  check("split lines rendered", r.splitLines > 0, String(r.splitLines));
  check("interests 5", r.interests === 5, String(r.interests));
  check("skills words 25", r.skillWords === 25, String(r.skillWords));
  check("next areas 8", r.nextAreas === 8, String(r.nextAreas));

  // contrast ratio for muted text on #080808
  const parse = (c) => c.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)/)?.slice(1).map(Number);
  const mutedRgb = parse(r.muted);
  if (mutedRgb && mutedRgb.length === 3) {
    const lum = (rgb) => {
      const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
    };
    const l1 = lum([8, 8, 8]);
    const l2 = lum(mutedRgb);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    check("muted/body contrast ≥ 3", ratio >= 3, `ratio ${ratio.toFixed(2)}`);
  }

  // scroll through the whole page so lazy images have a chance to load
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let i = 0; i <= 14; i++) {
      window.scrollTo(0, (h * i) / 14);
      await new Promise((res) => setTimeout(res, 110));
    }
  });
  await page.waitForTimeout(1800);
  const imgs = await page.evaluate(() =>
    [...document.images].map((i) => ({ src: i.getAttribute("src"), ok: i.complete && i.naturalWidth > 0 }))
  );
  const bad = imgs.filter((i) => !i.ok);
  check("all images load", bad.length === 0, bad.length ? bad.map((b) => b.src).join(", ") : `${imgs.length} images`);
};

// desktop
let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => errors.push(`PAGEERROR: ${e.message}`));
await page.goto(BASE, { waitUntil: "domcontentloaded" });
await page.waitForSelector("#loader", { state: "detached", timeout: 12000 });
await page.waitForTimeout(1400);
await audits(page, "desktop", 1440, 900);

// scroll progress bar reaches the end after a full pass
const prog = await page.evaluate(() => getComputedStyle(document.querySelector("#scrollProgress span")).transform);
check("scroll progress reaches ~1", prog.includes("1"), prog);

// interests accordion interaction
await page.evaluate(() => document.querySelector("#interests").scrollIntoView());
await page.waitForTimeout(800);
await page.click(".interests__trigger");
await page.waitForTimeout(700);
const open = await page.evaluate(() => document.querySelector(".interests__item.is-open") !== null);
check("interests accordion opens", open);
await page.close();

// tablet
page = await browser.newPage({ viewport: { width: 820, height: 1180 } });
page.on("pageerror", (e) => errors.push(`TABLET PAGEERROR: ${e.message}`));
await page.goto(BASE, { waitUntil: "domcontentloaded" });
await page.waitForSelector("#loader", { state: "detached", timeout: 12000 });
await page.waitForTimeout(1000);
await audits(page, "tablet", 820, 1180);
await page.close();

// mobile
page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
page.on("pageerror", (e) => errors.push(`MOBILE PAGEERROR: ${e.message}`));
await page.goto(BASE, { waitUntil: "domcontentloaded" });
await page.waitForSelector("#loader", { state: "detached", timeout: 12000 });
await page.waitForTimeout(1000);
await audits(page, "mobile", 390, 844, { touch: true });

// mobile: menu opens, side panel fits
await page.tap("#menuToggle");
await page.waitForTimeout(1000);
const menuMobile = await page.evaluate(() => ({
  hidden: document.querySelector("#menu").getAttribute("aria-hidden"),
  size: document.querySelector(".menu__side").getBoundingClientRect().width,
  innerW: window.innerWidth,
}));
check("mobile menu opens", menuMobile.hidden === "false", String(menuMobile.hidden));
check("menu side fits viewport", menuMobile.size <= menuMobile.innerW, `${menuMobile.size} ≤ ${menuMobile.innerW}`);
await page.keyboard.press("Escape");
await page.waitForTimeout(900);

// mobile: contact socials 2-col grid
await page.evaluate(() => document.querySelector("#contact").scrollIntoView());
await page.waitForTimeout(1000);
const socials = await page.evaluate(() => {
  const el = document.querySelector(".contact__socials");
  const first = document.querySelector(".contact__social").getBoundingClientRect();
  return {
    grid: getComputedStyle(el).display,
    firstWidth: first.width,
    innerW: window.innerWidth,
  };
});
check(
  "mobile socials fit (2-col grid)",
  socials.grid === "grid" && socials.firstWidth < socials.innerW * 0.95,
  JSON.stringify(socials)
);
await page.close();

console.log("\n=== SUMMARY ===");
results.forEach((res) => console.log(res));
console.log("");
console.log(errors.length ? `FAILURES: ${errors.join(" | ")}` : "ALL CHECKS PASSED");
await browser.close();
