/**
 * Cinematic loader — brand mark → name reveal → 00 → 100 counter with
 * horizontal progress line → slides upward, then the hero intro plays.
 * Respects prefers-reduced-motion (skips straight to done).
 */
import gsap from "gsap";

export function initLoader(onDone) {
  const loader = document.getElementById("loader");
  const countEl = document.getElementById("loaderCount");
  const fill = document.getElementById("loaderFill");
  const nameEl = loader?.querySelector(".loader__name-char");
  const stageEl = loader?.querySelector(".loader__stage");

  if (!loader) {
    onDone();
    return;
  }

  const finish = () => {
    gsap.to(loader, {
      yPercent: -100,
      duration: 0.9,
      ease: "expo.inOut",
      onComplete: () => {
        loader.remove();
        onDone();
      },
    });
  };

  if (document.documentElement.classList.contains("reduced-motion")) {
    loader.remove();
    onDone();
    return;
  }

  const counter = { val: 0 };

  const tl = gsap.timeline({
    onComplete: finish,
  });

  tl.fromTo(
    stageEl,
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
    0.15
  )
    .to(
      nameEl,
      { yPercent: 0, duration: 0.85, ease: "expo.out" },
      0.4
    )
    .to(
      counter,
      {
        val: 100,
        duration: 1.9,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(counter.val);
          countEl.textContent = String(v).padStart(2, "0");
          gsap.set(fill, { scaleX: counter.val / 100 });
          if (v >= 100) countEl.classList.add("is-done");
        },
      },
      0.55
    )
    .to({}, { duration: 0.35 });
}
