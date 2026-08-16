/**
 * Generates cinematic, clearly-labelled SVG placeholders for the portfolio.
 * Run: node scripts/generate-placeholders.mjs
 *
 * These are NOT real photographs — each one is marked "PLACEHOLDER".
 * Drop real work into public/photos/ under the same filenames to swap them in.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "photos");

const INK = "#F2F0E8";
const MUTED = "#8A8A84";
const LINE = 0.16;

/* Config: name, width, height, label, gradient tones, accent hint */
const images = [
  { name: "portrait-01", w: 900, h: 1200, label: "PORTRAIT — 01", hint: "#FF5C35", from: "#1b1512", to: "#0a0a0a" },
  { name: "photo-01", w: 1000, h: 1333, label: "PORTRAIT — 01", hint: "#C8FF3D", from: "#14190c", to: "#0a0a0a" },
  { name: "photo-02", w: 1600, h: 1066, label: "CINEMATIC — 01", hint: "#FF5C35", from: "#1c110c", to: "#0a0a0a" },
  { name: "photo-03", w: 1200, h: 960, label: "STREET — 01", hint: "#C8FF3D", from: "#12160e", to: "#090909" },
  { name: "photo-04", w: 900, h: 1125, label: "EXPERIMENTAL — 01", hint: "#FF5C35", from: "#1a0f12", to: "#0a0a0a" },
  { name: "photo-05", w: 1600, h: 1066, label: "LIFESTYLE — 01", hint: "#C8FF3D", from: "#131711", to: "#090909" },
  { name: "photo-06", w: 900, h: 1350, label: "PORTRAIT — 02", hint: "#FF5C35", from: "#1c1410", to: "#0a0a0a" },
  { name: "photo-07", w: 1200, h: 900, label: "CINEMATIC — 02", hint: "#C8FF3D", from: "#0f150e", to: "#080808" },
  { name: "photo-08", w: 1000, h: 800, label: "STREET — 02", hint: "#FF5C35", from: "#181010", to: "#0a0a0a" },
  { name: "cinematic-01", w: 1920, h: 1080, label: "CINEMATIC — FRAME 01", hint: "#FF5C35", from: "#1e120b", to: "#070707" },
  { name: "cinematic-02", w: 1920, h: 1080, label: "CINEMATIC — FRAME 02", hint: "#C8FF3D", from: "#101407", to: "#070707" },
  { name: "content-01", w: 1200, h: 900, label: "EDIT — 01", hint: "#C8FF3D", from: "#11150b", to: "#090909" },
  { name: "content-02", w: 1200, h: 900, label: "EDIT — 02", hint: "#FF5C35", from: "#1b100c", to: "#090909" },
  { name: "content-03", w: 1200, h: 900, label: "EDIT — 03", hint: "#C8FF3D", from: "#10120a", to: "#080808" },
];

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function svg({ w, h, label, hint, from, to }) {
  const id = `g${w}x${h}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)} — placeholder">
  <defs>
    <radialGradient id="${id}" cx="42%" cy="38%" r="95%">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="55%" stop-color="${to}"/>
      <stop offset="100%" stop-color="#060606"/>
    </radialGradient>
    <radialGradient id="${id}-glow" cx="70%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${hint}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${hint}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-band" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F2F0E8" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#F2F0E8" stop-opacity="0"/>
    </linearGradient>
    <filter id="${id}-grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.055"/></feComponentTransfer>
      <feComposite in2="SourceGraphic" operator="over"/>
    </filter>
    <filter id="${id}-soft"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#${id})"/>
  <rect width="${w}" height="${h}" fill="url(#${id}-glow)"/>

  <!-- ghost circle, gives the frame a subject-like focal form -->
  <circle cx="${Math.round(w * 0.62)}" cy="${Math.round(h * 0.34)}" r="${Math.round(Math.min(w, h) * 0.14)}"
          fill="url(#${id}-band)" filter="url(#${id}-soft)"/>
  <circle cx="${Math.round(w * 0.62)}" cy="${Math.round(h * 0.34)}" r="${Math.round(Math.min(w, h) * 0.14)}"
          fill="none" stroke="#F2F0E8" stroke-opacity="${LINE}" stroke-width="1"/>

  <rect width="${w}" height="${h}" filter="url(#${id}-grain)"/>
  <rect x="1.5" y="1.5" width="${w - 3}" height="${h - 3}" fill="none" stroke="#F2F0E8" stroke-opacity="0.2"/>

  <text x="28" y="42" fill="${INK}" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" letter-spacing="3">${esc(label)}</text>
  <text x="28" y="${h - 22}" fill="${MUTED}" font-family="Arial, Helvetica, sans-serif" font-size="11" letter-spacing="2">PLACEHOLDER — REPLACE WITH YOUR WORK</text>
  <text x="28" y="${h - 40}" fill="${MUTED}" font-family="Arial, Helvetica, sans-serif" font-size="11" letter-spacing="2">${w} × ${h}</text>
</svg>
`;
}

mkdirSync(root, { recursive: true });
for (const img of images) {
  const file = join(root, `${img.name}.svg`);
  writeFileSync(file, svg(img), "utf8");
  console.log(`✓ ${img.name}.svg`);
}
console.log(`\nGenerated ${images.length} placeholders in public/photos/`);
