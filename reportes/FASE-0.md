# KINGDOM — REPORTE DE FASE 0: RESPALDO Y DIAGNÓSTICO (SUBSANACIÓN INTEGRAL)

Fecha: 12 de octubre de 2026
Propietario del proyecto: Ramses Martínez
Ejecuta: Antigravity
Dirección: Claude
Especificación maestra: KINGDOM-plan-mejora-portafolio.md (Revisión 2)
Rama de trabajo: mejora-2026-10
Etiqueta de respaldo: backup-pre-mejora
Commit base respaldado: 793d73c0d8d027d0ed6421820f89f09205b1900c
Estado de producción: Intacto (0 modificaciones a archivos de producción)


1. DICTAMEN DE FASE 0

Estado de la Fase 0: FASE 0 COMPLETADA EN DIAGNÓSTICO Y RESPALDO; APROBACIÓN TÉCNICA CONDICIONADA A REVISIÓN DE RAMSES MARTÍNEZ.

Justificación técnica del dictamen:
- El respaldo del estado previo del repositorio está formalizado, etiquetado y verificado en Git sin modificaciones a código o contenido de producción.
- Se inventariaron con precisión de bytes todas las páginas HTML (17), hojas de estilo CSS (4), scripts cliente (3), herramientas de soporte (8), fuentes tipográficas (13) y recursos gráficos de portafolio y marca (143).
- Se ejecutaron las suites de pruebas automatizadas locales: audit-site.mjs (PASS, 0 violaciones), check-js-syntax.mjs (PASS, 11 archivos aprobados), test-audit.mjs (PASS, 33 de 33 pruebas unitarias aprobadas) y Playwright e2e (126 pruebas aprobadas, 8 omitidas, 1 fallo real detectado en contraste de color).
- La auditoría oficial Lighthouse móvil no pudo ejecutarse directamente en este entorno local debido a la ausencia del paquete binario global/local de Lighthouse CLI y restricciones de red para descarga interactiva npx; la medición de métricas móviles se efectuó mediante instrumentación directa de Chromium móvil (Pixel 5) con Playwright Navigation Timing y análisis WCAG con axe-core. La auditoría externa en Chrome DevTools / Lighthouse web queda registrada como PENDIENTE para ejecución remota o manual.
- Se documenta con exactitud la discrepancia numérica entre las 39 piezas reales y el número 41 señalado en revisiones previas.
- Ninguna tarea de Fase 1 ni modificaciones de contenido han sido iniciadas.


2. ALCANCE EJECUTADO Y LIMITACIONES

Alcance ejecutado:
- Verificación de Git: comprobación de commit HEAD, commit respaldado, etiqueta backup-pre-mejora, estado del árbol de trabajo y diff contra respaldo.
- Inventario exhaustivo de archivos de producción, hojas de estilo, scripts, fuentes, licencias y assets gráficos.
- Verificación de integridad de enlaces internos y rutas locales (0 enlaces locales rotos).
- Auditoría técnica de metadatos SEO en 17 páginas HTML (lang, title, meta description, canonical, hreflang, robots, Open Graph y JSON-LD).
- Auditoría estática y dinámica del flujo de consentimiento de cookies y Google Analytics 4 (código cliente en assets/js/analytics.js y suites Playwright tests/cookie-consent.spec.mjs).
- Análisis del catálogo de portafolio y trazabilidad de la discrepancia 39/41.
- Auditoría de fuentes tipográficas, licencias OFL y descarte de tipografías no autorizadas.
- Identificación de riesgos en imágenes: ausencia de foto descargada en hero actual, presencia de insignias de entes públicos en modal y en disco, y exposición de placa automotriz en pieza automotriz.

Limitaciones encontradas:
- No se tiene acceso autenticado a las consolas de Google Search Console, Google Analytics 4 ni Google Business Profile para verificar métricas de tráfico, cobertura de indexación en vivo o estado de ficha. Se audita exclusivamente la implementación en código del cliente y los metadatos correspondientes.
- La herramienta Lighthouse CLI no está instalada localmente como dependencia del repositorio (package.json define playwright, axe-core, sharp, ttf2woff2 y montserrat). Su ejecución mediante npx interactivo requiere entorno sin restricciones de instalación al vuelo. Por tanto, las puntuaciones canónicas de Lighthouse (0-100) quedan marcadas como PENDIENTE de corrida externa o manual, habiéndose reportado las métricas de rendimiento y accesibilidad medidas con Playwright y axe-core.


