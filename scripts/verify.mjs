/**
 * Verification script — loads the site in a real browser (Chrome or
 * Edge, auto-detected), captures console/page errors, waits for the
 * loader, screenshots key sections, and exercises menu + mobile.
 *
 * Run `npm run preview` in one terminal, then `npm run verify` here.
 * Point at a specific browser with the CHROME_PATH env variable.
 */
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { launchBrowser } from "./lib/browser.mjs";

const BASE = "http://localhost:4173";
const SHOT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "shots");
const shot = (file) => join(SHOT_DIR, file);

mkdirSync(SHOT_DIR, { recursive: true });

const errors = [];
const consoleMessages = [];

const browser = await launchBrowser();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on("pageerror", (err) => errors.push(`PAGEERROR: ${err.message}`));
page.on("console", (msg) => {
  if (msg.type() === "error" || msg.type() === "warning") {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  }
});

await page.goto(BASE, { waitUntil: "domcontentloaded" });

// loader should complete within ~5s of real time
await page.waitForSelector("#loader", { state: "detached", timeout: 10000 });
console.log("✓ loader completed and removed");
await page.waitForTimeout(1200); // let hero intro finish

await page.screenshot({ path: shot("01-hero.png") });

// navigation bar visible?
const headerVisible = await page.isVisible("#siteHeader");
console.log(`✓ header visible: ${headerVisible}`);

// menu open/close
await page.click("#menuToggle");
await page.waitForTimeout(1300);
await page.screenshot({ path: shot("02-menu.png") });
const menuOpen = await page.getAttribute("#menu", "aria-hidden");
console.log(`✓ menu aria-hidden after open: ${menuOpen}`);
await page.keyboard.press("Escape");
await page.waitForTimeout(1200);
const menuClosed = await page.getAttribute("#menu", "aria-hidden");
console.log(`✓ menu aria-hidden after close: ${menuClosed}`);

// scroll through sections, screenshot each
const sections = [
  ["#intro", "03-intro.png"],
  ["#journey", "04-journey.png"],
  ["#education", "05-education.png"],
  ["#experience", "06-experience.png"],
  ["#early", "07-early.png"],
  ["#leadership", "08-leadership.png"],
  ["#creative", "09-creative.png"],
  ["#photography", "10-photography.png"],
  ["#cinematic", "11-cinematic.png"],
  ["#content", "12-content.png"],
  ["#skills", "13-skills.png"],
  ["#certification", "14-certification.png"],
  ["#interests", "15-interests.png"],
  ["#why", "16-why.png"],
  ["#next", "17-next.png"],
  ["#contact", "18-contact.png"],
];

for (const [sel, file] of sections) {
  await page.evaluate((s) => {
    document.querySelector(s)?.scrollIntoView({ block: "start" });
  }, sel);
  await page.waitForTimeout(1400);
  try {
    await page.screenshot({ path: shot(file) });
    console.log(`✓ screenshot ${file}`);
  } catch (e) {
    console.log(`✗ screenshot ${file}: ${e.message}`);
  }
}

// scroll to top
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);

// full page screenshot
await page.screenshot({ path: shot("99-fullpage.png"), fullPage: true });
console.log("✓ full page screenshot");

// mobile viewport
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on("pageerror", (err) => errors.push(`MOBILE PAGEERROR: ${err.message}`));
await mobile.goto(BASE, { waitUntil: "domcontentloaded" });
await mobile.waitForSelector("#loader", { state: "detached", timeout: 10000 });
await mobile.waitForTimeout(1200);
await mobile.screenshot({ path: shot("90-mobile-hero.png") });
const overflow = await mobile.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
);
console.log(`✓ mobile horizontal overflow: ${overflow}px`);
await mobile.evaluate(() => document.querySelector("#skills")?.scrollIntoView());
await mobile.waitForTimeout(1200);
await mobile.screenshot({ path: shot("91-mobile-skills.png") });
await mobile.close();

console.log("\n=== CONSOLE (errors/warnings) ===");
consoleMessages.forEach((m) => console.log(m));
if (consoleMessages.length === 0) console.log("(none)");

console.log("\n=== PAGE ERRORS ===");
errors.forEach((e) => console.log(e));
if (errors.length === 0) console.log("(none)");

await browser.close();
console.log("\nDONE");
