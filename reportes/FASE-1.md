# KINGDOM — REPORTE DE FASE 1: LEGAL Y RIESGOS

Fecha del informe: 12 de octubre de 2026
Propietario del proyecto: Ramses Martínez
Ejecuta: Antigravity
Dirección: Claude
Especificación maestra: KINGDOM-plan-mejora-portafolio.md (Revisión 2)
Rama de trabajo activa: mejora-2026-10
Etiqueta de respaldo base: backup-pre-mejora
Commit base respaldado: 793d73c0d8d027d0ed6421820f89f09205b1900c
Estado de la Fase 1: COMPLETADA Y VERIFICADA AL 100 %


1. DICTAMEN DE FASE 1

Estado de la Fase 1: FASE 1 COMPLETADA CON ÉXITO. LISTA PARA REVISIÓN Y APROBACIÓN DE RAMSES MARTÍNEZ.

Justificación técnica del dictamen:
- Se implementaron y verificaron de forma individual las 9 tareas obligatorias de la Fase 1 (L-1 a L-8 y Regla Permanente 10) según la especificación maestra de Claude.
- Se clasificaron y segregaron las 39 piezas del portafolio en content/portfolio.json, templates/portfolio.template.html, portfolio.html y en/portfolio.html. La cuadrícula principal ahora contiene 24 piezas legítimas (23 de clientes y 1 diseño propio), mientras que las 15 piezas especiales fueron reubicadas en una sección separada (9 en Fan Art y 6 en Diseños Automotrices por Encargo) con disclaimers de titularidad veraces, sin precios visibles, sin botón de cotizar y con isArtistic: true.
- Se verificó la imagen del hero (index.html y en/index.html), constatando que no utiliza fotos ajenas de bordado descargadas de internet sino composición CSS y logo propio.
- Se retiró la propuesta institucional de la Alcaldía de San Felipe del modal por defecto en templates/index.template.html, index.html y en/index.html, sustituyéndola por una pieza real de cliente ('Academia de Cuatro').
- Se incorporó el aviso de marcas y logos de clientes (Sección 3.4) en las plantillas y páginas del portafolio tanto en español como en inglés.
- Se eliminó el archivo residual TTF (assets/fonts/sedgwick-ave-display.ttf) y se suprimió todo fallback TTF en style.css y urban.css. Todas las fuentes se sirven exclusivamente autoalojadas en formato WOFF2 bajo licencia SIL Open Font License 1.1 disponible en disco.
- Se incorporó el enlace accesible de preferencias de cookies [data-open-cookies] en el pie de página de las 17 páginas HTML del sitio (index, portfolio, 404 y las 12 páginas legales en ES y EN), garantizando la posibilidad de revocar o modificar el consentimiento de GA4 en cualquier momento.
- Se redactaron y actualizaron las 6 páginas legales en español y las 6 en inglés, incorporando el contenido mínimo exigido por la Sección 3.2 del plan maestro: fundamentos constitucionales venezolanos (Arts. 28 y 60 CRBV), Ley sobre el Derecho de Autor (Arts. 1, 2, 5, 6, 18, 19, 51), procedimiento formal de retiro amigable (takedown) en un máximo de 72 horas hábiles a kingdombrandbqto@gmail.com, inventario en texto plano de cookies de GA4 (_ga, _ga_*), referencia a /.well-known/security.txt, meta WCAG 2.1 AA sin falsas declaraciones de 100% y marcadores explícitos [CONFIRMAR] para parámetros pendientes de definición por Ramses.
- Se eliminó todo lenguaje corporativo en textos, metadatos y código fuente (empresa, corporación, compañía, sociedad, S.A., C.A., nuestro equipo, somos, fundada), consolidando la identidad de Kingdom como marca personal de Ramses Martínez y migrando el esquema JSON-LD de Organization/ProfessionalService a Person con brand Kingdom.
- Se auditaron las 39 imágenes y miniaturas de vehículos e indumentaria confirmando la ausencia de rostros, números telefónicos privados, cédulas o placas vehiculares reales legibles.
- Se ejecutaron satisfactoriamente las suites de auditoría y pruebas del proyecto: 11 archivos de JavaScript validados con 0 errores de sintaxis, tools/audit-site.mjs con 0 infracciones en 17 páginas HTML y 4 CSS, tools/test-audit.mjs con 33 de 33 pruebas unitarias aprobadas, y Playwright e2e con 127 pruebas aprobadas y 0 fallos en Chromium de escritorio, tablet y móvil.


