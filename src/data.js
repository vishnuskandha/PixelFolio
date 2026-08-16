/**
 * ═════════════════════════════════════════════════════════
 *  PORTFOLIO — SINGLE SOURCE OF TRUTH
 *  ═════════════════════════════════════════════════════════
 *  THIS IS A TEMPLATE. Every piece of visible text on the
 *  site lives in this one file. Edit it and the whole site
 *  updates — no HTML or JS knowledge required.
 *
 *  QUICK START
 *  ───────────
 *  1. Start at "CORE IDENTITY" below (name, role, location,
 *     email, brand). Those values are reused everywhere
 *     automatically.
 *  2. Work down through each section and replace the sample
 *     text with your own content.
 *  3. Anything marked [ADD ...] is a placeholder link or
 *     value that is not set yet — replace it with the real
 *     thing, or leave it: it renders greyed-out and safe.
 *  4. Images: drop your photos into public/photos/ and update
 *     the `src` fields (e.g. intro.portrait.src). Files named
 *     like the existing placeholders swap in automatically.
 *
 *  The layout supports ~16 sections. If you want to remove a
 *  whole section, delete its <section> block in index.html
 *  (each one is clearly labelled with a comment).
 * ═════════════════════════════════════════════════════════
 */

/* ─────────────────────────────────────────────────────────
   01 · CORE IDENTITY  (used all over the site — edit once)
   ───────────────────────────────────────────────────────── */
const FULL_NAME = "YOUR NAME"; // e.g. "Jane Doe"
const FIRST_NAME = "YOUR"; // first word of the hero title
const LAST_NAME = "NAME"; // second word of the hero title
const BRAND = "YN"; // short logo text (header, loader, footer)
const ROLE = "PROFESSION / ROLE / INTEREST"; // hero label + seo
const LOCATION = "YOUR CITY, COUNTRY";
const AVAILABILITY = "OPEN TO OPPORTUNITIES";
const EMAIL = "you@example.com";

/* ── Global site config ────────────────────────────────── */
export const site = {
  name: "Your Name",
  brand: BRAND,
  brandDot: ".",

  // header chrome
  header: {
    meta: "WHAT YOU DO / WHAT YOU LOVE / WHO YOU ARE", // small header text
  },
  menuToggle: "MENU", // header button label

  // cinematic pre-loader
  loader: {
    stage: "LOADING THE STORY",
    name: FULL_NAME,
  },

  // hero (first screen)
  hero: {
    sideNote: "PERSONAL PORTFOLIO — ONE PAGE", // vertical text, far left
    label: ROLE,
    title: [FIRST_NAME, LAST_NAME], // two stacked lines
    /* The <em>…</em> parts render in serif italic (last one accent) */
    statement:
      "I work where <em>strategy</em>, <em>craft</em> and <em>technology</em> meet.",
    meta: [`BASED IN ${LOCATION}`, AVAILABILITY], // row under the statement
    scrollHint: "SCROLL TO EXPLORE",
    marquee: [
      { t: "DESIGN", solid: true },
      { t: "BUILD", solid: false },
      { t: "CREATE", solid: true },
      { t: "SHIP", solid: false },
      { t: "LEARN", solid: true },
      { t: "REPEAT", solid: false },
      { t: "GROW", solid: true },
    ],
  },

  // fullscreen menu overlay chrome
  menu: {
    getInTouch: "GET IN TOUCH",
    connect: "CONNECT",
    foot: [LOCATION, AVAILABILITY], // bottom line of the menu
  },

  // contact
  emailLabel: EMAIL,
  emailHref: "mailto:",
  socials: [
    { label: "LINKEDIN", value: "[ADD LINKEDIN]", href: "[ADD LINKEDIN]", cursor: "OPEN" },
    { label: "GITHUB", value: "[ADD GITHUB]", href: "[ADD GITHUB]", cursor: "OPEN" },
    { label: "INSTAGRAM", value: "[ADD INSTAGRAM]", href: "[ADD INSTAGRAM]", cursor: "OPEN" },
    { label: "EMAIL", value: EMAIL, href: `mailto:${EMAIL}`, cursor: "OPEN" },
  ],

  // footer
  footer: {
    topLink: "BACK TO TOP",
    name: FULL_NAME,
    line: "BUILT WITH PURPOSE — REPLACE THIS LINE WITH A SHORT TAGLINE.",
    copy: "BUILT WITH PURPOSE.", // shown as "© {year} {name} — {copy}"
  },
};

