# KINGDOM — REPORTE DE FASE 0: RESPALDO Y DIAGNÓSTICO (CIERRE Y VERIFICACIÓN FINAL)

Fecha del informe: 12 de octubre de 2026
Propietario del proyecto: Ramses Martínez
Ejecuta: Antigravity
Dirección: Claude
Especificación maestra: KINGDOM-plan-mejora-portafolio.md (Revisión 2)
Rama de trabajo activa: mejora-2026-10
Etiqueta de respaldo: backup-pre-mejora
Commit base respaldado: 793d73c0d8d027d0ed6421820f89f09205b1900c
Estado de producción: Intacto (0 modificaciones a archivos de producción)


1. DICTAMEN DE FASE 0

Estado de la Fase 0: FASE 0 NO APROBADA (BLOQUEADA POR CRITERIOS PENDIENTES).

Justificación técnica y objetiva del dictamen:
- El plan maestro KINGDOM-plan-mejora-portafolio.md (sección 11, Fase 0, ítem 8) establece como requisito obligatorio: "Ejecuta Lighthouse móvil en home y portafolio (rendimiento, accesibilidad, SEO, buenas prácticas) y adjunta los resultados".
- En el entorno local actual no fue técnicamente posible ejecutar Lighthouse CLI para generar las puntuaciones canónicas sintéticas (0-100) ni los informes oficiales HTML/JSON. Se documentan en este informe los intentos fallidos, comandos ejecutados y el bloqueo en segundo plano de npx.
- Conforme a la instrucción expresa del propietario ("No declares Fase 0 aprobada mientras Lighthouse, obligatorio en el diagnóstico maestro, permanezca pendiente sin una decisión expresa del propietario"), la Fase 0 NO puede darse por aceptada.
- El respaldo del repositorio y el diagnóstico de código, activos, metadatos y pruebas internas están 100 % completados y verificados. Los archivos de producción permanecen intactos. La decisión de si se realiza la corrida de Lighthouse externamente o se exceptúa para autorizar el paso a la Fase 1 corresponde exclusivamente a Ramses Martínez.


2. ALCANCE EJECUTADO Y LIMITACIONES

Alcance ejecutado:
- Verificación formal de Git: comprobación de commit HEAD, commit base respaldado, etiqueta backup-pre-mejora, estado del árbol de trabajo y diff contra respaldo.
- Inventario exhaustivo con rutas y tamaños de 17 páginas HTML, 4 hojas de estilo CSS, 3 scripts de cliente en assets/js/, 8 herramientas en tools/, 13 archivos de tipografías y 143 recursos gráficos y de marca.
- Comprobación de integridad de enlaces internos y rutas locales (0 enlaces locales rotos).
- Auditoría técnica de metadatos SEO en 17 páginas HTML (<title>, meta description, canonical, hreflang, robots, Open Graph y JSON-LD).
- Inspección estática y dinámica del flujo de consentimiento de cookies y Google Analytics 4 (assets/js/analytics.js y Playwright e2e).
- Análisis del catálogo de portafolio y resolución documental de la discrepancia 39/41.
- Auditoría de tipografías autoalojadas, comprobación de licencias OFL y descarte de tipografías prohibidas en CSS y disco.
- Auditoría de imágenes: confirmación de ausencia de foto ajena en el hero activo, detección de insignias de entes oficiales en el modal y disco, y exposición de placa vehicular en 'Ford Ka Edition'.
- Aclaración técnica de la discrepancia entre el auditor estático tools/audit-site.mjs (0 frases comerciales prohibidas detectadas) y los hallazgos de lenguaje corporativo del plan maestro.
- Ejecución completa de suites de pruebas automáticas locales (audit-site.mjs, check-js-syntax.mjs, test-audit.mjs y Playwright e2e), documentando con transparencia la prueba que arrojó fallo de contraste en una corrida y pasó en otra.

Limitaciones encontradas:
- Lighthouse CLI: No está instalado como paquete local ni global en el sistema. La invocación mediante npx en segundo plano se cuelga indefinidamente. No se generaron informes oficiales de Lighthouse.
- Consolas autenticadas de Google (Search Console, Analytics y Business Profile): No se cuenta con credenciales de acceso para auditar errores de indexación en vivo, eventos clave en GA4 o estado de la ficha comercial de Google Business Profile. Este diagnóstico se limita estrictamente al código fuente del cliente y metadatos locales.


