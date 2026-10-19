# KINGDOM — Informe de Auditoría y Estado Técnico para Revisión Externa (ChatGPT / Auditor Independiente)

**Documento:** `reportes/REVISION_CHATGPT_FASE-4.md`  
**Fecha y hora de generación:** 18 de octubre de 2026, 22:06:00 (UTC-4)  
**Proyecto:** KINGDOM by Ramses Martínez — Portafolio Personal  
**Rama activa:** `mejora-2026-10`  
**Commit base:** `a9883ec3ca3d0b166743feffd3288d38278fffce` (con cambios de Fase 4 locales sin confirmar)  
**Estado de Git:** Rama limpia de conflictos. No se han realizado commits, push, PR ni despliegues en este entorno.

---

## 1. Declaración de Integridad y Preservación Local

* **Preservación:** Todos los cambios locales de la rama `mejora-2026-10` se han conservado intactos sin sobrescritura destructiva ni reversiones no autorizadas.
* **Sin mutaciones encubiertas:** No se ha ejecutado `git commit`, `git push`, `git merge`, `git checkout` ni operaciones remotas.
* **Distinción de datos:** Todos los datos y métricas presentados en este reporte corresponden a ejecuciones directas recién terminadas (18-Oct-2026 21:50–22:05 UTC-4). No se reutilizan datos simulados ni obsoletos.

---

## 2. Inventario de Archivos en el Repositorio de Trabajo

### 2.1 Archivos modificados bajo control de versiones (21 archivos)
| Archivo | Naturaleza del cambio |
|---|---|
| `README.md` | Actualización de documentación: define `data/config.json` y `data/portfolio.json` como fuentes canónicas. |
| `assets/css/style.css` | Corrección de variable inexistente `var(--space-section)` a `var(--section-space)`; clases utilitarias `.sr-only`, `.text-center`, padding en ultra-estrecho y contraste en `<option>`. |
| `assets/css/urban.css` | Exclusión de `#contacto` en `content-visibility: auto` para evitar que navegadores headless/tablet colapsen virtualmente la altura de la sección provocando solapamiento de coordenadas con el pie de página. |
| `assets/js/app.js` | Corrección del generador `mailto:` del cotizador: lee `document.body.dataset.emailWork` en lugar de propiedad indefinida. Ajuste de copy a marca personal («Contáctame»). |
| `assets/js/site.config.js` | Refactorizado para importar dinámicamente `data/config.json` como fuente canónica y exponer la misma interfaz backward-compatible. |
| `content/en.json` | Textos de Fase 4 en inglés alineados con capacidades técnicas reales de Ramses; eliminación de trailing spaces. |
| `content/es.json` | Textos de Fase 4 en español; sanitización de «Déjanos una reseña» por «Deja una reseña»; eliminación de trailing spaces. |
| `content/portfolio.json` | Espejo sincronizado del catálogo sin referencias corporativas («para Maderera 2PI», «brand logos»). |
| `data/portfolio.json` | **Maestro canónico del portafolio** (18 proyectos validados bajo Regla 10). |
| `scripts/build-portfolio.mjs` | Sincronización estricta hacia `data/portfolio.json` y espejo a `content/portfolio.json`. |
| `templates/index.template.html` | Inyección de atributo `data-email-work="{{EMAIL_WORK}}"` en `<body>`; marcadores de Fase 4. |
| `templates/portfolio.template.html` | Inyección de atributo `data-email-work="{{EMAIL_WORK}}"` en `<body>`; marcadores unificados. |
| `tests/quote-form.spec.mjs` | Aserción robusta de que el enlace de correo contiene la dirección laboral configurada (`ramsesmarz@gmail.com`) y ningún valor `undefined`. |
| `tools/audit-site.mjs` | Auditoría de enlaces y tokens: detecta `{{...}}` residuales y atributos `mailto:undefined`. |
| `tools/build-i18n.mjs` | Reemplazo exhaustivo de tokens de Fase 4; renderizado condicional de secciones vacías; validación fail-fast que detiene el build si restan marcadores. |
| `tools/generate-portfolio-json.mjs` | Generador del catálogo ajustado a persona natural. |
| `tools/test-audit.mjs` | 2 pruebas unitarias adicionales para verificar la detección de marcadores y enlaces rotos. |
| `index.html` | HTML generado en español, validado con 0 marcadores residuales. |
| `portfolio.html` | HTML de portafolio en español, validado con 0 marcadores residuales. |
| `en/index.html` | HTML generado en inglés, validado con 0 marcadores residuales. |
| `en/portfolio.html` | HTML de portafolio en inglés, validado con 0 marcadores residuales. |