/* ── Main navigation (fullscreen menu links) ───────────── */
export const nav = [
  { index: "01", label: "HOME", target: "#home" },
  { index: "02", label: "JOURNEY", target: "#journey" },
  { index: "03", label: "EXPERIENCE", target: "#experience" },
  { index: "04", label: "CREATIVE", target: "#creative" },
  { index: "05", label: "SKILLS", target: "#skills" },
  { index: "06", label: "CONTACT", target: "#contact" },
];

/* ── Section headers ("01 / INTRO", "— / SKILLS" …) ────── */
/* `num: null` renders no number. Sections without a header
   (photography, cinematic, content, why) are omitted here. */
export const sections = {
  intro: { num: "01", label: "INTRO" },
  journey: { num: "—", label: "THE PATH SO FAR" },
  education: { num: "02", label: "EDUCATION" },
  experience: { num: "03", label: "EXPERIENCE" },
  early: { num: "—", label: "EARLY DAYS" },
  leadership: { num: "04", label: "LEADERSHIP" },
  creative: { num: "05", label: "CREATIVE" },
  skills: { num: "—", label: "SKILLS" },
  certification: { num: "—", label: "CERTIFICATIONS" },
  interests: { num: "—", label: "INTERESTS" },
  why: { label: "WHY WORK WITH ME" },
  next: { num: "—", label: "THE NEXT CHAPTER" },
  contact: { num: "06", label: "CONTACT" },
};

/* ── INTRO ─────────────────────────────────────────────── */
export const intro = {
  title: "I'M YOUR NAME. I CREATE, BUILD AND SHIP THINGS PEOPLE LOVE.",
  dropcap: "Y",
  paragraphs: [
    "This is a ready-to-use portfolio template. Every word on this page is managed from one file — src/data.js. Change a string there and the whole site updates. Replace this introduction with your own story: who you are, what you do and what you are looking for.",
    "The layout is built to show both sides of you: the professional journey — education, experience, skills and achievements — and the creative side, the projects and interests that make you unique.",
    "To make it yours, drop your real photos into public/photos/ and update the src fields in this file. Everything you see here is a placeholder, ready to become your own.",
  ],
  portrait: {
    src: "/photos/portrait-01.svg",
    alt: "Placeholder — portrait. Replace with a real photograph of yourself.",
    tag: "PORTRAIT — ADD YOUR PHOTO",
  },
  facts: [
    { label: "NAME", value: FULL_NAME },
    { label: "BASED", value: LOCATION },
    { label: "FOCUS", value: "YOUR MAIN FOCUS AREAS" },
    { label: "STATUS", value: AVAILABILITY },
  ],
};

/* ── THE JOURNEY (timeline) ────────────────────────────── */
export const journey = {
  title: "THE JOURNEY",
  items: [
    {
      index: "01",
      title: "EDUCATION",
      caption: "Your degree, your university and what you studied",
    },
    {
      index: "02",
      title: "FIRST ROLE",
      caption: "Your first internship or job and what it taught you",
    },
    {
      index: "03",
      title: "PROJECT",
      caption: "A project you are proud of and what you learned from it",
    },
    {
      index: "04",
      title: "GROWTH",
      caption: "A skill, course or role that moved you forward",
    },
    {
      index: "05",
      title: "LEADERSHIP",
      caption: "A team, club or initiative you led",
    },
    {
      index: "06",
      title: "WHAT'S NEXT",
      caption: "Where you want to go from here — the next chapter",
    },
  ],
};

