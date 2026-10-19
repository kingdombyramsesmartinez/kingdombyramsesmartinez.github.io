# AUDIT CONTEXT — KINGDOM by Ramses Martínez

**Fecha de generación:** 19 de octubre de 2026 (00:52 -04:00)  
**Propósito:** Contexto técnico, arquitectónico y operativo integral para revisión por auditor externo previa al despliegue en GitHub Pages.  
**Plataforma de despliegue:** GitHub Pages (sitio 100% estático, dual ES/EN servido exclusivamente desde `dist/`).  
**Rama activa:** `mejora-2026-10`

---

## 1. Stack Tecnológico, Versiones y Scripts

### 1.1 Entorno y Dependencias
- **Runtime:** Node.js v24.19.0 (ES Modules nativos `"type": "module"`).
- **Herramientas de empaquetado/build:** Node scripts nativos (`tools/build-i18n.mjs`, `tools/build-dist.mjs`). Sin bundlers externos pesados para producción; el HTML se compila directamente desde plantillas semánticas y se publica desde `dist/`.
- **Testing y Auditoría:**
  - `@playwright/test`: `^1.64.0` (Tests E2E, multi-dispositivo y visuales en Chromium Desktop, Tablet y Mobile: 131 tests pasando al 100%).
  - `@axe-core/playwright`: `^4.13.0` (Validación automatizada de accesibilidad WCAG 2.1 AA: 0 violaciones).
  - `sharp`: `^0.35.5` (Procesamiento y optimización de imágenes WebP/JPEG).
  - `ttf2woff2`: `^8.0.1` (Compresión de fuentes WOFF2 locales).
  - `@fontsource-variable/montserrat`: `^5.3.0` (Tipografía canónica libre OFL).
  - `Lighthouse CLI`: v13.5.0 (Auditoría de rendimiento, SEO, Best Practices y A11y con mediana de 3 corridas).

### 1.2 Scripts en `package.json`
```json
{
  "name": "kingdom-portfolio",
  "private": true,
  "version": "1.1.0",
  "type": "module",
  "scripts": {
    "check:js": "node tools/check-js-syntax.mjs",
    "test": "node --test tools/test-audit.mjs",
    "test:e2e": "playwright test",
    "test:all": "npm test && npm run test:e2e",
    "build": "node tools/build-i18n.mjs",
    "build:dist": "node tools/build-dist.mjs",
    "audit:local": "node tools/audit-site.mjs"
  }
}
```

---

## 2. Resumen de Cambios Locales no Publicados

### 2.1 Estado de Git (`git status`) y Cambios Recientes
Rama: `mejora-2026-10` (sin commits ni pushes realizados, trabajando limpiamente en working copy).
- **Seguridad:**
  - Eliminado parámetro obsoleto `anonymize_ip: true` de GA4 en `assets/js/analytics.js`.
  - Depuración completa de correos personales en documentación y plantillas; único correo laboral activo: `kingdombrandbqto@gmail.com`.
  - Protección anti-clickjacking documentada en `assets/js/app.js` aclarando la limitación de cabeceras HTTP de GitHub Pages.
  - Documentada la ausencia de cabeceras a nivel de servidor (`X-Frame-Options`, `frame-ancestors`, `HSTS`) en `SECURITY.md`, `legal/security.html` y `en/legal/security.html`.
- **Diseño y UX:**
  - Banner de cookies ultra compacto en móviles (<=480px), fijado al borde inferior sin tapar los botones de acción del hero, con botones Aceptar/Rechazar en una sola fila y accesibilidad AA.
  - Portafolio (ES y EN): Textos actualizados a "Trabajos y exploraciones" ("Works & Explorations") para representar tanto piezas de clientes como estudios y exploraciones gráficas.
  - Enlace "FAQ" añadido al menú de navegación de `portfolio.template.html` (ES y EN) hacia `index.html#faq`, manteniendo coherencia total entre páginas.
  - Eliminación de shift de diseño (CLS) mediante reserva explícita de altura en CSS (`urban-divider`, `--tape`, `--drip`, `--stitch`).
  - Sustitución de `kingdom-logo-white.png` por `kingdom-logo-white.webp` en `404.html` y eliminación de la imagen PNG original.
