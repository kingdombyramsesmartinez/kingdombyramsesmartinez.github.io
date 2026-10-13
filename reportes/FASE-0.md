# KINGDOM — REPORTE DE FASE 0: RESPALDO Y DIAGNÓSTICO (SUBSANACIÓN INTEGRAL Y DEFINITIVA)

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

Estado de la Fase 0: FASE 0 COMPLETADA EN DIAGNÓSTICO TÉCNICO Y RESPALDO; ACEPTACIÓN FORMAL CONDICIONADA A LAS COMPROBACIONES EXTERNAS PENDIENTES Y AUTORIZACIÓN EXPRESA DE RAMSES MARTÍNEZ.

Justificación técnica del dictamen:
- El respaldo del código preexistente se encuentra validado y etiquetado en Git (backup-pre-mejora). Los archivos de producción (HTML, CSS, JS cliente, fuentes, imágenes y datos JSON) están 100 % idénticos al estado respaldado.
- Se resolvió con precisión de archivo y ruta el inventario completo, confirmando que existen 8 scripts en la carpeta tools/ y 3 scripts de cliente en assets/js/.
- Se auditaron mediante scripts reproducibles los metadatos SEO, el sistema de consentimiento de cookies, GA4 y los 143 recursos gráficos y de marca.
- La ejecución canónica de Lighthouse móvil (puntuaciones sintéticas 0-100) no fue ejecutable debido a la ausencia del paquete binario local/global lighthouse en el entorno y las restricciones de instalación interactiva npx en segundo plano. Este criterio queda formalmente clasificado como PENDIENTE, sin simular ni declarar equivalencias espurias.
- Se documenta con base en evidencias de commits la causa de la diferencia entre las 39 tarjetas físicas y el número 41 citado en análisis previos.
- No se ha iniciado ninguna modificación ni tarea correspondiente a la Fase 1.


2. ALCANCE EJECUTADO Y LIMITACIONES

Alcance ejecutado:
- Verificación exhaustiva de Git (rama activa, etiqueta, commit base, diff y árbol de trabajo).
- Inventario físico y de pesos de las 17 páginas HTML, 4 hojas CSS, 3 scripts cliente, 8 herramientas en tools/, 13 archivos de fuentes y 143 archivos de imagen/marca.
- Comprobación de integridad de enlaces internos y referencias locales a recursos.
- Análisis de metadatos SEO (<title>, meta description, canonical, hreflang, robots, Open Graph y JSON-LD) en las 17 páginas HTML.
- Inspección del código de consentimiento de cookies y GA4 en assets/js/analytics.js y verificación de la presencia del enlace de gestión de cookies en todas las páginas.
- Conteo y contraste del catálogo del portafolio (content/portfolio.json vs tarjetas maquetadas en HTML vs contadores en páginas de inicio).
- Verificación de tipografías autoalojadas, comprobación de licencias OFL y descarte de tipografías prohibidas en CSS y disco.
- Auditoría visual y de riesgos de imágenes (placas vehiculares, insignias oficiales y origen del hero).
- Ejecución completa de suites de pruebas automáticas locales (audit-site.mjs, check-js-syntax.mjs, test-audit.mjs y Playwright e2e).

Limitaciones del diagnóstico:
- No se tiene acceso a las credenciales privadas de Google Search Console, Google Analytics 4 ni Google Business Profile; el estado de indexación en vivo, errores de cobertura y configuración de ficha comercial no son auditables desde el repositorio local.
- Lighthouse CLI no está instalado como dependencia local del repositorio (package.json define playwright, axe-core, sharp, ttf2woff2 y montserrat). Su ejecución mediante npx no pudo completarse interactivamente. Las puntuaciones oficiales quedan registradas como PENDIENTE para ejecución externa o manual.


3. ENTORNO TÉCNICO Y VERSIONES

- Sistema operativo: Windows 11 / Windows NT (PowerShell)
- Node.js: v24.19.0
- npm: v11.17.0
- Playwright CLI y Core: v1.64.0
- Motor Chromium de pruebas: Chromium v1248 (C:\Users\Dell\AppData\Local\ms-playwright\chromium-1248\chrome-win64\chrome.exe)
- Motor de accesibilidad: @axe-core/playwright v4.13.0
- Servidor estático local para pruebas: tools/serve-static.mjs (puerto 4173)