/* ── EDUCATION ──────────────────────────────────────────── */
export const education = {
  title: "EDUCATION",
  degree: "Your Degree",
  specialization: "Your Specialization or Major",
  institution: "Your University or College",
  location: "Your City, Country",
  cgpa: "YOUR GPA / CGPA",
  description:
    "Replace this with a short description of your education — the subjects you focused on, the projects you worked on and what you took away from the experience.",
  kineticNote: "WHAT I STUDIED — MOVE ALONG", // decorative strip caption
  subjects: [
    "DESIGN",
    "DEVELOPMENT",
    "PROJECTS",
    "RESEARCH",
    "COMMUNICATION",
    "LEADERSHIP",
    "BUSINESS",
    "MARKETING",
    "INNOVATION",
    "STRATEGY",
    "TEAMWORK",
  ],
};

/* ── Achievements ───────────────────────────────────────── */
export const achievements = [
  {
    title: "ACHIEVEMENT ONE",
    year: "2024",
    note: "WHAT YOU ACHIEVED AND WHY IT MATTERS",
  },
  {
    title: "ACHIEVEMENT TWO",
    year: null,
    note: "ANOTHER MILESTONE YOU ARE PROUD OF",
  },
];

/* ── Professional experience ────────────────────────────── */
export const experience = {
  company: "COMPANY NAME",
  role: "YOUR ROLE — TEAM / DEPARTMENT",
  duration: "12 MONTHS",
  context: "2024 — 2025",
  skillsLabel: "Skills and tools used in this role", // screen-reader label
  description:
    "Replace this with a short description of your role — the team you worked with, the systems you handled and the impact you had. Two or three sentences works well here.",
  whatIDid: "WHAT I DID",
  quote:
    "“Good systems move quietly — everything in its place, nothing wasted. Replace this with a quote that captures how you work.”",
  quoteNote: "A NOTE ABOUT YOUR APPROACH",
  responsibilities: [
    "Your first responsibility — what you owned day to day",
    "A second responsibility — a process or tool you managed",
    "Something you improved — a metric, a workflow, a team",
    "How you collaborated — who you worked with and supported",
    "Another contribution that matters to the story",
  ],
  skills: [
    "SKILL ONE",
    "SKILL TWO",
    "SKILL THREE",
    "SKILL FOUR",
    "SKILL FIVE",
    "SKILL SIX",
    "SKILL SEVEN",
    "SKILL EIGHT",
    "SKILL NINE",
    "SKILL TEN",
  ],
};

/* ── Early experience / internships ─────────────────────── */
export const earlyExperience = {
  title: "EARLY EXPERIENCE",
  items: [
    {
      company: "ORGANIZATION ONE",
      division: "ROLE / TEAM TRAINEE",
      description:
        "Replace this with what you did during this internship or early role — the tasks you supported and the skills you picked up.",
      areas: ["AREA ONE", "AREA TWO", "AREA THREE", "AREA FOUR", "AREA FIVE"],
    },
    {
      company: "ORGANIZATION TWO",
      division: "ROLE / TEAM TRAINEE",
      description:
        "A second early experience — mention the department, the tools you used and what you learned.",
      areas: ["AREA ONE", "AREA TWO", "AREA THREE", "AREA FOUR"],
    },
  ],
};

/* ── Leadership ─────────────────────────────────────────── */
export const leadership = {
  role: "TEAM LEAD — WHAT YOU LED",
  organization: "Your University / Club / Initiative",
  description:
    "Replace this with a short description of the team or initiative you led — what it did, how you ran it and what it achieved.",
  responsibilities: [
    "Coordinating the team",
    "Planning and running events",
    "Content and communication",
    "Working across teams",
    "Delivering results",
  ],
};

