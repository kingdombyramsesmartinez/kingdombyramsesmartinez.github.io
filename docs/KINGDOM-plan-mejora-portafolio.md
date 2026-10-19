# KINGDOM — Plan de mejora del portafolio web

**Sitio:** https://kingdombyramsesmartinez.github.io/
**Fecha:** 12 de octubre de 2026
**Propietario:** Ramses Martínez · **Ejecuta:** Antigravity · **Dirige:** Claude
**Revisión 2:** fan art por encargo, operación informal sin registro mercantil, fuentes confirmadas y precios nuevos.

> **Aviso:** este documento no es asesoría legal ni contable. La parte legal resume el marco venezolano y marca riesgos; antes de publicar las páginas legales, que las revise un abogado y, para lo fiscal, un contador.

## 0. Alcance de esta revisión

Revisé el HTML, los metadatos y el texto del home y de `portfolio.html`. **No vi** el CSS, el JavaScript, el aspecto visual, la velocidad en móvil ni los errores de Google Search Console, Analytics y Business Profile. Lo que dependa de eso está marcado "por verificar" y la Fase 0 lo comprueba.

En lo legal separo dos niveles:
- **Verificado en fuentes el 12/10/2026:** no existe una ley integral de protección de datos en Venezuela; la protección se apoya en los arts. 28 (habeas data) y 60 de la Constitución. El IVA general es 16 %. El IGTF de 3 % aplica a pagos en divisas en efectivo cuando el cobrador es sujeto pasivo especial (Providencia SNAT/2022/000013).
- **Conocimiento general, por confirmar con abogado:** Ley sobre el Derecho de Autor (1993), Ley de Propiedad Industrial (1955), Ley sobre Mensajes de Datos y Firmas Electrónicas (2001), Ley Especial contra los Delitos Informáticos (2001), normas de precios y protección al consumidor.

## 1. Hallazgos (solo lo malo)

### Legales / riesgo
| ID | Hallazgo | Prioridad |
|---|---|---|
| L-1 | Unas 15 de 39 piezas muestran personajes o marcas de terceros (Marvel, anime, Dragon Ball, Messi/CR7, Ramones, Camaro, Corvette, Ford Ka, Tahoe, Wrangler, Spark) mezcladas con trabajo de clientes en "Todos". El aviso dice que **no se ofrecen a la venta ni por encargo**, pero cada ficha tiene "Contactar → cotizar algo similar" y Dragon Ball, Bakugo y Camaro se venden bajo pedido. Esa contradicción es una declaración falsa en el sitio y un riesgo de reclamo por derecho de autor y marca. | P0 |
| L-2 | Foto de la bordadora del hero descargada de internet (no es propia). Por verificar si sigue publicada. | P0 |
| L-3 | La imagen precargada del modal es "Alcaldía de San Felipe – chaqueta sublimada": propuesta no concretada y con insignias de un ente público. Se ve como trabajo entregado. | P0 |
| L-4 | Logos de clientes mostrados sin constancia de autorización ni aviso de titularidad. | P1 |
| L-5 | Fuentes confirmadas: Sedgwick Ave Display y Montserrat (ambas OFL, uso comercial permitido). Falta comprobar que no queden archivos ni referencias de otras fuentes (Graffiti City, Aerosoldier "PERSONAL USE ONLY") y que se autoalojen con su licencia. | P0 |
| L-6 | "Preferencias de cookies" aparece en el footer del portafolio pero no en el del home. Si hay Analytics, el consentimiento debe ser accesible desde todas las páginas. | P0 |
| L-7 | Seis páginas legales existen, pero no he verificado que describan lo que el sitio realmente hace (Analytics, WhatsApp, Drive, Instagram). | P0 |
| L-8 | El CV público suele traer cédula, dirección y teléfono; riesgo de fraude y suplantación. | P1 |
| L-9 | El sitio usa lenguaje de empresa ("marca y estudio fundado por", "Fundación de Kingdom", "nuestro taller", "Correo de Taller") aunque operas como persona natural sin registro mercantil. | P0 |
| L-10 | "Ford Ka Edition" muestra la placa de un vehículo de una persona identificable; puede haber más imágenes con placas, caras, teléfonos o datos de terceros. | P0 |

### Contenido y conversión
| ID | Hallazgo | Prioridad |
|---|---|---|
| C-1 | El servicio principal (bordado/digitalización) casi no se muestra: no hay filtro de Bordado y solo 2 piezas bordadas. No hay fotos de bordado terminado ni simulaciones de matriz. | P1 |
| C-2 | Las 39 descripciones son la misma plantilla. Títulos con errores: "Chaqueta Bordadax", "7 Chaqueta Sublimada", "Jswim Academi", "Gerreras SC", "Santisima", "Paramedicos", "Promocion Ups", "WWW.listaprecio.com". | P1 |
| C-3 | Solo una pieza muestra precio. No hay tabla de precios. | P1 |
| C-4 | Sin prueba social en el sitio. | P1 |
| C-5 | Sin sección "Contrátame" ni CV. Todo apunta a "Cotizar proyecto". | P1 |
| C-6 | Cotizador con selects planos, 4 opciones que no coinciden con las 3 tarjetas de servicios y sin estimado de precio. | P1 |
| C-7 | El home no muestra trabajos; solo un botón hacia otra página. | P1 |
| C-8 | El home dice "41 presentaciones"; conté 39 tarjetas. | P2 |
| C-9 | Falta proceso, qué debe enviar el cliente, tiempos y cómo se paga desde el exterior (FAQ). | P1 |
| C-10 | Catálogo en Drive (enlace externo poco profesional). | P3 |

### Técnico / SEO
| ID | Hallazgo | Prioridad |
|---|---|---|
| T-1 | Imágenes con espacios, mayúsculas y typos en el nombre (`alcaldia de san felipe-chaqueta sublimada.webp`, `Gerreras SC-…`). | P2 |
| T-2 | El `alt` es la misma plantilla en todas. | P2 |
| T-3 | URL `/portfolio.html`: mezcla inglés/español y no es limpia. | P2 |
| T-4 | Por verificar: `sitemap.xml`, `robots.txt`, `hreflang`, datos estructurados (JSON-LD), 404 propio. En los metadatos vi `og:locale:alternate` pero no etiquetas `hreflang`. | P0 |
| T-5 | Errores en Search Console, Analytics y Business Profile (reportados por ti, no visibles para mí). | P0 |
| T-6 | 39 tarjetas en una sola página y los efectos pedidos (vidrio áspero, fondo de ladrillo) pesan en móviles de gama baja si no se optimizan. | P2 |

## 2. Prioridades y orden de ejecución

