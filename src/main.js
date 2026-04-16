import "@sakun/system.css/style.css";
import "./style.css";
import { translations } from "./i18n.js";

let currentLang = localStorage.getItem("lang") || "es";

function t(path) {
  return path
    .split(".")
    .reduce((obj, key) => (obj ? obj[key] : undefined), translations[currentLang]);
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  render();
  updateLangButtons();
}

function updateLangButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

const skills = {
  frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Vue.js"],
  backend: ["Node.js", "Python", "Express", "PostgreSQL", "MongoDB", "REST API"],
  tools: ["Git", "Docker", "Vite", "Figma", "Linux", "VS Code"],
};

function render() {
  renderMenuBar();
  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  renderContact();
  renderFooter();
}

function renderMenuBar() {
  const nav = document.getElementById("main-nav");
  nav.innerHTML = `
    <ul role="menu-bar">
      <li role="menu-item" tabindex="0" aria-haspopup="true" class="apple-menu">
        <span>&#x1F4BB;</span>
        <ul role="menu">
          <li role="menu-item"><a href="#hero">portfolio</a></li>
          <li role="menu-item" class="divider"></li>
          <li role="menu-item"><button class="lang-btn${currentLang === "es" ? " active" : ""}" data-lang="es">Español</button></li>
          <li role="menu-item"><button class="lang-btn${currentLang === "en" ? " active" : ""}" data-lang="en">English</button></li>
        </ul>
      </li>
      <li role="menu-item" tabindex="0" aria-haspopup="true">
        <strong>${t("nav.about")}</strong>
        <ul role="menu">
          <li role="menu-item"><a href="#about">${t("about.windowTitle")}</a></li>
          <li role="menu-item"><a href="#skills">${t("skills.windowTitle")}</a></li>
        </ul>
      </li>
      <li role="menu-item" tabindex="0" aria-haspopup="false">
        <a href="#projects">${t("nav.projects")}</a>
      </li>
      <li role="menu-item" tabindex="0" aria-haspopup="false">
        <a href="#contact">${t("nav.contact")}</a>
      </li>
      <li role="menu-item" tabindex="0" aria-haspopup="true" class="lang-menu">
        <span>${currentLang.toUpperCase()}</span>
        <ul role="menu">
          <li role="menu-item"><button class="lang-btn${currentLang === "es" ? " active" : ""}" data-lang="es">ES — Español</button></li>
          <li role="menu-item"><button class="lang-btn${currentLang === "en" ? " active" : ""}" data-lang="en">EN — English</button></li>
        </ul>
      </li>
      <li role="menu-item" aria-haspopup="false" class="menu-clock" id="menu-clock"></li>
    </ul>
  `;
  nav.querySelectorAll(".lang-btn").forEach((btn) =>
    btn.addEventListener("click", () => setLang(btn.dataset.lang))
  );
  updateClock();
}

function updateClock() {
  const el = document.getElementById("menu-clock");
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString(currentLang, { hour: "2-digit", minute: "2-digit" });
}

function renderHero() {
  document.getElementById("hero").innerHTML = `
    <div class="window standard-dialog hero-window">
      <div class="title-bar">
        <button aria-label="Close" class="close"></button>
        <h1 class="title">welcome.exe</h1>
        <button aria-label="Resize" class="resize"></button>
      </div>
      <div class="separator"></div>
      <div class="window-pane hero-body">
        <p class="hero-greeting">${t("hero.greeting")}</p>
        <h1 class="hero-name">${t("hero.name")}</h1>
        <p class="hero-title">${t("hero.title")}</p>
        <p class="hero-subtitle">${t("hero.subtitle")}</p>
        <div class="hero-actions">
          <a href="#projects"><button class="btn btn-default">${t("hero.cta")}</button></a>
          <a href="#contact"><button class="btn">${t("hero.ctaContact")}</button></a>
        </div>
      </div>
    </div>
  `;
}

function renderAbout() {
  document.getElementById("about").innerHTML = `
    <div class="window modeless-dialog">
      <div class="title-bar">
        <button aria-label="Close" class="close"></button>
        <h1 class="title">${t("about.windowTitle")}</h1>
        <button aria-label="Resize" class="resize"></button>
      </div>
      <div class="separator"></div>
      <div class="window-pane">
        <p class="heading">${t("about.heading")}</p>
        <p>${t("about.p1")}</p>
        <p>${t("about.p2")}</p>
        <div class="separator"></div>
        <div class="about-meta">
          <span>${t("about.location")}</span>
          <span>${t("about.available")}</span>
        </div>
      </div>
    </div>
  `;
}