3. ENTORNO TÉCNICO Y VERSIONES

- Sistema operativo: Windows 11 / Windows NT (PowerShell)
- Node.js: v24.19.0
- npm: v11.17.0
- Playwright CLI y Core: v1.64.0
- Navegador Chromium de pruebas: Chromium v1248 (C:\Users\Dell\AppData\Local\ms-playwright\chromium-1248\chrome-win64\chrome.exe)
- Motor de auditoría de accesibilidad: @axe-core/playwright v4.13.0
- Navegador Chrome en sistema: Google Chrome (C:\Program Files\Google\Chrome\Application\chrome.exe, 3.417.240 bytes)
- Servidor estático local para pruebas: tools/serve-static.mjs (puerto 4173)


4. RESPALDO, RAMA, ETIQUETA Y ESTADO DE GIT

Salidas reales de los comandos ejecutados:
- Comando: git branch --show-current
  Salida: mejora-2026-10
  Código de salida: 0
- Comando: git tag -l -n "backup-pre-mejora"
  Salida: backup-pre-mejora feat: release production v1.1.0 - audit, tests e2e, i18n legal parity, and security hardening
  Código de salida: 0
- Comando: git rev-parse backup-pre-mejora
  Salida: 793d73c0d8d027d0ed6421820f89f09205b1900c
  Código de salida: 0
- Comando: git rev-parse HEAD
  Salida: a65207ea2adf718598ab255fca1dfb312c608ec8
  Código de salida: 0
- Comando: git diff backup-pre-mejora --name-only | Where-Object { $_ -notlike "reportes/*" }
  Salida: (vacía)
  Código de salida: 0
- Comando: git status
  Salida:
  On branch mejora-2026-10
  Untracked files:
    KINGDOM-plan-mejora-portafolio.md
  nothing added to commit but untracked files present
  Código de salida: 0

Conclusión de Git:
El código y contenido de producción están 100 % preservados e intactos respecto al commit base respaldado. Las únicas adiciones en la rama corresponden a la documentación y archivos JSON de evidencia dentro del directorio 'reportes/'.


5. INVENTARIO DE PÁGINAS, SCRIPTS, FUENTES Y ASSETS

El inventario físico detallado se encuentra registrado y verificado en reportes/evidencias/inventario-completo.json.

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

Scripts JavaScript de cliente en assets/js/ (3 archivos):
- assets/js/analytics.js (7.422 bytes) - Gestión de consentimiento y carga condicional de GA4
- assets/js/app.js (24.546 bytes) - Lógica de UI, navegación móvil, modal y filtros
- assets/js/site.config.js (1.239 bytes) - Configuración y constantes del sitio

Scripts de herramientas en tools/ (8 archivos reales comprobados):
- tools/audit-site.mjs (18.282 bytes) - Auditor estático de reglas de negocio, CSP y enlaces
- tools/build-i18n.mjs (22.309 bytes) - Compilador de plantillas bilingües ES/EN
- tools/check-js-syntax.mjs (3.672 bytes) - Validador de sintaxis de scripts
- tools/convert-wilcom.mjs (1.254 bytes) - Utilidad de conversión de matrices Wilcom
- tools/serve-static.mjs (2.789 bytes) - Servidor HTTP local sin dependencias para pruebas
- tools/sync-artwork.mjs (13.732 bytes) - Sincronizador de catálogo e imágenes
- tools/test-audit.mjs (35.010 bytes) - Suite de pruebas unitarias del auditor
- tools/update-portfolio-artistic.mjs (3.098 bytes) - Actualizador artístico de descripciones

Aclaración de la discrepancia 7 vs 8 scripts:
En informes preliminares se mencionaron indistintamente 7 u 8 herramientas debido a que tools/serve-static.mjs fue considerado un módulo auxiliar de prueba y no una herramienta de compilación. La inspección física real con Get-ChildItem confirma exactamente 8 archivos en tools/ y 3 scripts en assets/js/.

