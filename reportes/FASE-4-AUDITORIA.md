# FASE 4 — Auditoría de Línea Base (Fase A — Solo Lectura)

**Fecha de ejecución:** 2026-10-18  
**Rama auditada:** `mejora-2026-10`  
**Commit base (HEAD):** `a9883ec3ca3d0b166743feffd3288d38278fffce` (*Fase 3: cotizador interactivo 3 pasos, GA4 Consent Mode v2 y banner de cookies*)  
**Alcance:** Diagnóstico técnico integral en modo de solo lectura del estado inicial con los cambios sin confirmar de Fase 4 antes de aplicar reparaciones.

---

## 1. Inventario de Entorno y Herramientas

| Herramienta | Estado | Versión / Ubicación verificada |
| :--- | :--- | :--- |
| **Node.js** | Disponible | `v24.19.0` |
| **npm** | Disponible | `11.17.0` |
| **Git** | Disponible | Rama `mejora-2026-10` (sin operaciones destructivas ni commits) |
| **Playwright CLI** | Disponible | `@playwright/test` `1.59.1` |
| **Chromium (Playwright)** | Disponible | `C:\Users\Dell\AppData\Local\ms-playwright\chromium-1248\chrome-win64\chrome.exe` |
| **Lighthouse CLI** | Disponible | `13.5.0` (`C:\Users\Dell\AppData\Roaming\npm\lighthouse.cmd`) |
| **Chrome DevTools MCP** | Disponible | Servidor MCP activo y verificado (`list_pages` funcional) |
| **`axe-core`** | Disponible | Integrado en `tests/axe-a11y.spec.mjs` (`node_modules/axe-core/axe.min.js`) |

---

## 2. Estado Inicial del Árbol de Trabajo (`git status` y `git diff --stat`)

### 2.1 `git status --short --branch`
```text
## mejora-2026-10
 M assets/css/style.css
 M assets/js/app.js
 M content/en.json
 M content/es.json
 M templates/index.template.html
 M templates/portfolio.template.html
?? data/bordado.json
?? data/clientes.json
?? data/config.json
```

### 2.2 `git diff --stat`
```text
 assets/css/style.css              | 244 ++++++++++++++++++++++++++++++++++++++
 assets/js/app.js                  |  19 +++
 content/en.json                   |  54 ++++++++-
 content/es.json                   |  54 ++++++++-
 templates/index.template.html     |  48 +++++++-
 templates/portfolio.template.html |   2 +
 6 files changed, 420 insertions(+), 1 deletion(-)
```

### 2.3 `git diff --check`
```text
content/en.json:346: new blank line at EOF.
content/es.json:346: new blank line at EOF.
```
*(Además, `templates/index.template.html` y `templates/portfolio.template.html` presentan advertencia de conversión LF/CRLF en Windows).*

---

## 3. Resultados de Comandos de Verificación en Línea Base (Antes de Reparar)

1. **`npm run check:js`**
   - **Resultado:** `PASS` (`[check-syntax] OK (14 files checked)`).
2. **`npm test`**
   - **Resultado:** `PASS` (`33 tests, 0 failed` en `tools/test-audit.mjs`).
3. **`npm run audit:local` (antes de ejecutar `npm run build`)**
   - **Resultado:** `FAIL` (código de salida `1`, **2 violaciones**):
     - `[undefined-css-var] assets/css/style.css: uses undefined CSS variable(s): --space-section`
     - `[undefined-css-var] en/index.html: uses undefined CSS variable(s): --space-section`
4. **`npm run build` (comprobación temporal sobre las plantillas de Fase 4)**
   - **Resultado:** Código de salida `0` (**falso positivo bloqueante P0**), dejando **17 marcadores `{{...}}` sin sustituir** en `index.html` y `en/index.html` y **1 marcador `{{BORDADO_SECTION_HTML}}`** en `portfolio.html` y `en/portfolio.html`.
