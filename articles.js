// Articles metadata loader
window.articlesDataLoaded = false;
window.articlesData = [
  {
    id: "ditched-ai-subscriptions-open-source-models",
    title: "Why I Ditched $20/Month AI Subscriptions for Open Source Models (And Saved 90%)",
    description:
      "How I slashed my AI costs from $50-70/month to $13-30/month by switching from premium subscriptions to open source models like DeepSeek, GLM-4, and OpenRouter.",
    author: "Ehsan Tork",
    date: "2025-12-13",
    readTime: "12-15 min",
    coverImage: "assets/img/rust-codex-gpt.png",
    url: "articles/ditched-ai-subscriptions-open-source-models.html",
    tags: [
      "AI Tools",
      "Open Source",
      "Cost Optimization",
      "Developer Workflow",
      "DeepSeek",
      "GLM-4",
    ],
  },
  {
    id: "beyond-prayers-for-peace",
    title: "Beyond Prayers for Peace: How to Actually Build a Better World",
    description:
      "Opinionated field guide for swapping performative peace pleas with builder energy, trust capital, and AI-assisted civic tools that strengthen local foundations.",
    author: "Ehsan Tork",
    date: "2025-12-05",
    readTime: "7-9 min",
    coverImage: "assets/img/book-front.jpeg",
    url: "articles/beyond_prayers_for_peace.html",
    tags: [
      "Builders",
      "Trust",
      "AI",
      "Civic Tech",
      "Open Source",
    ],
  },
  {
    id: "best-keyboards-mice-linux-2025",
    title: "Best Keyboards & Mice for Developers on Linux (2025 Guide)",
    description:
      "Hands-on ranking of Linux-friendly keyboard & mouse combos with scoring, pros/cons, and recommendations for silent, mechanical, and corporate workflows.",
    author: "Ehsan Tork",
    date: "2025-11-24",
    readTime: "8-10 min",
    coverImage: "assets/img/keyboard_mouse_guide.png",
    url: "articles/best_keyboards_mice_linux_developers_2025.html",
    tags: [
      "Linux",
      "Hardware",
      "Productivity",
      "Keychron",
      "Logitech",
      "Ergonomics",
    ],
  },
  {
    id: "dynabook-d45-omarchy-review",
    title: "4 Days with Dynabook D45 – Omarchy 3.1.7 + Falkon Review",
    description:
      "Hands-on log of reviving a Dynabook D45 (Celeron N4000) with Omarchy 3.1.7, Hyperland, Falkon, and lightweight dev tooling—complete with resource metrics, tuning tips, and workflow notes.",
    author: "Ehsan Tork",
    date: "2025-11-18",
    readTime: "9-11 min",
    coverImage: "assets/img/falkon-d4.png",
    url: "articles/dynabook_d45_omarchy_review.html",
    tags: [
      "Dynabook",
      "Linux",
      "Omarchy",
      "Falkon",
      "Hyperland",
      "Lightweight Dev",
    ],
  },
  {
    id: "is-dynabook-good-for-linux",
    title:
      "Is Dynabook Good? Full Review for Linux & Windows 11 (+ My $50 Dynabook Story)",
    description:
      "A comprehensive developer review across three Dynabook laptops—10″, 12″, and 14″—with detailed Linux compatibility tests, ThinkPad comparison, performance analysis, and why Dynabook offers premium Japanese engineering at better prices.",
    author: "Ehsan Tork",
    date: "2025-11-10",
    readTime: "15-18 min",
    coverImage: "assets/img/perfect_dynabook.png",
    url: "articles/is_dynabook_good_for_linux.html",
    tags: [
      "Dynabook",
      "Linux",
      "Windows 11",
      "Hardware Review",
      "ThinkPad",
      "Developer Tools",
    ],
  },
  {
    id: "browseros-vs-atlas",
    title: "BrowserOS vs Atlas: Agentic Browsers, Finally Friendly to Linux",
    description:
      "Compare BrowserOS and Atlas in the emerging agentic browser landscape. Discover why BrowserOS is the practical choice for Linux users seeking local, open-source AI-powered web automation.",
    author: "Ehsan Tork",
    date: "2025-12-27",
    readTime: "8-10 min",
    coverImage: "assets/img/rust-codex-gpt.png",
    url: "articles/browseros-vs-atlas.html",
    tags: [
      "Agentic Browsers",
      "AI",
      "Linux",
      "BrowserOS",
      "Atlas",
      "Web Automation",
      "Open Source",
    ],
  },
];

(async function loadArticlesJson() {
  try {
    const response = await fetch("articles.json", { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length) {
      window.articlesData = data;
      window.articlesDataLoaded = true;
      document.dispatchEvent(
        new CustomEvent("articles-data-ready", { detail: data }),
      );
    }
  } catch (error) {
    console.error("Failed to load articles.json:", error);
  }
})();