| Orden | Fase | Qué resuelve | Prioridad |
|---|---|---|---|
| 1 | F0 Respaldo y diagnóstico | Ver el estado real y los errores de Google | P0 |
| 2 | F1 Legal y riesgos | L-1 a L-8 | P0 |
| 3 | F5 SEO técnico y Google | T-4, T-5, T-3 | P0 |
| 4 | F2 Datos, títulos, glifos, precios | C-2, C-3, C-8, T-1, T-2 | P1 |
| 5 | F3 Cotizador, servicios y home | C-6, C-7, C-9 | P1 |
| 6 | F4 Contrátame, CV y clientes | C-4, C-5, C-1 | P1 |
| 7 | F6 Rendimiento y accesibilidad | T-6 | P2 |
| 8 | F7 QA final | Todo | P0 |

**Nota sobre Figma:** F0, F1 y F5 no dependen del diseño visual; hazlas ya. F2 a F4 tocan el layout: si vas a rediseñar el landing en Figma, impleméntalo antes de F3 y F4, o dile a Antigravity que respete ese diseño.

## 3. Legal bajo leyes de Venezuela

### 3.1 Qué aplica y qué hacer

| Tema | Marco (resumen) | Acción en el sitio |
|---|---|---|
| Fan art / marcas | Derecho de autor (Ley sobre el Derecho de Autor, 1993) y marcas (Ley de Propiedad Industrial, 1955). Usar personajes y marcas ajenas en productos a la venta sin licencia puede dar lugar a reclamos. Un reclamo ante Google también puede sacar páginas del buscador. | Separar el fan art, sin precios ni CTA, con aviso veraz. **Decisión A** (sección 10) sobre la venta física. |
| Imagen de personas | Constitución art. 60 (honor, vida privada, propia imagen). | Nombres/imagen de deportistas solo como fan art no comercial; quitar si hay reclamo. |
| Insignias de entes públicos | Los símbolos oficiales tienen regulación propia. | Quitar la propuesta de la Alcaldía o dejarla con diseño genérico sin escudo. |
| Logos de clientes | Pertenecen al cliente. | Aviso general de titularidad + pedir autorización por escrito (basta un WhatsApp guardado) o mostrar sin logo. |
| Datos personales | No hay ley integral; rigen los arts. 28 y 60 de la Constitución (habeas data) y la jurisprudencia. Si el sitio recibe visitas de la UE, Google exige consentimiento para Analytics. | Política de privacidad veraz, banner de cookies con aceptar/rechazar y derechos de acceso, rectificación y supresión por correo. |
| Contratos y mensajes por internet | Ley sobre Mensajes de Datos y Firmas Electrónicas (2001): los mensajes de datos tienen valor probatorio. | Los términos deben decir que el acuerdo por WhatsApp/correo es válido y qué se pacta (anticipo, aprobación de diseño, entrega). |
| Consumidor | Normas de precios y protección al consumidor (confirmar versión vigente con abogado). | Precio claro, qué incluye, sin promesas falsas (por ejemplo "algodón egipcio" solo si es cierto). Los derechos del consumidor no se pueden renunciar por cláusula. |
| Fiscal | IVA 16 % (verificado). IGTF 3 % en pagos en divisas en efectivo cuando quien cobra es sujeto pasivo especial (verificado). RIF y obligaciones municipales si cobras de forma habitual. | Mostrar precios en USD con nota de cómo se paga; consulta a tu contador si te aplica IVA/IGTF y si debes facturar. |
| Delitos informáticos | Ley Especial contra los Delitos Informáticos (2001). | Sin acción visible; es un motivo más para no publicar datos sensibles ni credenciales en el repo. |

### 3.2 Contenido mínimo de cada página legal (para Antigravity)

- **Privacidad:** responsable (Ramses Martínez, persona natural que opera la marca Kingdom; correo de contacto); qué se recoge (identificadores de Google Analytics solo con consentimiento; el mensaje de WhatsApp lo envía el visitante por su cuenta a WhatsApp/Meta); finalidades; terceros (Google, Meta/WhatsApp, GitHub Pages, Instagram, TikTok, LinkedIn); conservación; derechos (acceso, rectificación, supresión, base en el art. 28 de la Constitución) y cómo ejercerlos por correo; sin venta de datos. No afirmar nada que el sitio no haga.
- **Términos:** naturaleza informativa del sitio; cotización no vinculante; pedido a medida con anticipo `[CONFIRMAR %]`; aprobación de diseño antes de producir; plazos `[CONFIRMAR]`; prendas personalizadas sin cambio salvo defecto, **sin perjuicio de los derechos del consumidor**; el cliente declara tener derechos sobre los logos que envía y Kingdom puede rechazar encargos que infrinjan derechos de terceros (esta cláusula sirve frente a logos de clientes, pero no te blinda ante el titular de derechos si fabricas a sabiendas material de terceros); propiedad de los diseños (Kingdom conserva el diseño; si el cliente quiere producir con otro, se vende y se retira del archivo); licencia de uso de las matrices DST/PES entregadas; ley aplicable de Venezuela y tribunales de Barquisimeto `[CONFIRMAR con abogado]`.
- **Propiedad intelectual:** titularidad de Kingdom sobre sus diseños y marca; aviso de marcas y logos de terceros; **procedimiento de retiro** (correo, respuesta en 72 h hábiles).
- **Cookies:** tabla con las cookies reales que se usan (por ejemplo `_ga`, `_ga_*` de GA4), finalidad, duración, y cómo cambiar o retirar el consentimiento (enlace visible en el footer de todas las páginas).
- **Seguridad:** buenas prácticas reales; contacto para reportar fallos; archivo `/.well-known/security.txt`.
- **Accesibilidad:** meta (WCAG 2.1 AA), limitaciones conocidas y contacto. No declarar cumplimiento total sin auditoría.

### 3.3 Fan art por encargo: qué sí y qué no se puede decir

**Texto del aviso (solo afirma lo que es cierto):**

> Exploraciones gráficas de fan art realizadas con fines de práctica y portafolio. Los personajes, nombres, logotipos y marcas pertenecen a sus respectivos titulares; no existe afiliación, patrocinio ni autorización por parte de ellos. Si eres titular de derechos y deseas el retiro de una pieza, escribe a `[correo]`.

No incluyas frases como "no se ofrecen a la venta" o "no se aceptan encargos" si en la práctica sí fabricas esas piezas a pedido. Sería una afirmación falsa en tu propio sitio y empeora tu posición si alguien reclama.