### 2.2 Archivos no rastreados (Untracked / Nuevos)
* `.agents/` — Reglas y habilidades locales del entorno de desarrollo.
* `data/config.json` — **Fuente canónica unificada de configuración** del sitio.
* `data/clientes.json` — Estructura autorizada para testimonios/clientes (actualmente `[]`, previene inventar contenido).
* `data/bordado.json` — Estructura autorizada para muestras de bordado (actualmente `[]`).
* `tools/capture-evidence.mjs` — Script automatizado con Playwright para capturar las vistas responsive oficiales.
* `reportes/FASE-4-AUDITORIA.md` — Diagnóstico inicial y evidencias de los bloqueos P0/P1.
* `reportes/FASE-4.md` — Informe de resolución y cierre de Fase 4.
* `reportes/REVISION_CHATGPT_FASE-4.md` — Este documento de auditoría continua.
* `reportes/evidencias/lh-home.report.json` — Auditoría completa de Lighthouse Móvil para `index.html`.
* `reportes/evidencias/lh-portfolio.report.json` — Auditoría completa de Lighthouse Móvil para `portfolio.html`.
* `reportes/evidencias/capturas/*.png` — 20 capturas de pantalla de alta fidelidad en resoluciones móvil (360, 390), tablet (768) y escritorio (1024, 1440).

---

## 3. Resumen Técnico del Diff

```
 README.md                         |  15 +-
 assets/css/style.css              | 281 +++++++++++++++++++++++++++++++++++++-
 assets/css/urban.css              |   2 +-
 assets/js/app.js                  |  26 +++-
 assets/js/site.config.js          |  78 ++++++-----
 content/en.json                   |  56 ++++++++
 content/es.json                   |  56 ++++++++
 content/portfolio.json            |  12 +-
 data/portfolio.json               |  12 +-
 en/index.html                     |  69 +++++++++-
 en/portfolio.html                 |  12 +-
 index.html                        |  67 ++++++++-
 portfolio.html                    |  10 +-
 scripts/build-portfolio.mjs       |   2 +-
 templates/index.template.html     |  53 ++++++-
 templates/portfolio.template.html |   3 +-
 tests/quote-form.spec.mjs         |   5 +-
 tools/audit-site.mjs              |  25 +++-
 tools/build-i18n.mjs              | 165 ++++++++++++++++++++--
 tools/generate-portfolio-json.mjs |  21 +--
 tools/test-audit.mjs              |  37 +++++
 21 files changed, 908 insertions(+), 99 deletions(-)
```