/* ── Creative ───────────────────────────────────────────── */
export const creative = {
  statement: "THERE'S MORE THAN ONE WAY TO TELL A STORY.",
  disciplines: [
    { word: "PHOTOGRAPHY", image: "/photos/photo-01.svg", target: "#photography" },
    { word: "FILMMAKING", image: "/photos/cinematic-01.svg", target: "#cinematic" },
    { word: "CONTENT", image: "/photos/content-01.svg", target: "#content" },
    { word: "DESIGN", image: "/photos/photo-04.svg", target: "#photography" },
  ],
  serifWords: ["story", "frame", "idea", "vision", "craft", "flow"], // marquee accents
};

export const photography = {
  title: "PHOTOGRAPHY",
  description:
    "Photography is one of your creative interests. Replace this with a short description of the kind of images you enjoy making — portraits, street, landscapes, still life — and what draws you to them.",
  note: "INTERESTS — PORTRAIT / STREET / LANDSCAPE / STILL LIFE / EXPERIMENTAL",
  categories: ["PORTRAIT", "STREET", "LANDSCAPE", "STILL LIFE", "EXPERIMENTAL"],
};

/* Gallery — aspect is width/height ratio of the placeholder. */
export const gallery = {
  placeholderTag: "PLACEHOLDER",
  items: [
    { src: "/photos/photo-01.svg", category: "PORTRAIT", alt: "Placeholder — portrait photography", ratio: 0.75, span: 2 },
    { src: "/photos/photo-02.svg", category: "CINEMATIC", alt: "Placeholder — cinematic frame", ratio: 1.5, span: 1 },
    { src: "/photos/photo-03.svg", category: "STREET", alt: "Placeholder — street photography", ratio: 1.25, span: 1 },
    { src: "/photos/photo-04.svg", category: "EXPERIMENTAL", alt: "Placeholder — experimental light study", ratio: 0.8, span: 2 },
    { src: "/photos/photo-05.svg", category: "LIFESTYLE", alt: "Placeholder — lifestyle photography", ratio: 1.5, span: 1 },
    { src: "/photos/photo-06.svg", category: "PORTRAIT", alt: "Placeholder — portrait study", ratio: 0.66, span: 2 },
    { src: "/photos/photo-07.svg", category: "CINEMATIC", alt: "Placeholder — cinematic composition", ratio: 1.33, span: 1 },
    { src: "/photos/photo-08.svg", category: "STREET", alt: "Placeholder — street frame", ratio: 1.25, span: 1 },
  ],
};

export const cinematic = {
  heading: "FRAME THE MOMENT.",
  description:
    "Replace this with a short description of your interest in cinematic visuals and visual storytelling — films that inspire you, looks you like to recreate and the feeling you chase in a frame.",
  interests: [
    "CINEMATIC PORTRAITS",
    "FILM-INSPIRED COMPOSITIONS",
    "COLOR",
    "LIGHTING",
    "CHARACTER AESTHETICS",
    "POSTER DESIGN",
    "VISUAL STORYTELLING",
  ],
};

export const content = {
  label: "HORIZONTAL NOTE",
  heading: "THINK. MAKE. TELL.",
  intro:
    "From raw material to finished stories — editing, writing, design and everything that sits between an idea and an audience.",
  areas: [
    "VIDEO EDITING",
    "PHOTOGRAPHY",
    "WRITING",
    "DESIGN",
    "STORYTELLING",
    "SOCIAL MEDIA",
  ],
  images: [
    "/photos/content-01.svg",
    "/photos/content-02.svg",
    "/photos/content-03.svg",
    "/photos/content-02.svg",
    "/photos/content-01.svg",
    "/photos/content-03.svg",
  ],
  panelNote: "PLACEHOLDER — REPLACE WITH YOUR WORK",
};

