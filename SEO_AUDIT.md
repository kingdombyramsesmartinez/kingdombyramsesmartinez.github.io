# KINGDOM — AUDITORÍA ESTRATÉGICA E IMPLEMENTACIÓN SEO TÉCNICO & ENTITY SEO

**Fecha:** 2026-10-07  
**Estado:** Implementado, compilado y auditado al 100%  
**Norma de cumplimiento:** Google Search Essentials, Schema.org, WCAG 2.1 AA, Content-Security-Policy estricta.

---

## 1. Diagnóstico Inicial y Problemas Encontrados

Durante la auditoría exhaustiva de la arquitectura del proyecto se identificaron los siguientes puntos críticos que limitaban el posicionamiento orgánico de la marca **KINGDOM**:

1. **Dilución de la Marca Principal en Metadatos y Títulos:**
   - La etiqueta `<title>` y `<meta name="description">` en `content/es.json` y `content/en.json` priorizaban el nombre personal (*"Ramses Martínez | Kingdom..."*) en lugar de consolidar a **KINGDOM** como la entidad corporativa principal y *"Kingdom by Ramses Martínez"* como denominación descriptiva.
   - El atributo `og:site_name` figuraba como `"Kingdom"` con minúsculas y sin contextualización canónica de entidad.
   - El archivo `site-manifest.json` nombraba a la aplicación como *"Kingdom — Ramses Martínez"* en lugar de la jerarquía de marca internacional.

2. **Ausencia de Datos Estructurados Formales (Schema.org / JSON-LD):**
   - El sitio carecía de un grafo semántico estructurado que explicara a Googlebot, Knowledge Graph y modelos de IA la relación inequívoca entre la marca (**KINGDOM**), su fundador (**Ramses Martínez**), su ubicación geográfica (**Barquisimeto, Venezuela**), sus canales oficiales comprobables (Instagram, TikTok, LinkedIn) y sus tres áreas de especialidad técnica (Bordado DST/PES, Sublimación y Diseño Vectorial).

3. **Arquitectura de Breadcrumbs y Señales de Navegación:**
   - En la vista dedicada del portafolio (`portfolio.html` y `en/portfolio.html`), no existía una lista semántica de migas de pan (`BreadcrumbList`), privando a los motores de búsqueda de comprender los niveles de profundidad y la relación jerárquica con la página principal.

4. **Metadatos Abiertos y Social SEO en la Galería:**
   - Las páginas de portafolio no disponían de etiquetas Open Graph y Twitter Cards dedicadas en el template base, limitando la generación de fragmentos enriquecidos al ser compartidas.

5. **Frescura en Sitemap XML (`sitemap.xml`):**
   - El mapa del sitio no declaraba la directiva `<lastmod>` con formato W3C Datetime en sus URLs canónicas e internacionales.

---

## 2. Decisiones de Marca y Entity SEO Implementadas

Se estableció una jerarquía clara, natural y veraz en todo el código fuente:

- **Nombre Principal de Marca:** `KINGDOM`
- **Nombre Descriptivo de Marca:** `Kingdom by Ramses Martínez`
- **Fundador / Diseñador Principal:** `Ramses Martínez`
- **Grafo de Entidad Conectada:**
  $$\text{KINGDOM} \iff \text{Kingdom by Ramses Martínez} \iff \text{Ramses Martínez} \iff \text{Dominio Oficial} \iff \text{Redes Verificadas}$$
- **Redes Sociales Oficiales Verificadas en el Proyecto:**
  - Instagram: `https://instagram.com/kingdom_vzla`
  - TikTok: `https://www.tiktok.com/@kingdom_vzla`
  - LinkedIn: `https://www.linkedin.com/in/ramses-martinez-bqto`
  - WhatsApp oficial: `+58 424-109-2124`

---

## 3. Cambios Implementados en el Código

### A. Metadatos, Titles y Social Graph
- **`content/es.json`**:
  - `meta.title`: `"KINGDOM | Diseño Textil, Bordado Industrial & Sublimación — Kingdom by Ramses Martínez"`
  - `meta.description`: `"Sitio oficial de KINGDOM (Kingdom by Ramses Martínez). Estudio de diseño textil, matrices de bordado industrial DST/PES, sublimación deportiva y streetwear en Barquisimeto, Venezuela."`
  - `meta.ogTitle`: `"KINGDOM — Diseño Textil & Bordado Industrial | Kingdom by Ramses Martínez"`
  - `meta.ogDesc`: `"Presencia digital oficial de KINGDOM: matrices DST/PES, diseño de indumentaria deportiva sublimada y streetwear."`
  - Actualización de textos en Trayectoria (`about.title` y `about.desc`) y en Pie de Página (`footer.brandDesc` y `footer.copyright`).
- **`content/en.json`**:
  - Títulos y descripciones equivalentes optimizados en inglés, enfocados en términos de alto impacto (*"KINGDOM | Textile Design, Industrial Embroidery & Sublimation — Kingdom by Ramses Martínez"*).