- **Despliegue GitHub Pages:**
  - Creación de `.github/workflows/deploy.yml` que ejecuta build, test, audit:local y publica exclusivamente la carpeta `dist/`.
  - Script `build:dist` añadido a `package.json` para empaquetar una carpeta de distribución limpia (178 archivos, 10.81 MB).
  - Canonical, hreflang, OpenGraph y robots.txt configurados hacia `https://kingdombyramsesmartinez.github.io`.
  - `.gitignore` actualizado con `audit-reports/*.html`, `test-results/` y `dist/`.

### 2.2 Resumen Estadístico (`git diff --stat`)
```text
 .gitignore                                         |   3 +
 404.html                                           |   2 +-
 README.md                                          |  15 +-
 SECURITY.md                                        |   7 +-
 assets/css/style.css                               | 289 ++++++++++++++++++++-
 assets/css/urban.css                               |  49 +++-
 assets/js/analytics.js                             |   6 +-
 assets/js/app.js                                   |  31 ++-
 assets/js/site.config.js                           |  77 +++---
 content/en.json                                    |  61 ++++-
 content/es.json                                    |  61 ++++-
 content/portfolio.json                             |  12 +-
 data/portfolio.json                                |  12 +-
 docs/KINGDOM-plan-mejora-portafolio.md             |   2 +-
 en/index.html                                      |  99 +++++--
 en/legal/security.html                             |   1 +
 en/portfolio.html                                  |  52 ++--
 index.html                                         |  97 +++++--
 legal/security.html                                |   1 +
 package.json                                       |   1 +
 portfolio.html                                     |  50 ++--
 scripts/build-portfolio.mjs                        |   2 +-
 sitemap.xml                                        |  32 +--
 templates/index.template.html                      |  79 ++++--
 templates/portfolio.template.html                  |  21 +-
 tests/quote-form.spec.mjs                          |   5 +-
 tools/audit-site.mjs                               |  27 +-
 tools/build-i18n.mjs                               | 179 ++++++++++++-
 tools/generate-portfolio-json.mjs                  |  21 +-
 tools/serve-static.mjs                             |   7 +-
 tools/test-audit.mjs                               |  37 +++
 46 files changed, 1093 insertions(+), 245 deletions(-)
```

---

## 3. Rol y Configuración de Ponytail, Graphify y Addy Osmani Skills

### 3.1 Ponytail (`.agents/skills/ponytail/` y `.agents/rules/AGENTS.md`)
- **Principio:** *Lazy Senior Developer Mode*. Máxima eficiencia, cero abstracciones innecesarias (YAGNI), reutilización del código existente y APIs nativas de plataforma.
- **Aplicación:** Solución de la causa raíz en lugar de parches repetitivos, eliminación de dependencias prescindibles y mantenimiento del mínimo diff funcional.

### 3.2 Graphify (`graphify-out/`)
- **Principio:** Grafo de conocimiento y mapa relacional del proyecto (`graph.json`, `GRAPH_REPORT.md`).
- **Aplicación:** Análisis estructural de dependencias, visualización de nodos maestros y consultas eficientes de arquitectura.

### 3.3 Addy Osmani Agent Skills (`agent-skills/`)
- **Principio:** Buenas prácticas de ingeniería de software web (12 skills de arquitectura, planificación, TDD, a11y, seguridad, performance y despliegue).
- **Aplicación:** Guía para desarrollo dirigido por especificaciones, control estricto de accesibilidad WCAG y automatización de entrega.

---

## 4. Decisiones de Diseño y Arquitectura Importantes

1. **Datos de Contacto Oficial:**
   - **Correo Laboral:** `kingdombrandbqto@gmail.com`.
   - **WhatsApp:** `+58 424-109-2124`.
