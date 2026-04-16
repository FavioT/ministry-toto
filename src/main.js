import "98.css";
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
  renderNav();
  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  renderContact();
  renderFooter();
}

function renderNav() {
  const nav = document.getElementById("main-nav");
  nav.innerHTML = `
    <div class="nav-inner">
      <span class="nav-logo">&#x1F4BB; portfolio</span>
      <div class="nav-links">
        <a href="#about">${t("nav.about")}</a>
        <a href="#skills">${t("nav.skills")}</a>
        <a href="#projects">${t("nav.projects")}</a>
        <a href="#contact">${t("nav.contact")}</a>
      </div>
      <div class="lang-switcher">
        <button class="lang-btn${currentLang === "es" ? " active" : ""}" data-lang="es">ES</button>
        <button class="lang-btn${currentLang === "en" ? " active" : ""}" data-lang="en">EN</button>
      </div>
    </div>
  `;
  nav.querySelectorAll(".lang-btn").forEach((btn) =>
    btn.addEventListener("click", () => setLang(btn.dataset.lang))
  );
}

function renderHero() {
  document.getElementById("hero").innerHTML = `
    <div class="window hero-window">
      <div class="title-bar">
        <div class="title-bar-text">welcome.exe</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div class="window-body hero-body">
        <p class="hero-greeting">${t("hero.greeting")}</p>
        <h1 class="hero-name">${t("hero.name")}</h1>
        <p class="hero-title">${t("hero.title")}</p>
        <p class="hero-subtitle">${t("hero.subtitle")}</p>
        <div class="hero-actions">
          <a href="#projects"><button class="default">${t("hero.cta")}</button></a>
          <a href="#contact"><button>${t("hero.ctaContact")}</button></a>
        </div>
      </div>
    </div>
  `;
}

function renderAbout() {
  document.getElementById("about").innerHTML = `
    <div class="window">
      <div class="title-bar">
        <div class="title-bar-text">${t("about.windowTitle")}</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div class="window-body">
        <h2>${t("about.heading")}</h2>
        <p>${t("about.p1")}</p>
        <p>${t("about.p2")}</p>
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
      <fieldset>
        <legend>${t("skills." + cat)}</legend>
        <div class="skill-tags">
          ${skills[cat].map((s) => `<span class="skill-tag">${s}</span>`).join("")}
        </div>
      </fieldset>
    </div>
  `).join("");

  document.getElementById("skills").innerHTML = `
    <div class="window">
      <div class="title-bar">
        <div class="title-bar-text">${t("skills.windowTitle")}</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div class="window-body">
        <h2>${t("skills.heading")}</h2>
        <div class="skills-grid">${panels}</div>
      </div>
    </div>
  `;
}

function renderProjects() {
  const projects = t("projects.items");
  const cards = projects.map((p) => `
    <div class="window project-card">
      <div class="title-bar">
        <div class="title-bar-text">${p.title}</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div class="window-body">
        <p>${p.description}</p>
        <div class="project-tags">
          ${p.tags.map((tag) => `<span class="skill-tag">${tag}</span>`).join("")}
        </div>
        <div class="project-actions">
          <button>&#x1F4C2; ${t("projects.viewCode")}</button>
          <button>&#x1F310; ${t("projects.viewDemo")}</button>
        </div>
      </div>
    </div>
  `).join("");

  document.getElementById("projects").innerHTML = `
    <div class="window">
      <div class="title-bar">
        <div class="title-bar-text">${t("projects.windowTitle")}</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div class="window-body">
        <h2>${t("projects.heading")}</h2>
        <div class="projects-grid">${cards}</div>
      </div>
    </div>
  `;
}

function renderContact() {
  document.getElementById("contact").innerHTML = `
    <div class="window">
      <div class="title-bar">
        <div class="title-bar-text">${t("contact.windowTitle")}</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div class="window-body">
        <h2>${t("contact.heading")}</h2>
        <p>${t("contact.intro")}</p>
        <form class="contact-form" onsubmit="return false;">
          <div class="form-row">
            <input type="text" placeholder="${t("contact.namePlaceholder")}" required />
          </div>
          <div class="form-row">
            <input type="email" placeholder="${t("contact.emailPlaceholder")}" required />
          </div>
          <div class="form-row">
            <textarea rows="5" placeholder="${t("contact.messagePlaceholder")}" required></textarea>
          </div>
          <button type="submit" class="default">&#x2709; ${t("contact.send")}</button>
        </form>
        <hr />
        <p>${t("contact.orFind")}</p>
        <div class="social-links">
          <a href="https://github.com" target="_blank" rel="noopener"><button>&#x1F431; GitHub</button></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener"><button>&#x1F4BC; LinkedIn</button></a>
          <a href="mailto:tu@email.com"><button>&#x1F4E7; Email</button></a>
        </div>
      </div>
    </div>
  `;
}

function renderFooter() {
  document.getElementById("main-footer").innerHTML = `
    <div class="status-bar">
      <p class="status-bar-field">${t("footer.built")} &#x2764; ${t("footer.and")} vanilla JS</p>
      <p class="status-bar-field">&#xa9; ${new Date().getFullYear()} ${t("hero.name")} &#x2014; ${t("footer.rights")}</p>
      <p class="status-bar-field">system.css</p>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  render();
});