### B. Datos Estructurados JSON-LD (Schema.org)
- Implementado dinámicamente en `assets/js/app.js` mediante la API del DOM (`document.createElement("script")`, `type="application/ld+json"`), preservando **100% el cumplimiento estricto de Content-Security-Policy (sin inline scripts vulnerables ni unsafe-inline)**.
- Entidades vinculadas en `@graph`:
  1. `Organization`: Identidad corporativa de **KINGDOM**, `alternateName`, logo oficial en alta resolución, fundador (Person), perfiles `sameAs`, punto de contacto (ContactPoint con WhatsApp) y dirección postal verídica (`Barquisimeto, Lara, VE`).
  2. `WebSite`: Declaración de sitio web con editor asignado a la organización y soporte bilingüe.
  3. `WebPage` / `CollectionPage`: Tipado exacto según la página activa (Home vs Portafolio).
  4. `Service`: 3 servicios técnicos declarados con descripción precisa:
     - *Industrial Embroidery Digitizing (DST / PES)*
     - *Full Print Sports Sublimation*
     - *Vector Illustration & Streetwear Graphic Design*
  5. `BreadcrumbList`: Navegación estructurada paso a paso entre Inicio y Portafolio.

### C. Navegación Semántica y Migas de Pan (Breadcrumbs)
- **`templates/portfolio.template.html`**:
  - Incorporación del bloque semántico `<nav aria-label="Migas de pan" class="breadcrumbs-wrap">` con microdatos Schema.org integrados y atributos de accesibilidad (`aria-current="page"`).
- **`assets/css/urban.css`**:
  - Clases responsivas `.breadcrumbs`, `.breadcrumbs a`, `.breadcrumbs [aria-current="page"]` y `.breadcrumb-separator` alineadas a la paleta Street-Editorial.

### D. Open Graph & Twitter Cards en Portafolio
- El archivo `templates/portfolio.template.html` ahora cuenta con especificación completa de:
  - `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name="KINGDOM"`, `og:locale`, `og:image`, `og:image:alt`
  - `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`

### E. Rastreo e Indexación (`sitemap.xml` y `robots.txt`)
- Actualizado `sitemap.xml` incorporando atributos `<lastmod>2026-10-07</lastmod>` en todas las URLs canónicas e internacionales.
- El archivo `robots.txt` mantiene acceso completo sin bloqueos a hojas de estilo, scripts o imágenes requeridas para el renderizado de Googlebot.

---

## 4. Archivos Modificados y Creados

### Archivos Modificados:
1. `content/es.json`
2. `content/en.json`
3. `assets/js/site.config.js`
4. `assets/js/app.js`
5. `assets/css/urban.css`
6. `templates/index.template.html`
7. `templates/portfolio.template.html`
8. `tools/build-i18n.mjs`
9. `site-manifest.json`
10. `sitemap.xml`
11. `index.html` (generado)
12. `en/index.html` (generado)
13. `portfolio.html` (generado)
14. `en/portfolio.html` (generado)

### Archivos Creados:
1. `SEO_AUDIT.md` (este documento de control permanente)

---

## 5. Verificación y Resultados de Auditoría

```bash
> npm run build
Generated: index.html (ES)
Generated: en/index.html (EN)
Generated: portfolio.html (ES)
Generated: en/portfolio.html (EN)

> npm run audit:local
PASS: 11 HTML pages and 4 CSS files audited; 0 prohibited phrases, 0 undefined CSS variables, 0 broken references, strict CSP compliance.
```

- **Errores detectados:** 0
- **Violaciones de CSP:** 0
- **Enlaces rotos:** 0
- **Contenido oculto o stuffing:** 0

---

## 6. Recomendaciones Externas (Google Search Console y Off-Page)

Para maximizar la consolidación en los resultados de búsqueda (SERP) frente a la palabra clave "KINGDOM":

1. **Google Search Console:**
   - Dar de alta la propiedad del dominio o subdirectorio `https://kingdombqto.github.io/KINGDOM/`.
   - Enviar `https://kingdombqto.github.io/KINGDOM/sitemap.xml` para indexación prioritaria.
   - Solicitar indexación manual de `index.html` y `portfolio.html`.

2. **Consistencia en Redes Sociales (SameAs):**
   - Asegurarse de que en las biografías de Instagram (`@kingdom_vzla`) y TikTok (`@kingdom_vzla`) el enlace al sitio web oficial coincida exactamente con la URL canónica.
   - Incluir la descripción de marca uniforme: *"KINGDOM — Estudio de diseño textil, matrices de bordado industrial y sublimación por Ramses Martínez"*.

3. **Google Business Profile (Opcional):**
   - Si se atiende a clientes físicos en Barquisimeto, registrar el perfil bajo el nombre **KINGDOM (Kingdom by Ramses Martínez)** en la categoría *Taller de bordados* o *Servicio de diseño gráfico*, enlazando al sitio web oficial.