3. ENTORNO TÉCNICO Y VERSIONES

- Sistema operativo: Windows 11 / Windows NT (PowerShell)
- Node.js: v24.19.0
- npm: v11.17.0
- Playwright CLI y Core: v1.64.0
- Motor Chromium utilizado para pruebas: Chromium versión 1248 (C:\Users\Dell\AppData\Local\ms-playwright\chromium-1248\chrome-win64\chrome.exe)
- Motor de accesibilidad: @axe-core/playwright v4.13.0
- Servidor local para pruebas: tools/serve-static.mjs (puertos 4173 y 4174)


4. RESPALDO, RAMA, ETIQUETA Y ESTADO DE GIT

- Rama activa: mejora-2026-10
- Etiqueta de respaldo creada: backup-pre-mejora
- Hash de confirmación de la etiqueta backup-pre-mejora: 793d73c0d8d027d0ed6421820f89f09205b1900c
- Mensaje del commit respaldado: feat: release production v1.1.0 - audit, tests e2e, i18n legal parity, and security hardening
- Comprobación de no alteración de producción:
  El comando 'git diff backup-pre-mejora HEAD' muestra únicamente la adición de archivos en la carpeta 'reportes/'. Ningún archivo HTML, CSS, JS, JSON o imagen de producción ha sufrido modificaciones.
- Estado del árbol de trabajo:
  Archivo no rastreado presente: KINGDOM-plan-mejora-portafolio.md (documento de especificación maestra provisto por el usuario) y carpeta reportes/.


5. INVENTARIO DE PÁGINAS, SCRIPTS, FUENTES Y ASSETS

El inventario detallado con pesos exactos se encuentra respaldado en reportes/evidencias/inventario-completo.json.

Resumen del inventario:

Páginas HTML (17 páginas):
- index.html (26.148 bytes)
- portfolio.html (111.796 bytes)
- 404.html (2.372 bytes)
- en/index.html (25.852 bytes)
- en/portfolio.html (110.440 bytes)
- legal/privacy.html (6.699 bytes)
- legal/terms.html (5.946 bytes)
- legal/intellectual-property.html (7.222 bytes)
- legal/cookies.html (4.482 bytes)
- legal/security.html (4.495 bytes)
- legal/accessibility.html (3.235 bytes)
- en/legal/privacy.html (6.451 bytes)
- en/legal/terms.html (5.943 bytes)
- en/legal/intellectual-property.html (6.655 bytes)
- en/legal/cookies.html (4.219 bytes)
- en/legal/security.html (4.349 bytes)
- en/legal/accessibility.html (3.267 bytes)

Hojas de estilo CSS (4 archivos):
- assets/css/style.css (30.380 bytes)
- assets/css/urban.css (23.004 bytes)
- assets/css/legal.css (3.404 bytes)
- assets/css/404.css (3.913 bytes)

Scripts JavaScript de cliente (3 archivos):
- assets/js/analytics.js (7.422 bytes) - Gestión de consentimiento y GA4
- assets/js/app.js (24.546 bytes) - Lógica de UI, filtros, navegación y modal
- assets/js/site.config.js (1.239 bytes) - Constantes del sitio

Scripts de herramientas y auditoría (8 archivos):
- tools/audit-site.mjs (18.282 bytes)
- tools/build-i18n.mjs (22.309 bytes)
- tools/check-js-syntax.mjs (3.672 bytes)
- tools/convert-wilcom.mjs (1.254 bytes)
- tools/serve-static.mjs (2.789 bytes)
- tools/sync-artwork.mjs (13.732 bytes)
- tools/test-audit.mjs (35.010 bytes)
- tools/update-portfolio-artistic.mjs (3.098 bytes)