Scripts externos:
- Google Analytics 4 (https://www.googletagmanager.com/gtag/js?id=G-YQCLS51XJE): Se carga condicionalmente solo si el usuario pulsa "Aceptar". Cero scripts externos adicionales. Cero CDNs de librerías.

Tipografías autoalojadas en assets/fonts/ (13 archivos):
- Sedgwick Ave Display:
  - assets/fonts/sedgwick-ave-display.woff2 (55.220 bytes)
  - assets/fonts/sedgwick-ave-display.ttf (135.996 bytes)
  - Licencia: assets/fonts/SEDGWICK-OFL.txt (SIL Open Font License 1.1, uso comercial permitido)
- Montserrat (SIL Open Font License 1.1):
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
- Tipografías prohibidas: Cero archivos y cero referencias en CSS a 'Graffiti City', 'Aerosoldier' u otras fuentes no autorizadas.

Recursos gráficos y de marca (143 archivos):
- assets/artwork/: 61 archivos WebP principales (8.156.966 bytes)
- assets/artwork/thumbs/: 61 archivos WebP miniaturas (1.810.158 bytes)
- assets/brand/: 21 archivos (logos, favicons, texturas e iconos; 1.688.082 bytes)


6. AUDITORÍA DE METADATOS Y SEO

El registro detallado de metadatos de las 17 páginas se encuentra en reportes/evidencias/seo-metadata-audit.json.

Resultados comprobados:
- Atributo lang:
  Presente y correcto en las 17 páginas (lang="es" en español, lang="en" en inglés).
- Título (<title>):
  Presente en las 17 páginas.
  index.html: 60 caracteres ("Kingdom | Diseño Textil y Bordado Industrial en Barquisimeto").
  portfolio.html: 66 caracteres ("Portafolio de Diseño Textil | KINGDOM — Kingdom by Ramses Martínez").
  Páginas legales: entre 22 y 49 caracteres.
- Metadescripción (meta name="description"):
  Presente en las 17 páginas.
  index.html: 139 caracteres.
  portfolio.html: 166 caracteres (excede ligeramente el umbral de 155 caracteres recomendado).
  Páginas legales: entre 91 y 118 caracteres.
- Enlace canónico (link rel="canonical"):
  Presente con URLs absolutas en las 17 páginas.
- Enlaces hreflang alternativos:
  index.html y portfolio.html (y versiones en inglés): poseen hreflang="es", hreflang="en" y hreflang="x-default".
  Las 12 páginas legales: poseen hreflang="es" y hreflang="en", pero OMITEN hreflang="x-default".
- Directiva meta name="robots":
  Presente en index.html, en/index.html, portfolio.html, en/portfolio.html y 404.html.
  AUSENTE en las 12 páginas legales (legal/*.html y en/legal/*.html).
- Metadatos Open Graph y Twitter Cards:
  Presentes y completos en index.html, en/index.html, portfolio.html y en/portfolio.html (con imagen assets/brand/og-image.png de 1200x630).
  AUSENTES en las 12 páginas legales y en 404.html.
- Datos estructurados JSON-LD:
  index.html y en/index.html: 1 bloque que declara ProfessionalService y WebSite. Defecto: debe cambiarse a Person con propiedad brand: Kingdom, ya que Ramses opera como persona natural.
  portfolio.html y en/portfolio.html: 2 bloques (WebPage y BreadcrumbList).
  Las 12 páginas legales y 404.html: Cero datos estructurados JSON-LD.
- Archivos especiales en raíz:
  sitemap.xml: Existe, válido, 137 líneas, incluye URLs canónicas en español e inglés con fecha de modificación lastmod.
  robots.txt: Existe, permite rastreo general (Allow: /) y declara Sitemap: https://kingdombyramsesmartinez.github.io/sitemap.xml.
  404.html: Existe, posee diseño propio, navegación de regreso y directiva noindex,follow.


7. ANALÍTICA, COOKIES Y SEARCH CONSOLE

- Ubicación de la analítica:
  assets/js/analytics.js (cargado con defer en páginas comerciales).
- Identificador GA4:
  G-YQCLS51XJE.
- Mecanismo de consentimiento verificado en código:
  1. Primera visita sin decisión: GA4 no se descarga ni se inyecta ninguna etiqueta script externa. No se emiten cookies de analítica.
  2. Aceptar: se guarda kingdom_cookie_consent='granted' en localStorage, se ejecuta enableGATracking() y se descarga gtag.js de Google.
  3. Rechazar: se persiste 'denied', se activa window['ga-disable-G-YQCLS51XJE']=true, se envía orden denied a gtag y se ejecutan rutinas de borrado de cookies (_ga, _ga_*, _gid).
  4. Revocación: la función window.resetKingdomConsent() reabre el banner para modificar la preferencia.
- Presencia del enlace de preferencias de cookies (reportes/evidencias/cookie-links-audit.json):
  Presente en: index.html, en/index.html, portfolio.html, en/portfolio.html, legal/cookies.html y en/legal/cookies.html.
  AUSENTE en: 404.html, legal/privacy.html, legal/terms.html, legal/intellectual-property.html, legal/security.html, legal/accessibility.html y sus versiones en inglés. El plan maestro exige que esté en el pie de página de todas las páginas indexables si GA4 está configurado.
- Google Search Console:
  meta name="google-site-verification" content="nC54d1xXW7ralhJOmq0VH093fih_OC67OsD-GIr9L2k" presente en index.html y portfolio.html.
  La comprobación de métricas de cobertura y errores de indexación en Search Console queda clasificada como PENDIENTE por requerir acceso autenticado del propietario.


8. INVENTARIO DEL PORTAFOLIO Y DISCREPANCIA 41/39

Evidencia comprobada:
- En content/portfolio.json: existen exactamente 39 objetos de proyectos.
- En portfolio.html: existen exactamente 39 elementos <article class="portfolio-card...">.
- En en/portfolio.html: existen exactamente 39 elementos <article class="portfolio-card...">.
- En index.html: el texto visible en la sección hero dice "39 Presentaciones".
- En en/index.html: el texto visible dice "39 Presentations".

Trazabilidad documentada de la cifra 41:
- En la especificación maestra (sección 1, C-8) se anotó: "El home dice '41 presentaciones'; conté 39 tarjetas".
- Al inspeccionar el historial de git (commit 793d73c), se constató que la plantilla del home fue ajustada de 41 a 39 para reflejar el número de tarjetas realmente maquetadas en el catálogo.
- En el sitio físico nunca existieron 41 tarjetas completas en esta versión, sino 39.
- Decisión de diagnóstico: No se deben inventar ni suprimir tarjetas. En la Fase 2, el contador se calculará dinámicamente desde data/portfolio.json.


9. ENLACES, IMÁGENES Y ACCESIBILIDAD

El informe detallado de enlaces e imágenes se encuentra en reportes/evidencias/links-e-imagenes-audit.json.

Integridad de enlaces:
- Se comprobaron todos los enlaces internos y rutas locales de las 17 páginas HTML.
- Resultado: 0 enlaces internos rotos y 0 recursos locales inexistentes.

Atributos de imágenes:
- Dimensiones explícitas: 100 % de las imágenes cuentan con atributos width y height.
- Atributo loading="lazy":
  index.html: 4 imágenes sin lazy (logos institucionales y hero; en hero es correcto para optimizar LCP).
  portfolio.html: 39 tarjetas cuentan con loading="lazy" y decoding="async". Solo 3 imágenes no lo tienen (logo superior, logo inferior e imagen dentro del modal).
- Calidad de textos alternativos (alt):
  Ninguna imagen carece de alt, pero las 39 tarjetas repiten una plantilla genérica que no describe la prenda ni la técnica visual.
- Nombres de archivos:
  107 archivos entre assets/artwork/ y thumbs/ contienen espacios, mayúsculas y acentos (ej. 'alcaldia de san felipe-chaqueta sublimada.webp', 'Laneros Gamers-franela manga corta sublimada.webp').


10. RESULTADOS DE LIGHTHOUSE Y PRUEBAS AUTOMATIZADAS

A. Intento de ejecución de Lighthouse móvil y causa de bloqueo:
- Comando intentado: npx --yes lighthouse --chrome-flags="--headless" --output=json,html --output-path=reportes/evidencias/lh-test http://127.0.0.1:4173/index.html
- Resultado: El proceso de npx interactivo se suspende indefinidamente esperando confirmación o descarga de paquetes en segundo plano en el entorno Windows no interactivo, sin producir salida ni generar archivos. Tuvo que ser cancelado con manage_task.
- Intento alternativo: npm install --no-save lighthouse también se bloquea en la descarga de dependencias profundas de Chromium/Lighthouse.
- Estado formal: PENDIENTE. No se simulan puntuaciones sintéticas ni se declara equivalencia con otras herramientas.

B. Aclaración técnica sobre las ejecuciones de Playwright (Fallo anterior vs Ejecución posterior):
- En la primera ejecución completa de Playwright (npx playwright test):
  - Código de salida: 1
  - Resultado: 126 pruebas aprobadas, 8 omitidas, 1 fallida.
  - Prueba que falló: tests/axe-a11y.spec.mjs:13:5 en el proyecto 'desktop-chromium' al evaluar 'ES - Inicio'.
  - Causa del fallo: axe-core detectó una violación seria de contraste (color-contrast) en el botón '.quote-submit-btn' ('Enviar Mensaje a WhatsApp (+58 424-109-2124)'): fondo #6b6b6b frente a texto #070706 con ratio de 3.78:1 (el umbral mínimo WCAG 2.1 AA es 4.5:1).
- En la segunda ejecución con reporter de lista (npx playwright test --reporter=list):
  - Código de salida: 0
  - Resultado: 127 pruebas aprobadas, 8 omitidas, 0 fallidas.
  - Motivo de la diferencia: El fallo de contraste en '.quote-submit-btn' es intermitente y dependiente del orden de ejecución y estado de foco/hover que deja la prueba de formulario 'tests/quote-form.spec.mjs'. Cuando se ejecuta de manera aislada (npx playwright test tests/axe-a11y.spec.mjs), el botón se evalúa en su estado de reposo (#7A8058 sobre #070706 con ratio de 4.9:1) y pasa limpiamente (12 passed).
  - Conclusión técnica: No se modificó ninguna prueba ni se alteró el código. El problema de contraste es un defecto latente real cuando el botón entra en estado de foco/deshabilitado, registrado en la sección 11 para corrección en la Fase 6.
- Justificación de las 8 pruebas omitidas (skipped):
  Corresponden a tests/navigation.spec.mjs ('Menú Móvil › apertura, cierre y navegación en ES/EN Inicio y Portafolio'). En 'desktop-chromium', el menú hamburguesa (#burgerBtn) se oculta por CSS (ancho > 768px), por lo que la prueba se auto-omite condicionalmente mediante testInfo.skip(). En 'tablet-chromium' y 'mobile-chromium', estas 8 pruebas se ejecutan y aprueban al 100 %.

C. Suites unitarias y estáticas:
- tools/audit-site.mjs (código 0): PASS en 17 páginas HTML y 4 CSS.
- tools/check-js-syntax.mjs (código 0): PASS en 11 archivos JS.
- tools/test-audit.mjs (código 0): PASS en 33 pruebas unitarias (duración 340 ms).


10b. ACLARACIÓN: AUDITOR ESTÁTICO VS LENGUAJE CORPORATIVO (HALLAZGO L-9)

Discrepancia observada:
- tools/audit-site.mjs reporta: "0 prohibited phrases".
- El diagnóstico maestro reporta: "L-9: El sitio usa lenguaje de empresa ('marca y estudio fundado por', 'nuestro taller', 'Correo de Taller')".

Explicación técnica de la discrepancia:
- Al examinar tools/audit-site.mjs (líneas 31-55), la constante PROHIBITED_MARKETING_PHRASES fue diseñada en revisiones previas (v4) para detectar promesas comerciales no demostrables: "máxima definición", "garantizar", "cero ", "alta precisión", "primer nivel", "planta", "ACTIVO", "fotográfico real", "muestras reales", "reducir roturas", "a nivel nacional e internacional", "Kingdom Wear" y el color antiguo "#ffc500".
- tools/audit-site.mjs NO incluye en su lista de expresiones prohibidas los términos de lenguaje corporativo ("fundado por", "estudio", "nuestro taller", "correo de taller").
- Por lo tanto, tools/audit-site.mjs no genera infracción porque esas frases están fuera de su regla actual.
- Sin embargo, las frases corporativas SÍ existen físicamente en index.html (L412), portfolio.html (L1250) y plantillas, constituyendo un hallazgo real (L-9) que deberá subsanarse en la Fase 1 sin alterar archivos de producción en esta fase.


11. HALLAZGOS ORDENADOS POR GRAVEDAD

Prioridad P0 (Riesgo Crítico / Legal / Identidad):
- L-1: 9 piezas de Fan Art y 6 de marcas automotrices de terceros mezcladas en el portafolio comercial con botón de cotización directa hacia WhatsApp, en contradicción con la leyenda de no venta.
- L-3: Imagen precargada por defecto del modal en index.html muestra la propuesta no concretada de 'Alcaldía de San Felipe' con insignias oficiales municipales.
- L-10: Pieza 'Ford Ka Edition' exhibe placa patente vehicular legible de un particular en imagen y miniatura.
- L-9: Redacción corporativa ('fundado por', 'nuestro taller', 'Estudio de diseño') para una marca personal operada como persona natural.
- T-4: Omisión de meta robots y Open Graph en las 12 páginas legales; esquema JSON-LD en inicio declara ProfessionalService en vez de Person con marca Kingdom.

Prioridad P1 (Alta / Accesibilidad, Contenido y Conversión):
- C-1: Servicio estrella de bordado industrial carece de filtro dedicado en portfolio.html.
- C-2: Títulos con erratas ('Chaqueta Bordadax', 'Jswim Academi', 'Gerreras SC', 'WWW.listaprecio.com') y descripciones genéricas repetidas en las 39 tarjetas.
- C-3: 38 de las 39 piezas no muestran precio unitario referencial.
- C-6: Cotizador con selects simples sin desglose de servicios ni cálculo dinámico.
- L-6: Enlace de preferencias de cookies ausente en 404.html y en 10 páginas legales.

Prioridad P2 (Media / SEO On-Page y Limpieza Técnica):
- T-1: 107 archivos de imágenes y miniaturas con espacios, mayúsculas y acentos.
- T-2: Textos alternativos (alt) genéricos e idénticos en el portafolio.
- T-3: URLs con extensión .html en lugar de carpetas canónicas limpias (/portafolio/ y /en/portfolio/).
- A11y: Botón .quote-submit-btn presenta contraste límite (3.78:1) susceptible de fallo según el estado de foco del navegador.


12. ARCHIVOS CREADOS O MODIFICADOS DURANTE ESTA TAREA

Archivos de documentación y evidencias creados o modificados en la rama mejora-2026-10:
- reportes/FASE-0.md: Documento maestro de reporte de diagnóstico.
- reportes/evidencias/inventario-completo.json (19.600 bytes): Registro detallado de archivos, rutas y pesos.
- reportes/evidencias/seo-metadata-audit.json (14.938 bytes): Auditoría detallada de metadatos de las 17 páginas.
- reportes/evidencias/links-e-imagenes-audit.json (30.224 bytes): Auditoría de enlaces y atributos de imagen.
- reportes/evidencias/cookie-links-audit.json (1.566 bytes): Auditoría de enlaces de cookies y analítica por página.

Archivos de producción modificados:
- NINGUNO. (0 archivos de producción modificados).


13. COMANDOS EJECUTADOS, CÓDIGOS DE SALIDA Y EVIDENCIAS

1. git branch --show-current; git status; git tag -l -n "backup-pre-mejora"; git rev-parse HEAD; git rev-parse backup-pre-mejora
   - Código de salida: 0
   - Evidencia: Rama confirmada mejora-2026-10, commit base 793d73c, etiqueta backup-pre-mejora validada.
2. git diff backup-pre-mejora --name-only | Where-Object { $_ -notlike "reportes/*" }
   - Código de salida: 0
   - Evidencia: Salida vacía. 0 archivos de producción alterados.
3. node tools/audit-site.mjs
   - Código de salida: 0
   - Evidencia: PASS: 17 HTML pages and 4 CSS files audited; 0 duplicate IDs, 0 broken references, 0 prohibited phrases, strict CSP compliance.
4. node tools/check-js-syntax.mjs
   - Código de salida: 0
   - Evidencia: 11 archivos analizados y aprobados. 0 errores sintácticos.
5. node --test tools/test-audit.mjs
   - Código de salida: 0
   - Evidencia: 33 pruebas unitarias aprobadas, 0 fallos, duración 340 ms.
6. npx playwright test --reporter=list
   - Código de salida: 0
   - Evidencia: 127 pruebas aprobadas, 8 omitidas justificadas por viewport, 0 fallos.
7. npx playwright test tests/axe-a11y.spec.mjs
   - Código de salida: 0
   - Evidencia: 12 pruebas de accesibilidad WCAG 2.1 AA aprobadas.
8. npx --yes lighthouse (intento fallido de ejecución interactiva cancelado)
   - Código de salida: cancelado
   - Evidencia: Bloqueo en descarga interactiva npx sin salida generada.


14. PRUEBAS PENDIENTES Y LIMITACIONES

1. Auditoría oficial de Lighthouse CLI (puntuaciones sintéticas 0-100):
   - Estado: PENDIENTE.
   - Motivo técnico: Binario lighthouse no instalado en el entorno local y bloqueo en descarga interactiva npx.
   - Acción requerida: Ejecutar auditoría manual mediante Chrome DevTools (pestaña Lighthouse) al publicar en servidor web o local por parte del propietario.
2. Verificación en consolas de Google (Search Console, Analytics y Business Profile):
   - Estado: PENDIENTE.
   - Motivo técnico: Requiere credenciales privadas de acceso a las cuentas de Google de Ramses Martínez.
   - Acción requerida: Revisión manual guiada en la Fase 5 del plan maestro.


15. CRITERIOS DE ACEPTACIÓN DE FASE 0

- 1. Rama de trabajo creada y activa (mejora-2026-10): VERIFICADO
- 2. Etiqueta de respaldo creada y validada (backup-pre-mejora sobre commit 793d73c): VERIFICADO
- 3. Archivos y contenido de producción intactos sin modificaciones: VERIFICADO
- 4. Inventario exacto de páginas, hojas CSS, scripts, fuentes y assets: VERIFICADO
- 5. Auditoría de metadatos y SEO en las 17 páginas HTML: VERIFICADO
- 6. Auditoría de GA4 y flujo de consentimiento de cookies en código: VERIFICADO
- 7. Verificación de conteo de tarjetas y origen de discrepancia 41/39: VERIFICADO
- 8. Comprobación de integridad de enlaces internos (0 rotos): VERIFICADO
- 9. Descarte de fuentes no autorizadas y verificación de licencias OFL: VERIFICADO
- 10. Identificación de imágenes con insignias oficiales, hero y privacidad: VERIFICADO
- 11. Ejecución de suites automáticas locales (audit, syntax, test, playwright): VERIFICADO
- 12. Informe estándar Lighthouse CLI con puntuaciones 0-100: PENDIENTE (documentado motivo y requerimiento de ejecución externa)
- 13. Verificación de consolas propietarias de Google: PENDIENTE (requiere acceso de Ramses)


16. DICTAMEN FINAL Y CONDICIONES PARA SOLICITAR APROBACIÓN

El diagnóstico técnico y respaldo de la Fase 0 ha sido subsanado exhaustivamente, aportando respaldo documental reproducible y evidencias verificables en reportes/evidencias/.

Condición para avanzar a Fase 1:
- El reporte queda formalmente registrado y disponible para inspección en reportes/FASE-0.md.
- La limitación insalvable de Lighthouse CLI en el entorno local queda explícitamente registrada como PENDIENTE.
- Por tanto, la Fase 0 permanece en estado NO APROBADA formalmente hasta que Ramses Martínez decida expresamente si aprueba el diagnóstico con Lighthouse pendiente de corrida externa o si proporciona el reporte externo de Lighthouse para adjuntarlo antes de iniciar la Fase 1.
- No se iniciará ninguna tarea de la Fase 1 (Legal y riesgos) hasta recibir la instrucción expresa de Ramses Martínez.
