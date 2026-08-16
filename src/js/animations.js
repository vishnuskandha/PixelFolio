/**
 * Motion system — GSAP + ScrollTrigger.
 * Every entrance, parallax, kinetic and pinned interaction lives here.
 * Wrapped in gsap.matchMedia so reduced-motion users get a static page.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars, splitWords } from "./split.js";

gsap.registerPlugin(ScrollTrigger);

/* ── Hero intro (played once after the loader) ────────────── */
export function heroIntro() {
  const lines = [...document.querySelectorAll("[data-hero-line]")];
  const charInners = [];
  lines.forEach((line) => charInners.push(...splitChars(line)));

  const label = document.querySelector(".hero__label");
  const statement = document.querySelector(".hero__statement");
  const meta = document.querySelector(".hero__meta");
  const scroll = document.querySelector(".hero__scroll");
  const header = document.getElementById("siteHeader");

  const tl = gsap.timeline();

  tl.fromTo(
    charInners,
    { yPercent: 120, rotate: 6 },
    { yPercent: 0, rotate: 0, duration: 1.35, stagger: 0.045, ease: "expo.out" },
    0.1
  )
    .fromTo(
      [label, statement, meta, scroll],
      { y: 28, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, stagger: 0.09, ease: "power3.out" },
      0.55
    )
    .fromTo(
      header,
      { y: -26, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
      "-=0.8"
    )
    .add(() => {
      header.classList.add("is-visible");
      document.body.classList.add("is-loaded");
    });
}

/* ── Scroll-linked split headlines ───────────────────────── */
function initHeadlineSplits() {
  document.querySelectorAll("[data-split]").forEach((el) => {
    const useChars = el.dataset.split === "chars";
    const inners = useChars ? splitChars(el) : splitWords(el);

    gsap.fromTo(
      inners,
      { yPercent: 120, rotate: 3 },
      {
        yPercent: 0,
        rotate: 0,
        duration: 1.15,
        stagger: 0.045,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 84%" },
      }
    );
  });
}

/* ── Generic reveals ─────────────────────────────────────── */
function initReveals() {
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 44, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      }
    );
  });
}

/* ── Journey rail + items ────────────────────────────────── */
function initJourney() {
  gsap.fromTo(
    "#journeyRailFill",
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".journey__track",
        start: "top 75%",
        end: "bottom 60%",
        scrub: 0.5,
      },
    }
  );

  gsap.utils.toArray("[data-journey-item]").forEach((item) => {
    gsap.fromTo(
      item,
      { y: 56, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 86%" },
      }
    );

    ScrollTrigger.create({
      trigger: item,
      start: "top 62%",
      end: "bottom 45%",
      onEnter: () => item.classList.add("is-active"),
      onLeaveBack: () => item.classList.remove("is-active"),
    });
  });
}

/* ── Kinetic subject strips ──────────────────────────────── */
function initKinetic() {
  const rows = [
    document.getElementById("kineticRowA"),
    document.getElementById("kineticRowB"),
  ];
  rows.forEach((row, i) => {
    if (!row) return;
    const dir = i === 0 ? -1 : 1;
    const skewTo = gsap.quickTo(row, "skewX", { duration: 0.5, ease: "power3.out" });

    gsap.fromTo(
      row,
      { xPercent: dir * 6 },
      {
        xPercent: dir * -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".education",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) =>
            skewTo(gsap.utils.clamp(-8, 8, self.getVelocity() * 0.006)),
        },
      }
    );
  });
}

/* ── Experience lists ────────────────────────────────────── */
function initExperience() {
  const items = document.querySelectorAll(".experience__list li");
  gsap.fromTo(
    items,
    { x: -28, autoAlpha: 0 },
    {
      x: 0,
      autoAlpha: 1,
      duration: 0.9,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: { trigger: ".experience__list", start: "top 82%" },
    }
  );
}

/* ── Early + leadership stagers ──────────────────────────── */
function initStaggers() {
  gsap.utils.toArray(".early__entry").forEach((entry) => {
    gsap.fromTo(
      entry,
      { y: 60, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: entry, start: "top 85%" },
      }
    );
  });

  const leaderItems = document.querySelectorAll(".leadership__list li");
  gsap.fromTo(
    leaderItems,
    { y: 24, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.7,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: { trigger: ".leadership__list", start: "top 84%" },
    }
  );
}

/* ── Creative tiles ──────────────────────────────────────── */
function initCreativeTiles() {
  gsap.utils.toArray(".creative__tile").forEach((tile) => {
    const img = tile.querySelector("img");
    const meta = tile.querySelector(".creative__tile-meta");
    gsap.fromTo(
      img,
      { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: { trigger: tile, start: "top 86%" },
      }
    );
    gsap.fromTo(
      meta,
      { y: 22, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: tile, start: "top 78%" },
      }
    );
  });
}