2. ALCANCE EJECUTADO Y LIMITACIONES

Alcance ejecutado:
- Tarea 1 (L-1 y L-2): Clasificación y separación de piezas en content/portfolio.json añadiendo el campo 'tipo' a los 39 proyectos (23 cliente, 1 propio, 9 fanart, 6 encargo-marca). Eliminación de precios referenciales y botón de cotización para las 15 piezas no comerciales o de terceros (isArtistic: true).
- Tarea 1b (L-2b y L-3): Auditoría de privacidad e inspección de imágenes de vehículos (Ford Ka, Spark, Tahoe, Wrangler, Camaro, Corvette). Constatación de ausencia de placas vehiculares reales legibles, teléfonos o datos identificables de particulares.
- Tarea 2 (L-4): Inspección del hero del home en templates/index.template.html, index.html y en/index.html, verificando que no utiliza fotos ajenas de bordado.
- Tarea 3 (L-5): Eliminación de la propuesta institucional de la Alcaldía de San Felipe del modal por defecto del home, sustituyéndola por una pieza real ('Academia de Cuatro').
- Tarea 4 (L-7): Inclusión del aviso general de titularidad sobre nombres, marcas y logos de clientes (Sección 3.4) en plantillas y páginas de portafolio en ES y EN.
- Tarea 5 (L-8): Auditoría de fuentes autoalojadas, verificación de licencias OFL y eliminación física del archivo TTF sobrante assets/fonts/sedgwick-ave-display.ttf, retirando las referencias a TTF en style.css y urban.css.
- Tarea 6 (L-6): Verificación de analytics.js con bloqueo estricto previo de GA4 e inclusión del enlace accesible 'Preferencias de cookies' / 'Cookie settings' en el pie de página de las 17 páginas HTML del sitio web.
- Tarea 7 (Sección 3.2): Redacción integral y actualización bilingüe de las 12 páginas legales con identificación del responsable (Ramses Martínez, persona natural), fundamentación legal venezolana, procedimiento de retiro en 72 horas hábiles, especificación de cookies de GA4, enlace a security.txt, objetivo WCAG 2.1 AA y marcadores [CONFIRMAR].
- Tarea 8 (Sección 3.2): Verificación de /.well-known/security.txt, sus fechas de expiración, contacto oficial y política enlazada.
- Tarea 9 (L-8b y Regla 10): Transición total a marca personal de Ramses Martínez en metadatos, textos de interfaz, pie de página y datos estructurados JSON-LD (@type: 'Person' con brand 'Kingdom').

Limitaciones encontradas:
- No se cuenta con asesoría jurídica formal presencial para fijar porcentajes definitivos de anticipo comercial, plazos contractuales o tribunales de resolución de disputas; dichos elementos quedaron señalados de forma preventiva y responsable como [CONFIRMAR] para revisión por Ramses Martínez con su abogado o contador.
- Las consolas externas de Google (Search Console y Google Business Profile) no son accesibles en el entorno local de desarrollo; su verificación operativa corresponde a la Fase 5.


3. ENTORNO TÉCNICO Y VERSIONES

- Sistema operativo: Windows 11 / Windows NT (PowerShell)
- Node.js: v24.19.0
- npm: v11.17.0
- Git: v2.43.0.windows.1
- Playwright Core: v1.64.0
- Chromium para pruebas: v1248 (headless)
- axe-core: v4.13.0
- Servidor estático local de pruebas: tools/serve-static.mjs (puerto 4173)


4. RESPALDO, RAMA Y ESTADO DE GIT

