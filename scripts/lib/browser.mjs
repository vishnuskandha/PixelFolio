/**
 * Shared browser launcher for the verification scripts.
 *
 * Tries, in order:
 *   1. CHROME_PATH environment variable
 *   2. Common install locations for Chrome and Edge
 *   3. Playwright's bundled Chromium
 *
 * Works out of the box on Windows, macOS and Linux — no manual
 * configuration needed.
 */
import { chromium } from "playwright-core";
import { existsSync } from "node:fs";

const CANDIDATES = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/opt/google/chrome/chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
].filter(Boolean);

/**
 * Launch a headless Chromium-based browser (Chrome or Edge).
 * @returns {Promise<import("playwright-core").Browser>}
 */
export async function launchBrowser(opts = {}) {
  for (const path of CANDIDATES) {
    if (existsSync(path)) {
      try {
        return await chromium.launch({ ...opts, executablePath: path, headless: true });
      } catch {
        // this candidate failed to launch — try the next one
      }
    }
  }

  try {
    return await chromium.launch({ ...opts, headless: true });
  } catch {
    throw new Error(
      "Could not find Chrome or Edge.\n" +
        "Install either browser, or point the scripts at your browser with:\n" +
        "  $env:CHROME_PATH=\"C:\\path\\to\\chrome.exe\"  (PowerShell)\n" +
        "  CHROME_PATH=/path/to/chrome npm run verify     (macOS / Linux)"
    );
  }
}
