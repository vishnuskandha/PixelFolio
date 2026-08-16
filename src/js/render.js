/**
 * Renders all portfolio content from src/data.js into the DOM.
 * Content lives in data; markup stays declarative and swappable.
 *
 * Two mechanisms:
 *  1. GENERIC BINDINGS — elements in index.html carry
 *     data-text="path.to.value" (plain text) or
 *     data-html="path.to.value" (HTML, e.g. <em>…) and are
 *     filled from src/data.js at boot.
 *  2. TARGETED RENDERERS — build lists / grids / marquees
 *     (menu, journey, gallery, skills, …).
 */
import {
  site,
  nav,
  sections,
  intro,
  journey,
  education,
  achievements,
  experience,
  earlyExperience,
  leadership,
  creative,
  photography,
  gallery,
  cinematic,
  content,
  skills,
  certification,
  interests,
  whyMe,
  nextChapter,
  contact,
} from "../data.js";

/* Path resolution for data-text / data-html bindings */
const ROOT = {
  site,
  nav,
  sections,
  intro,
  journey,
  education,
  achievements,
  experience,
  earlyExperience,
  leadership,
  creative,
  photography,
  gallery,
  cinematic,
  content,
  skills,
  certification,
  interests,
  whyMe,
  nextChapter,
  contact,
};

function resolve(path) {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), ROOT);
}

/* ── Small builders ─────────────────────────────────────── */

function marqueeItems(container, items, renderItem, copies = 2) {
  let html = "";
  for (let c = 0; c < copies; c++) {
    html += items.map(renderItem).join("");
  }
  container.innerHTML = html;
}

const isPlaceholder = (href) => !href || href.startsWith("[ADD") || href === "#";

/* Real value (not a [ADD ...] placeholder) → display it; else show the label. */
const displayValue = (s) =>
  s.value && !s.value.startsWith("[ADD") ? s.value : s.label;

/* Email is a placeholder ([ADD ...]) → return a dead "#" link
   instead of a broken "mailto:[ADD EMAIL]". */
const buildEmailHref = () => {
  if (site.emailLabel.startsWith("[ADD")) return "#";
  return site.emailHref + site.emailLabel.replace(/[\[\]]/g, "");
};

function placeholderLink(el) {
  if (!el) return;
  const href = el.getAttribute("href") || "";
  if (isPlaceholder(href)) {
    el.setAttribute("href", "#");
    el.dataset.placeholder = "true";
    el.classList.add("contact__social--empty");
    el.addEventListener("click", (e) => e.preventDefault());
  }
}

/* ── Generic text/html bindings ──────────────────────────── */

function renderBindings() {
  document.querySelectorAll("[data-text]").forEach((el) => {
    const v = resolve(el.dataset.text);
    if (typeof v === "string") el.textContent = v;
  });
  document.querySelectorAll("[data-html]").forEach((el) => {
    const v = resolve(el.dataset.html);
    if (typeof v === "string") el.innerHTML = v;
  });
  document.querySelectorAll("[data-aria-label]").forEach((el) => {
    const v = resolve(el.dataset.ariaLabel);
    if (typeof v === "string") el.setAttribute("aria-label", v);
  });
}

/* ── Section heads (num + label) ─────────────────────────── */

function renderSectionHeads() {
  document.querySelectorAll("[data-section]").forEach((head) => {
    const s = sections[head.dataset.section];
    if (!s) return;
    const num = head.querySelector(".section-head__num");
    const label = head.querySelector(".section-head__label");
    if (num && s.num != null) num.textContent = s.num;
    if (label && s.label) label.textContent = s.label;
  });
}

/* ── Header / loader / footer chrome ─────────────────────── */

function renderChrome() {
  const loaderBrand = document.querySelector(".loader__brand");
  if (loaderBrand) loaderBrand.innerHTML = `${site.brand}<span>.</span>`;
  const headerBrand = document.querySelector(".site-header .brand");
  if (headerBrand) headerBrand.innerHTML = `${site.brand}<span class="brand__dot">${site.brandDot}</span>`;
  const footerBrand = document.querySelector(".site-footer__brand");
  if (footerBrand) footerBrand.innerHTML = `${site.brand}<span>.</span>`;
  const rld = document.getElementById("heroRld");
  if (rld) rld.textContent = site.brand;

  const footerCopy = document.querySelector(".site-footer__copy");
  if (footerCopy) {
    footerCopy.textContent = `© ${new Date().getFullYear()} ${site.footer.name} — ${site.footer.copy}`;
  }
}