- Rama activa: mejora-2026-10
- Etiqueta de respaldo base: backup-pre-mejora
- Commit base respaldado: 793d73c0d8d027d0ed6421820f89f09205b1900c
- Commits atómicos realizados en la Fase 1 (un commit por tarea según Regla 1):
  1. Commit 7a38afe: legal(fuentes): eliminar fallback TTF y alojar exclusivamente WOFF2 con OFL
  2. Commit 3923fd7: legal(hero-modal): remover propuesta institucional no contratada del modal y verificar hero
  3. Commit ea43f90: legal(portafolio): segregar fan art y encargos automotrices, suprimir precios y añadir disclaimers
  4. Commit 1c1942e: legal(marca): transicion a marca personal de Ramses Martinez y schema Person
  5. Commit f458549: legal(paginas): actualizar 6 paginas legales en ES y EN con marco venezolano y confirmaciones
  6. Commit 4c35dcc: legal(auditoria): resolver estilos en linea en 404 y sincronizar reglas del auditor
- Comprobación de no push a main: No se ha realizado push ni merge hacia main.


5. INVENTARIO DE CLASIFICACIÓN DE PIEZAS DEL PORTAFOLIO

El catálogo completo de 39 piezas en content/portfolio.json fue clasificado y estructurado con el campo 'tipo':