/* ── Photography gallery ─────────────────────────────────── */
function initGallery() {
  gsap.utils.toArray(".gallery__item").forEach((item) => {
    const img = item.querySelector(".gallery__img");
    const trig = item;
    gsap.fromTo(
      item,
      { y: 70, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: trig, start: "top 92%" },
      }
    );
    gsap.fromTo(
      img,
      { clipPath: "inset(10% 6% 10% 6%)", scale: 1.18 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: { trigger: trig, start: "top 90%" },
      }
    );
  });
}

/* ── Cinematic parallax ──────────────────────────────────── */
function initCinematic() {
  const img = document.querySelector(".cinematic__img--main img");
  if (img) {
    gsap.fromTo(
      img,
      { scale: 1.2, yPercent: -5 },
      {
        scale: 1,
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".cinematic__frame",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      }
    );
  }

  const title = document.querySelector(".cinematic__title");
  if (title) {
    gsap.fromTo(
      title,
      { yPercent: 30 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".cinematic__frame",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      }
    );
  }

  const items = document.querySelectorAll(".cinematic__list li");
  gsap.fromTo(
    items,
    { y: 26, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.85,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cinematic__list", start: "top 86%" },
    }
  );
}

/* ── Content · pinned horizontal scroll ──────────────────── */
function initHorizontalContent() {
  const track = document.getElementById("contentTrack");
  if (!track) return;

  const distance = () => track.scrollWidth - window.innerWidth;

  const tween = gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      id: "contentHorizontal",
      trigger: ".content",
      start: "top top",
      end: () => "+=" + distance(),
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // area panels fade upward as they enter the stage
  gsap.utils.toArray(".content__panel:not(.content__panel--intro)").forEach((panel) => {
    gsap.fromTo(
      panel.querySelectorAll(".content__panel-index, .content__panel-word, .content__panel-img, .content__panel-note"),
      { y: 70, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          containerAnimation: tween,
          start: "left 88%",
          end: "left 40%",
        },
      }
    );
  });
}

/* ── Skills parallax ─────────────────────────────────────── */
function initSkills() {
  const groups = gsap.utils.toArray(".skills__group");
  groups.forEach((group, i) => {
    const words = group.querySelector(".skills__words");
    const dir = i === 0 ? -46 : i === 1 ? 30 : -20;
    gsap.fromTo(
      words,
      { y: dir },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: group,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      }
    );
  });
}

/* ── Why-work statements ─────────────────────────────────── */
function initWhy() {
  gsap.utils.toArray("[data-why-item]").forEach((item) => {
    const word = item.querySelector(".why__word");
    const note = item.querySelector(".why__note");
    gsap.fromTo(
      word,
      { y: 90, autoAlpha: 0, scale: 0.96 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 1.25,
        ease: "expo.out",
        scrollTrigger: { trigger: item, start: "top 74%" },
      }
    );
    gsap.fromTo(
      note,
      { y: 20, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 60%" },
      }
    );
  });
}

/* ── Next areas ──────────────────────────────────────────── */
function initNext() {
  const areas = document.querySelectorAll(".next__area");
  gsap.fromTo(
    areas,
    { y: 26, autoAlpha: 0, scale: 0.95 },
    {
      y: 0,
      autoAlpha: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: { trigger: ".next__areas", start: "top 86%" },
    }
  );
}

/* ── Footer + contact ────────────────────────────────────── */
function initContactFooter() {
  const socials = document.querySelectorAll(".contact__social");
  gsap.fromTo(
    socials,
    { y: 24, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: { trigger: ".contact__socials", start: "top 88%" },
    }
  );

  gsap.fromTo(
    ".site-footer",
    { y: 40, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".site-footer", start: "top 94%" },
    }
  );
}

/* ── Hero mouse parallax + scroll drift ──────────────────── */
function initHeroMotion() {
  const rld = document.getElementById("heroRld");
  const hero = document.querySelector(".hero");
  if (!rld || !hero) return;

  const xTo = gsap.quickTo(rld, "x", { duration: 1.1, ease: "power3.out" });
  const yTo = gsap.quickTo(rld, "y", { duration: 1.1, ease: "power3.out" });
  const rotTo = gsap.quickTo(rld, "rotate", { duration: 1.6, ease: "power3.out" });

  hero.addEventListener(
    "pointermove",
    (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      xTo(nx * -70);
      yTo(ny * -46);
      rotTo(nx * 5);
    },
    { passive: true }
  );

  gsap.to(rld, {
    yPercent: 34,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
    },
  });
}

/* ── Scroll progress ─────────────────────────────────────── */
function initProgress() {
  gsap.to("#scrollProgress span", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
  });
}

/* ── Entry point ─────────────────────────────────────────── */
export function initAnimations() {
  const mm = gsap.matchMedia();

  // everything scroll-linked sits behind this gate
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    initHeadlineSplits();
    initReveals();
    initJourney();
    initKinetic();
    initExperience();
    initStaggers();
    initCreativeTiles();
    initGallery();
    initCinematic();
    initHorizontalContent();
    initSkills();
    initWhy();
    initNext();
    initContactFooter();
    initHeroMotion();
    initProgress();
  });

  // layout refresh once fonts + images settle
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh, { once: true });
  if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});
}