5. **`npm run audit:local` (después de ejecutar `npm run build`)**
   - **Resultado:** `FAIL` (código de salida `1`, **4 violaciones**):
     - `[broken-link] index.html: href="{{CATALOG_URL}}" -> missing c:\Users\Dell\Desktop\kingdom by ramses martinez portafolio\{{CATALOG_URL}}`
     - `[broken-link] en/index.html: href="{{CATALOG_URL}}" -> missing c:\Users\Dell\Desktop\kingdom by ramses martinez portafolio\en\{{CATALOG_URL}}`
     - `[undefined-css-var] assets/css/style.css: uses undefined CSS variable(s): --space-section`
     - `[undefined-css-var] en/index.html: uses undefined CSS variable(s): --space-section`
   - *(Nota: tras verificar este comportamiento en la Fase A, se restauraron los 4 HTML generados a su estado previo antes de iniciar la Fase B).*

---

## 4. Hallazgos Técnicos Detallados (Subagentes A, B, C y D)

### 4.1 P0 — Bloqueantes de Publicación

| ID | Categoría | Archivo y Línea | Descripción técnica |
| :--- | :--- | :--- | :--- |
| **P0-01** | Build / Plantillas | `tools/build-i18n.mjs` (`renderIndex` L172–477, `renderPortfolioPage` L479–668) | El script de build termina con código `0` sin verificar si quedan placeholders `{{...}}` en el HTML de salida. Tampoco `tools/audit-site.mjs` valida placeholders residuales. |
| **P0-02** | Build / Tokens Fase 4 | `templates/index.template.html` (L230–271, L413, L415, L455) y `templates/portfolio.template.html` (L122) | 17 tokens en `index.template.html` (`{{CLIENTS_SECTION_HTML}}`, `{{HIRE_EYEBROW}}`, `{{HIRE_TITLE}}`, `{{HIRE_DESC}}`, `{{HIRE_SERVICES_TITLE}}`, `{{HIRE_SERVICES_ITEMS_HTML}}`, `{{HIRE_TOOLS_TITLE}}`, `{{HIRE_TOOLS_HTML}}`, `{{HIRE_LANGUAGES_TITLE}}`, `{{HIRE_LANGUAGES_TEXT}}`, `{{HIRE_CV_BUTTON_HTML}}`, `{{HIRE_LINKEDIN_BTN}}`, `{{HIRE_EMAIL_BTN}}`, `{{HIRE_LOCAL_ORDERS_NOTE}}`, `{{CATALOG_URL}}`, `{{GBP_REVIEW_LINK_ITEM_HTML}}`, `{{MODAL_FABRIC_LABEL}}`) y 1 en `portfolio.template.html` (`{{BORDADO_SECTION_HTML}}`) carecen de sustitución en `tools/build-i18n.mjs`. En particular, `{{MODAL_FABRIC_LABEL}}` ya estaba filtrado en `index.html:878` y `en/index.html:878`. |
| **P0-03** | CSS | `assets/css/style.css` (L1925, L2052) | `.hire-section` y `.clients-section` usan `var(--space-section)`, que no existe en `:root`. El token definido en `assets/css/style.css:63` es `--section-space: clamp(64px, 7vw, 110px);`. |

### 4.2 P1 — Defectos Altos (Funcionalidad, Datos y Arquitectura)

