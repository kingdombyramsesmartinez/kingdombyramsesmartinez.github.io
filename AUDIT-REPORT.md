# INVENTARIO Y REPORTE DE AUDITORÍA — KINGDOM v4 Redesign
## Portafolio & Identidad: Ramses Martínez × Kingdom

**Fecha:** 2026-10-05  
**Rama activa:** `v4-redesign`  
**Publicación objetivo:** GitHub Pages (`https://kingdombqto.github.io/KINGDOM/`)  
**Resultado de Auditoría Local (`npm run audit:local`):** `PASS` (9 páginas HTML auditadas, 0 frases prohibidas, 0 enlaces rotos, CSP estricta).

---

## 1. ESTADO POR ÁREAS DE LA DIRECTIVA v4

| Área | Estado | Detalle Técnico |
|---|---|---|
| **Veracidad & Claims** | `PASS` | Eliminados todos los claims no comprobables ("planta propia", "control en planta", etc.). Datos biográficos alineados con CV oficial (Lima 2019, Kingdom 2021). |
| **Separación de Código** | `PASS` | Separación estricta de HTML, CSS y JS. Cero atributos `style=""` inline y cero scripts inline en templates ni páginas generadas. |
| **Paleta & Tokens** | `PASS` | Amarillo eliminado por completo. Paleta activa: Base Negro/Gris/Blanco + Acentos Verde Oliva Táctico (`#7A8058`) y Beige Natural (`#E9E0D0`). |
| **Tipografía** | `PASS` | `Graffiti City.otf` local para títulos H1/H2 y wordmark. `Montserrat Variable` (woff2) local para lectura. Cero peticiones de red o CDNs externas. |
| **Evidencia de Bordado** | `PASS` | 6 capturas de Wilcom EmbroideryStudio convertidas a WebP y cargadas en portafolio bajo categoría "Bordado & Matrices". |
| **Arquitectura Bilingüe** | `PASS` | Generador estático `tools/build-i18n.mjs` produce `/index.html` (ES) y `/en/index.html` (EN) desde fuentes JSON estructuradas. |
| **Accesibilidad (a11y)** | `PASS` | WCAG 2.1 AA: Skip link, roles ARIA, `aria-pressed` en filtros, trampa de foco en modal, botones con altura ≥ 44px, `prefers-reduced-motion` respetado. |
| **Seguridad & CSP** | `PASS` | Meta CSP estricta idéntica en las 9 páginas HTML. Sin `'unsafe-inline'` ni scripts externos. Archivo `_headers` preparado para Cloudflare Pages. |
| **SEO Técnico** | `PASS` | OG Image de 1200×630 generada (`assets/brand/og-image.png`), `sitemap.xml` con alternancias bidireccionales, `robots.txt` y `site-manifest.json` validados. |
| **CI / Automatización** | `PASS` | Workflow en `.github/workflows/audit.yml` configurado para auditar cada push a `main` y `v4-redesign`. |

---

## 2. INVENTARIO DE ARCHIVOS AUDITADOS

- `index.html`: Versión en español compilada desde plantilla maestra.
- `en/index.html`: Versión en inglés compilada desde plantilla maestra.
- `templates/index.template.html`: Plantilla HTML maestra sin contenido hardcodeado.
- `content/es.json` y `content/en.json`: Textos de marca, servicios y tablas.
- `content/portfolio.json`: 12 piezas de portafolio con ficha técnica (6 bordados Wilcom, 2 sublimación deportiva, 3 streetwear, 1 branding).
- `assets/css/style.css`: Hojas de estilo unificadas sin dependencias.
- `assets/js/app.js`: Módulo de interactividad (modal accesible, filtros, navegación móvil, cotizador a WhatsApp).
- `assets/js/site.config.js`: Fuente única de configuración de marca y contacto.
- `legal/*.html`: Páginas informativas de términos, privacidad, propiedad intelectual y límites de servicio.
- `tools/audit-site.mjs`: Script de verificación y auditoría automatizada.