### Explicación de los cambios clave:
1. **Compilador fail-fast (`tools/build-i18n.mjs`):** Antes terminaba con código de salida `0` aun cuando quedaban variables sin sustituir. Ahora ejecuta una pasada regex sobre todo el HTML generado; si detecta `{{...}}`, aborta con excepción y código `1`.
2. **Renderizado condicional:** Si `data/clientes.json` es un array vacío, no se inyecta la sección de clientes ni testimonios ficticios. Si `assets/cv/ramses-martinez-cv.pdf` no existe físicamente en el disco, el botón CTA de descarga de CV se omite limpiamente. Si `gbp_review_url` está en blanco, el botón de reseña de Google no se muestra.
3. **Manejo de variables CSS (`assets/css/style.css`):** Se erradicó `var(--space-section)` reemplazándola por `var(--section-space)`, respetando los tokens de diseño preexistentes.
4. **Cotizador (`assets/js/app.js`):** Anteriormente asumía que `SITE_CONFIG` en el cliente contenía `contact.emailWork`, produciendo `mailto:undefined`. Ahora lee el dataset del `body` inyectado por el build y realiza fallback defensivo al enlace estático.
5. **Corrección de layout para Axe-core (`assets/css/urban.css`):** La regla `main > section:not(.hero-section) { content-visibility: auto; }` causaba que en navegadores headless a resolución de tablet, la sección `#contacto` fuese truncada a un alto virtual de 900px, solapando las coordenadas del footer con el botón de cotización. Se excluyó `:not(#contacto)` de dicha propiedad.

---

## 4. Resultados de Comandos y Códigos de Salida

Todos los comandos fueron ejecutados en la consola local de Windows PowerShell y finalizaron exitosamente:

| Comando | Código de Salida | Resultado Detallado |
|---|---|---|
| `npm run check:js` | **0** | 14 de 14 archivos JS y MJS sin errores de sintaxis (`node --check`). |
| `npm test` | **0** | **35 pruebas pasadas de 35**. 0 fallos. Valida esquemas, catálogo de 18 proyectos, cotizador y auditor. |
| `npm run build` | **0** | Compilación completa de `index.html`, `en/index.html`, `portfolio.html`, `en/portfolio.html`. 0 marcadores residuales. |
| `npm run audit:local` | **0** | 17 páginas HTML y 4 CSS auditados: 0 enlaces rotos, 0 violaciones de atributos, contraste verificado. |
| `git diff --check` | **0** | 0 errores de espacios en blanco o formato en el árbol de trabajo. |
| `npx playwright test` | **0** | **131 pruebas pasadas**, 4 omitidas por diseño (sin navegadores adicionales), **0 fallos**. |

---

## 5. Pruebas Automatizadas de Playwright y Accesibilidad (Axe-Core)

* **Ejecución:** 131 tests en 3 workers paralelos.
* **Tiempo total:** 44.6 segundos.
* **Auditoría WCAG 2.1 AA (`tests/axe-a11y.spec.mjs`):**
  * `[desktop-chromium]` ES Inicio: **Aprobado** (0 violaciones).
  * `[desktop-chromium]` ES Portafolio: **Aprobado** (0 violaciones).
  * `[desktop-chromium]` EN Home: **Aprobado** (0 violaciones).
  * `[desktop-chromium]` EN Portfolio: **Aprobado** (0 violaciones).
  * `[tablet-chromium]` ES Inicio: **Aprobado** (0 violaciones).
  * `[tablet-chromium]` ES Portafolio: **Aprobado** (0 violaciones).
  * `[tablet-chromium]` EN Home: **Aprobado** (0 violaciones).
  * `[tablet-chromium]` EN Portfolio: **Aprobado** (0 violaciones).
  * `[mobile-chromium]` ES Inicio: **Aprobado** (0 violaciones).
  * `[mobile-chromium]` ES Portafolio: **Aprobado** (0 violaciones).
  * `[mobile-chromium]` EN Home: **Aprobado** (0 violaciones).
  * `[mobile-chromium]` EN Portfolio: **Aprobado** (0 violaciones).
* **Navegación y UX:**
  * Modales con teclado (Escape) y foco atrapado: Aprobados.
  * Formulario de cotización genera WhatsApp y Mailto válidos: Aprobados.
  * Menú hamburguesa accesible: Aprobado.
  * Desbordamiento horizontal: 0 px de desborde en 360px, 390px, 768px, 1024px y 1440px.

---