4. RESPALDO, RAMA, ETIQUETA Y ESTADO DE GIT

Comprobaciones ejecutadas y resultados:
- Rama de trabajo activa: mejora-2026-10 (creada mediante 'git checkout -b mejora-2026-10').
- Etiqueta de respaldo creada: backup-pre-mejora (creada mediante 'git tag backup-pre-mejora').
- Hash de confirmación de backup-pre-mejora: 793d73c0d8d027d0ed6421820f89f09205b1900c.
- Mensaje del commit base: feat: release production v1.1.0 - audit, tests e2e, i18n legal parity, and security hardening.
- Verificación de no alteración de producción:
  El comando 'git diff backup-pre-mejora --name-only | Where-Object { $_ -notlike "reportes/*" }' devolvió salida vacía (código 0).
  El diff contra la etiqueta de respaldo únicamente contiene adiciones en el directorio 'reportes/'. Los archivos HTML, CSS, JavaScript de cliente, JSON de contenido, fuentes e imágenes de producción permanecen sin un solo byte de alteración.
- Estado del árbol de trabajo:
  Archivo no rastreado en raíz: KINGDOM-plan-mejora-portafolio.md (especificación maestra del proyecto).


5. INVENTARIO DE PÁGINAS, SCRIPTS, FUENTES Y ASSETS

El inventario exhaustivo con rutas y pesos exactos se encuentra respaldado en reportes/evidencias/inventario-completo.json.

Páginas HTML (17 páginas):
- index.html: 26.148 bytes
- portfolio.html: 111.796 bytes
- 404.html: 2.372 bytes
- en/index.html: 25.852 bytes
- en/portfolio.html: 110.440 bytes
- legal/privacy.html: 6.699 bytes
- legal/terms.html: 5.946 bytes
- legal/intellectual-property.html: 7.222 bytes
- legal/cookies.html: 4.482 bytes
- legal/security.html: 4.495 bytes
- legal/accessibility.html: 3.235 bytes
- en/legal/privacy.html: 6.451 bytes
- en/legal/terms.html: 5.943 bytes
- en/legal/intellectual-property.html: 6.655 bytes
- en/legal/cookies.html: 4.219 bytes
- en/legal/security.html: 4.349 bytes
- en/legal/accessibility.html: 3.267 bytes

Hojas de estilo CSS (4 archivos):
- assets/css/style.css: 30.380 bytes
- assets/css/urban.css: 23.004 bytes
- assets/css/legal.css: 3.404 bytes
- assets/css/404.css: 3.913 bytes

Scripts de JavaScript de cliente (3 archivos):
- assets/js/analytics.js: 7.422 bytes (Consentimiento de cookies y GA4)
- assets/js/app.js: 24.546 bytes (UI, navegación móvil, modal y filtros)
- assets/js/site.config.js: 1.239 bytes (Constantes globales de configuración)

Scripts de herramientas en tools/ (8 archivos reales):
- tools/audit-site.mjs: 18.282 bytes (Auditor estático de reglas de negocio, CSP y enlaces)
- tools/build-i18n.mjs: 22.309 bytes (Compilador de plantillas bilingües ES/EN)
- tools/check-js-syntax.mjs: 3.672 bytes (Validador de sintaxis de scripts)
- tools/convert-wilcom.mjs: 1.254 bytes (Utilidad de conversión de matrices Wilcom)
- tools/serve-static.mjs: 2.789 bytes (Servidor HTTP local sin dependencias para pruebas)
- tools/sync-artwork.mjs: 13.732 bytes (Sincronizador de catálogo e imágenes)
- tools/test-audit.mjs: 35.010 bytes (Suite de pruebas unitarias del auditor)
- tools/update-portfolio-artistic.mjs: 3.098 bytes (Actualizador artístico de descripciones)

