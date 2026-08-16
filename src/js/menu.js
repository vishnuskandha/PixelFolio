/**
 * Fullscreen menu — black overlay, staggered oversized links,
 * accessible button state (aria-expanded) + inert toggling,
 * scroll lock through Lenis.
 */
import gsap from "gsap";

export function initMenu({ scrollTo }) {
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("menuToggle");
  const items = [...menu.querySelectorAll(".menu__item-inner")];
  const sideBlocks = [...menu.querySelectorAll(".menu__side > *")];
  const foot = menu.querySelector(".menu__foot");

  let isOpen = false;

  const tl = gsap.timeline({ paused: true });

  tl.add(() => {
    menu.setAttribute("aria-hidden", "false");
    menu.inert = false;
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  })
    .fromTo(
      menu,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.75, ease: "expo.inOut" }
    )
    .fromTo(
      items,
      { yPercent: 115 },
      { yPercent: 0, duration: 0.95, ease: "expo.out", stagger: 0.07 },
      "-=0.4"
    )
    .fromTo(
      [foot, ...sideBlocks],
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 },
      "-=0.6"
    );

  const open = () => {
    isOpen = true;
    if (scrollTo?.stop) scrollTo.stop();
    tl.play();
  };

  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    tl.reverse();
    if (scrollTo?.start) scrollTo.start();
  };

  tl.eventCallback("onReverseComplete", () => {
    menu.setAttribute("aria-hidden", "true");
    menu.inert = true;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });

  toggle.addEventListener("click", () => (isOpen ? close() : open()));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) close();
  });

  // Menu link clicks → close menu, then scroll to target
  menu.addEventListener("click", (e) => {
    const link = e.target.closest("a[href^='#']");
    if (!link) return;
    e.preventDefault();
    const target = link.getAttribute("href");
    close();
    setTimeout(() => scrollTo?.(target), 350);
  });

  return { open, close, isOpen: () => isOpen };
}
