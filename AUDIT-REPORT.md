# INVENTARIO Y REPORTE DE ESTADO DEL SISTEMA (MASTER SPEC v2.0)
## KINGDOM — Landing Page & Portafolio Industrial

**Fecha:** 2026-10-02  
**Entorno:** Producción estática (GitHub Pages / Cloudflare Pages ready)

---

## 1. ESTADO POR ÁREAS DE ESPECIFICACIÓN

| Área | Estado | Detalle |
|---|---|---|
| **Veracidad de Contenido & Claims** | `PASS` | Métricas y claims delimitados en `MARKETING-CLAIMS-REGISTER.md` para evitar promesas no verificables. |
| **Legal / Compliance Realista** | `PASS` | 6 páginas legales operativas en `/legal/` con descargos de marcas de terceros y límites de responsabilidad. |
| **Seguridad Frontend** | `PASS` | Sin backend simulado, sin secretos ni API keys en el repositorio, `_headers` CSP riguroso, `security.txt` configurado. |
| **Rendimiento & Core Web Vitals** | `PASS` | Imágenes en WebP optimizadas con width/height explícitos, preload de LCP, Canvas 2D local sin CDNs externos. |
| **UX & Conversión** | `PASS` | CTA a WhatsApp directo con mensajes pre-codificados seguros, cotizador interactivo sin backend, feedback accesible. |
| **Accesibilidad (a11y)** | `PASS` | Skip-link a main, roles ARIA en modales y menú móvil, `prefers-reduced-motion` respetado en audio y animaciones. |
| **SEO Técnico** | `PASS` | H1 semántico único, meta description, Open Graph, Twitter Cards, robots.txt, sitemap.xml.template. |
| **Estética Premium Cyber-Industrial** | `PASS` | HUD telemetry bar, canvas interactivo de hilo textil, paleta cyber-gold, consistencia de radios y cristales. |
| **Editabilidad para Diseñador** | `PASS` | Sistema centralizado de tokens `:root` en `style.css` y manual `DESIGNER-CUSTOMIZATION.md`. |
| **Compatibilidad GitHub / Cloudflare** | `PASS` | `.nojekyll` presente, `404.html` personalizado, script `audit:local` superado con 0 enlaces o assets rotos. |

---

## 2. INVENTARIO DE ARCHIVOS PRINCIPALES

- `index.html`: Landing page principal, portafolio, cotizador, visor 3D textil y enlaces de contacto.
- `404.html`: Página personalizada de error 404 coherente con la identidad de marca.
- `assets/css/style.css`: Hojas de estilo maestras con tokens `:root` y diseño responsivo.
- `assets/js/app.js`: Lógica interactiva accesible (Canvas 2D, modales, cotizador a WhatsApp, menú móvil).
- `legal/*.html`: 6 documentos legales normativos y de protección de propiedad intelectual.
- `tools/audit-site.mjs`: Script de auditoría local de enlaces internos, assets y referencias.
- `DESIGNER-CUSTOMIZATION.md`: Manual operativo para el diseñador gráfico.
- `CHANGELOG.md`: Registro de versiones y refactorizaciones realizadas.