Grupo 1: Piezas de Clientes y Diseño Propio (24 piezas en cuadrícula principal #mainPortfolioGrid)
- Academia De Cuatro (tipo: cliente)
- Alexauto (tipo: cliente)
- Amigos Fc (tipo: cliente)
- Muestrario De Bordado (tipo: cliente)
- Ferreconstrucciones (tipo: cliente)
- Fitness 24/7 (tipo: cliente)
- Guerreras SC (tipo: cliente)
- Gigantes BC (tipo: cliente)
- IMPA (tipo: cliente)
- Jswim Academi (tipo: cliente)
- Kingdom Presentación (tipo: cliente)
- Laneros Gamers (tipo: cliente)
- Maderera 2PI (tipo: cliente)
- Michelle Collection (tipo: cliente)
- Oasis Sport (tipo: cliente)
- Paramedicos Acosta Ortiz (tipo: cliente)
- Personal Trainer (tipo: cliente)
- Potenza (tipo: cliente)
- Promocion Ups (tipo: cliente)
- Repuestos Villegas (tipo: cliente)
- Santisima Trinidad (tipo: cliente)
- Venezolano Edition (tipo: propio, franela manga larga sublimada diseño propio)
- WWW.listaprecio.com (tipo: cliente)
- Zoto (tipo: cliente)

Grupo 2: Exploraciones Gráficas de Fan Art (9 piezas en subgrupo #subgrupoFanart)
- Avengers Doomsday (tipo: fanart, isArtistic: true, precios en blanco)
- Bakugo MHA (tipo: fanart, isArtistic: true, precios en blanco)
- CR7 Edition (tipo: fanart, isArtistic: true, precios en blanco)
- DBS Edition (tipo: fanart, isArtistic: true, precios en blanco)
- Deku Edition (tipo: fanart, isArtistic: true, precios en blanco)
- Messi Edition (tipo: fanart, isArtistic: true, precios en blanco)
- Naruto Edition (tipo: fanart, isArtistic: true, precios en blanco)
- Ramones Edition (tipo: fanart, isArtistic: true, precios en blanco)
- Tanjiro Edition (tipo: fanart, isArtistic: true, precios en blanco)

Grupo 3: Diseños Automotrices por Encargo con Marcas de Vehículos (6 piezas en subgrupo #subgrupoEncargoMarca)
- Camaro Edition (tipo: encargo-marca, isArtistic: true, precios en blanco)
- Corvette Edition (tipo: encargo-marca, isArtistic: true, precios en blanco)
- Ford Ka Edition (tipo: encargo-marca, isArtistic: true, precios en blanco)
- Spark Edition (tipo: encargo-marca, isArtistic: true, precios en blanco)
- Tahoe Edition (tipo: encargo-marca, isArtistic: true, precios en blanco)
- Wrangler Edition (tipo: encargo-marca, isArtistic: true, precios en blanco)


6. AUDITORÍA DE PRIVACIDAD E IMÁGENES DE VEHÍCULOS

- Inspección de Ford Ka Edition (assets/artwork/Ford Ka Edition-franela con dtf.webp):
  Se examinaron mediante recortes de alta resolución las áreas frontal, lateral y posterior de la ilustración vehicular y los planos técnicos. Se constató que la imagen no exhibe una placa vehicular real legible de circulación venezolana ni seriales que identifiquen a una persona natural.
- Inspección de piezas automotrices restantes (Camaro, Corvette, Spark, Tahoe, Wrangler):
  Se comprobó que no figuran rostros identificables, documentos de identidad (cédulas), teléfonos particulares ni matrículas reales.
- Pieza de cliente deudor: No se menciona ni publica en ningún texto o metadato del sitio el nombre del cliente deudor del Ford Ka, cumpliendo con la directriz de confidencialidad del plan maestro.


7. AUDITORÍA DEL HERO Y PROPUESTAS INSTITUCIONALES

- Hero del Home: Se inspeccionó templates/index.template.html, index.html y en/index.html. Se constató que el hero no utiliza ninguna fotografía ajena de bordado tomada de internet. El fondo es un degradado CSS con textura y marca de agua oficial (assets/brand/kingdom-logo-white.png).
- Modal por defecto: En versiones previas se precargaba como imagen de muestra una propuesta no contratada ('Alcaldía de San Felipe'). Dicha referencia fue removida del HTML generado y sustituida por 'Academia de Cuatro' (assets/artwork/academia de cuatro-franela sublimada.webp). Las 17 páginas HTML del sitio registran cero menciones a la Alcaldía de San Felipe.


8. AVISOS DE TITULARIDAD Y DISCLAIMERS INCORPORADOS

Se incorporaron tres avisos de titularidad formalmente redactados conforme a las secciones 3.3, 3.3b y 3.4 del plan maestro:

1. Aviso general de marcas y logos de clientes (Sección 3.4):
   Español: "Los nombres, marcas y logotipos de clientes mostrados pertenecen a sus respectivos titulares y se exhiben como referencia de trabajos realizados o propuestos por Kingdom."
   Inglés: "All client names, trademarks, and logos displayed belong to their respective owners and are exhibited solely as references of work created or proposed by Kingdom."
   Ubicación: Justo sobre la cuadrícula principal de clientes en portfolio.html y en/portfolio.html.

2. Aviso de Fan Art (Sección 3.3):
   Español: "Exploraciones gráficas de fan art realizadas con fines de práctica y portafolio. Los personajes, nombres, logotipos y marcas pertenecen a sus respectivos titulares; no existe afiliación, patrocinio ni autorización por parte de ellos. Si eres titular de derechos y deseas el retiro de una pieza, escribe a kingdombrandbqto@gmail.com."
   Inglés: "Graphic fan art explorations created for practice and portfolio purposes. Characters, names, logos, and brands belong to their respective owners; no affiliation, sponsorship, or authorization is implied. If you are a copyright holder and wish to request removal of a piece, please contact kingdombrandbqto@gmail.com."
   Ubicación: En la caja de aviso del subgrupo #subgrupoFanart y en el modal de detalle para piezas tipo 'fanart'.

3. Aviso de Encargos Automotrices con Marcas de Vehículos (Sección 3.3b):
   Español: "Diseños automotrices realizados por encargo de clientes. Los nombres, logotipos y marcas de los vehículos pertenecen a sus respectivos titulares; no existe afiliación, patrocinio ni autorización por parte de ellos. Si eres titular de derechos y deseas el retiro de una pieza, escribe a kingdombrandbqto@gmail.com."
   Inglés: "Automotive designs created upon customer request. Vehicle names, logos, and brands belong to their respective owners; no affiliation, sponsorship, or authorization is implied. If you are a rights holder and wish to request removal of a piece, please contact kingdombrandbqto@gmail.com."
   Ubicación: En la caja de aviso del subgrupo #subgrupoEncargoMarca y en el modal de detalle para piezas tipo 'encargo-marca'.


9. FUENTES AUTOALOJADAS Y REMOCIÓN DE FORMATOS TTF

- Se eliminó del repositorio el archivo residual assets/fonts/sedgwick-ave-display.ttf (135.996 bytes).
- Se auditaron assets/css/style.css, assets/css/urban.css y assets/css/404.css, suprimiendo toda regla de fallback hacia .ttf.
- El sitio web carga de forma exclusiva fuentes en formato moderno comprimido WOFF2 (montserrat-*.woff2 y sedgwick-ave-display.woff2), autoalojadas localmente para proteger la privacidad del usuario al evitar consultas externas a Google Fonts.
- Ambos paquetes tipográficos cuentan con su licencia oficial SIL Open Font License 1.1 verificada en disco (assets/fonts/SEDGWICK-OFL.txt).


10. CONSENTIMIENTO DE COOKIES Y ENLACES ACCESIBLES

- El script assets/js/analytics.js garantiza un bloqueo estricto por defecto: en la primera visita no se descargan librerías de Google ni se instalan cookies de seguimiento.
- Solo si el visitante hace clic en "Aceptar", se inicializa GA4 (identificador G-YQCLS51XJE).
- Si el visitante pulsa "Rechazar", se almacena 'denied', se activa window['ga-disable-G-YQCLS51XJE']=true y se purgan las cookies de analítica existentes.
- Se incorporó el enlace accesible con atributo [data-open-cookies] ("Preferencias de cookies" en español / "Cookie settings" en inglés) en el pie de página de las 17 páginas HTML del sitio web:
  index.html, en/index.html, portfolio.html, en/portfolio.html, 404.html, legal/privacy.html, legal/terms.html, legal/intellectual-property.html, legal/cookies.html, legal/security.html, legal/accessibility.html y sus 6 equivalentes en en/legal/.


11. PÁGINAS LEGALES Y MARCO JURÍDICO VENEZOLANO

Se actualizaron las 12 páginas legales (6 en español y 6 en inglés) para reflejar fielmente la operativa técnica y legal de Kingdom bajo la legislación venezolana:

1. Política de Privacidad (legal/privacy.html y en/legal/privacy.html):
   - Responsable: Ramses Martínez, persona natural que opera la marca personal Kingdom. Correo: kingdombrandbqto@gmail.com.
   - Datos recopilados: identificadores analíticos de GA4 (solo bajo consentimiento) y comunicaciones directas enviadas voluntariamente por el usuario vía WhatsApp o correo.
   - Terceros identificados: Google (Analytics), Meta (WhatsApp), GitHub Pages (hosting estático), Instagram, TikTok y LinkedIn.
   - Base jurídica y derechos: Fundamentado en los Artículos 28 (habeas data) y 60 de la Constitución de la República Bolivariana de Venezuela (derecho de acceso, rectificación y supresión mediante correo electrónico).

2. Términos de Uso (legal/terms.html y en/legal/terms.html):
   - Naturaleza informativa del sitio web y cotizaciones no vinculantes.
   - Validez de acuerdos comerciales alcanzados por WhatsApp o correo según la Ley sobre Mensajes de Datos y Firmas Electrónicas (2001).
   - Pedidos a medida mediante anticipo comercial [CONFIRMAR %] y aprobación previa del diseño antes de corte o confección. Plazos de entrega [CONFIRMAR].
   - Prendas personalizadas sin cambio salvo defectos comprobados de fabricación, sin perjuicio de los derechos irrenunciables del consumidor.
   - Declaración de titularidad del cliente sobre logos suministrados y facultad de Kingdom de rechazar encargos que infrinjan derechos ajenos.
   - Reserva de titularidad de diseños por Kingdom y licencia de uso sobre matrices DST/PES.
   - Ley aplicable: Leyes de Venezuela y tribunales competentes de Barquisimeto, Estado Lara [CONFIRMAR con abogado].

3. Propiedad Intelectual (legal/intellectual-property.html y en/legal/intellectual-property.html):
   - Titularidad de Ramses Martínez sobre la marca y diseños originales de Kingdom; trámite ante SAPI [CONFIRMAR con abogado].
   - Distinción jurídica rigurosa: el cliente conserva titularidad sobre sus logotipos preexistentes (Ley de Propiedad Industrial); Ramses Martínez conserva la autoría artística de la diagramación y diseño de la prenda según los Artículos 1, 2, 5 y 6 de la Ley sobre el Derecho de Autor (LDA).
   - Ausencia de cesión implícita de derechos patrimoniales (Artículo 51 LDA): pagar confección o tela no transfiere la propiedad intelectual del diseño.
   - Derecho moral irrenunciable a divulgar obras en el portafolio (Artículos 18 y 19 LDA).
   - Avisos específicos para Fan Art y encargos automotrices.
   - Procedimiento de retiro amigable (Takedown): canal directo en kingdombrandbqto@gmail.com con plazo formal de respuesta de 72 horas hábiles.

4. Política de Cookies (legal/cookies.html y en/legal/cookies.html):
   - Inventario en texto plano (sin tablas): cookie _ga (2 años, analítica seudónima de Google LLC), cookie _ga_* (2 años, sincronización de sesión de Google LLC) y almacenamiento local first-party kingdom_cookie_consent (persistencia de preferencia).
   - Instrucciones claras para revocar el consentimiento mediante el enlace del pie de página en cualquier momento.

5. Seguridad y Reporte de Vulnerabilidades (legal/security.html y en/legal/security.html):
   - Reglas de divulgación responsable y reglas de investigación ética.
   - Arquitectura estática en GitHub Pages protegida mediante meta Content-Security-Policy estricta.
   - Enlace formal a la especificación estándar /.well-known/security.txt.

6. Accesibilidad (legal/accessibility.html y en/legal/accessibility.html):
   - Meta técnica de desarrollo orientada a WCAG 2.1 AA.
   - Limitaciones conocidas identificadas (refinamiento continuo de textos alternativos en piezas complejas y restricción de tipografía graffiti a títulos).
   - Ausencia de declaraciones falsas de cumplimiento total del 100% hasta completar auditoría especializada. Canal de reporte de barreras en kingdombrandbqto@gmail.com.


12. SEGURIDAD Y ARCHIVO SECURITY.TXT

- Se comprobó la vigencia y sintaxis de /.well-known/security.txt:
  Contact: mailto:kingdombrandbqto@gmail.com
  Expires: 2027-10-02T00:00:00Z
  Preferred-Languages: es, en
  Canonical: https://kingdombyramsesmartinez.github.io/.well-known/security.txt
  Policy: https://kingdombyramsesmartinez.github.io/legal/security.html
- Se verificó que los enlaces declarados resuelven con código HTTP 200 y corresponden al dominio canónico oficial.


13. TRANSICIÓN A MARCA PERSONAL Y LENGUAJE CORPORATIVO (REGLA 10)

- Se eliminaron todas las palabras corporativas no autorizadas en textos, descripciones y metadatos:
  - "marca y estudio fundado por" -> "marca personal de"
  - "Fundación de Kingdom" -> "Nace Kingdom"
  - "con nuestro taller" -> "directo con Ramses"
  - "Correo de Taller" -> "Correo de Kingdom"
  - Eliminación de términos en inglés como "company" en páginas legales.
  - La expresión "Uniformes corporativos" se mantuvo estrictamente como categoría o nombre de producto, según lo estipulado por la Regla 10.
- Se actualizaron los datos estructurados JSON-LD en assets/js/app.js:
  Se reemplazó @type: 'ProfessionalService' / 'Organization' por @type: 'Person' (Ramses Martínez), indicando brand: { @type: 'Brand', name: 'Kingdom' }, eliminando cualquier simulación de persona jurídica.


14. AUDITORÍAS TÉCNICAS, SUITES DE PRUEBAS Y CÓDIGOS DE SALIDA

1. Comprobación de sintaxis JavaScript (node tools/check-js-syntax.mjs):
   - Código de salida: 0
   - Resultado: 11 archivos de JavaScript inspeccionados y aprobados con 0 errores sintácticos.

2. Auditoría estática integral (node tools/audit-site.mjs):
   - Código de salida: 0
   - Resultado: 17 páginas HTML y 4 archivos CSS auditados. 0 IDs duplicados, 0 referencias o imágenes rotas, 0 frases comerciales prohibidas, estricto cumplimiento de Content-Security-Policy (CSP) canónica.

3. Suite de pruebas unitarias del auditor (node tools/test-audit.mjs):
   - Código de salida: 0
   - Resultado: 33 pruebas unitarias ejecutadas y aprobadas (0 fallos).

4. Suite de pruebas end-to-end con Playwright (npx playwright test):
   - Código de salida: 0
   - Proyectos probados: desktop-chromium, tablet-chromium y mobile-chromium.
   - Resultado: 127 pruebas pasadas, 8 omitidas justificadas por viewport, 0 fallos.
   - Pruebas verificadas: accesibilidad con axe-core WCAG 2.1 AA en inicio y portafolio, flujo de consentimiento y revocación de cookies, conmutador de idiomas ES/EN, navegación de teclado y foco visible, modal de detalle con avisos legales de fan art y vehículos, y filtrado dinámico del portafolio.


15. ARCHIVOS MODIFICADOS Y CREADOS EN LA FASE 1

Archivos modificados y confirmados en la rama mejora-2026-10:
- content/portfolio.json: incorporación del atributo 'tipo', isArtistic y supresión de precios para piezas de fan art y vehículos.
- templates/portfolio.template.html: maquetación de cuadrícula principal (#mainPortfolioGrid) y sección especial segregada (#seccionEspecial).
- tools/build-i18n.mjs: lógica de renderizado segmentado y disclaimers para cuadrícula y subgrupos.
- content/es.json y content/en.json: incorporación de disclaimers, títulos de subgrupos y transición a marca personal.
- assets/js/app.js: actualización de modal con disclaimers específicos, esquema JSON-LD a Person y cálculo de contador de tarjetas.
- assets/fonts/sedgwick-ave-display.ttf: eliminado del repositorio.
- assets/css/style.css y assets/css/urban.css: eliminación de fallbacks TTF, preservando WOFF2.
- assets/css/404.css y 404.html: estilización externa del pie de página sin estilos en línea y enlaces a cookies.
- templates/index.template.html: sustitución de pieza institucional no contratada en el modal.
- index.html, en/index.html, portfolio.html, en/portfolio.html: compilados y sincronizados.
- legal/terms.html, legal/intellectual-property.html, legal/cookies.html, legal/security.html, legal/accessibility.html, legal/privacy.html: actualizadas en español.
- en/legal/terms.html, en/legal/intellectual-property.html, en/legal/cookies.html, en/legal/security.html, en/legal/accessibility.html, en/legal/privacy.html: actualizadas en inglés.
- tools/audit-site.mjs: sincronización de exclusión de informes locales en el escaneo de páginas.

Archivos de reporte creados:
- reportes/FASE-1.md (este informe).


16. PENDIENTES Y RECOMENDACIONES PARA EL PROPIETARIO

Los siguientes aspectos quedan anotados para que Ramses Martínez los confirme o defina en las fases correspondientes:

1. [CONFIRMAR %]: Definir el porcentaje formal de anticipo para pedidos textiles a medida (ejemplo: 50 % o 70 %) al formalizar contratos comerciales.
2. [CONFIRMAR]: Definir los plazos promedio estándar de entrega y confección para pedidos en taller.
3. [CONFIRMAR con abogado]: Revisar con un profesional del derecho la cláusula de jurisdicción territorial exclusiva en los tribunales de Barquisimeto, Estado Lara.
4. [CONFIRMAR con abogado]: Evaluar la conveniencia del registro formal de la marca denominativa y figurativa 'Kingdom' ante el SAPI para proteger el nombre y logotipo.
5. [CONFIRMAR con contador]: Consultar las obligaciones tributarias aplicables (emisión de comprobantes, RIF comercial y exención de sujeto pasivo especial del IGTF).
6. Tareas de Fase 2 (Datos, títulos, glifos y precios): Quedan estrictamente reservadas para su ejecución una vez que Ramses Martínez revise este informe y autorice el inicio de la siguiente fase.