/* ── Menu ───────────────────────────────────────────────── */

function renderMenu() {
  const list = document.getElementById("menuList");
  list.innerHTML = nav
    .map(
      (m) => `
      <li class="menu__item">
        <div class="menu__item-inner">
          <span class="menu__item-index">${m.index}</span>
          <a class="menu__item-link" href="${m.target}" data-cursor-label="OPEN">
            ${m.label}<span class="menu__item-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </li>`
    )
    .join("");

  const email = document.getElementById("menuEmail");
  email.textContent = site.emailLabel;
  email.setAttribute("href", buildEmailHref());
  placeholderLink(email);

  const socials = document.getElementById("menuSocials");
  socials.innerHTML = site.socials
    .map(
      (s) => `
      <a href="${s.href}" data-cursor-label="OPEN" title="${
        s.value && !s.value.startsWith("[ADD") ? s.label : "Set this link in src/data.js"
      }">${displayValue(s)}</a>`
    )
    .join("");
  socials.querySelectorAll("a").forEach(placeholderLink);
}

/* ── Intro ─────────────────────────────────────────────── */

function renderIntro() {
  const body = document.getElementById("introBody");
  if (body) {
    body.innerHTML = intro.paragraphs
      .map((p) => `<p class="intro__text">${p}</p>`)
      .join("");
  }

  const facts = document.getElementById("introFacts");
  if (facts) {
    facts.innerHTML = intro.facts
      .map(
        (f) => `
        <div class="intro__fact">
          <dt>${f.label}</dt>
          <dd>${f.value}</dd>
        </div>`
      )
      .join("");
  }

  const portrait = document.querySelector(".intro__portrait-frame img");
  if (portrait) {
    portrait.src = intro.portrait.src;
    portrait.alt = intro.portrait.alt;
  }
}

/* ── Journey ────────────────────────────────────────────── */

function renderJourney() {
  const list = document.getElementById("journeyList");
  list.innerHTML = journey.items
    .map(
      (j, i) => `
      <li class="journey__item" data-journey-item>
        <span class="journey__num">${j.index}</span>
        <div>
          <h3 class="journey__title-text">
            ${j.title}
            ${i < journey.items.length - 1 ? '<span class="journey__arrow" aria-hidden="true">↓</span>' : ""}
          </h3>
          <p class="journey__caption">${j.caption}</p>
        </div>
      </li>`
    )
    .join("");
}

/* ── Education kinetic rows ─────────────────────────────── */

function renderEducation() {
  const deg = document.querySelector(".education__degree");
  if (deg) deg.textContent = `${education.degree} — ${education.specialization}`;
  const school = document.querySelector(".education__school");
  if (school) {
    school.innerHTML = `${education.institution}<br />${education.location} · ${education.cgpa}`;
  }
  const desc = document.querySelector(".education__desc");
  if (desc) desc.textContent = education.description;

  const ach = document.getElementById("educationAchievements");
  if (ach) {
    ach.innerHTML = achievements
      .map(
        (a) => `
        <p class="education__achievement">
          <span class="education__achievement-dot" aria-hidden="true"></span>
          <strong>${a.title}</strong>
          ${a.year ? `<span class="education__achievement-sep">—</span> ${a.year}` : ""}
          <span class="education__achievement-sep">·</span> ${a.note}
        </p>`
      )
      .join("");
  }

  const half = Math.ceil(education.subjects.length / 2);
  const rowA = education.subjects.slice(0, half);
  const rowB = education.subjects.slice(half);

  const renderWord =
    (word, alt) =>
    `<span class="kinetic__word ${alt ? "" : "kinetic__word--dot"}">${word}</span>`;

  const elA = document.getElementById("kineticRowA");
  const elB = document.getElementById("kineticRowB");
  marqueeItems(elA, rowA, (w) => renderWord(w, false));
  marqueeItems(elB, rowB, (w) => renderWord(w, true));
}