**Por qué el aviso y el "la responsabilidad es del cliente" no te protegen:**
- La infracción ocurre al **reproducir y entregar** la prenda, no al publicar la imagen. Un aviso en el sitio no cambia eso.
- Un acuerdo con tu cliente solo obliga a tu cliente. El titular de derechos puede reclamarte a ti como quien fabricó y vendió, y la cláusula pierde fuerza si sabes que el diseño es de un tercero.
- Sin registro mercantil no hay sociedad que responda: **respondes tú, con tu patrimonio personal**.
- Un reclamo por derechos de autor ante Google también puede sacar tu sitio de los resultados de búsqueda, justo lo que quieres posicionar.

**Opciones reales (la decisión es tuya, Decisión A):**
1. **No fabricar** personajes ni marcas ajenas y ofrecer diseños originales de estilo similar (sin copiar personajes, nombres ni logos). Es lo más seguro.
2. **Fabricar solo si el cliente demuestra que tiene los derechos** (un club, una marca propia, una licencia).
3. **Seguir fabricando a pedido:** es un riesgo personal que asumes tú. En ese caso el sitio no debe decir lo contrario de lo que haces, no debe mostrar precio ni botón de cotizar en esas piezas, y lo prudente es consultarlo con un abogado antes.

### 3.3b Encargos de clientes con marcas de vehículos

Piezas: Camaro, Corvette, Ford Ka, Spark, Tahoe y Wrangler. Que las haya pedido un cliente no las convierte en "práctica", así que no uses el aviso de fan art tal cual. Texto veraz:

> Diseños automotrices realizados por encargo de clientes. Los nombres, logotipos y marcas de los vehículos pertenecen a sus respectivos titulares; no existe afiliación, patrocinio ni autorización por parte de ellos. Si eres titular de derechos y deseas el retiro de una pieza, escribe a `[correo]`.

- Que el cliente lo haya pedido no cambia lo explicado en 3.3 sobre la responsabilidad: sigue siendo tuya.
- Para el portafolio público lo más prudente es mostrarlas sin el nombre ni el logo de la marca en el título (por ejemplo "Diseño automotriz — Franela DTF") o no mostrarlas. Es decisión tuya. Sin precio ni botón de cotizar.
- **Ford Ka:** (1) la placa identifica a una persona (Constitución, art. 60, vida privada): difumínala o recórtala en la imagen, la miniatura y la imagen OG; (2) no publiques el nombre del cliente que no pagó; (3) guarda el chat o comprobante de entrega y de la falta de pago por si lo necesitas.
- **Regla general:** revisar todas las imágenes en busca de placas, caras, teléfonos o cédulas de terceros antes de publicar.

### 3.4 Aviso general de logos de clientes (texto propuesto)

> Los nombres, marcas y logotipos de clientes mostrados pertenecen a sus respectivos titulares y se exhiben como referencia de trabajos realizados o propuestos por Kingdom.

### 3.5 Marca personal, sin registro mercantil

Kingdom es una **marca personal** de Ramses Martínez (persona natural). El sitio no debe sugerir lo contrario.

- **Prohibido en cualquier página, metadato o dato estructurado:** empresa, corporación, compañía, sociedad, S.A., C.A., "nuestro equipo", "somos", "fundada".
- **Usar:** primera persona singular, "Kingdom by Ramses Martínez", "diseñador independiente". "Uniformes corporativos" se mantiene solo como nombre del producto.

| Texto actual | Texto nuevo |
|---|---|
| marca y estudio fundado por Ramses Martínez | marca personal de Ramses Martínez |
| Fundación de Kingdom | Nace Kingdom |
| con nuestro taller | directo con Ramses / en mi taller |
| Correo de Taller | Correo de Kingdom |
| Estudio de diseño textil en Barquisimeto (meta description) | Diseño textil y bordado industrial en Barquisimeto |
| Datos estructurados `ProfessionalService` | `Person` con `brand` Kingdom |

**Implicaciones:**
- Responsabilidad personal e ilimitada (ver 3.3).
- No hay registro de sociedad, pero "informal" no significa "sin obligaciones": si vendes de forma habitual pueden aplicar RIF y obligaciones nacionales y municipales. Pregúntaselo a un contador. Por tu situación probablemente no seas sujeto pasivo especial del IGTF `[confirmar con contador]`.
- Registrar la marca "Kingdom" ante el SAPI es opcional y protege tu nombre y logo; no requiere constituir una empresa `[confirmar con abogado]`.
- Google Business Profile admite negocios individuales de servicio; usa el nombre con el que te conocen tus clientes.

## 4. Precios oficiales del sitio

Precios en USD, **al detal** (por unidad). No se publican precios al mayor; para volumen: "consulta por WhatsApp". "Diseño incluido al producir con Kingdom" `[CONFIRMAR: es una promesa comercial]`.

| Servicio | Tela / detalle | Precio |
|---|---|---|
| Chaqueta sublimada | Novak Repel | $35 |
| Chaqueta bordada (ej. IMPA) | Novak Repel | $25 |
| Franela sublimada manga larga | Dry-Fit | $18 |
| Franela sublimada manga corta | Dry-Fit | $15 |
| Franela con DTF | Algodón 20/1 | $20 |
| Camisa de béisbol sublimada (ej. Gigantes BC) | — | $25 |
| Chemise sublimada | — | $18 |
| Camisa corporativa con 5 logos bordados | Algodón egipcio `[confirmar que es veraz]` | $35 |
| Camisa corporativa con 2 logos bordados | Algodón egipcio | $25 |
| Matriz de bordado DST/PES | Según complejidad y colores | Desde $5 |
| Diseño de tarjeta de presentación | Vectorial | $5 |
| 100 tarjetas impresas (incluye diseño) | Papel glasé 300 g | $15 |

**Reglas de visualización**
- En el sitio se muestra "Desde $X" y el precio final se confirma por WhatsApp.
- En el portafolio, el precio aparece solo al abrir la ficha, y solo en piezas ejecutadas con `precio_usd` cargado. Nunca en fan art ni en propuestas no concretadas.
- Nota al pie de la tabla: "Precios al detal, referenciales, en USD. El pago se coordina por WhatsApp `[CONFIRMAR: bolívares a tasa BCV del día / divisas / otros]`. Impuestos según corresponda."
- Camisas corporativas: la ficha muestra "$25 con 2 logos · $35 con 5 logos" en lugar de asignar un precio por pieza. Cualquier otra pieza sin precio fijo no muestra precio hasta que lo cargues en el archivo de datos.

## 5. Títulos mejorados y glifos

**Formato:** `Cliente — Prenda · Técnica`. Tipo: **C** = cliente o diseño propio, **F** = fan art, **E** = encargo de cliente con marca de tercero (F y E van en su propia sección, ver 3.3 y 3.3b).