function renderSkills() {
  const categories = ["frontend", "backend", "tools"];
  const panels = categories.map((cat) => `
    <div class="skill-panel">
      <p class="subheading">${t("skills." + cat)}</p>
      <div class="skill-tags">
        ${skills[cat].map((s) => `<span class="skill-tag">${s}</span>`).join("")}
      </div>
    </div>
  `).join("");

  document.getElementById("skills").innerHTML = `
    <div class="window modeless-dialog">
      <div class="title-bar">
        <button aria-label="Close" class="close"></button>
        <h1 class="title">${t("skills.windowTitle")}</h1>
        <button aria-label="Resize" class="resize"></button>
      </div>
      <div class="separator"></div>
      <div class="window-pane">
        <p class="heading">${t("skills.heading")}</p>
        <div class="skills-grid">${panels}</div>
      </div>
    </div>
  `;
}

function renderProjects() {
  const projects = t("projects.items");
  const cards = projects.map((p) => `
    <div class="window modeless-dialog project-card">
      <div class="title-bar">
        <button aria-label="Close" class="close"></button>
        <h1 class="title">${p.title}</h1>
        <button aria-label="Resize" class="resize hidden"></button>
      </div>
      <div class="separator"></div>
      <div class="window-pane">
        <p>${p.description}</p>
        <div class="project-tags">
          ${p.tags.map((tag) => `<span class="skill-tag">${tag}</span>`).join("")}
        </div>
        <div class="separator"></div>
        <div class="project-actions">
          <button class="btn">&#x1F4C2; ${t("projects.viewCode")}</button>
          <button class="btn btn-default">&#x1F310; ${t("projects.viewDemo")}</button>
        </div>
      </div>
    </div>
  `).join("");

  document.getElementById("projects").innerHTML = `
    <div class="window modeless-dialog">
      <div class="title-bar">
        <button aria-label="Close" class="close"></button>
        <h1 class="title">${t("projects.windowTitle")}</h1>
        <button aria-label="Resize" class="resize"></button>
      </div>
      <div class="separator"></div>
      <div class="window-pane">
        <p class="heading">${t("projects.heading")}</p>
        <div class="projects-grid">${cards}</div>
      </div>
    </div>
  `;
}

function renderContact() {
  document.getElementById("contact").innerHTML = `
    <div class="window modeless-dialog">
      <div class="title-bar">
        <button aria-label="Close" class="close"></button>
        <h1 class="title">${t("contact.windowTitle")}</h1>
        <button aria-label="Resize" class="resize"></button>
      </div>
      <div class="separator"></div>
      <div class="window-pane">
        <p class="heading">${t("contact.heading")}</p>
        <p>${t("contact.intro")}</p>
        <form class="contact-form" onsubmit="return false;">
          <div class="field-row">
            <input type="text" placeholder="${t("contact.namePlaceholder")}" required />
          </div>
          <div class="field-row">
            <input type="email" placeholder="${t("contact.emailPlaceholder")}" required />
          </div>
          <div class="field-row">
            <textarea rows="5" placeholder="${t("contact.messagePlaceholder")}" required></textarea>
          </div>
          <button type="submit" class="btn btn-default">&#x2709; ${t("contact.send")}</button>
        </form>
        <div class="separator"></div>
        <p>${t("contact.orFind")}</p>
        <div class="social-links">
          <a href="https://github.com" target="_blank" rel="noopener"><button class="btn">&#x1F431; GitHub</button></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener"><button class="btn">&#x1F4BC; LinkedIn</button></a>
          <a href="mailto:tu@email.com"><button class="btn">&#x1F4E7; Email</button></a>
        </div>
      </div>
    </div>
  `;
}

function renderFooter() {
  document.getElementById("main-footer").innerHTML = `
    <div class="details-bar">
      <span>${t("footer.built")} &#x2764; ${t("footer.and")} vanilla JS</span>
      <span>&#xa9; ${new Date().getFullYear()} ${t("hero.name")} &#x2014; ${t("footer.rights")}</span>
      <span>system.css</span>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  const clockInterval = setInterval(updateClock, 30000);
  window.addEventListener("beforeunload", () => clearInterval(clockInterval));
});