/* ── Experience ─────────────────────────────────────────── */

function renderExperience() {
  const list = document.getElementById("responsibilityList");
  list.innerHTML = experience.responsibilities.map((r) => `<li>${r}</li>`).join("");

  const renderSkill = (s) => `<span class="marquee__item">${s}<span class="marquee__dot">·</span></span>`;
  const half = Math.ceil(experience.skills.length / 2);
  marqueeItems(document.getElementById("skillsRowA"), experience.skills.slice(0, half), renderSkill, 2);
  marqueeItems(document.getElementById("skillsRowB"), experience.skills.slice(half), renderSkill, 2);
}

/* ── Early experience ───────────────────────────────────── */

function renderEarly() {
  const list = document.getElementById("earlyList");
  list.innerHTML = earlyExperience.items
    .map(
      (e) => `
      <article class="early__entry">
        <div>
          <h3 class="early__company">${e.company}</h3>
          <p class="early__division">${e.division}</p>
        </div>
        <div>
          <p class="early__description">${e.description}</p>
          <div class="early__areas">
            ${e.areas.map((a) => `<span class="early__area">${a}</span>`).join("")}
          </div>
        </div>
      </article>`
    )
    .join("");
}

/* ── Leadership ─────────────────────────────────────────── */

function renderLeadership() {
  const list = document.getElementById("leadershipList");
  list.innerHTML = leadership.responsibilities
    .map((r) => `<li>${r}</li>`)
    .join("");
}

/* ── Creative ───────────────────────────────────────────── */

function renderCreative() {
  const grid = document.getElementById("creativeGrid");
  grid.innerHTML = creative.disciplines
    .map((d, i) => `
      <a class="creative__tile" href="${d.target}" data-cursor-label="VIEW">
        <div class="creative__tile-img">
          <img src="${d.image}" alt="Placeholder — ${d.word.toLowerCase()}. Replace with real work." loading="lazy" />
        </div>
        <div class="creative__tile-meta">
          <span class="creative__tile-word">${d.word}</span>
          <span class="creative__tile-index">0${i + 1}</span>
        </div>
      </a>`)
    .join("");

  // marquee: disciplines (outlined) separated by serif italic words
  const items = [];
  creative.disciplines.forEach((d, i) => {
    items.push(`<span class="marquee__item"><i>${d.word}</i></span>`);
    items.push(
      `<span class="marquee__item"><span>${creative.serifWords[i % creative.serifWords.length]}</span></span>`
    );
  });
  marqueeItems(document.getElementById("marqueeCreative"), items, (x) => x);
}

/* ── Photography gallery ────────────────────────────────── */

function renderGallery() {
  const galleryEl = document.getElementById("gallery");
  galleryEl.innerHTML = gallery.items
    .map(
      (g) => `
      <figure class="gallery__item">
        <div class="gallery__frame" data-cursor-label="EXPLORE" style="--ratio:${g.ratio}">
          <img class="gallery__img" src="${g.src}" alt="${g.alt}" loading="lazy" />
          <figcaption class="gallery__cap">
            <span>${g.category}</span>
            <span>${gallery.placeholderTag}</span>
          </figcaption>
        </div>
      </figure>`
    )
    .join("");
}

/* ── Cinematic ──────────────────────────────────────────── */

function renderCinematic() {
  const list = document.getElementById("cinematicList");
  list.innerHTML = cinematic.interests
    .map((i) => `<li data-cursor-label="VIEW">${i}</li>`)
    .join("");
}

/* ── Content · THINK. MAKE. TELL. ─────────────────────── */

function renderContent() {
  const track = document.getElementById("contentTrack");
  content.areas.forEach((area, i) => {
    const panel = document.createElement("div");
    panel.className = "content__panel";
    panel.dataset.cursor = "EXPLORE";
    panel.innerHTML = `
      <span class="content__panel-index">0${i + 1}</span>
      <div class="content__panel-img">
        <img src="${content.images[i % content.images.length]}" alt="Placeholder — ${area.toLowerCase()}. Replace with real work." />
      </div>
      <h3 class="content__panel-word">${area}</h3>
      <p class="content__panel-note">${content.panelNote}</p>
    `;
    track.appendChild(panel);
  });
}

