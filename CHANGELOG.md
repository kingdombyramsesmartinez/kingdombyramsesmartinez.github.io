# CHANGELOG — KINGDOM (v4 Redesign)

## [4.3.0] - 2026-10-06

### Fase 4 — Seguridad y Hosting (GitHub Pages vs Cloudflare Pages)
- **Documentación de `_headers`:** Documentado formalmente en el propio archivo `_headers` que está inactivo en GitHub Pages (`https://kingdombqto.github.io/KINGDOM/`), conservándose como base de configuración para una futura migración a Cloudflare Pages o infraestructura con cabeceras perimetrales.
- **Sinceración de Documentación de Seguridad:**
  - Actualizados `SECURITY-STATUS.md`, `SECURITY-ARCHITECTURE.md`, `DEPLOYMENT-STATUS.md` y `legal/security.html`.
  - Se eliminaron afirmaciones falsas sobre protecciones que no operan en GitHub Pages (HSTS personalizado, `X-Frame-Options`, `Permissions-Policy`, `frame-ancestors`).
  - Se detalló explícitamente el alcance real de la protección provista por la etiqueta `<meta http-equiv="Content-Security-Policy">` (mitigación de XSS, bloqueo de scripts/estilos externos y restricción estricta de conexiones y recursos al propio origen).
- **Homogeneización de CSP en todas las Páginas:**
  - Se incorporó la etiqueta `<meta http-equiv="Content-Security-Policy">` idéntica y estricta en las 6 páginas legales (`legal/*.html`), logrando coherencia absoluta en todas las páginas HTML del sitio.
  - Se verificó la exclusión de directivas que los navegadores ignoran en `<meta>` (como `frame-ancestors`).
- **Validación Automatizada (`tools/audit-site.mjs`):** El script de auditoría ahora valida que cada página HTML posea obligatoriamente la etiqueta `<meta Content-Security-Policy>` canónica y falla automáticamente si se introducen directivas no soportadas en `<meta>`.
- **Cero Servicios Externos:** Cero dependencias añadidas ni librerías de terceros.

## [4.2.0] - 2026-10-06

### Fase 3 — Rediseño del Hero y Confinamiento de Marcas de Terceros
- **Hero de Impacto Total:** Eliminado el mosaico de imágenes del Hero. Implementado titular de extremo a extremo (`hero-title-full` con tipografía `Graffiti City`) con el tag oficial de Kingdom ubicado de fondo en marca de agua con 50% de opacidad (`.hero-watermark`).
- **Descargo Visible en Tarjetas:** Agregada etiqueta visible `.portfolio-notice-badge` ("Arte de Fans / Referencial" / "Fan Art / Concept") directamente en las tarjetas del portafolio que exhiben piezas inspiradas en marcas o personajes de terceros, además del descargo detallado en el modal técnico.
- **Actualización de Registros y Documentación Legal:** Sincronizado `MARKETING-CLAIMS-REGISTER.md` y actualizada la sección 2 de `legal/intellectual-property.html` para documentar la eliminación de imágenes de terceros del primer plano inicial y su estricto confinamiento regulado dentro de la galería de portafolio.

## [4.1.0] - 2026-10-06

### Fase 2 — Coherencia de Marca y Limpieza de Estilos
- **Alineación de `legal.css`:** Eliminado el color amarillo (`#ffc500`), retirada la variable no estandarizada `--gold` y la referencia a fuente `Inter` no autohospedada. Incorporada la paleta oficial de `DESIGN-TOKENS.md` (fondo negro, acentos verde oliva `#7A8058`, beige `#E9E0D0`) y tipografía `Montserrat` autohospedada.
- **Limpieza de 404:** Actualizado `404.html` para erradicar cualquier mención residual a "Kingdom Wear", estandarizando el nombre a "Kingdom" en `title`, `description` y `alt`. Reescrito `assets/css/404.css` para utilizar tokens CSS semánticos (`--ink`, `--surface`, `--paper`, `--olive`, etc.) y estilo street-editorial plano coherente.
- **Corrección de Variables en `style.css`:** Sustituidas las variables CSS sin declarar (`--white-95` reemplazada por `var(--paper)`; `--black-950` por `var(--ink)`; `--black-900` por `var(--surface)` y `var(--surface-alt)`).
- **Ampliación de Auditoría Automatizada (`tools/audit-site.mjs`):** El script ahora audita todas las páginas HTML y todas las hojas de estilo CSS (`style.css`, `legal.css`, `404.css`), verificando la ausencia de `#ffc500`, "Kingdom Wear" y variables CSS `var(--xxx)` sin definir.

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