2. **Paleta Cromática Oficial:**
   - Negro (`#070706`), Superficie (`#0D0D0C`), Gris (`#85857E`), Blanco (`#FFFFFF`), Acento Verde Oliva (`#7A8058`), Acento Beige Hueso (`#E9E0D0`).
3. **Generación Estática Canónica (SSG Ligero):**
   - Plantillas semánticas (`templates/`) combinadas con diccionarios i18n (`content/`) y datos canónicos (`data/`).
   - Salida bilingüe limpia (`index.html`, `portfolio.html`, `en/index.html`, `en/portfolio.html`).
4. **Carpeta de Distribución `dist/`:**
   - Despliegue aislado que incluye únicamente los archivos necesarios para runtime y excluye reportes, pruebas, herramientas y artefactos de desarrollo.
5. **Seguridad y Privacidad:**
   - Bloqueo total de scripts externos de analítica hasta la pulsación afirmativa del banner de cookies.
   - CSP estricta con directivas `script-src`, `style-src` y `upgrade-insecure-requests`.

---

## 5. Resultados de Verificación y Auditoría Final

| Prueba / Auditoría | Herramienta | Resultado | Estado |
| :--- | :--- | :--- | :--- |
| **Pruebas de Auditoría Local** | `tools/audit-site.mjs` | 35/35 verificaciones pasadas | **PASS** |
| **Sintaxis de JavaScript** | `tools/check-js-syntax.mjs` | 16/16 archivos válidos | **PASS** |
| **Vulnerabilidades npm** | `npm audit` | 0 vulnerabilidades | **PASS** |
| **Pruebas End-to-End** | Playwright (Desktop, Tablet, Mobile) | 131 tests pasados, 4 omitidos | **PASS** |
| **Accesibilidad Automatizada** | axe-core | 0 infracciones WCAG 2.1 AA | **PASS** |
| **Lighthouse Home Mobile** | Lighthouse CLI (mediana 3 corridas) | Perf: 91, A11y: 100, BP: 100, SEO: 92 | **PASS** |
| **Lighthouse Home Desktop** | Lighthouse CLI (mediana 3 corridas) | Perf: 100, A11y: 100, BP: 100, SEO: 92 | **PASS** |
| **Lighthouse Portfolio Mobile** | Lighthouse CLI (mediana 3 corridas) | Perf: 91, A11y: 100, BP: 100, SEO: 92 | **PASS** |
| **Lighthouse Portfolio Desktop** | Lighthouse CLI (mediana 3 corridas) | Perf: 99, A11y: 100, BP: 100, SEO: 92 | **PASS** |

---

## 6. Problemas Conocidos y Deuda Técnica Pendiente

1. **Curriculum Vitae (PDF):**
   - El archivo físico `assets/cv/ramses-martinez-cv.pdf` está pendiente de ser suministrado por el cliente. El template oculta el botón si no existe el archivo.
2. **Reseñas en Google Business Profile:**
   - La URL de reseñas `gbp_review_url` en `data/config.json` se habilitará una vez configurada la ficha comercial en Google.
3. **Cabeceras HTTP en GitHub Pages:**
   - GitHub Pages no soporta inyección de cabeceras de respuesta HTTP personalizadas (`X-Frame-Options`, `Content-Security-Policy`, `HSTS`). Se mitiga mediante `<meta http-equiv="Content-Security-Policy">` y script de frame-busting en el frontend, quedando documentado en `SECURITY.md` y `legal/security.html`.

---

## 7. Objetivo del Portafolio y Público Objetivo

- **Objetivo:** Exhibir la trayectoria, solvencia técnica y catálogo de piezas de diseño textil, sublimación deportiva y digitalización de matrices de bordado industrial (`DST`/`PES`) de Ramses Martínez.
- **Público:** Talleres de confección textil, marcas de indumentaria streetwear, clubes deportivos y empresas que requieren dotación corporativa de alta durabilidad y calibración exacta.