/* ── Skills ─────────────────────────────────────────────── */

function renderSkills() {
  const fill = (id, words) => {
    const el = document.getElementById(id);
    el.innerHTML = words.map((w) => `<span class="skills__word">${w}</span>`).join("");
  };
  fill("skillsPro", skills.professional);
  fill("skillsTech", skills.technical);
  fill("skillsCreative", skills.creative);
}

/* ── Certification ──────────────────────────────────────── */

function renderCertification() {
  const el = document.getElementById("certAreas");
  el.innerHTML = certification.areas
    .map((a) => `<span class="certification__area">${a}</span>`)
    .join("");
}

/* ── Interests ──────────────────────────────────────────── */

function renderInterests() {
  const list = document.getElementById("interestsList");
  list.innerHTML = interests.items
    .map(
      (it, i) => `
      <div class="interests__item" data-interest>
        <button class="interests__trigger" aria-expanded="false" aria-controls="interest-panel-${i}">
          <span class="interests__index">${it.index}</span>
          <span class="interests__name">${it.title}</span>
          <span class="interests__tag">${it.tag}</span>
          <span class="interests__chev" aria-hidden="true">+</span>
        </button>
        <div class="interests__panel" id="interest-panel-${i}" role="region" aria-label="${it.title}">
          <div class="interests__panel-inner">
            <p class="interests__note">${it.description}</p>
          </div>
        </div>
      </div>`
    )
    .join("");

  list.querySelectorAll("[data-interest]").forEach((item) => {
    const trigger = item.querySelector(".interests__trigger");
    trigger.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

/* ── Why work with me ───────────────────────────────────── */

function renderWhy() {
  const list = document.getElementById("whyList");
  list.innerHTML = whyMe
    .map(
      (w) => `
      <div class="why__item" data-why-item>
        <h3 class="why__word">${w.word}</h3>
        <p class="why__note">${w.note}</p>
      </div>`
    )
    .join("");
}

/* ── What's next ────────────────────────────────────────── */

function renderNext() {
  const el = document.getElementById("nextAreas");
  el.innerHTML = nextChapter.areas
    .map((a) => `<span class="next__area">${a}</span>`)
    .join("");
}

/* ── Contact ────────────────────────────────────────────── */

function renderContact() {
  const email = document.getElementById("contactEmail");
  email.textContent = site.emailLabel;
  email.setAttribute("href", buildEmailHref());
  placeholderLink(email);

  const socials = document.getElementById("contactSocials");
  socials.innerHTML = site.socials
    .map((s) => {
      const text = displayValue(s);
      const isPh = !s.value || s.value.startsWith("[ADD");
      const canLink = !isPh && s.href && !isPlaceholder(s.href);
      const title = isPh ? "Add this link in src/data.js" : s.label;
      if (canLink) {
        return `<a class="contact__social" href="${s.href}" data-cursor-label="${s.cursor}" title="${title}">${text}<i aria-hidden="true">↗</i></a>`;
      }
      return `<span class="contact__social contact__social--muted" title="${title}">${text}</span>`;
    })
    .join("");
}

/* ── Hero marquee ───────────────────────────────────────── */

function renderHeroMarquee() {
  const items = site.hero.marquee.map(
    (w) => `<span class="marquee__item">${w.solid ? w.t : `<em>${w.t}</em>`}</span>`
  );
  marqueeItems(document.getElementById("marqueeHero"), items, (x) => x, 2);
}

/* ── Entry point ────────────────────────────────────────── */

export function renderAll() {
  renderBindings();
  renderSectionHeads();
  renderChrome();
  renderMenu();
  renderIntro();
  renderJourney();
  renderEducation();
  renderExperience();
  renderEarly();
  renderLeadership();
  renderCreative();
  renderGallery();
  renderCinematic();
  renderContent();
  renderSkills();
  renderCertification();
  renderInterests();
  renderWhy();
  renderNext();
  renderContact();
  renderHeroMarquee();
}
