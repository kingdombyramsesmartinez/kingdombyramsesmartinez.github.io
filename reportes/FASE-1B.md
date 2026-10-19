# KINGDOM — REPORTE DE FASE 1B: CIERRE DE FASE 1 Y PUBLICACIÓN TEMPRANA

**Fecha:** 13/14 de octubre de 2026  
**Rama de trabajo:** `mejora-2026-10`  
**Ejecutor:** Antigravity (Pair Programming con Ramses Martínez)  
**Documento base:** `docs/KINGDOM-plan-mejora-portafolio.md` (Revisión 4)  
**Estado:** Fase 1B completada con éxito. Pruebas y auditorías al 100%.

---

## 1. Archivos con insignias oficiales (Alcaldía de San Felipe y TSJ)

Conforme a la **decisión expresa de Ramses Martínez (13/10/2026)**, se determinó:
- **No mover ni eliminar** los archivos de imagen existentes en el repositorio.
- **Auditoría de referencias:** Se verificó exhaustivamente en todo el proyecto:
  - `content/portfolio.json`: **Cero referencias**. Ninguna de las 39 piezas del portafolio activo enlaza o expone imágenes de la Alcaldía ni del TSJ.
  - Páginas HTML (`index.html`, `portfolio.html`, `en/index.html`, `en/portfolio.html`, páginas legales): **Cero referencias públicas visibles**.
  - `templates/`: **Cero referencias**. El modal del home y portafolio no precarga ninguna de estas imágenes (el modal por defecto fue reemplazado por la pieza real `academia de cuatro`).
  - `sitemap.xml`: **Cero referencias**.
  - `content/overrides.json`: Contiene una entrada histórica huérfana (`"alcaldia-de-san-felipe"`), pero no es consumida por el build activo de `portfolio.json`.
  - Herramientas auxiliares (`tools/sync-artwork.mjs`, `tools/update-portfolio-artistic.mjs`): Poseen listas de exclusión expresa para evitar incorporar estas imágenes a la galería pública.
- **Resultado:** Los archivos físicos permanecen intactos en `assets/artwork/` y `assets/artwork/thumbs/` sin impacto en el sitio web público.

---

## 2. Pieza "Ford Ka Edition" y privacidad en imágenes

Conforme a la **decisión de Ramses Martínez (13/10/2026)**:
- **No se modificó ni ocultó** la imagen ni su miniatura (`assets/artwork/Ford Ka Edition-franela con dtf.webp`). La placa se mantiene tal como fue suministrada y el riesgo es asumido por el propietario.
- **Privacidad y confidencialidad:** No se publica en ningún texto, ficha, metadato ni descripción del sitio el nombre del cliente deudor.
- **Segregación legal:** La pieza está clasificada como `tipo: "encargo-marca"`, ubicada fuera de la sección "Todos" de clientes generales, sin precio asignado y sin botón de cotización o enlace directo a WhatsApp. Acompañada del disclaimer de encargos automotrices de la sección 3.3b.

---

## 3. Páginas legales — Ley sobre el Derecho de Autor y portafolio

Se actualizaron las páginas de Propiedad Intelectual (`legal/intellectual-property.html` y `en/legal/intellectual-property.html`) cumpliendo estrictamente con la directriz de la Fase 1B:

### 3.1 Artículos previamente citados y su propósito original:
1. **Artículos 1, 2, 5 y 6 (LDA):** Citados para fundamentar la autoría originaria de Ramses Martínez sobre el diseño gráfico textil, patronaje, color y composición por el mero hecho de la creación de la obra del ingenio.
2. **Artículo 51 y siguientes (LDA):** Citados para fundamentar el principio de interpretación restrictiva en la cesión de derechos patrimoniales y la obligatoriedad de que conste por escrito, aclarando que el pago por confección física no transfiere la titularidad del diseño.
3. **Artículos 18 y 19 (LDA):** Citados para invocar el derecho moral irrenunciable e inalienable a divulgar la obra y reivindicar su paternidad en el portafolio profesional.

### 3.2 Modificación aplicada:
- **Supresión de numeración de artículos:** Se removieron todas las menciones a artículos numéricos específicos de la LDA, citando de manera robusta y general la **"Ley sobre el Derecho de Autor (1993)"** (y en inglés *"Venezuelan Copyright Law (Ley sobre el Derecho de Autor, 1993)"*).
- **Reformulación neutra de la cláusula de exhibición:**
  - *Español:* `"Ramses Martínez conserva el reconocimiento de la autoría de sus creaciones. Kingdom puede mostrar trabajos realizados como referencia, con los avisos de titularidad de este sitio."`
  - *Inglés:* `"Ramses Martínez retains recognition of authorship over his creations. Kingdom may show completed work as a reference, together with the ownership notices on this site."`
- **Constitución:** Se mantuvieron intactos los **Artículos 28 (habeas data) y 60** de la Constitución de la República Bolivariana de Venezuela en las políticas de privacidad.

---

## 4. Datos estructurados JSON-LD estáticos en el build

Se eliminó la inyección dinámica de JSON-LD en tiempo de ejecución por parte de `assets/js/app.js` y se implementó la generación estática directa durante el proceso de build:

- **Script de build (`tools/build-i18n.mjs`):** Función `buildJsonLd()` que genera el bloque `<script type="application/ld+json">` e interpola el grafo directamente en el `<head>` del HTML antes de Analytics.
- **Páginas con JSON-LD estático:**
  - `index.html` (ES Home): `@type: Person` (marca Kingdom) + `WebSite` + `WebPage` + 3 entidades `Service`.
  - `en/index.html` (EN Home): Grafo en inglés con paridad completa.
  - `portfolio.html` (ES Portafolio): `Person` + `WebSite` + `WebPage` + `BreadcrumbList` + `CollectionPage`.
  - `en/portfolio.html` (EN Portfolio): Grafo en inglés con paridad completa.
- **Páginas legales y 404:** No contienen JSON-LD (respetando la regla de no añadir datos estructurados innecesarios).
- **Verificación contra prohibiciones:** Cero instancias de `ProfessionalService`, `Organization`, `aggregateRating` ni reseñas artificiales.
- **Versionado de scripts:** `app.js` se actualizó a `v=3` en plantillas para invalidar caché del navegador.

---

## 5. Diagnóstico de publicación y estado de ramas

- **Configuración de GitHub Pages:**
  - Repositorio remoto: `https://github.com/kingdombyramsesmartinez/kingdombyramsesmartinez.github.io.git`
  - La publicación se realiza desde la rama **`main`** (raíz `/`).
  - `.github/workflows/audit.yml` actúa como CI para verificar sintaxis, build, auditoría local y Playwright en push/PR hacia `main`.
- **Estado de ramas locales vs remotas:**
  - Rama `main`: Sincronizada con `origin/main` (0 commits adelante, 0 atrás). Último commit en producción: `793d73c`.
  - Rama de trabajo `mejora-2026-10`: **19 commits locales** por delante de `origin/main`. Cumple con la Regla 1 (sin push a `main`).
- **Diferencia con el sitio en producción:**
  - El sitio publicado (`https://kingdombyramsesmartinez.github.io/`) tiene fecha de despliegue previa (13/10/2026 00:07 GMT) y no contiene aún los cambios de la Fase 1/1B (separación rigurosa de fanart, eliminación de precios en piezas de riesgo, JSON-LD estático, avisos de marcas vehiculares, etc.).
  - **Recomendación del plan:** Una vez revisada y aprobada esta Fase 1B por Ramses, procede fusionar `mejora-2026-10` a `main` y hacer push para mitigar tempranamente los riesgos legales en el sitio público antes de avanzar a la Fase 2.

---

## 6. Resultados de pruebas y auditorías automatizadas

| Prueba / Auditoría | Comando | Resultado | Estado |
|---|---|---|---|
| Sintaxis JavaScript | `npm run check:js` | 11 archivos validados | **0 errores (PASS)** |
| Auditoría del Sitio | `npm run audit:local` | 17 páginas HTML, 4 CSS | **0 violaciones (PASS)** |
| Tests de Auditor (Regresión) | `npm test` | 33 suites / tests | **33 pasados, 0 fallos (PASS)** |
| E2E + Accesibilidad Playwright | `npm run test:e2e` | 135 pruebas en total | **127 pasados, 8 skipped, 0 fallos (PASS)** |

- **Detalle de las 8 pruebas skipped en Playwright:** Corresponden a los tests de viewport desktop omitidos por diseño en el perfil móvil `mobile-chromium`, lo cual es el comportamiento estándar y esperado del framework.

---

## 7. Archivos modificados en la Fase 1B

1. `tools/build-i18n.mjs` — Incorporación del generador `buildJsonLd()` para inyección estática en build.
2. `templates/index.template.html` — Placeholder `{{JSON_LD}}` antes de Analytics y actualización a `app.js?v=3`.
3. `templates/portfolio.template.html` — Placeholder `{{JSON_LD}}` antes de Analytics y actualización a `app.js?v=3`.
4. `assets/js/app.js` — Removida la inyección runtime de JSON-LD.
5. `index.html` — Regenerado con JSON-LD estático.
6. `en/index.html` — Regenerado con JSON-LD estático en inglés.
7. `portfolio.html` — Regenerado con JSON-LD estático.
8. `en/portfolio.html` — Regenerado con JSON-LD estático en inglés.
9. `legal/intellectual-property.html` — Cita general a Ley sobre el Derecho de Autor (1993) y cláusula de portafolio neutra.
10. `en/legal/intellectual-property.html` — Cita general en inglés y cláusula de portafolio neutra.
11. `docs/KINGDOM-plan-mejora-portafolio.md` — Copia de respaldo sincronizada de la Revisión 4 del plan.
12. `reportes/FASE-1B.md` — Este reporte oficial de cierre de fase.

---

## 8. Pendientes para siguientes fases

1. **Fase 2 (Datos del portafolio, títulos, glifos y precios):**
   - Creación de `data/portfolio.json` como única fuente de verdad con los campos requeridos (`id`, `titulo`, `cliente`, `tipo`, `categoria`, `tecnica`, `prenda`, `tela`, `estado`, `precio_usd`, `descripcion`, `imagen`, `miniatura`, `alt`).
   - Aplicación de los 39 títulos normalizados de la sección 5 del documento.
   - Redacción de descripciones y `alt` individuales específicos (no plantillas repetitivas).
   - Asignación de la lista oficial de precios al detal (sección 4).
   - Normalización de nombres de imágenes a minúsculas sin espacios (`reportes/renombres.csv`).
2. **Decisión de despliegue temprano:**
   - Decidir si se fusiona la Fase 1/1B a `main` para publicar la mitigación legal inmediatamente en GitHub Pages, o si se continúa directamente con la Fase 2 en la rama `mejora-2026-10`.