| Actual | Nuevo título | Tipo |
|---|---|---|
| Academia De Cuatro | Academia de Cuatro — Franela sublimada | C |
| Alexauto | Alexauto — Camisa corporativa | C |
| Amigos Fc | Amigos FC — Franela manga corta sublimada | C |
| Avengers Doomsday | Avengers: Doomsday — Exploración gráfica | F |
| Bakugo MHA | Bakugo (My Hero Academia) — Exploración gráfica | F |
| Muestrario De Bordado | Muestrario de bordado — Matrices DST/PES | C |
| Camaro Edition | Camaro Edition — Diseño automotriz por encargo | E |
| Corvette Edition | Corvette Edition — Diseño automotriz por encargo | E |
| CR7 Edition | CR7 Edition — Exploración gráfica | F |
| DBS Edition | Dragon Ball Super — Exploración gráfica | F |
| Deku Edition | Deku (My Hero Academia) — Exploración gráfica | F |
| Ferreconstrucciones | Ferreconstrucciones — Franela manga larga sublimada | C |
| Fitness 24/7 | Fitness 24/7 — Chaqueta sublimada | C |
| Ford Ka Edition | Ford Ka Edition — Diseño automotriz por encargo | E |
| Guerreras SC | Guerreras SC — Franela manga corta sublimada | C |
| Gigantes BC | Gigantes BC — Camisa de béisbol sublimada | C |
| IMPA | IMPA — Chaqueta bordada | C |
| Jswim Academi | Jswim Academy — Chaqueta sublimada `[confirmar ortografía del cliente]` | C |
| Kingdom Presentación | Tarjetas de presentación — Diseño e impresión | C |
| Laneros Gamers | Laneros Gamers — Franela manga corta sublimada | C |
| Maderera 2PI | Maderera 2PI — Chemise sublimada | C |
| Messi Edition | Messi Edition — Exploración gráfica | F |
| Michelle Collection | Michelle Collection — Camisa corporativa blanca | C |
| Naruto Edition | Naruto — Exploración gráfica | F |
| Oasis Sport | Oasis Sport — Franela DTF blanca | C |
| Paramedicos Acosta Ortiz | Paramédicos Acosta Ortiz — Camisa corporativa blanca | C |
| Personal Trainer | Personal Trainer — Chaqueta sublimada | C |
| Potenza | Potenza — Chaqueta sublimada | C |
| Promocion Ups | Promoción UPS — Franela DTF | C |
| Ramones Edition | Ramones — Exploración gráfica | F |
| Repuestos Villegas | Repuestos Villegas — Franela manga corta sublimada | C |
| Santisima Trinidad | Santísima Trinidad — Franela manga corta sublimada | C |
| Spark Edition | Spark Edition — Diseño automotriz por encargo | E |
| Tahoe Edition | Tahoe Edition — Diseño automotriz por encargo | E |
| Tanjiro Edition | Tanjiro (Demon Slayer) — Exploración gráfica | F |
| Venezolano Edition | Venezolano Edition — Franela manga larga sublimada (diseño propio) | C |
| Wrangler Edition | Wrangler Edition — Diseño automotriz por encargo | E |
| WWW.listaprecio.com | ListaPrecio.com — Camisa corporativa | C |
| Zoto | Zoto — Camisa corporativa blanca | C |
| (modal por defecto) Alcaldía de San Felipe | Quitar, o "Propuesta de chaqueta sublimada" sin escudo ni nombre oficial | — |

**Glifos y fuentes**
- Títulos en Sedgwick Ave Display y texto en Montserrat: ambas de Google Fonts, con licencia OFL que permite uso comercial, y confirmadas por ti como las únicas dos.
- Los títulos con graffiti deben mostrar bien **Á É Í Ó Ú Ü Ñ á é í ó ú ü ñ ¿ ¡ — · ' " $ / :**. Si Sedgwick no trae alguno, que ese carácter caiga a Montserrat con `unicode-range` o `font-family` de respaldo, sin cuadros ni espacios raros.
- Autoalojar en `woff2` (más rápido y evita enviar la IP del visitante a Google Fonts) e incluir la licencia OFL en `assets/fonts/`.
- Probar mayúsculas con tilde y `text-transform: uppercase`.
- Lectura accesible: los títulos graffiti solo en H1/H2 cortos; el texto largo siempre en Montserrat.

## 6. Cotizador rediseñado

**Objetivo:** que elegir se sienta como escoger de un menú, no llenar un formulario.

1. **Paso 1: "¿Qué necesitas?"** Cuatro tarjetas grandes seleccionables (radio accesible), con ícono, nombre y "desde $X":
   - Matriz de bordado DST/PES — desde $5
   - Sublimación deportiva — franelas desde $15 · chaquetas $35
   - Uniformes corporativos bordados — desde $25
   - Franelas DTF y diseño gráfico — franela DTF $20 · diseño de tarjetas $5
2. **Paso 2: "¿Cuántas piezas?"** Chips: 1–5 · 6–24 · 25–100 · 100+. Sin descuentos inventados.
3. **Paso 3: Detalles** (todo opcional): nombre, tela o prenda, colores/fecha deseada, "¿tienes tu logo?" (sí / no / necesito diseño). Texto: "Envía tu logo por WhatsApp después de abrir el chat".
4. **Resumen vivo:** "Tu solicitud: Sublimación · 6–24 piezas · desde $15 c/u". Etiqueta "Estimado referencial".
5. **Botón principal:** "Cotizar por WhatsApp". Enlace secundario: "Prefiero correo" (para clientes internacionales).
6. **Confianza:** "Atención directa de Ramses", "Diseño incluido al producir con Kingdom" `[confirmar]`, "Respondo en `[CONFIRMAR horario/plazo]`".
7. **Mensaje de WhatsApp** (la página en inglés genera el mensaje en inglés):
```text
Hola Ramses, quiero cotizar:
• Servicio: Sublimación deportiva
• Cantidad: 6–24 piezas
• Detalles: [texto]
Enviado desde kingdombyramsesmartinez.github.io
```
8. Móvil primero, áreas táctiles de 44 px mínimo, foco visible, `aria-live` para el resumen, sin librerías. Eventos de Analytics: `quote_start`, `quote_submit`.

## 7. Contrátame, CV y clientes

