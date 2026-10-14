# Reporte de Ejecución — Fase 3: Cotizador, Servicios y Home

**Fecha:** 14 de octubre de 2026  
**Rama de trabajo:** `mejora-2026-10`  
**Estado general:** Completado con éxito y validado mediante pruebas automatizadas.

---

## 1. Resumen de Implementación

En esta fase se transformó el flujo de captación y presentación comercial del sitio web, pasando de selectores planos a un cotizador interactivo estructurado como un menú claro y accesible, alineando la sección de Servicios con la tabla oficial de precios al detal, destacando el trabajo real con clientes en el Home e incorporando una sección técnica de preguntas frecuentes (FAQ).

### 1.1. Cotizador Interactivo Rediseñado (Sección 6 del Plan)
- **Paso 1: "¿Qué necesitas?"**
  - 4 tarjetas grandes seleccionables (radio accesibles con foco visible y áreas táctiles ≥ 44 px):
    1. *Matrices de Bordado DST / PES* — desde $5
    2. *Sublimación Deportiva Full Print* — franelas desde $15 · chaquetas $35
    3. *Uniformes Corporativos Bordados* — desde $25
    4. *Franelas DTF y Diseño Gráfico* — franela DTF $20 · diseño de tarjetas $5
- **Paso 2: "¿Cuántas piezas?"**
  - Chips de cantidad tipo botón radio con tamaño accesible: `1–5`, `6–24`, `25–100`, `100+`. Sin descuentos inventados.
- **Paso 3: Detalles del proyecto (opcionales)**
  - Campos opcionales: Nombre o marca, prenda o tela deseada, selector sobre estado del logotipo ("Tengo mi logo listo", "No tengo logo aún", "Necesito diseño / vectorización") con texto de ayuda indicando: *"Envía tu logo por WhatsApp después de abrir el chat"*, y área para observaciones o fecha estimada.
- **Resumen vivo (`aria-live="polite"`)**:
  - Muestra en tiempo real la selección del cliente y el estimado unitario referencial: ej. `"Tu solicitud: Sublimación Deportiva Full Print · 6–24 piezas · Estimado: desde $15 c/u"` con etiqueta *"Estimado referencial"*.
- **Acciones y Enlace Secundario**:
  - Botón principal de llamada a la acción: `"Cotizar por WhatsApp (+58 424-109-2124)"`.
  - Enlace secundario accesible: `"Prefiero solicitar cotización por correo electrónico"`, que genera dinámicamente un enlace `mailto:kingdombrandbqto@gmail.com` prellenado con la misma estructura y detalles.
- **Mensaje de WhatsApp estructurado y bilingüe**:
  - En español (`/index.html`):
    ```text
    Hola Ramses, quiero cotizar:
    • Servicio: Sublimación Deportiva Full Print
    • Cantidad: 6–24 piezas
    • Detalles: Prenda/Tela: Dry-Fit · Logo: Listo para confección
    Enviado desde kingdombyramsesmartinez.github.io
    ```
  - En inglés (`/en/index.html`):
    ```text
    Hello Ramses, I would like to quote:
    • Service: Full Print Sports Sublimation
    • Quantity: 6–24 pieces
    • Details: Garment/Fabric: Dry-Fit · Logo: Ready
    Sent from kingdombyramsesmartinez.github.io
    ```
- **Nota de confianza**:
  - `"Atención directa y personalizada de Ramses Martínez"`.

---

### 1.2. Precios Oficiales y Tarjetas de Servicios (Secciones 4 y 6)
- **Fuente única de verdad:** Creado `data/precios.json`, eliminando cualquier precio escrito a mano en plantillas o HTML.
- **Paridad exacta:** Las 4 opciones del cotizador coinciden una a una con las 4 tarjetas de la sección Servicios:
  1. Matrices de Bordado DST / PES (`01 // DIGITAL`)
  2. Sublimación Deportiva Full Print (`02 // TÉCNICO`)
  3. Uniformes Corporativos Bordados (`03 // CORPORATIVO`) — añadida para garantizar cobertura total.
  4. Franelas DTF y Diseño Gráfico (`04 // GRÁFICO`)
- **Tabla de precios al detal:** Incorporada en la sección Servicios dentro de un contenedor accesible con scroll horizontal suave (`.tech-table-wrap`), reflejando los 12 ítems oficiales de la sección 4:
  - Chaqueta sublimada (Novak Repel): $35
  - Chaqueta bordada (Novak Repel): $25
  - Franela sublimada manga larga (Dry-Fit): $18
  - Franela sublimada manga corta (Dry-Fit): $15
  - Franela con DTF (Algodón 20/1): $20
  - Camisa de béisbol sublimada: $25
  - Chemise sublimada: $18
  - Camisa corporativa con 5 logos bordados (Algodón egipcio): $35
  - Camisa corporativa con 2 logos bordados (Algodón egipcio): $25
  - Matriz de bordado DST/PES: Desde $5
  - Diseño de tarjeta de presentación: $5
  - 100 tarjetas impresas (glasé 300 g): $15
- **Nota de pago:** *"Precios al detal, referenciales, en USD. El pago se coordina por WhatsApp. Impuestos según corresponda."* (omitiendo suposiciones no confirmadas sobre IGTF o bancos específicos).

---

### 1.3. Home: Muestra de Piezas Destacadas de Clientes (Sección 3.3 y Fase 3)
- Se incorporó en el Home, directamente sobre el botón *"Explorar Portafolio Completo (39 Piezas)"*, una cuadrícula con 8 piezas reales de clientes (excluyendo fan art y marcas de terceros):
  1. **IMPA** — Chaqueta bordada
  2. **Alexauto** — Camisa corporativa
  3. **Gigantes BC** — Camisa de béisbol sublimada
  4. **Guerreras SC** — Franela manga corta sublimada
  5. **Muestrario de bordado** — Matrices DST/PES
  6. **Oasis Sport** — Franela DTF blanca
  7. **Ferreconstrucciones** — Franela manga larga sublimada
  8. **Fitness 24/7** — Chaqueta sublimada
