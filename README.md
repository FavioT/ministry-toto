<div align="center">
  <img src="public/logo.svg" alt="Portfolio logo" width="100" />
  <h1>Portfolio — Desarrollador Web</h1>
  <p>Página de portfolio personal. Minimalista, mobile-first, con estética retro macOS Classic.</p>

  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
</div>

---

## Vista previa

> Interfaz inspirada en Windows 98 usando el framework [98.css](https://jdan.github.io/98.css/), con cambio de idioma ES/EN integrado.

---

## Stack

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica |
| Vanilla CSS | Estilos custom, mobile-first |
| Vanilla JS | Lógica, i18n, render dinámico |
| [system.css](https://sakofchit.github.io/system.css/) | Framework CSS estilo retro macOS Classic |
| [Vite](https://vitejs.dev/) | Build tool + servidor de desarrollo |

---

## Estructura

```
├── public/
│   ├── favicon.svg      # Favicon
│   └── logo.svg         # Logo del proyecto
├── src/
│   ├── main.js          # Lógica principal y render
│   ├── i18n.js          # Traducciones ES / EN
│   └── style.css        # Estilos personalizados
├── index.html
└── package.json
```

---

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Previsualizar build
npm run preview
```

---

## Personalización

Edita los archivos:

- **`src/i18n.js`** — nombre, bio, proyectos, links
- **`src/main.js`** — skills (arrays `frontend`, `backend`, `tools`)
- **`src/style.css`** — colores y layout

---

## Licencia

MIT