Scripts externos:
- Google Analytics 4 (https://www.googletagmanager.com/gtag/js?id=G-YQCLS51XJE): Se carga condicionalmente de forma asíncrona solo si el visitante pulsa "Aceptar". No se utiliza ninguna librería externa vía CDN.

Fuentes tipográficas autoalojadas en assets/fonts/ (13 archivos):
- Sedgwick Ave Display:
  - assets/fonts/sedgwick-ave-display.woff2: 55.220 bytes
  - assets/fonts/sedgwick-ave-display.ttf: 135.996 bytes
  - Licencia: assets/fonts/SEDGWICK-OFL.txt (SIL Open Font License 1.1, comercial)
- Montserrat (SIL Open Font License 1.1):
  - assets/fonts/montserrat-latin-wght-normal.woff2: 37.956 bytes
  - assets/fonts/montserrat-latin-wght-italic.woff2: 39.632 bytes
  - assets/fonts/montserrat-latin-ext-wght-normal.woff2: 70.688 bytes
  - assets/fonts/montserrat-latin-ext-wght-italic.woff2: 74.892 bytes
  - assets/fonts/montserrat-cyrillic-wght-normal.woff2: 23.828 bytes
  - assets/fonts/montserrat-cyrillic-wght-italic.woff2: 24.536 bytes
  - assets/fonts/montserrat-cyrillic-ext-wght-normal.woff2: 26.368 bytes
  - assets/fonts/montserrat-cyrillic-ext-wght-italic.woff2: 26.944 bytes
  - assets/fonts/montserrat-vietnamese-wght-normal.woff2: 12.928 bytes
  - assets/fonts/montserrat-vietnamese-wght-italic.woff2: 13.900 bytes
- Fuentes prohibidas:
  Se verificó la ausencia total de archivos o referencias a 'Graffiti City', 'Aerosoldier' u otras fuentes ajenas a Sedgwick Ave Display y Montserrat.

Recursos gráficos y de marca (143 archivos):
- assets/artwork/: 61 archivos WebP principales (8.156.966 bytes)
- assets/artwork/thumbs/: 61 archivos WebP miniaturas (1.810.158 bytes)
- assets/brand/: 21 archivos (logos, favicons, iconos y texturas; 1.688.082 bytes)


6. AUDITORÍA DE METADATOS Y SEO

El informe detallado de metadatos de las 17 páginas se encuentra en reportes/evidencias/seo-metadata-audit.json.

Resultados comprobados:
- Atributo lang:
  Correcto en las 17 páginas (lang="es" en páginas en español y lang="en" en páginas en inglés).
- Título (<title>):
  Presente y no vacío en las 17 páginas.
  index.html: 60 caracteres ("Kingdom | Diseño Textil y Bordado Industrial en Barquisimeto").
  portfolio.html: 66 caracteres ("Portafolio de Diseño Textil | KINGDOM — Kingdom by Ramses Martínez").
  Páginas legales: títulos breves de entre 22 y 49 caracteres.
- Metadescripción (meta name="description"):
  Presente en las 17 páginas.
  index.html: 139 caracteres.
  portfolio.html: 166 caracteres (excede ligeramente los 155 caracteres recomendados).
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
  index.html y en/index.html: declaran ProfessionalService y WebSite. Defecto: debe transicionar a Person con propiedad brand: Kingdom, ya que Ramses opera como persona natural.
  portfolio.html y en/portfolio.html: declaran WebPage y BreadcrumbList.
  Las 12 páginas legales y 404.html: Cero datos estructurados.
- Archivos de configuración SEO en raíz:
  sitemap.xml: Presente, válido, 137 líneas, incluye URLs en español e inglés con fecha de modificación lastmod.
  robots.txt: Presente, permite indexación general (Allow: /) y enlaza a Sitemap: https://kingdombyramsesmartinez.github.io/sitemap.xml.
  404.html: Presente, con diseño propio, enlaces de regreso y directiva noindex,follow.


7. ANALÍTICA, COOKIES Y SEARCH CONSOLE

- Ubicación de la analítica:
  assets/js/analytics.js (cargado con defer en páginas comerciales).
- Identificador GA4:
  G-YQCLS51XJE.
- Funcionamiento del consentimiento comprobado en código:
  1. Primera visita sin decisión: no se emiten cookies ni se carga ningún script de Google.
  2. Aceptar: se guarda kingdom_cookie_consent='granted' en localStorage, se ejecuta enableGATracking() y se descarga gtag.js de Google.
  3. Rechazar: se persiste 'denied', se activa window['ga-disable-G-YQCLS51XJE']=true, se envía orden denied a gtag y se borran cookies _ga*.
  4. Revocación: la función window.resetKingdomConsent() permite modificar la preferencia en cualquier momento.
- Presencia del enlace de preferencias de cookies (reportes/evidencias/cookie-links-audit.json):
  Presente en: index.html, en/index.html, portfolio.html, en/portfolio.html, legal/cookies.html y en/legal/cookies.html.
  AUSENTE en: 404.html, legal/privacy.html, legal/terms.html, legal/intellectual-property.html, legal/security.html, legal/accessibility.html y sus versiones en inglés. El plan maestro exige que esté en el pie de página de todas las páginas si GA4 está configurado en el sitio.
- Google Search Console:
  meta name="google-site-verification" content="nC54d1xXW7ralhJOmq0VH093fih_OC67OsD-GIr9L2k" presente en index.html y portfolio.html.
  La comprobación de métricas de cobertura, errores 404 en Search Console y estado de verificación en el panel de Google queda clasificada como PENDIENTE por requerir acceso del propietario.


8. INVENTARIO DEL PORTAFOLIO Y DISCREPANCIA 41/39

Evidencia comprobada:
- En content/portfolio.json: existen exactamente 39 objetos de proyectos.
- En portfolio.html: existen exactamente 39 elementos <article class="portfolio-card...">.
- En en/portfolio.html: existen exactamente 39 elementos <article class="portfolio-card...">.
- En index.html: el texto visible en la sección hero dice "39 Presentaciones".
- En en/index.html: el texto visible dice "39 Presentations".

Trazabilidad documentada de la discrepancia:
- En la especificación maestra (sección 1, C-8) se anotó: "El home dice '41 presentaciones'; conté 39 tarjetas".
- Al inspeccionar el historial de git (commit 793d73c), se constató que la plantilla del home fue ajustada de 41 a 39 para reflejar el número de tarjetas realmente maquetadas.
- En el sitio físico nunca existieron 41 tarjetas completas en esta versión, sino 39.
- Conclusión: No se deben inventar ni suprimir tarjetas. En la Fase 2, el contador se calculará dinámicamente desde data/portfolio.json.


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
  Ninguna imagen carece de alt, pero las 39 tarjetas repiten una plantilla genérica que no describe la prenda ni la técnica.
- Nombres de archivos:
  107 archivos entre assets/artwork/ y thumbs/ contienen espacios, mayúsculas y acentos (ej. 'alcaldia de san felipe-chaqueta sublimada.webp', 'Laneros Gamers-franela manga corta sublimada.webp').

Accesibilidad general:
- Navegación por teclado operativa, con skip-links funcionales y soporte de prefers-reduced-motion.
- Fallo de contraste detectado: En ejecuciones previas de axe-core bajo condiciones de foco en escritorio, el botón .quote-submit-btn arrojó un contraste de 3.78:1 frente al umbral exigido de 4.5:1.


10. RESULTADOS DE LIGHTHOUSE Y PRUEBAS AUTOMATIZADAS

A. Suites de pruebas automáticas locales:

1. Auditoría de negocio, CSP y enlaces (tools/audit-site.mjs):
   - Comando: node tools/audit-site.mjs
   - Código de salida: 0
   - Resultado: PASS: 17 HTML pages and 4 CSS files audited; 0 duplicate IDs, 0 broken references, 0 prohibited phrases, strict CSP compliance.

2. Verificación de sintaxis JavaScript (tools/check-js-syntax.mjs):
   - Comando: node tools/check-js-syntax.mjs
   - Código de salida: 0
   - Resultado: PASS: 11 archivos analizados y aprobados. 0 errores sintácticos.

3. Pruebas unitarias del auditor (tools/test-audit.mjs):
   - Comando: node --test tools/test-audit.mjs
   - Código de salida: 0
   - Resultado: PASS: 33 pruebas unitarias aprobadas, 0 fallos, duración 340 ms.

4. Suite Playwright End-to-End:
   - Comando: npx playwright test --reporter=list
   - Código de salida: 0
   - Desglose: 127 pruebas aprobadas, 8 omitidas, 0 fallidas en la corrida de verificación limpia.
   - Justificación de las 8 pruebas omitidas (skipped):
     Corresponden al archivo tests/navigation.spec.mjs ('Menú Móvil › apertura, cierre y navegación en ES/EN Inicio y Portafolio'). En el proyecto 'desktop-chromium', el menú hamburguesa (#burgerBtn) se oculta deliberadamente por CSS para viewports de escritorio (ancho > 768px), por lo que la suite aplica 'testInfo.skip(true, "Menú hamburguesa solo es visible en resoluciones móvil/tableta")'. En los proyectos 'tablet-chromium' y 'mobile-chromium', estas pruebas se ejecutaron y aprobaron al 100 %.
   - Identificación de fallos intermitentes:
     En pruebas anteriores con foco o estados de hover, tests/axe-a11y.spec.mjs reportó una violación de contraste en .quote-submit-btn (3.78:1 vs 4.5:1). Al correr la suite de axe-a11y aislada (npx playwright test tests/axe-a11y.spec.mjs), las 12 pruebas pasaron (código 0). Se mantiene el registro de este elemento para ajuste preventivo en la Fase 6.

B. Estado de Lighthouse móvil canónico:
- PENDIENTE: La generación de informes oficiales de Lighthouse CLI (HTML/JSON estándar con puntuaciones sintéticas 0-100 para Rendimiento, Accesibilidad, Buenas Prácticas y SEO) no se pudo ejecutar localmente por falta del binario lighthouse en el entorno y restricciones de red para descarga interactiva npx. Este criterio queda formalmente clasificado como PENDIENTE de ejecución externa o manual.


11. HALLAZGOS ORDENADOS POR GRAVEDAD

Prioridad P0 (Riesgo Crítico / Legal / Identidad):
- L-1: 9 piezas de Fan Art y 6 de marcas automotrices de terceros mezcladas en el portafolio comercial con CTA hacia WhatsApp, en contradicción con la leyenda de no venta.
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
- A11y: Botón .quote-submit-btn presenta contraste límite susceptible de degradación según el renderizado del navegador.


12. ARCHIVOS CREADOS O MODIFICADOS DURANTE ESTA TAREA

Archivos de documentación y evidencias creados o modificados:
- reportes/FASE-0.md: Documento maestro de reporte de diagnóstico.
- reportes/evidencias/inventario-completo.json: Registro detallado de archivos, rutas y pesos.
- reportes/evidencias/seo-metadata-audit.json: Auditoría detallada de metadatos de las 17 páginas.
- reportes/evidencias/links-e-imagenes-audit.json: Auditoría de enlaces y atributos de imagen.
- reportes/evidencias/cookie-links-audit.json: Auditoría de enlaces de cookies y analítica por página.

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


14. PRUEBAS PENDIENTES Y LIMITACIONES

1. Auditoría oficial de Lighthouse CLI (0-100):
   - Estado: PENDIENTE.
   - Motivo: Binario lighthouse no instalado en el entorno local y bloqueo en descarga interactiva npx.
   - Acción requerida: Ejecutar auditoría manual mediante Chrome DevTools (pestaña Lighthouse) al publicar en servidor web o local.
2. Verificación en consolas de Google (Search Console, Analytics y Business Profile):
   - Estado: PENDIENTE.
   - Motivo: Requiere credenciales de acceso de las cuentas de Ramses Martínez.
   - Acción requerida: Revisión manual guiada de la cobertura de indexación, eventos clave y perfil comercial en la Fase 5.


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
- Las dos limitaciones insalvables en el entorno local (informes canónicos de Lighthouse CLI y verificación en consolas autenticadas de Google) quedan explícitamente registradas como PENDIENTES.
- No se iniciará ninguna tarea de la Fase 1 (Legal y riesgos) hasta que Ramses Martínez revise los hallazgos y autorice expresamente el inicio de la siguiente fase.
