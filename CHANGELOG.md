# CHANGELOG — KINGDOM

## [5.0.0] - 2026-10-07

### Capa Urbana v5, Divisores Tácticos, Vidrio Áspero y Portafolio Enriquecido
- **Capa Urbana Visual (`assets/css/urban.css`):**
  - Textura ambiental de pared de ladrillo desgastada (`assets/brand/brick-wall.webp`, 8.7 KB) y viñeta de luz ambiental cálida/oliva.
  - Efecto de vidrio áspero táctil (`assets/brand/glass-grain.webp`, 10 KB) con iluminación de borde y reflejo sutil. `backdrop-filter` real optimizado para desktop.
  - Divisores temáticos urbanos: cinta adhesiva industrial a rayas (`.urban-divider--tape`) y chorreado/drip de pintura aerosol (`.urban-divider--drip` vía `assets/brand/drip-divider.svg`).
  - Títulos principales en `Sedgwick Ave Display` (`.woff2` local; SIL Open Font License v1.1) con sombra urbana de contraste.
- **Portafolio Enriquecido & Estructura Preservada:**
  - Se mantiene la estructura multi-página con la galería completa de 41 fichas (61 imágenes de presentación) en `portfolio.html` y `en/portfolio.html`, y el hub/teaser en `index.html`.
  - Incorporados soportes para campos opcionales por pieza: `ribbon` (etiqueta sobre la tarjeta), `status` (aviso destacado tipo propuesta/acuerdo), `fabric` (tela ofrecida), `priceFinal` (precio final en ficha) y `story` (anécdota/proceso de la pieza).
  - Escapado de caracteres (`esc()`) en atributos del generador estático `tools/build-i18n.mjs`.
  - Agregada guía para el creador en `content/GUIA-PORTAFOLIO.md`.
- **Seguridad & Resiliencia:**
  - Protección anti-clickjacking por script de respaldo en `assets/js/app.js` (`if (window.top !== window.self) ...`).
  - Preload de fuente `Sedgwick Ave Display` en `404.html` y páginas de `legal/`.
  - Suite de auditoría `tools/audit-site.mjs` ampliada para auditar `urban.css`. Cero vulnerabilidades y 100% PASS.

## [4.6.0] - 2026-10-06

### Fase 7 — Cierre, Consolidación SEO y Verificación Integral
- **Actualización y Validación de Indexación:**
  - `sitemap.xml`: Añadidas entradas de `portfolio.html` y `en/portfolio.html` con declaraciones recíprocas de alternancia multilingüe `hreflang` (es, en, x-default).
  - `robots.txt`: Verificada declaración de rastreo sin restricciones y ruta canónica a sitemap.
  - `site-manifest.json`: Comprobada coherencia de iconos locales (`assets/brand/icon-192.png`, `assets/brand/icon-512.png`, `assets/brand/favicon.svg`).
- **Verificación de Activos y Referencias:**
  - Auditados tamaños de todas las imágenes en `assets/` (todas las 61 imágenes WebP de presentación se mantienen por debajo de los límites de compresión web).
  - Confirmada la ausencia total de referencias residuales a tipografías obsoletas en el código fuente y plantillas.
- **Sinceración de Auditoría:**
  - `AUDIT-REPORT.md` actualizado con el inventario de 11 páginas HTML y 3 archivos CSS auditados, detallando explícitamente aspectos que escapan a la verificación del entorno local (cabeceras HTTP en GitHub Pages, depuradores externos de redes sociales y app nativa de WhatsApp).

## [4.5.0] - 2026-10-06

### Fase 6 — Traducción para Cualquier Visitante y Accesibilidad WCAG AA
- **Traducción Nativa de Navegadores:**
  - Incorporado atributo `translate="no"` y elementos `<span translate="no">` sobre términos de marca ("Kingdom", "Ramses Martínez"), formatos técnicos ("DST", "PES"), suites de ponchado ("Wilcom") y direcciones de correo electrónico en todas las plantillas y archivos de contenido (`content/es.json`, `content/en.json`, `404.html`, etc.).
  - Actualizado el aviso de traducción en el pie de página para instruir claramente a los visitantes sobre el uso de la herramienta de traducción nativa de su navegador (Chrome, Edge, Safari, Firefox), preservando el principio de cero widgets de terceros y CSP estricta.
- **Accesibilidad y Foco Visible:**
  - Estandarizado `:focus-visible` con contorno táctico verde oliva (`#7A8058`, 3px offset) en `legal.css` y `404.css` para navegación consistente por teclado.
  - Añadida consulta `@media (prefers-reduced-motion: reduce)` en `legal.css` y `404.css` para anular transiciones cuando el usuario lo configure en su sistema operativo.
- **Imágenes e Inclusividad:**
  - Añadido `aria-hidden="true"` explícito directo a la imagen del logotipo decorativo en marca de agua del hero.
  - Validados atributos `alt` descriptivos bilingües en las 41 fichas (61 imágenes) del portafolio.
- **Verificación de Contraste WCAG AA:**
  - Confirmados ratios de contraste superiores a 4.5:1 en todos los textos sobre fondo `--ink` (`#070706`) para verde oliva (`#7A8058` a 4.85:1; `#92976E` a 6.60:1), beige (`#E9E0D0` a 15.39:1) y escala de grises.

## [4.4.0] - 2026-10-06

### Fase 5 — Implementación de Fuente Aerosoldier Drip y Optimización Tipográfica
- **Renombrado y Compresión Web:**
  - Archivo maestro normalizado sin espacios ni caracteres especiales: `assets/fonts/aerosoldier-drip.otf`.
  - Generada versión optimizada WOFF2: `assets/fonts/aerosoldier-drip.woff2` (reducción de 214 KB a ~65 KB).
- **Cobertura de Glifos y Textos Reales:**
  - Verificada la presencia completa de glifos en la tabla `cmap` (á, é, í, ó, ú, ü, ñ, ¿, ¡, &, ×) y comprobada la correspondencia del 100% de los caracteres utilizados en `es.json` y `en.json`.
- **Estructura CSS y Carga:**
  - `@font-face` y variable `--font-graffiti` configuradas con `font-display: swap` y fallback robusto a Montserrat.
  - Implementado `<link rel="preload">` para `aerosoldier-drip.woff2` en las plantillas maestras (`index.template.html` y `portfolio.template.html`).
- **Jerarquía Visual y Control de Desbordamiento:**
  - Aplicada exclusivamente a H1 del hero (`.hero-title-full`), H2 cortos de sección (`.section-title`) y título del portafolio (`.portfolio-page-title`).
  - H3 de tarjetas y fichas técnicas preservados en `Montserrat` para legibilidad.
  - Ajustados `line-height: 1.08` a `1.15`, `padding-bottom: 8px-12px` y `overflow: visible` para garantizar que los chorreados característicos del estilo graffiti no se corten en resoluciones de 360px, 768px ni 1440px.
- **Documentación y Limpieza:**
  - Creado `FONTS-LICENSES.md` con el estado y permisos de cada fuente.
  - Actualizados `DESIGN-TOKENS.md` y `DESIGNER-CUSTOMIZATION.md`.
  - Eliminado el archivo `Graffiti City.otf` al no tener ya referencias en el proyecto.

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
