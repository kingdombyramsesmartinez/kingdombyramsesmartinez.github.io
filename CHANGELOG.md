# CHANGELOG — KINGDOM (v4 Redesign)

## [4.0.0] - 2026-10-05

### Rediseño Integral v4 — Street-Editorial Industrial & Veracidad de Marca
- **Alineación de Identidad y Veracidad:**
  - Nombre público consolidado: **Kingdom** (se eliminó "Wear").
  - Titular principal y trayectoria: **Ramses Martínez — Kingdom**.
  - Eliminados reclamos no documentados ni auditados ("planta propia", "control de calidad en planta", "cifras inventadas", "fotográfico real").
  - Verificación biográfica desde CV oficial: trayectoria textil familiar desde la infancia, ponchado profesional Wilcom en Lima (2019) y fundación de Kingdom en Barquisimeto (2021).
- **Limpieza de Assets:**
  - Eliminados assets no verificados o de stock: `assets/hero-banner.webp`, `assets/logo-yellow.webp`, `assets/streetwear-tag.webp`.
  - Motivo: imágenes descargadas sin licencia documentada que sugerían infraestructura industrial inexistente.
  - Implementado hero nuevo con mosaico CSS grid de 3 piezas propias (`work-amigoscafe.webp`, `work-dbs.webp`, `work-alcaldia.webp`) con `fetchpriority="high"` en la imagen LCP.
- **Evidencia Visual de Bordado Wilcom:**
  - Incorporadas 6 capturas técnicas de trabajo en Wilcom EmbroideryStudio proporcionadas por Ramses (`work-wilcom-01.webp` a `work-wilcom-06.webp`).
  - Activada la categoría **"Bordado & Matrices"** en el portafolio con ficha técnica de cada ponchado.
- **Paleta de Color y Tokens:**
  - Eliminación total del color amarillo.
  - Paleta autorizada por Ramses: Base en Negro (`#070706`), Grises y Blanco (`#F7F7F4`), con Acentos en Verde Oliva Táctico (`#7A8058`, `#92976E`) y Beige Natural (`#E9E0D0`).
  - Superficies planas street-editorial (`#0D0D0C` / `#121211`) con bordes sutiles `rgba(255,255,255,.11)`.
  - Botones planos sobrios (sin bisel 3D artificial) con altura táctil ≥ 44px y estados de foco visibles.
- **Tipografía:**
  - `Graffiti City.otf` alojada localmente en `assets/fonts/` y configurada exclusivamente para títulos destacados H1/H2 y wordmark.
  - Tipografía `Montserrat` alojada localmente (woff2) para cuerpo de texto y lectura limpia.
  - Cero dependencias externas ni Google Fonts en tiempo de ejecución.
- **Arquitectura Bilingüe Estática:**
  - Plantilla maestra en `templates/index.template.html` y fuentes de datos en `content/es.json` y `content/en.json`.
  - Generación estática vía `tools/build-i18n.mjs` a `/index.html` (Español) y `/en/index.html` (Inglés).
  - Cero inline styles (`style=""`) y cero scripts inline, en estricto cumplimiento con `AGENTS.md`.
- **Portafolio y Cotizador:**
  - Datos centralizados en `content/portfolio.json`.
  - Filtros accesibles mediante botones nativos con `aria-pressed`.
  - Modal accesible con trampa de foco, soporte para imágenes horizontales y verticales, y botón de escape.
  - Formulario de cotización directa a WhatsApp (`+58 424-109-2124`) sincronizado con `assets/js/site.config.js`.
  - Precios de referencia ocultos según directiva de Ramses.
- **SEO & Assets Técnicos:**
  - Imagen Open Graph oficial de 1200×630 generada localmente en `assets/brand/og-image.png`.
  - `sitemap.xml` con enlaces alternativos bidireccionales `xhtml:link` (es / en).
  - `robots.txt` actualizado.
  - `site-manifest.json` actualizado a los estándares PWA.
- **Calidad y Auditoría Automatizada:**
  - Script `tools/audit-site.mjs` actualizado con lista negra de términos prohibidos y validación de CSP estricta.
  - Workflow de integración continua en `.github/workflows/audit.yml`.