**Sección "Contrátame"** (en el home, antes del contacto; también en `/en/`):
- Título: "Disponible para trabajo remoto y proyectos de digitalización".
- Qué ofreces: digitalización DST/PES, arte vectorial para sublimación, diseño textil/uniformes, modelado 3D nivel intermedio.
- Herramientas: Wilcom EmbroideryStudio, Illustrator, Photoshop, Blender (intermedio).
- Idiomas: Español nativo · Inglés básico `[confirmar; no prometas más de lo real]`.
- Botones: **Descargar CV (PDF)**, **Ver LinkedIn**, **Escribir por correo** (correo personal para reclutadores).
- Texto aparte: "Pedidos locales y compra de servicios: WhatsApp / correo de Kingdom".

**CV:** archivo `assets/cv/ramses-martinez-cv.pdf` (nombre sin espacios), peso menor de 500 KB, con fecha de última actualización. Antes de subirlo quita cédula, dirección exacta, fecha de nacimiento y teléfono personal; deja correo y LinkedIn. Que coincida con LinkedIn. Evento de Analytics `cv_download`.

**Clientes / prueba social**
- Bloque "Clientes": 3 a 6 capturas recortadas de testimonios de Instagram (WebP optimizado, con `alt`), pidiendo permiso a cada cliente o tapando nombres y teléfonos. Botón "Ver más en Instagram (@kingdom_vzla)".
- No incrustar el widget de Instagram: carga scripts de terceros y frena el sitio.
- **Reseñas en Google:** pide a 5–10 clientes satisfechos que dejen reseña en tu perfil de Google Business Profile; eso rinde más para búsquedas locales que cualquier testimonio dentro del sitio. Agrega un enlace "Déjanos una reseña".
- Prohibido inventar testimonios, cifras o `aggregateRating`.

**Bordado:** crear filtro y sección **Bordado** con fotos reales y los videos de bordadoras (recortados 10–15 s, sin audio o con subtítulos, en MP4 optimizado o cargados como enlace a Instagram/TikTok). Mostrar la matriz (captura de Wilcom) junto a la prenda terminada.

## 8. El link del portafolio

| Problema | Solución |
|---|---|
| `/portfolio.html` mezcla idioma y tiene extensión | Pasar a `/portafolio/` (carpeta con `index.html`) y `/en/portfolio/`. Dejar `/portfolio.html` como redirección con `<meta http-equiv="refresh" content="0;url=/portafolio/">` y canonical al nuevo destino. |
| URL del sitio larga | Corto plazo: usarla con UTM por canal (`?utm_source=instagram&utm_medium=bio`). Mediano plazo: dominio propio (por ejemplo un `.com` de unos US$10–15 al año). En GitHub Pages: archivo `CNAME`, registros DNS, HTTPS forzado; GitHub redirige solo desde la URL `github.io` al dominio nuevo. Después: propiedad de dominio en Search Console y actualizar el enlace en Business Profile. |
| Cambiar el usuario de GitHub | No recomendado: rompe todas las URLs, Search Console y Business Profile. |
| Compartir una pieza | Enlaces `/portafolio/#alexauto` que abran la ficha. Opcional: una página por pieza (mejor para SEO) generada por el script. |
| Tarjetas impresas | Agregar un QR al sitio en el diseño de la tarjeta. |
| Vista previa al compartir | Imagen OG de 1200×630 revisada, y una por página si se puede. |

## 9. SEO, Search Console, Analytics y Business Profile sin errores

**Search Console**
- Propiedad por prefijo de URL del sitio actual (dominio si hay dominio propio). Verificar que la etiqueta de verificación del home siga puesta.
- `sitemap.xml` (home, portafolio, legales y versiones `/en/`) enviado; `robots.txt` con la línea `Sitemap:`.
- Una sola URL canónica por página (sin duplicado entre `/` e `/index.html`); `hreflang` es/en/x-default.
- 404 propio (`404.html`). Todas las páginas indexables con `<html lang>` correcto.
- Errores típicos: sitemap no legible, duplicada sin canónica, rastreada pero no indexada (páginas finas), 404 por imágenes renombradas. **Pega los mensajes exactos y los clasifico.**

**Analytics (GA4)**
- Conservar el ID de medición actual. Consentimiento antes de cargar (Consent Mode v2, denegado por defecto), banner con Aceptar/Rechazar y enlace de preferencias en todas las páginas.
- Eventos: `whatsapp_click`, `quote_start`, `quote_submit`, `cv_download`, `portfolio_item_view`, `email_click`. Sin datos personales en parámetros (ni el texto del mensaje de WhatsApp).
- Marcar `quote_submit`, `whatsapp_click` y `cv_download` como eventos clave. Excluir tu tráfico interno.

**Google Business Profile**
- Si los clientes no te visitan en un local, configurarlo como negocio de **área de servicio** y ocultar la dirección.
- Nombre igual al del sitio (Kingdom by Ramses Martínez), sin palabras clave añadidas y sin declararte empresa. Categoría principal acorde (bordados), secundarias (impresión de camisetas, diseñador gráfico). Teléfono igual al del sitio (+58 424-109-2124).
- Enlace al sitio con UTM (`?utm_source=google&utm_medium=organic&utm_campaign=gbp`). Fotos reales (bordadora, matriz, prendas), servicios con precios de la sección 4, publicaciones periódicas.
- Si ya lo reclamaste y tiene errores o está suspendido, no crees otro perfil: apela con la verificación pendiente.

