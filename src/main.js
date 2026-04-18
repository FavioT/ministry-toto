import "./style.css";
import { translations } from "./i18n.js";
import { sendContactEmail } from "./emailjs.js";

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
  frontend: ["Angular", "SCSS", "Vanilla JS", "TypeScript", "React", "AngularJS"],
  backend: ["Node.js", "Python", "Express", "PostgreSQL", "MongoDB", ".NET", "PHP"],
  tools: ["Git", "Vercel", "Vite", "Figma", "Bootstrap", "Azure"],
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
        <img src="/favicon.svg" alt="menu" width="16" height="16" style="vertical-align:middle;" />
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
        <h1 class="title">welcome</h1>
        <button aria-label="Resize" class="resize"></button>
      </div>
      <div class="separator"></div>
      <div class="window-pane hero-body">
        <p class="hero-greeting">${t("hero.greeting")}</p>
        <h1 class="hero-name">${t("hero.name")}</h1>
        <p class="hero-title">${t("hero.title")}</p>
        <p class="hero-subtitle">${t("hero.subtitle")}</p>
        <div class="hero-actions">
          <a href="#projects"><button class="btn">${t("hero.cta")}</button></a>
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
          ${p.viewCode ? `<a href="${p.viewCode}" target="_blank" rel="noopener"><button class="btn">${t("projects.viewCode")}</button></a>` : `<button class="btn" disabled>${t("projects.viewCode")}</button>`}
          ${p.viewDemo && p.viewDemo !== "Demo" ? `<a href="${p.viewDemo}" target="_blank" rel="noopener"><button class="btn">${t("projects.viewDemo")}</button></a>` : `<button class="btn btn-default" disabled>${t("projects.viewDemo")}</button>`}
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
        <form class="contact-form" id="contact-form">
          <div class="field-row">
            <input id="contact-name" type="text" placeholder="${t("contact.namePlaceholder")}" required />
          </div>
          <div class="field-row">
            <input id="contact-email" type="email" placeholder="${t("contact.emailPlaceholder")}" required />
          </div>
          <div class="field-row">
            <textarea id="contact-message" rows="5" placeholder="${t("contact.messagePlaceholder")}" required></textarea>
          </div>
          <div id="contact-status" class="contact-status" aria-live="polite"></div>
          <button type="submit" class="btn btn-default" id="contact-submit">${t("contact.send")}</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name    = document.getElementById("contact-name").value.trim();
    const email   = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    const status  = document.getElementById("contact-status");
    const submit  = document.getElementById("contact-submit");

    submit.disabled = true;
    status.className = "contact-status contact-status--loading";
    status.textContent = t("contact.sending");

    try {
      await sendContactEmail({ name, email, message });
      status.className = "contact-status contact-status--success";
      status.textContent = t("contact.success");
      document.getElementById("contact-form").reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      status.className = "contact-status contact-status--error";
      status.textContent = t("contact.error");
    } finally {
      submit.disabled = false;
    }
  });

  document.getElementById("social").innerHTML = `
    <div class="window modeless-dialog">
      <div class="title-bar">
        <button aria-label="Close" class="close"></button>
        <h1 class="title">${t("contact.orFind")}</h1>
        <button aria-label="Resize" class="resize"></button>
      </div>
      <div class="separator"></div>
      <div class="window-pane">
        <div class="social-links">
          <a href="https://github.com/FavioT/" target="_blank" rel="noopener"><button class="btn">GitHub</button></a>
          <a href="https://linkedin.com/in/lorem-ipsum" target="_blank" rel="noopener"><button class="btn">LinkedIn</button></a>
          <a href="mailto:favio.tschanza@outlook.es"><button class="btn">Email</button></a>
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