| ID | Categoría | Archivo y Línea | Descripción técnica |
| :--- | :--- | :--- | :--- |
| **P1-01** | JS / Cotizador | `assets/js/app.js` (L6, L243) | `SITE_CONFIG.contact` solo define `whatsappNumber`. En `updateSummary()` (L243), `emailLink.href` se sobrescribe con `mailto:${SITE_CONFIG.contact.emailWork}?...`, resultando en `mailto:undefined?...` al cargar la página y al cambiar cualquier opción del cotizador. Además, `tests/quote-form.spec.mjs:48` solo comprueba `toContain("mailto:")`, por lo que no detectaba `mailto:undefined`. |
| **P1-02** | Activos / CV | `data/config.json` (L11), `assets/cv/` | `cv_path` apunta a `assets/cv/ramses-martinez-cv.pdf`, pero el directorio `assets/cv/` está vacío. Si se renderiza el botón de descarga del CV sin validar la existencia física del archivo, se publica un enlace roto (404). |
| **P1-03** | Secciones Condicionales | `data/clientes.json` (`[]`), `data/bordado.json` (`[]`), `data/config.json` (`gbp_review_url: ""`) | Tanto `data/clientes.json` como `data/bordado.json` son arreglos vacíos `[]`, y `gbp_review_url` es `""`. El build debe omitir por completo `{{CLIENTS_SECTION_HTML}}`, `{{BORDADO_SECTION_HTML}}` y `{{GBP_REVIEW_LINK_ITEM_HTML}}` (devolviendo `""` sin contenedores vacíos ni enlaces rotos). |
| **P1-04** | Configuración Duplicada | `data/config.json` vs `assets/js/site.config.js` | `data/config.json` repite datos de `assets/js/site.config.js` en `snake_case`, pero ningún script lee `data/config.json`. Debe declararse `data/config.json` como fuente canónica de configuración y sincronizar `assets/js/site.config.js`. |
| **P1-05** | Fuente de Verdad de Catálogo | `data/portfolio.json` vs `content/portfolio.json` | La directriz de Fase 2 establece `data/portfolio.json` como única fuente de verdad, pero `tools/build-i18n.mjs:17`, `tools/audit-site.mjs:402` y `README.md:13` siguen tratando `content/portfolio.json` como principal. |

### 4.3 P2 — Defectos Medios (Marca Personal, Contenido, CSS Auxiliar y Formato)

| ID | Categoría | Archivo y Línea | Descripción técnica |
| :--- | :--- | :--- | :--- |
| **P2-01** | Regla 10 (Marca Personal) | `data/portfolio.json` (L1136, L1149), `content/portfolio.json`, `tools/generate-portfolio-json.mjs` (L641) | La pieza `maderera-2pi` contiene `"Chemise de trabajo para la empresa Maderera 2PI..."`. Además, `alexauto` (L88) y `listaprecio-com` (L1200) usan `"company logos"` / `"company logo"` en inglés. Deben cambiarse a `"para Maderera 2PI"` y `"brand logos"` / `"brand logo"`, y añadirse una regla en `tools/audit-site.mjs` que prohíba el término corporativo `empresa`. |
| **P2-02** | Regla 10 (Plural Corporativo) | `content/es.json:335`, `content/en.json:335`, `assets/js/app.js:302` | `clients.reviewCta` usa plural (`"Déjanos una reseña en Google ↗"` / `"Leave us a review on Google ↗"`) y `app.js:302` usa `"Contáctanos"`. Deben corregirse a singular/neutro (`"Deja una reseña en Google ↗"`, `"Leave a review on Google ↗"`, `"Contáctame"`). |
| **P2-03** | Contenido `hire` no confirmado | `content/es.json` (L301, L324), `content/en.json` (L301, L324) | `hire.services[0].desc` menciona marcas específicas de máquinas `(Tajima, Barudan, Brother)` y `hire.languages` añade `(comunicación técnica escrita)` que no están confirmadas en la Sección 7 de `docs/KINGDOM-plan-mejora-portafolio.md`. Se ajustarán estrictamente a los datos verificados de la Sección 7 y se documentarán las preguntas pendientes para Ramses. |
| **P2-04** | CSS Auxiliar / Responsive | `assets/css/style.css` | Falta la clase `.sr-only` (usada en los radio buttons de `tools/build-i18n.mjs:391,407`) y `.text-center` (usada en `index.template.html:168`). Además, en `<=360px` conviene reducir el padding de `.hire-cta-box` y `.hire-service-card` y asegurar `overflow-wrap: anywhere` en botones de acción para evitar desbordamiento horizontal en 320 px. |
| **P2-05** | Formato / Git | `content/es.json:346`, `content/en.json:346` | Líneas en blanco sobrantes al final del archivo reportadas por `git diff --check`. |