**Datos estructurados (JSON-LD)**, siempre iguales a lo visible en la página:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {"@type": "Person", "name": "Ramses Martínez", "url": "https://kingdombyramsesmartinez.github.io/",
     "jobTitle": "Diseñador gráfico textil y digitalizador de bordados",
     "telephone": "+584241092124", "brand": {"@type": "Brand", "name": "Kingdom"},
     "address": {"@type": "PostalAddress", "addressLocality": "Barquisimeto", "addressRegion": "Lara", "addressCountry": "VE"},
     "knowsAbout": ["Digitalización de bordados DST/PES", "Sublimación deportiva", "Diseño textil"],
     "sameAs": ["https://instagram.com/kingdom_vzla", "https://www.tiktok.com/@kingdom_vzla", "https://www.linkedin.com/in/ramses-martinez-bqto"]},
    {"@type": "WebSite", "name": "Kingdom", "url": "https://kingdombyramsesmartinez.github.io/", "inLanguage": ["es", "en"]}
  ]
}
```
Se usa `Person` + `Brand` y no `Organization` ni `ProfessionalService`, porque operas como persona natural. Validar en Rich Results Test. Sin `aggregateRating` ni reseñas falsas.

## 10. Decisiones que solo tú puedes tomar

| # | Decisión | Por qué importa |
|---|---|---|
| A | Fan art por encargo (Dragon Ball, Bakugo, Camaro y similares): ¿dejas de fabricarlo, lo sustituyes por diseños propios de estilo similar, lo fabricas solo si el cliente demuestra tener los derechos, o asumes el riesgo? | Fabricar y entregar es lo que puede generar reclamo, no publicar la imagen. Sin registro mercantil el riesgo es personal. El sitio no debe decir lo contrario de lo que haces (ver 3.3). |
| B | Precios al detal definidos. Falta: qué incluye cada precio (diseño, bordados, tallas) y si habrá precio al mayor. | Es una oferta pública. |
| C | Forma de pago y moneda (USD, bolívares a tasa BCV, transferencia, Pago Móvil) y si facturas. | Para el texto de precios y los términos; consulta a tu contador sobre IVA/IGTF y RIF. |
| D | Anticipo, plazos de entrega y política ante defectos. | Van en Términos y FAQ. |
| E | ¿"Diseño incluido al producir con Kingdom" es una promesa que mantienes? | Se publicaría como argumento comercial. |
| F | Resuelto: Sedgwick Ave Display + Montserrat. | Falta solo probar los glifos (tildes, ñ, ¿ ¡). |
| G | Cuánto inglés declaras en Contrátame. | Honestidad ante reclutadores. |
| H | Resuelto: Venezolano Edition es diseño propio (portafolio principal); Ford Ka, Spark, Camaro, Corvette, Tahoe y Wrangler son encargos con marca de tercero (ver 3.3b). Promoción UPS, Potenza, Fitness 24/7 y Oasis Sport fueron encargos de clientes: quedan en el portafolio principal. Comprobación rápida: si el logo que llevan es del propio cliente, no hay nada que cambiar; si es una marca de tercero ajena al cliente, pasan a encargo-marca (3.3b). | Para clasificarlos. |

## 11. Prompts para Antigravity

Pega primero las **Reglas permanentes** al abrir cada sesión y luego el prompt de la fase. Una fase por sesión; no pases a la siguiente sin revisar el reporte.

### Reglas permanentes
```text
REGLAS PERMANENTES (aplican a toda la sesión)
1. Trabaja en la rama mejora-2026-10. Un commit por tarea con mensaje claro. No hagas push a main.
2. No inventes datos: precios, plazos, cifras, clientes, testimonios, certificaciones ni reseñas. Si falta un dato, omite ese elemento en el sitio publicado y anótalo en el reporte como PENDIENTE.
3. No cambies el estilo visual salvo lo que pida la fase. Si hay un diseño aprobado en Figma, ese diseño manda.
4. Idioma principal español; mantén paridad con la versión /en/.
5. Solo dos fuentes: Sedgwick Ave Display (títulos) y Montserrat (texto), autoalojadas en woff2 con font-display: swap.
6. Accesibilidad: HTML semántico, labels reales, foco visible, contraste AA, respeta prefers-reduced-motion.
7. No pegues claves, tokens ni datos personales en el repositorio.
8. Si algo es ambiguo y bloquea, elige la opción más conservadora y repórtalo.
9. Al terminar crea reportes/FASE-N.md con: archivos cambiados, decisiones tomadas, pendientes y cómo probarlo.
10. Lenguaje: Kingdom es una marca personal de Ramses Martínez, persona natural, sin registro mercantil. Prohibido en cualquier página, metadato o JSON-LD: empresa, corporación, compañía, sociedad, S.A., C.A., "nuestro equipo", "somos", "fundada". Usa primera persona singular o "Kingdom by Ramses Martínez" y "diseñador independiente". "Uniformes corporativos" se mantiene solo como nombre de producto.
11. Veracidad: ninguna frase del sitio puede afirmar algo que no sea cierto en la práctica (por ejemplo, que algo no se vende o no se acepta por encargo).
```

### Fase 0 — Respaldo y diagnóstico (solo lectura)
```text
FASE 0 — Respaldo y diagnóstico. No modifiques contenido del sitio.
1. Crea la rama mejora-2026-10 y una etiqueta backup-pre-mejora sobre el estado actual.
2. Inventario: lista todas las páginas, assets (con peso), scripts externos y fuentes (archivos y licencias que encuentres).
3. Revisa y reporta: <title>, meta description, canonical, hreflang, lang, robots, og:*, existencia y contenido de sitemap.xml, robots.txt, 404.html y datos estructurados JSON-LD.
4. Localiza el código de Google Analytics/gtag, el banner de cookies y la etiqueta de verificación de Search Console. Indica si GA4 carga antes del consentimiento.
5. Busca enlaces rotos (internos y a assets), imágenes con espacios o mayúsculas en el nombre, imágenes sin width/height, sin lazy-loading o sin alt útil.
6. Identifica la imagen del hero y su origen (¿propia o descargada?). Identifica toda imagen con escudos, banderas o insignias oficiales (por ejemplo "alcaldía de san felipe").
7. Cuenta las tarjetas de portafolio y compara con el contador "41" del home.
8. Ejecuta Lighthouse móvil en home y portafolio (rendimiento, accesibilidad, SEO, buenas prácticas) y adjunta los resultados.
9. Lista qué fuentes se cargan realmente y si queda algún archivo de Graffiti City, Aerosoldier u otra distinta de Sedgwick y Montserrat.
Entrega: reportes/FASE-0.md con todo lo anterior ordenado por gravedad.
```

### Fase 1 — Legal y riesgos
```text
FASE 1 — Legal y riesgos (aplica las Reglas permanentes).
Contexto: sitio de un diseñador textil en Venezuela. Debe quedar coherente con lo que el sitio realmente hace.
Tareas:
1. Tipos: crea el campo tipo (cliente | propio | fanart | encargo-marca) por pieza. Criterio: cualquier pieza con un personaje, nombre, logo o marca que no sea del cliente ni de Kingdom NO es "cliente" ni "propio". (a) fanart: Avengers, Bakugo, CR7, DBS/Dragon Ball, Deku, Messi, Naruto, Ramones, Tanjiro. (b) encargo-marca (pedidas por clientes, con nombre o logo de marca de vehículo): Camaro, Corvette, Ford Ka, Spark, Tahoe, Wrangler. "Venezolano Edition" es diseño propio: tipo propio, queda en el portafolio principal. Las piezas fanart y encargo-marca salen del filtro "Todos" y van en una sección aparte con dos subgrupos, sin precio y SIN botón de cotizar ni mensaje de WhatsApp. Debajo de cada subgrupo va su aviso: sección 3.3 (fan art) o 3.3b (encargo-marca), en versión veraz y sin frases sobre ventas ni encargos en el aviso de fan art.
1b. Privacidad en imágenes: revisa TODAS las imágenes y miniaturas en busca de placas de vehículos, caras, teléfonos, cédulas o nombres de personas. En "Ford Ka Edition" difumina o recorta la placa en la imagen, la miniatura, la imagen OG y cualquier copia; si no puedes hacerlo de forma fiable, oculta la pieza y repórtalo para que Ramses suba la versión editada. No publiques el nombre del cliente en esa pieza.
2. Hero: elimina la foto de la bordadora descargada. Sustitúyela por una imagen propia si existe en el repo; si no, usa un fondo CSS neutro y deja el pendiente en el reporte.
3. Alcaldía de San Felipe: quita la imagen precargada del modal y cualquier ficha con escudo o insignia oficial. El modal debe abrir vacío o con la primera pieza real.
4. Añade el aviso general de logos de clientes (sección 3.4) al pie del portafolio.
5. Fuentes: deja solo Sedgwick Ave Display y Montserrat en woff2 autoalojadas, con su licencia OFL en assets/fonts/. Elimina cualquier otro archivo de fuente y toda referencia en CSS. Verifica que se vean á é í ó ú ü ñ ¿ ¡ en mayúsculas y minúsculas; los que falten caen a Montserrat.
6. Cookies: asegúrate de que el enlace "Preferencias de cookies" aparezca en el footer de TODAS las páginas (es y en). GA4 no debe cargar ni enviar datos antes del consentimiento.
7. Reescribe las seis páginas legales (privacidad, términos, propiedad intelectual, cookies, seguridad, accesibilidad) en es y en, siguiendo EXACTAMENTE el contenido mínimo de la sección 3.2 del documento. Usa [CONFIRMAR] para lo que no se sepa y NO lo publiques; repórtalo. Incluye el correo de retiro de contenidos y un /.well-known/security.txt.
8. Verifica que nada en el repo contenga cédula, dirección exacta ni datos sensibles.
9. Lenguaje: aplica la Regla 10 en home, portafolio, /en/, legales, metadatos, JSON-LD y alt. Cambios mínimos: la tabla de la sección 3.5 del documento. En las páginas legales el responsable es Ramses Martínez, persona natural que opera la marca Kingdom.
No toques títulos, precios ni cotizador (fases siguientes).
```

### Fase 2 — Datos del portafolio, títulos, glifos y precios
```text
FASE 2 — Datos, títulos, glifos y precios (aplica las Reglas permanentes).
1. Crea data/portfolio.json como ÚNICA fuente de verdad del portafolio, con campos: id (slug kebab-case sin tildes), titulo, cliente, tipo (cliente|propio|fanart|encargo-marca), categoria (sublimacion|bordado|streetwear|branding|fanart), tecnica, prenda, tela, estado (ejecutado|propuesta), precio_usd (vacío si no se conoce), descripcion, imagen, miniatura, alt.
2. Carga las 39 piezas con los títulos de la tabla de la sección 5 del documento, respetando tildes y mayúsculas. Los campos marcados [confirmar] déjalos como están y repórtalos.
3. Escribe una descripción distinta por pieza, de 1–2 frases, usando SOLO datos conocidos (cliente, prenda, técnica, tela si consta). Prohibido inventar resultados. Si no hay datos, usa una frase sobria con prenda y técnica.
4. Escribe alt específicos (prenda, técnica y cliente), nunca la plantilla repetida.
5. Precios al detal (sección 4): chaqueta sublimada 35; chaqueta IMPA bordada 25; franela sublimada manga larga 18 y manga corta 15 (solo donde el título lo diga); franela con DTF 20; camisa de béisbol (Gigantes BC) 25; chemise sublimada 18; tarjetas 5 (diseño) y 15 (100 impresas con diseño); matriz "desde 5". Camisas corporativas: no asignes un precio por pieza; la ficha muestra "$25 con 2 logos bordados · $35 con 5 logos bordados". "Academia de Cuatro" (franela sublimada sin manga indicada): precio_usd vacío. Nunca precio en fanart, encargo-marca ni propuestas. Siempre "al detal"; no publiques precios al mayor.
6. Renombra imágenes a minúsculas, ASCII, con guiones y sin espacios (por ejemplo alexauto-camisa-corporativa.webp), corrige typos (Gerreras→guerreras), actualiza todas las referencias (HTML, JSON, og:image, JSON-LD) y deja un mapa antiguo→nuevo en reportes/renombres.csv.
7. Crea scripts/build-portfolio.mjs (Node sin dependencias externas) que genere el HTML estático del portafolio (es y en) desde el JSON, para que los buscadores vean el contenido sin ejecutar JavaScript. Añade un README corto: cómo editar descripciones y precios.
8. El contador del home ("N presentaciones") debe salir del JSON, no escrito a mano.
9. Verifica con un chequeo de enlaces que no queden referencias rotas.
```

### Fase 3 — Cotizador, servicios y home
```text
FASE 3 — Cotizador, servicios y home (aplica las Reglas permanentes; respeta el diseño de Figma si existe).
1. Rediseña el cotizador según la sección 6 del documento: 4 tarjetas de servicio seleccionables con "desde $X", chips de cantidad, detalles opcionales, resumen vivo con "Estimado referencial", botón "Cotizar por WhatsApp" y enlace secundario "Prefiero correo". Mensaje de WhatsApp estructurado (es/en según la página). Los precios salen de una constante única en data/precios.json, no escritos a mano en el HTML.
2. Las 4 opciones del cotizador deben coincidir con las tarjetas de la sección Servicios. Añade la tarjeta de "Uniformes corporativos bordados" para que no falte.
3. Añade a Servicios la tabla de precios de la sección 4 con la nota de pago [usa solo lo confirmado; omite lo marcado CONFIRMAR].
4. Home: muestra 6–8 piezas de clientes (no fanart) con la mejor imagen, arriba del botón "Explorar portafolio". Que "Portafolio" en el menú lleve a esa sección.
5. Añade una FAQ de 6–8 preguntas (qué envío para una matriz, formatos DST/PES y otros, cómo se entrega, cómo se paga desde el exterior, tiempos, revisiones, sublimación vs DTF vs bordado). Usa solo respuestas que consten en el documento; las que dependan de las Decisiones B–D déjalas fuera y repórtalas.
6. Eventos de Analytics: quote_start, quote_submit, whatsapp_click (sin datos personales).
7. Móvil primero, áreas táctiles de 44 px, sin dependencias nuevas.
```

### Fase 4 — Contrátame, CV y clientes
```text
FASE 4 — Contrátame, CV, clientes y bordado (aplica las Reglas permanentes).
1. Crea la sección "Contrátame" (es y en) según la sección 7 del documento: botones Descargar CV (PDF), Ver LinkedIn (https://www.linkedin.com/in/ramses-martinez-bqto) y Escribir por correo (kingdombrandbqto@gmail.com). Deja claro aparte que pedidos locales van por WhatsApp o kingdombrandbqto@gmail.com.
2. CV: busca assets/cv/ramses-martinez-cv.pdf; si no existe, deja el botón oculto y repórtalo (Ramses lo subirá). No lo generes ni lo inventes. Evento cv_download.
3. Sección "Clientes": maqueta para 3–6 imágenes de testimonios (WebP, lazy, con alt) leídas de data/clientes.json, y botón "Ver más en Instagram (@kingdom_vzla)". Si el JSON está vacío, la sección no se muestra. NO incrustes widgets de Instagram.
4. Enlace "Déjanos una reseña en Google" que lea la URL desde data/config.json (campo gbp_review_url). Si está vacío, no se muestra.
5. Bordado: añade el filtro y la sección "Bordado" que lea de data/bordado.json piezas con foto de prenda terminada, captura de la matriz y video corto (campo opcional). Si está vacío, no se muestra.
6. Reemplaza el enlace al catálogo de Drive por uno que lea config.json (catalogo_url) y abra en pestaña nueva con rel="noopener".
No inventes nada: todo lo que falte se reporta como PENDIENTE.
```

### Fase 5 — SEO técnico y Google
```text
FASE 5 — SEO técnico y Google (aplica las Reglas permanentes).
1. URLs: crea /portafolio/index.html y /en/portfolio/index.html (usando el build de la Fase 2). Deja /portfolio.html y /en/portfolio.html como páginas de redirección (meta refresh a 0 s + canonical al nuevo destino). Actualiza todos los enlaces internos, el menú y el sitemap.
2. Cada página: <html lang>, un único <title> (≤60 caracteres) y meta description (≤155), canonical absoluta, hreflang es / en / x-default recíprocos, og:* y twitter:* completos con imagen 1200×630 que exista.
3. Genera sitemap.xml (home, portafolio, legales, /en/) con lastmod, y robots.txt con la línea Sitemap. Crea 404.html con navegación útil.
4. JSON-LD: Person (con Brand Kingdom) + WebSite según la sección 9 del documento, idénticos a lo visible en la página. No uses Organization ni ProfessionalService. Sin aggregateRating ni reseñas. Valida la sintaxis.
5. Google Analytics: conserva el ID actual. Implementa Consent Mode v2 (denegado por defecto), banner Aceptar/Rechazar y enlace de preferencias en el footer. Eventos: whatsapp_click, quote_start, quote_submit, cv_download, portfolio_item_view, email_click.
6. Search Console: mantén la etiqueta de verificación existente. No la quites.
7. Enlaces para Business Profile: genera en reportes/FASE-5.md las URLs con UTM para el perfil y para Instagram/TikTok/LinkedIn (utm_source, utm_medium=bio o organic, utm_campaign).
8. Redacta en reportes/FASE-5.md una lista clara de qué debe revisar Ramses manualmente en Search Console (enviar sitemap, solicitar indexación, revisar cobertura y Core Web Vitals), en Analytics (marcar eventos clave) y en Business Profile (categorías, área de servicio, teléfono igual, fotos, servicios).
9. Valida el HTML y confirma que ningún enlace interno devuelve 404.
```

### Fase 6 — Rendimiento y accesibilidad
```text
FASE 6 — Rendimiento y accesibilidad para móviles de gama baja (aplica las Reglas permanentes).
Metas en Lighthouse móvil: rendimiento ≥ 90, accesibilidad ≥ 95, buenas prácticas ≥ 95, SEO ≥ 95. LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
1. Imágenes: WebP con width/height, loading="lazy" y decoding="async" salvo la del LCP (fetchpriority="high"); miniaturas ≤ 40 KB, imagen completa ≤ 200 KB; srcset si aporta.
2. Fuentes: precarga solo el woff2 latino de Sedgwick y el peso principal de Montserrat; elimina pesos que no se usen.
3. El estilo urbano pedido (fondo de ladrillo desgastado y "vidrio áspero con luz de fondo") se mantiene, pero: fondo de ladrillo como un único WebP optimizado (≤ 80 KB) o CSS; backdrop-filter solo en pantallas anchas y con alternativa de color sólido semitransparente en móviles y cuando se use prefers-reduced-motion o prefers-reduced-data; sin animaciones infinitas pesadas.
4. JavaScript total < 100 KB, sin librerías innecesarias. Pagina o carga progresivamente las 39 tarjetas del portafolio.
5. Accesibilidad: modal con foco atrapado, cierre con Esc, botón de cierre con etiqueta; filtros navegables con teclado; contraste AA en los títulos sobre el fondo de ladrillo; texto alternativo útil.
6. Mide antes y después y registra en reportes/FASE-6.md.
```

### Fase 7 — QA final y entrega
```text
FASE 7 — QA final (aplica las Reglas permanentes). No añadas funciones nuevas.
1. Repite el diagnóstico de la Fase 0 y compáralo con el original; cierra el reporte con una tabla Antes/Después.
2. Verifica uno a uno: aviso de fan art coherente, ninguna pieza fanart con precio o CTA de cotizar, hero sin foto ajena, sin escudos oficiales, solo dos fuentes, enlace de cookies en todas las páginas, seis páginas legales completas en es y en, precios solo donde corresponde.
3. Chequeo de enlaces internos y externos, HTML válido, JSON-LD válido, sitemap y robots correctos.
4. Pruebas manuales documentadas: Android gama baja o emulación 4× CPU + 3G rápido, iOS Safari, escritorio. Flujo: elegir servicio → cantidad → WhatsApp (es y en), abrir ficha del portafolio, descargar CV, cambiar consentimiento de cookies.
5. Entrega: README con cómo editar data/portfolio.json, data/precios.json, data/clientes.json y data/config.json, y cómo regenerar el HTML (scripts/build-portfolio.mjs).
6. Crea un pull request de mejora-2026-10 a main con el resumen. NO hagas merge: lo aprueba Ramses.
```

## 12. Después de publicar (lo haces tú)

1. En Search Console, envía `sitemap.xml` y solicita la indexación de las páginas clave.
2. En Analytics, marca como eventos clave `quote_submit`, `whatsapp_click` y `cv_download`.
3. En Business Profile, revisa categoría, área de servicio, teléfono, enlace con UTM y fotos.
4. Pide 5–10 reseñas de Google a clientes satisfechos.
5. Agrega el QR del sitio a tu tarjeta de presentación.
6. Pide a un abogado venezolano que revise las páginas legales y la Decisión A, y a tu contador que revise IVA, IGTF y facturación.