- Cada tarjeta enlaza de forma directa con ancla al catálogo completo (`/portfolio.html#impa`, `/en/portfolio.html#alexauto`, etc.), permitiendo compartir o consultar piezas específicas.
- El menú de navegación enlaza directamente a `#portafolio` para llegar a esta sección.

---

### 1.4. Preguntas Frecuentes (FAQ) Técnicas
- Creado `data/faq.json` con 7 preguntas y respuestas basadas estrictamente en la información confirmada del documento:
  1. *¿Qué debo enviar para solicitar una matriz de bordado?* (formatos admitidos, dimensiones en cm, tipo de tela).
  2. *¿En qué formatos se entregan las matrices de bordado?* (DST para Tajima/industriales, PES para Brother/Babylock).
  3. *¿Cómo se realiza la entrega de los archivos digitales?* (correo o WhatsApp inmediato).
  4. *¿Cómo se coordinan los pagos desde el exterior y pedidos locales?* (internacional vía correo/WhatsApp; local coordinado por WhatsApp).
  5. *¿Cuál es la diferencia entre Sublimación, DTF y Bordado?* (características técnicas de cada método).
  6. *¿Cómo se manejan las revisiones del diseño o de la matriz?* (validación visual previa antes de confeccionar).
  7. *¿Puedo solicitar una muestra o prueba de bordado?* (recomendación de prueba en retazo de tela).
- Maquetadas con etiquetas semánticas nativas `<details>` y `<summary>` con icono indicador animado, teclado accesible y alto contraste.

---

### 1.5. Eventos de Google Analytics (GA4)
En `assets/js/app.js` y `assets/js/analytics.js` se implementaron los eventos de telemetría requeridos (respetando la denegación por defecto del banner de cookies y sin registrar ningún dato personal ni número telefónico):
- `quote_start`: Se dispara una única vez por sesión cuando el usuario interactúa por primera vez con el cotizador (`focusin` o `change`).
- `quote_submit`: Se dispara al enviar la cotización, registrando parámetros anónimos: `service_id`, `quantity_range`, `page_language`.
- `whatsapp_click`: Se dispara globalmente ante cualquier clic en enlaces o botones dirigidos a `https://wa.me/...`.

---

## 2. Decisiones Pendientes (Decisiones B–D)

De acuerdo con las instrucciones de la Fase 3, se dejaron deliberadamente fuera del texto público y se listan a continuación para confirmación de Ramses:
1. **Decisión B (Tiempos de entrega y mayoreo):** No se definieron plazos cerrados en días hábiles ni listas de precios al mayor dentro de la FAQ o el cotizador; se indica que los tiempos se confirman al cotizar según el volumen del pedido.
2. **Decisión C (Formas de pago y moneda local):** No se publicaron detalles de cuentas bancarias ni tasas de cambio específicas (e.g. tasa BCV o Pago Móvil) en la tabla ni en los términos; se mantiene la nota neutra de que el pago en moneda local o divisas se coordina directamente por WhatsApp.
3. **Decisión D (Anticipo y garantías):** No se establecieron porcentajes de anticipo (e.g. 50%) ni políticas de reposición textil ante fallas hasta que Ramses las formalice.

---

## 3. Resultados de Pruebas y Auditorías Automatizadas

| Suite de Pruebas | Comando | Resultado |
|---|---|---|
| **Sintaxis JavaScript** | `npm run check:js` | **14 archivos analizados, 0 errores.** |
| **Auditoría Local HTML/CSS/CSP** | `npm run audit:local` | **17 páginas HTML y 4 archivos CSS auditados. 0 infracciones, 0 IDs duplicados, 0 enlaces rotos.** |
| **Pruebas Unitarias** | `npm test` | **33 pruebas aprobadas, 0 fallos.** |
| **Pruebas End-to-End Playwright** | `npx playwright test` | **131 pruebas aprobadas en Desktop, Tablet y Mobile. 0 fallos.** |

---

## 4. Archivos Modificados / Creados en Fase 3

- `data/precios.json` *(Nuevo — constante única de precios y servicios)*
- `data/faq.json` *(Nuevo — datos bilingües de preguntas frecuentes)*
- `templates/index.template.html` *(Actualizado — cotizador interactivo, FAQ, destacados y tabla de precios)*
- `content/es.json` & `content/en.json` *(Actualizados — textos bilingües de servicios, cotizador y FAQ)*
- `tools/build-i18n.mjs` *(Actualizado — renderizadores dinámicos de las nuevas secciones e id en tarjetas)*
- `assets/css/style.css` *(Actualizado — estilos urbanos del cotizador, chips, FAQ y tabla de precios)*
- `assets/css/urban.css` *(Actualizado — control estricto de desbordamiento horizontal en html/body)*
- `assets/js/app.js` *(Actualizado — lógica reactiva del cotizador, cálculo en vivo y eventos GA4)*
- `tests/quote-form.spec.mjs` *(Actualizado — verificación del nuevo cotizador interactivo y live summary)*
- `tests/i18n-and-footer.spec.mjs` *(Ajustado — sincronización de carga en navegación entre idiomas)*
- `index.html` & `en/index.html` *(Generados vía build)*
- `portfolio.html` & `en/portfolio.html` *(Generados vía build con id de anclas)*
- `reportes/FASE-3.md` *(Este reporte)*
