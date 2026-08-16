/**
 * PORTFOLIO TEMPLATE — ENTRY POINT
 * Boot order: render → reduced-motion flag → cursor → loader →
 * hero intro → smooth scroll → menu → scroll-linked animations.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import "./styles/base.css";
import "./styles/components.css";
import "./styles/sections.css";
import "./styles/responsive.css";

import { renderAll } from "./js/render.js";
import { initCursor } from "./js/cursor.js";
import { initLoader } from "./js/loader.js";
import { initMenu } from "./js/menu.js";
import { initAnimations, heroIntro } from "./js/animations.js";
import { seo } from "./data.js";

gsap.registerPlugin(ScrollTrigger);

/* ── Environment flags ───────────────────────────────────── */
const reducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (reducedMotion) document.documentElement.classList.add("reduced-motion");
if (finePointer && !reducedMotion) {
  document.documentElement.classList.add("custom-cursor");
}

/* ── SEO from data ───────────────────────────────────────── */
document.title = seo.title;
document
  .querySelector('meta[name="description"]')
  ?.setAttribute("content", seo.description);
document
  .querySelector('meta[property="og:title"]')
  ?.setAttribute("content", seo.title);
document
  .querySelector('meta[property="og:description"]')
  ?.setAttribute("content", seo.description);
document
  .querySelector('meta[property="og:image"]')
  ?.setAttribute("content", seo.ogImage);
document
  .querySelector('meta[name="twitter:title"]')
  ?.setAttribute("content", seo.title);
document
  .querySelector('meta[name="twitter:description"]')
  ?.setAttribute("content", seo.description);

/* JSON-LD structured data — injected from seo.jsonLd */
const jsonLd = document.getElementById("jsonLd");
if (jsonLd && seo.jsonLd) jsonLd.textContent = JSON.stringify(seo.jsonLd);

/* ── Content ─────────────────────────────────────────────── */
renderAll();

/* ── Custom cursor ───────────────────────────────────────── */
if (finePointer && !reducedMotion) initCursor();

/* ── Smooth scroll (Lenis) ───────────────────────────────── */
let lenis = null;
if (!reducedMotion) {
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

const scrollToTarget = (target) => {
  if (lenis) {
    if (target === "#home" || target === "#top") lenis.scrollTo(0);
    else lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  } else {
    const el =
      target === "#home" || target === "#top"
        ? document.body
        : document.querySelector(target);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

/* ── Header scrim (readability over busy sections) ───────── */
const header = document.getElementById("siteHeader");
if (header) {
  const onScroll = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 60);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ── In-page anchors (hero scroll, footer top, menu) ─────── */
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link || link.closest("#menu")) return; // menu handles its own flow
  const target = link.getAttribute("href");
  if (target === "#") return;
  e.preventDefault();
  scrollToTarget(target);
});

/* ── Menu ────────────────────────────────────────────────── */
initMenu({
  scrollTo: scrollToTarget,
  stop: () => lenis?.stop(),
  start: () => lenis?.start(),
});

/* ── Animations ──────────────────────────────────────────── */
initAnimations();

/* ── Loader → hero intro ─────────────────────────────────── */
if (reducedMotion) {
  // reveal everything instantly, no loader drama
  document.getElementById("loader")?.remove();
  const header = document.getElementById("siteHeader");
  header?.classList.add("is-visible");
  document.body.classList.add("is-loaded");
} else {
  initLoader(() => {
    heroIntro();
  });
}

/* ── Final layout settle ─────────────────────────────────── */
window.addEventListener(
  "load",
  () => {
    ScrollTrigger.refresh();
  },
  { once: true }
);
