/**
 * Custom cursor — desktop (pointer:fine) only.
 * Small dot + trailing ring. Ring expands on interactive elements and
 * shows a contextual label (VIEW / OPEN / EXPLORE / EMAIL / MENU …).
 * Driven by GSAP quickTo for smooth, frame-rate-independent interpolation.
 */
import gsap from "gsap";

const DEFAULTS = {
  menu: "MENU",
  close: "CLOSE",
  default: "",
};

export function initCursor() {
  const cursor = document.getElementById("cursor");
  if (!cursor) return;

  const dot = cursor.querySelector(".cursor__dot");
  const ring = cursor.querySelector(".cursor__ring");
  const label = cursor.querySelector(".cursor__label");

  const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
  const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
  const xRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
  const yRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

  let visible = false;

  const show = () => {
    if (!visible) {
      visible = true;
      gsap.to(cursor, { autoAlpha: 1, duration: 0.3 });
    }
  };

  const setState = (state, text) => {
    cursor.dataset.state = state || "";
    if (label) label.textContent = text || "";
  };

  const handleMove = (e) => {
    show();
    xDot(e.clientX);
    yDot(e.clientY);
    xRing(e.clientX);
    yRing(e.clientY);
  };

  const handleOver = (e) => {
    const target = e.target;
    const interactive = target.closest(
      "a, button, [data-cursor], [data-cursor-label], [role='button']"
    );

    if (!interactive) {
      setState("");
      return;
    }

    let text = interactive.dataset?.cursorLabel || interactive.dataset?.cursor || "";
    if (!text) {
      const href = interactive.getAttribute("href") || "";
      if (href.startsWith("mailto:")) text = "EMAIL";
      else text = "VIEW";
    }

    setState("text", text);
  };

  const handleLeave = () => {
    if (visible) {
      visible = false;
      gsap.to(cursor, { autoAlpha: 0, duration: 0.3 });
    }
  };

  // Update cursor label when the menu opens/closes
  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    new MutationObserver(() => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      if (open) setState("text", DEFAULTS.close);
    }).observe(menuToggle, { attributes: true, attributeFilter: ["aria-expanded"] });
  }

  window.addEventListener("pointermove", handleMove, { passive: true });
  document.addEventListener("pointerover", handleOver, { passive: true });
  document.addEventListener("pointerleave", handleLeave);

  gsap.set(cursor, { autoAlpha: 0 });
}