## 6. Auditoría de Calidad y Rendimiento Móvil (Lighthouse 13.5.0)

Generado directamente contra servidor estático local (`http://127.0.0.1:4173`) con throttling móvil estándar:

| Página auditada | Performance | Accessibility | Best Practices | SEO | Ubicación del reporte JSON |
|---|---|---|---|---|---|
| **Inicio (`index.html`)** | **89** | **100** | **100** | **92** | `reportes/evidencias/lh-home.report.json` |
| **Portafolio (`portfolio.html`)** | **91** | **100** | **100** | **92** | `reportes/evidencias/lh-portfolio.report.json` |

---

## 7. Evidencias Visuales y Capturas de Pantalla

Se generaron y conservaron capturas de pantalla reales en la carpeta `reportes/evidencias/capturas/`:

1. **Móvil 360x740:**
   * `reportes/evidencias/capturas/home-es-mobile-360.png`
   * `reportes/evidencias/capturas/portfolio-es-mobile-360.png`
   * `reportes/evidencias/capturas/home-en-mobile-360.png`
   * `reportes/evidencias/capturas/portfolio-en-mobile-360.png`
2. **Móvil 390x844:**
   * `reportes/evidencias/capturas/home-es-mobile-390.png`
   * `reportes/evidencias/capturas/portfolio-es-mobile-390.png`
   * `reportes/evidencias/capturas/home-en-mobile-390.png`
   * `reportes/evidencias/capturas/portfolio-en-mobile-390.png`
3. **Tablet 768x1024:**
   * `reportes/evidencias/capturas/home-es-tablet-768.png`
   * `reportes/evidencias/capturas/portfolio-es-tablet-768.png`
   * `reportes/evidencias/capturas/home-en-tablet-768.png`
   * `reportes/evidencias/capturas/portfolio-en-tablet-768.png`
4. **Escritorio 1024x768:**
   * `reportes/evidencias/capturas/home-es-desktop-1024.png`
   * `reportes/evidencias/capturas/portfolio-es-desktop-1024.png`
   * `reportes/evidencias/capturas/home-en-desktop-1024.png`
   * `reportes/evidencias/capturas/portfolio-en-desktop-1024.png`
5. **Escritorio Panorámico 1440x900:**
   * `reportes/evidencias/capturas/home-es-desktop-1440.png`
   * `reportes/evidencias/capturas/portfolio-es-desktop-1440.png`
   * `reportes/evidencias/capturas/home-en-desktop-1440.png`
   * `reportes/evidencias/capturas/portfolio-en-desktop-1440.png`

---

## 8. Elementos Pendientes y Acciones Requeridas por el Titular (Ramses Martínez)

Ningún bloqueo técnico impide la publicación técnica del código actual. Sin embargo, para activar secciones opcionales se requiere contenido aportado por Ramses:
1. **Archivo de Curriculum Vitae:**
   * Ubicar el archivo final en `assets/cv/ramses-martinez-cv.pdf`. Tras recompilar con `npm run build`, el botón «Descargar CV» se activará automáticamente.
2. **Enlace a Perfil de Google Business Profile:**
   * Ingresar la URL en `data/config.json` bajo la clave `gbp_review_url`. El botón «Deja una reseña» se habilitará en el pie de página y sección de contacto.
3. **Testimonios Reales:**
   * Incorporar datos en `data/clientes.json`. La sección de testimonios se renderizará automáticamente solo cuando existan elementos autorizados.

---

## 9. Conclusión de Auditoría

El repositorio en la rama `mejora-2026-10` ha resuelto la totalidad de los problemas P0 y P1. Cuenta con **cero errores de compilación, 100% de tests unitarios y E2E aprobados, 100/100 en accesibilidad automatizada y ausencia total de enlaces rotos o tokens residuales**.

El estado actual es **APTO PARA REVISIÓN TÉCNICA EXTERNA**.