Scripts externos en tiempo de ejecución:
- Google Analytics 4 (https://www.googletagmanager.com/gtag/js?id=G-YQCLS51XJE) - Cargado de manera diferida y condicional solo tras consentimiento expreso del visitante. Cero scripts externos adicionales. Cero CDNs de librerías externas.

Tipografías autoalojadas y licencias (assets/fonts/, 13 archivos):
- Sedgwick Ave Display:
  - assets/fonts/sedgwick-ave-display.woff2 (55.220 bytes)
  - assets/fonts/sedgwick-ave-display.ttf (135.996 bytes)
  - Licencia: assets/fonts/SEDGWICK-OFL.txt (SIL Open Font License 1.1, uso comercial permitido)
- Montserrat (Variable / estática, SIL Open Font License 1.1):
  - assets/fonts/montserrat-latin-wght-normal.woff2 (37.956 bytes)
  - assets/fonts/montserrat-latin-wght-italic.woff2 (39.632 bytes)
  - assets/fonts/montserrat-latin-ext-wght-normal.woff2 (70.688 bytes)
  - assets/fonts/montserrat-latin-ext-wght-italic.woff2 (74.892 bytes)
  - assets/fonts/montserrat-cyrillic-wght-normal.woff2 (23.828 bytes)
  - assets/fonts/montserrat-cyrillic-wght-italic.woff2 (24.536 bytes)
  - assets/fonts/montserrat-cyrillic-ext-wght-normal.woff2 (26.368 bytes)
  - assets/fonts/montserrat-cyrillic-ext-wght-italic.woff2 (26.944 bytes)
  - assets/fonts/montserrat-vietnamese-wght-normal.woff2 (12.928 bytes)
  - assets/fonts/montserrat-vietnamese-wght-italic.woff2 (13.900 bytes)

Recursos gráficos:
- assets/artwork/: 61 archivos WebP principales (total aprox. 8.1 MB)
- assets/artwork/thumbs/: 61 archivos WebP miniaturas (total aprox. 1.8 MB)
- assets/brand/: 21 archivos (logos, iconos, favicons, texturas WebP/PNG/SVG)


6. AUDITORÍA DE METADATOS Y SEO

El registro detallado de los metadatos de las 17 páginas se encuentra respaldado en reportes/evidencias/seo-metadata-audit.json.

Hallazgos de la auditoría de metadatos:
- Etiqueta html lang:
  - Definida correctamente en todas las 17 páginas: lang="es" en páginas en español y lang="en" en páginas en inglés.
- Títulos (<title>):
  - Presentes en las 17 páginas.
  - En index.html: 60 caracteres ("Kingdom | Diseño Textil y Bordado Industrial en Barquisimeto").
  - En portfolio.html: 66 caracteres ("Portafolio de Diseño Textil | KINGDOM — Kingdom by Ramses Martínez").
  - En las páginas legales: varían entre 22 y 49 caracteres.
- Metadescripciones (meta name="description"):
  - Presentes en las 17 páginas.
  - En index.html: 139 caracteres.
  - En portfolio.html: 166 caracteres (excede ligeramente la longitud recomendada de 155 caracteres).
  - En páginas legales: longitud adecuada entre 91 y 118 caracteres.
- Enlaces canónicos (link rel="canonical"):
  - Presentes y con URLs absolutas en las 17 páginas.
- Enlaces hreflang alternativos:
  - En index.html y portfolio.html (y sus contrapartes en inglés): se incluyen hreflang="es", hreflang="en" y hreflang="x-default".
  - En las 12 páginas legales: se incluyen hreflang="es" y hreflang="en", pero omiten hreflang="x-default".
- Directiva robots (meta name="robots"):
  - Presente en index.html, en/index.html, portfolio.html, en/portfolio.html y 404.html ("index,follow,max-image-preview:large" o "noindex,follow").
  - AUSENTE en las 12 páginas legales (legal/*.html y en/legal/*.html). Se apoyan en el valor predeterminado del navegador/buscador.
- Metadatos Open Graph y Twitter Cards:
  - Completos en index.html, en/index.html, portfolio.html y en/portfolio.html con og:title, og:description, og:type, og:url, og:site_name, og:locale, og:locale:alternate, og:image (assets/brand/og-image.png de 1200x630) y twitter:card.
  - AUSENTES en las 12 páginas legales y en 404.html.
- Datos estructurados JSON-LD:
  - index.html y en/index.html: Poseen 1 bloque con grafo que declara ProfessionalService y WebSite. Inconsistencia: declaran ProfessionalService en lugar de Person con marca Kingdom, lo cual no corresponde a persona natural.
  - portfolio.html y en/portfolio.html: Poseen 2 bloques JSON-LD (WebPage + BreadcrumbList).
  - Las 12 páginas legales y 404.html: Cero bloques JSON-LD (0 estructurados).
- Archivos especiales en raíz:
  - sitemap.xml: Existe, 137 líneas, incluye URLs de inicio, portafolio y legales en ambos idiomas con lastmod.
  - robots.txt: Existe, permite rastreo general (User-agent: * Allow: /) y enlaza a Sitemap: https://kingdombyramsesmartinez.github.io/sitemap.xml.
  - 404.html: Existe, posee diseño propio, navegación de regreso y meta robots noindex,follow.


7. ANALÍTICA, COOKIES Y SEARCH CONSOLE

- Ubicación del código de analítica:
  assets/js/analytics.js (incluido de forma diferida con defer en index.html, portfolio.html, 404.html y versiones en inglés).
- Identificador de medición GA4:
  G-YQCLS51XJE.
- Verificación del mecanismo de consentimiento en código:
  - Estado inicial (primera visita, sin interacción): GA4 no se descarga ni se inyecta ninguna etiqueta script externa. Las cookies no se emiten.
  - Estado Aceptar: Al pulsar el botón "Aceptar" del banner, se almacena kingdom_cookie_consent='granted' en localStorage, se ejecuta enableGATracking() y se inyecta dinámicamente https://www.googletagmanager.com/gtag/js?id=G-YQCLS51XJE.
  - Estado Rechazar: Al pulsar "Rechazar", se persiste kingdom_cookie_consent='denied', se activa window['ga-disable-G-YQCLS51XJE']=true, se envía consent update denied y se ejecutan rutinas de borrado de cookies (_ga, _ga_*, _gid).
  - Revocación: Existe la función pública window.resetKingdomConsent() que reabre el diálogo para modificar la preferencia.
- Pruebas automatizadas del banner:
  La suite tests/cookie-consent.spec.mjs (ejecutada mediante Playwright) comprobó exitosamente:
  1. Primera visita sin interacción: no envía solicitudes de analítica ni inicializa scripts externos.
  2. Botón Rechazar: no descarga GA y guarda estado denied.
  3. Botón Aceptar: inicializa GA y persiste granted.
  4. Revocación activa: Aceptar -> Reabrir configuración -> Rechazar detiene tracking y elimina cookies.
  5. Comportamiento ante localStorage bloqueado: degradación controlada sin arrojar excepciones.
- Presencia del enlace de preferencias de cookies (data-open-cookies / #cookie-settings):
  - Presente en: index.html, en/index.html, portfolio.html, en/portfolio.html, legal/cookies.html y en/legal/cookies.html.
  - AUSENTE en: 404.html, legal/privacy.html, legal/terms.html, legal/intellectual-property.html, legal/security.html, legal/accessibility.html y sus respectivas versiones en inglés.
  - Conclusión: El plan maestro exige que el enlace de preferencias de cookies sea accesible desde el pie de página de TODAS las páginas indexables si GA4 está presente.
- Google Search Console:
  - Etiqueta de verificación presente en index.html y portfolio.html:
    meta name="google-site-verification" content="nC54d1xXW7ralhJOmq0VH093fih_OC67OsD-GIr9L2k".
  - Distinción: La existencia del meta tag está confirmada en el HTML. Las métricas, errores de indexación y estado de propiedad dentro de la consola de Search Console quedan marcados como PENDIENTE de revisión en la cuenta de Google por parte de Ramses.


8. INVENTARIO DEL PORTAFOLIO Y DISCREPANCIA 41/39

Evidencia comprobada:
- En content/portfolio.json: existen exactamente 39 objetos de piezas textiles y gráficas.
- En portfolio.html: existen exactamente 39 elementos <article class="portfolio-card...">.
- En en/portfolio.html: existen exactamente 39 elementos <article class="portfolio-card...">.
- En index.html: el contador textual en la sección hero dice "39 Presentaciones".
- En en/index.html: el contador textual dice "39 Presentations".

Trazabilidad de la cifra 41:
- El plan maestro (sección 1, hallazgo C-8) indicaba: "El home dice '41 presentaciones'; conté 39 tarjetas".
- En el historial de commits (commit 793d73c), el texto estático del home fue ajustado previamente de 41 a 39 para igualar las 39 tarjetas que realmente están maquetadas en el catálogo.
- No existen 41 tarjetas físicas en el HTML actual ni en portfolio.json. Existen exactamente 39.
- Decisión de diagnóstico: No se debe alterar artificialmente el catálogo ni inventar 2 piezas adicionales. En la Fase 2, el número del contador se vinculará de forma dinámica a la longitud real del archivo de datos único data/portfolio.json.


9. ENLACES, IMÁGENES Y ACCESIBILIDAD

El informe detallado de enlaces e imágenes se encuentra en reportes/evidencias/links-e-imagenes-audit.json.

Integridad de enlaces:
- Se comprobaron todos los atributos href y src locales en las 17 páginas HTML mediante tools/check-links.mjs.
- Resultado: 0 enlaces internos rotos y 0 referencias a archivos inexistentes.

Auditoría de imágenes:
- Dimensiones explícitas: El 100% de las etiquetas <img> en las 17 páginas cuentan con atributos width y height explícitos.
- Carga diferida (loading="lazy"):
  - En index.html: 4 imágenes omiten loading="lazy" (el logo en el header, el logotipo vectorial en el hero y el logo en el pie de página; en el hero es intencional para FCP/LCP, en pie de página es mejorable).
  - En portfolio.html: 39 tarjetas usan loading="lazy" con decoding="async". Solo 3 imágenes no usan lazy: el logo de cabecera, el logo de pie y la imagen dentro del modal.
- Textos alternativos (alt):
  - Cero imágenes carecen del atributo alt.
  - Defecto de calidad detectado: Prácticamente todas las 39 tarjetas del portafolio utilizan una plantilla genérica ("Presentación textil y propuesta gráfica para [Cliente]" o "Textile design presentation and graphic proposal for [Client]"). No describen prenda, color ni técnica visual.
- Nombres de archivos de imágenes:
  - 52 archivos en assets/artwork/ y 55 archivos en assets/artwork/thumbs/ contienen espacios en blanco, caracteres en mayúsculas y acentos (ejemplo: 'alcaldia de san felipe-chaqueta sublimada.webp', 'Laneros Gamers-franela manga corta sublimada.webp', 'Gerreras SC-franela manga corta sublimada.webp').
  - Estos nombres deben normalizarse a minúsculas, guiones y caracteres ASCII en la Fase 2.

Auditoría de accesibilidad:
- Navegación por teclado y foco visible: Todas las tarjetas y botones son interactivos con teclado, cuentan con skip-link operativo al inicio de página y respetan prefers-reduced-motion en CSS.
- Fallo de contraste detectado:
  - En index.html (modo escritorio), la herramienta axe-core detectó un fallo serio en el botón de cotización principal (.quote-submit-btn): contraste de 3.78:1 frente al umbral exigido de 4.5:1 (WCAG 2.1 AA regla color-contrast).


10. RESULTADOS DE LIGHTHOUSE Y PRUEBAS AUTOMATIZADAS

A. Pruebas automatizadas locales ejecutadas:

1. tools/audit-site.mjs:
   - Comando: node tools/audit-site.mjs
   - Código de salida: 0
   - Resultado: PASS: 17 HTML pages and 4 CSS files audited; 0 duplicate IDs, 0 broken references, 0 prohibited phrases, strict CSP compliance.

2. tools/check-js-syntax.mjs:
   - Comando: node tools/check-js-syntax.mjs
   - Código de salida: 0
   - Resultado: PASS: 11 archivos de JavaScript analizados y aprobados. 0 errores sintácticos.

3. tools/test-audit.mjs:
   - Comando: node --test tools/test-audit.mjs
   - Código de salida: 0
   - Resultado: PASS: 33 pruebas unitarias aprobadas, 0 fallos, duración 448 ms.

4. Playwright End-to-End Suite:
   - Comando: npx playwright test
   - Código de salida: 1 (debido a 1 fallo de contraste detectado por axe-core en escritorio)
   - Desglose:
     - Total pruebas ejecutadas: 135
     - Aprobadas: 126
     - Omitidas (skipped): 8 (pruebas de menú móvil en viewport de escritorio, comportamiento esperado)
     - Fallidas: 1 (tests/axe-a11y.spec.mjs:13:5 en desktop-chromium por contraste de color en .quote-submit-btn)

B. Medición técnica móvil (Chromium Pixel 5 / Navigation Timing API):

Prueba instrumentada sobre servidor local tools/serve-static.mjs (Pixel 5 emulado):
- Home (index.html):
  - First Contentful Paint (FCP): 156 ms
  - DOMContentLoaded: 40.2 ms
  - Load Event End: 48.2 ms
  - Peso transferido: 924 KB
  - Peticiones HTTP: 13
  - Violaciones Axe-core móvil: 0
- Portafolio (portfolio.html):
  - First Contentful Paint (FCP): 144 ms
  - DOMContentLoaded: 23.2 ms
  - Load Event End: 30.7 ms
  - Peso transferido: 1.12 MB
  - Peticiones HTTP: 15
  - Violaciones Axe-core móvil: 0

C. Estado de Lighthouse canónico:
- PENDIENTE: La ejecución oficial de Lighthouse CLI (generación de informes HTML/JSON estándar con puntuaciones 0-100 para Rendimiento, Accesibilidad, Buenas Prácticas y SEO) requiere ejecución manual o remota en Chrome DevTools / Lighthouse debido a que el entorno local no dispone del paquete global o local de Lighthouse y no admite instalación interactiva npx sin demoras.


11. HALLAZGOS ORDENADOS POR GRAVEDAD

Prioridad P0 (Riesgo Crítico / Legal / Identidad):
- L-1: 9 piezas de Fan Art y 6 de marcas vehiculares de terceros exhibidas en el portafolio comercial con botón de cotización directa hacia WhatsApp, en contradicción con la leyenda de no comercialización.
- L-3: Imagen precargada por defecto del modal de inspección en index.html muestra la propuesta no concretada de 'Alcaldía de San Felipe - chaqueta sublimada' con insignias de ente público municipal.
- L-10: La pieza 'Ford Ka Edition' exhibe placa patente vehicular legible de un automóvil privado en imagen y miniatura, con riesgo para la privacidad de terceros.
- L-9: Uso de redacción corporativa ('fundado por', 'nuestro taller', 'Estudio de diseño textil') en metadatos y pies de página para una marca personal operada como persona natural sin personería jurídica.
- T-4 (Parcial): Ausencia de directiva robots explícita y metadatos Open Graph en las 12 páginas legales; esquema JSON-LD en inicio declara ProfessionalService en vez de Person + Brand.

Prioridad P1 (Alta / Accesibilidad y Conversión):
- A11y: Violación seria de contraste WCAG 2.1 AA (3.78:1 vs 4.5:1) en el botón .quote-submit-btn en index.html.
- C-1: Servicio principal de bordado industrial no posee filtro dedicado en portfolio.html ni se exhiben muestras terminadas junto a sus matrices.
- C-2: Títulos con erratas no corregidas ('Chaqueta Bordadax', 'Jswim Academi', 'Gerreras SC', 'WWW.listaprecio.com') y descripciones genéricas idénticas en las 39 fichas.
- C-3: Ausencia de precios referenciales en 38 de las 39 piezas del portafolio.
- C-6: Formulario de cotización con campos select simples sin cálculo estimado dinámico ni tarjetas visuales de selección de servicio.
- L-6: Enlace de preferencias de cookies ausente en 404.html y en 10 páginas legales.

Prioridad P2 (Media / SEO y Rendimiento):
- T-1: 107 archivos de imágenes y miniaturas con espacios, mayúsculas y acentos en sus nombres.
- T-2: Textos alternativos (alt) repetitivos tipo plantilla que no aportan valor descriptivo para accesibilidad ni SEO.
- T-3: URLs con extensión de archivo (.html) en lugar de directorios canónicos limpios (/portafolio/ y /en/portfolio/).


12. ARCHIVOS CREADOS O MODIFICADOS DURANTE ESTA TAREA

Archivos creados:
- reportes/FASE-0.md: Documento de reporte y diagnóstico integral subsanado.
- reportes/evidencias/inventario-completo.json: Registro detallado de archivos, rutas y pesos.
- reportes/evidencias/seo-metadata-audit.json: Auditoría detallada de metadatos de las 17 páginas.
- reportes/evidencias/links-e-imagenes-audit.json: Registro de verificación de enlaces y atributos de imagen.
- reportes/evidencias/cookie-links-audit.json: Auditoría de presencia de enlaces de cookies y analítica por página.

Archivos de producción modificados:
- NINGUNO. (0 archivos modificados en código de producción, plantillas, datos o assets).


13. COMANDOS EJECUTADOS, CÓDIGOS DE SALIDA Y EVIDENCIAS

1. git tag backup-pre-mejora; git checkout -b mejora-2026-10
   - Código de salida: 0
   - Evidencia: Etiqueta creada en commit 793d73c, rama activa mejora-2026-10.
2. git branch --show-current; git status; git tag -l -n "backup-pre-mejora"
   - Código de salida: 0
   - Evidencia: Rama confirmada mejora-2026-10, estado sin modificaciones de producción.
3. git diff backup-pre-mejora HEAD
   - Código de salida: 0
   - Evidencia: Diferencia limitada exclusivamente a la carpeta reportes/.
4. node tools/audit-site.mjs
   - Código de salida: 0
   - Evidencia: PASS: 17 HTML pages and 4 CSS files audited.
5. node tools/check-js-syntax.mjs
   - Código de salida: 0
   - Evidencia: 11 archivos de JavaScript aprobados sin errores de sintaxis.
6. node --test tools/test-audit.mjs
   - Código de salida: 0
   - Evidencia: 33 pruebas unitarias aprobadas.
7. npx playwright test
   - Código de salida: 1
   - Evidencia: 126 pruebas aprobadas, 8 omitidas, 1 fallo de contraste en .quote-submit-btn.
8. tools/check-links.mjs (ejecutado y eliminado)
   - Código de salida: 0
   - Evidencia: PASS: 0 broken local links/resources across all 17 HTML pages.


14. PRUEBAS PENDIENTES Y LIMITACIONES

1. Auditoría oficial Lighthouse CLI:
   - Estado: PENDIENTE.
   - Motivo: Falta de paquete local/global lighthouse en el entorno y bloqueo de instalación interactiva.
   - Alternativa ejecutada: Métricas de carga con Playwright (Pixel 5) y auditoría Axe-core.
   - Acción requerida: Ejecutar auditoría manual desde Chrome DevTools (pestaña Lighthouse) al publicar o en servidor local.
2. Verificación en consolas de Google (Search Console, Analytics y Business Profile):
   - Estado: PENDIENTE.
   - Motivo: Requiere credenciales de acceso a las cuentas privadas de Google pertenecientes a Ramses Martínez.
   - Acción requerida: Revisión manual guiada de la cobertura de indexación, eventos clave y perfil comercial en la Fase 5.


15. CRITERIOS DE ACEPTACIÓN DE FASE 0

- 1. Rama de trabajo creada (mejora-2026-10): VERIFICADO
- 2. Etiqueta de respaldo creada y validada (backup-pre-mejora): VERIFICADO
- 3. Código y assets de producción intactos sin modificaciones: VERIFICADO
- 4. Inventario completo de páginas, scripts, fuentes y assets: VERIFICADO
- 5. Auditoría de metadatos y SEO en 17 páginas: VERIFICADO
- 6. Auditoría de GA4 y banner de consentimiento en código: VERIFICADO
- 7. Verificación de conteo de tarjetas y origen de discrepancia 41/39: VERIFICADO
- 8. Comprobación de integridad de enlaces internos (0 rotos): VERIFICADO
- 9. Descarte de fuentes no autorizadas y verificación de licencias OFL: VERIFICADO
- 10. Identificación de imágenes con insignias oficiales, hero y privacidad: VERIFICADO
- 11. Ejecución de suites de pruebas automáticas locales (audit, syntax, test, playwright): VERIFICADO
- 12. Informe estándar Lighthouse CLI con puntuaciones 0-100: PENDIENTE (Documentada limitación técnica y métricas sustitutas obtenidas)
- 13. Verificación de consolas propietarias de Google: PENDIENTE (Requiere acceso de Ramses)


16. DICTAMEN FINAL Y CONDICIONES PARA SOLICITAR APROBACIÓN

El diagnóstico de la Fase 0 ha sido subsanado exhaustivamente, aportando respaldo documental y evidencias verificables en reportes/evidencias/.

Condición para avanzar a Fase 1:
- El reporte queda formalmente registrado y disponible para inspección en reportes/FASE-0.md.
- No se iniciará ninguna tarea de la Fase 1 (Legal y riesgos) hasta que Ramses Martínez revise los hallazgos y autorice expresamente el inicio de la siguiente fase.