/* ── Skills ─────────────────────────────────────────────── */
export const skills = {
  title: "FIELD OF SKILLS",
  groupLabels: ["PROFESSIONAL", "TECHNICAL", "CREATIVE"],
  professional: [
    "SKILL ONE",
    "SKILL TWO",
    "SKILL THREE",
    "SKILL FOUR",
    "SKILL FIVE",
    "SKILL SIX",
    "SKILL SEVEN",
    "SKILL EIGHT",
  ],
  technical: [
    "TOOL ONE",
    "TOOL TWO",
    "TOOL THREE",
    "TOOL FOUR",
    "TOOL FIVE",
    "TOOL SIX",
    "TOOL SEVEN",
    "TOOL EIGHT",
    "TOOL NINE",
    "TOOL TEN",
    "TOOL ELEVEN",
  ],
  creative: [
    "PHOTOGRAPHY",
    "VIDEO EDITING",
    "CONTENT CREATION",
    "VISUAL STORYTELLING",
    "WRITING",
    "DESIGN",
  ],
};

/* ── Certifications ─────────────────────────────────────── */
export const certification = {
  label: "KNOWLEDGE / COURSES",
  title: "CERTIFICATION NAME",
  platform: "e.g. COURSERA / UDEMY / LINKEDIN LEARNING",
  meta: "PLATFORM — COURSERA / ONLINE COURSE",
  description:
    "A short description of the certification — the course provider, what it covered and why it matters to you.",
  areas: [
    "TOPIC ONE",
    "TOPIC TWO",
    "TOPIC THREE",
    "TOPIC FOUR",
    "TOPIC FIVE",
    "TOPIC SIX",
  ],
};

/* ── Interests ──────────────────────────────────────────── */
export const interests = {
  title: "OUTSIDE THE WORKFLOW",
  items: [
    {
      index: "01",
      title: "TRAVEL",
      tag: "EXPLORATION",
      description: "New places, new perspectives and the stories they leave behind.",
    },
    {
      index: "02",
      title: "PHOTOGRAPHY",
      tag: "CREATIVE",
      description: "Capturing people, places, emotions and moments.",
    },
    {
      index: "03",
      title: "READING",
      tag: "GROWTH",
      description: "Books on craft, business and the way things work.",
    },
    {
      index: "04",
      title: "SPORTS & FITNESS",
      tag: "LIFESTYLE",
      description: "Staying active — discipline, routine and energy.",
    },
    {
      index: "05",
      title: "TECHNOLOGY",
      tag: "CURIOSITY",
      description: "New tools, new gadgets, new ways of doing things.",
    },
  ],
};

/* ── Why work with me ───────────────────────────────────── */
export const whyMe = [
  {
    word: "ADAPTABLE.",
    note: "Moves between roles, teams and tools without losing rhythm.",
  },
  {
    word: "PROBLEM SOLVER.",
    note: "Listens first, then diagnoses and resolves — calmly and clearly.",
  },
  {
    word: "TEAM PLAYER.",
    note: "Collaborates across teams and supports the people around them.",
  },
  {
    word: "CREATIVE THINKER.",
    note: "Frames problems from a different angle, with intent.",
  },
  {
    word: "CONTINUOUS LEARNER.",
    note: "From courses to new tools — always moving forward.",
  },
];

/* ── Career direction ───────────────────────────────────── */
export const nextChapter = {
  heading: "WHAT'S NEXT?",
  text: "Replace this with a short statement about the kind of opportunities you are looking for — the roles, teams and problems you want to work on next.",
  areas: [
    "AREA ONE",
    "AREA TWO",
    "AREA THREE",
    "AREA FOUR",
    "AREA FIVE",
    "AREA SIX",
    "AREA SEVEN",
    "AREA EIGHT",
  ],
};

/* ── CONTACT ────────────────────────────────────────────── */
export const contact = {
  title: "LET'S CONNECT.",
  text: "I'm always open to connecting with people, exploring opportunities, collaborating on projects and learning something new. Replace this with your own invitation.",
};

/* ── SEO ────────────────────────────────────────────────── */
export const seo = {
  title: "Your Name — Portfolio",
  description:
    "Portfolio of Your Name — replace this description with your role, your experience and what you do. It is used by search engines and link previews.",
  ogImage: "/photos/portrait-01.svg",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Your Name",
    jobTitle: "Your Job Title",
    knowsAbout: [
      "Skill One",
      "Skill Two",
      "Skill Three",
      "Skill Four",
    ],
  },
};
