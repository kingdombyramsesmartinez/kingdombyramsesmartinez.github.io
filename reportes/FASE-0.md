# KINGDOM — Reporte Fase 0: Respaldo y Diagnóstico

**Fecha:** 12 de octubre de 2026  
**Rama activa:** `mejora-2026-10`  
**Etiqueta de respaldo:** `backup-pre-mejora` (creada sobre el commit base `793d73c`)  
**Responsable técnico:** Antigravity (Ejecución) · Ramses Martínez (Propietario) · Claude (Dirección)  

---

## 1. Resumen Ejecutivo y Diagnóstico Global

Se completó la **Fase 0 (Respaldo y diagnóstico en modo solo lectura)** del plan maestro de mejora.
- Se preservó el estado original con la etiqueta `backup-pre-mejora`.
- Se inspeccionó el 100% de los archivos HTML (17 páginas), estilos CSS (4 archivos), scripts JS (3 en cliente, 7 en herramientas), tipografías, metadatos, catálogo de piezas, assets gráficos y pruebas end-to-end con Playwright y axe-core.
- Ningún archivo de producción fue modificado durante este diagnóstico.

---

## 2. Hallazgos Ordenados por Gravedad

### 🔴 Bloqueantes / P0 (Riesgo Legal, Marca de Terceros y Metadatos Críticos)

1. **L-1 / Mezcla de Fan Art y Marcas de Vehículos con Portafolio Comercial sin Delimitación Transparente:**
   - En `content/portfolio.json` y `portfolio.html`, **9 piezas corresponden a Fan Art comercial no oficial** (`avengers-doomsday`, `bakugo-mha`, `cr7-edition`, `dbs-edition`, `deku-edition`, `messi-edition`, `naruto-edition`, `ramones-edition`, `tanjiro-edition`).
   - **6 piezas corresponden a marcas de vehículos de terceros** pedidas por clientes (`camaro-edition`, `corvette-edition`, `ford-ka-edition`, `spark-edition`, `tahoe-edition`, `wrangler-edition`).
   - Todas estas piezas se muestran mezcladas en el catálogo general, y su modal incluye botón de acción hacia WhatsApp ("Contactar / Cotizar algo similar"). Esto contradice la exoneración al pie que afirma que no se ofrecen a la venta ni por encargo, exponiendo a Ramses a responsabilidad personal ilimitada (sin registro mercantil).
2. **L-3 / Insignias de Entes Públicos precargadas en el Modal:**
   - En `index.html` (L361), `en/index.html` (L361) y `templates/index.template.html` (L277), la imagen estática por defecto del modal de inspección apunta a:
     `assets/artwork/alcaldia de san felipe-chaqueta sublimada.webp`.
   - Se trata de una propuesta no concretada con insignias oficiales del municipio San Felipe. Presentarla precargada en el modal da la impresión de ser un contrato o trabajo institucional adjudicado.
   - Existen también en disco archivos con insignias del Tribunal Supremo de Justicia (`TSJ tricolor-chaqueta sublimada.webp` y `TSJ-chaqueta sublimada.webp`).
3. **L-10 / Privacidad en Imágenes:**
   - La pieza `assets/artwork/Ford Ka Edition-franela con dtf.webp` (y su miniatura `assets/artwork/thumbs/Ford Ka Edition-franela con dtf.webp`) muestra un vehículo con placa automotriz legible de un particular identificable, lo cual vulnera el artículo 60 de la Constitución venezolana sobre vida privada e intimidad.
4. **L-9 / Lenguaje Corporativo en Operación de Persona Natural:**
   - Se detectó en `index.html` (L412), `portfolio.html` (L1250) y templates la frase: *"KINGDOM — Estudio de diseño textil, ilustración vectorial y digitalización de bordado industrial fundado por Ramses Martínez"*.
   - Debe transicionar a marca personal ("marca personal de Ramses Martínez", "diseñador independiente", primera persona singular).
5. **T-4 / Ausencia de Metadatos SEO Clave en Páginas Legales:**
   - Las 12 páginas legales (`legal/*.html` y `en/legal/*.html`) carecen de:
     - Meta tag `robots` explícito (debe definirse para indexación/control).
     - Meta tags Open Graph (`og:title`, `og:image`, `og:description`).
     - Datos estructurados JSON-LD (solamente `index.html`, `en/index.html`, `portfolio.html` y `en/portfolio.html` poseen JSON-LD).
   - Los JSON-LD actuales utilizan `ProfessionalService` en lugar de `Person` con propiedad `brand: Kingdom` requerida por operar como persona natural.

---

### 🟡 Prioridad Alta / P1 (Contenido, Accesibilidad, Precios y Conversión)

1. **A11y / Fallo de Contraste en Botón de Cotización Principal (Inicio):**
   - Ejecutando la suite `@axe-core/playwright` (`npm run test:e2e`), el test `tests/axe-a11y.spec.mjs` arrojó una violación **serious** en `index.html` (modo escritorio):
     - Elemento: `.quote-submit-btn` (`Enviar Mensaje a WhatsApp (+58 424-109-2124)`).
     - Motivo: Contraste de color de **3.78:1** (fondo `#6b6b6b` / texto `#070706`) inferior al mínimo exigido por WCAG 2.1 AA (**4.5:1**).
2. **C-1 / Ausencia de Categoría y Piezas Reales de Bordado en Portafolio Principal:**
   - `portfolio.html` solo ofrece 4 filtros: `Sublimación Deportiva`, `Streetwear & Gráfica`, `Branding & Corporativo`, `Fan Art`.
   - No existe filtro de "Bordado Industrial", a pesar de ser el servicio estrella. Aunque existen 6 matrices en `assets/artwork/thumbs/bordado*.webp`, no están integradas en la botonera principal ni enlazadas con fotografías de prendas terminadas.
3. **C-2 / Títulos con Typos y Descripciones Genéricas:**
   - Múltiples piezas conservan títulos no pulidos: `IMPA-chaqueta bordadax`, `Jswim Academi`, `Gerreras SC`, `Santisima Trinidad`, `WWW.listaprecio.com`.
   - Las descripciones en HTML corresponden a la misma plantilla repetitiva: *"Propuesta de diseño y presentación gráfica de alta resolución para [Cliente] ([Prenda])."*
4. **C-3 / Precios Ausentes y Desarticulados:**
   - Solo 1 pieza tiene precio en el HTML (`Academia De Cuatro: USD 15.00 / Unidad`). El resto de piezas omite el precio por unidad referencial acordado en el plan maestro.
5. **C-6 / Cotizador Desalineado:**
   - El selector del formulario en `index.html` tiene 4 opciones estáticas con selects nativos planos sin desglose dinámico ("desde $X"), ni chips de volumen.

---

### 🔵 Prioridad Media / P2 (Técnico, SEO On-Page, Nombres de Archivos)

1. **T-1 / Nombres de Assets con Espacios, Mayúsculas y Caracteres Especiales:**
   - **52 archivos** en `assets/artwork/` y **55 archivos** en `assets/artwork/thumbs/` contienen espacios en blanco y mayúsculas (ej: `assets/artwork/Laneros Gamers-franela manga corta sublimada.webp`, `assets/artwork/Gigantes BC- camisa de beisbol sublimada .webp`).
   - Esto causa inconsistencias en servidores web y URLs con `%20`.
2. **T-2 / Atributos `alt` Plantilla Repetida:**
   - Prácticamente todas las tarjetas del portafolio repiten: `alt="Presentación textil y propuesta gráfica para [Cliente]"`. No describen la prenda, color ni detalles técnicos.
3. **T-3 / Arquitectura de URLs:**
   - Actualmente se utiliza `/portfolio.html` y `/en/portfolio.html`. La meta es migrar a URLs limpias `/portafolio/` y `/en/portfolio/` manteniendo redirección 301/meta-refresh en los archivos `.html` originales.
4. **Hero Image de la Bordadora (L-2):**
   - Se verificó que en el estado actual de `index.html` la imagen descargada de internet de la bordadora **ya no está en el hero activo** (actualmente el hero muestra la marca vectorial `assets/brand/kingdom-logo-white.png`).
   - Sin embargo, en el historial de git existía `assets/hero-banner.webp`. Hay que asegurar que ninguna página secundaria reintroduzca fotos no propias.

---

## 3. Inventario Completo del Sitio

### Páginas HTML (17 páginas)
| Archivo | Idioma | Canonical | Tamaño |
|---|---|---|---|
| `index.html` | es | `https://kingdombyramsesmartinez.github.io/` | 26.1 KB |
| `portfolio.html` | es | `https://kingdombyramsesmartinez.github.io/portfolio.html` | 111.8 KB |
| `404.html` | es | `https://kingdombyramsesmartinez.github.io/404.html` | 2.4 KB |
| `en/index.html` | en | `https://kingdombyramsesmartinez.github.io/en/` | 25.9 KB |
| `en/portfolio.html` | en | `https://kingdombyramsesmartinez.github.io/en/portfolio.html` | 110.4 KB |
| `legal/privacy.html` | es | `https://kingdombyramsesmartinez.github.io/legal/privacy.html` | 6.7 KB |
| `legal/terms.html` | es | `https://kingdombyramsesmartinez.github.io/legal/terms.html` | 5.9 KB |
| `legal/intellectual-property.html` | es | `https://kingdombyramsesmartinez.github.io/legal/intellectual-property.html` | 7.2 KB |
| `legal/cookies.html` | es | `https://kingdombyramsesmartinez.github.io/legal/cookies.html` | 4.5 KB |
| `legal/security.html` | es | `https://kingdombyramsesmartinez.github.io/legal/security.html` | 4.5 KB |
| `legal/accessibility.html` | es | `https://kingdombyramsesmartinez.github.io/legal/accessibility.html` | 3.2 KB |
| `en/legal/privacy.html` | en | `https://kingdombyramsesmartinez.github.io/en/legal/privacy.html` | 6.5 KB |
| `en/legal/terms.html` | en | `https://kingdombyramsesmartinez.github.io/en/legal/terms.html` | 5.9 KB |
| `en/legal/intellectual-property.html` | en | `https://kingdombyramsesmartinez.github.io/en/legal/intellectual-property.html` | 6.7 KB |
| `en/legal/cookies.html` | en | `https://kingdombyramsesmartinez.github.io/en/legal/cookies.html` | 4.2 KB |
| `en/legal/security.html` | en | `https://kingdombyramsesmartinez.github.io/en/legal/security.html` | 4.3 KB |
| `en/legal/accessibility.html` | en | `https://kingdombyramsesmartinez.github.io/en/legal/accessibility.html` | 3.3 KB |

### Archivos de Configuración y Seguridad en Raíz
- `robots.txt`: Válido (permite todo y declara `Sitemap: https://kingdombyramsesmartinez.github.io/sitemap.xml`).
- `sitemap.xml`: Válido (137 líneas con URLs canónicas en español e inglés).
- `.well-known/security.txt`: Presente y configurado con contacto de seguridad.
- `SECURITY.md`: Presente.
- `_headers`: Presente con CSP y políticas de seguridad para servidores que lo soporten.

### Tipografías y Licencias (`assets/fonts/`)
- `sedgwick-ave-display.woff2` (55.2 KB) + `sedgwick-ave-display.ttf` (136 KB): Licencia OFL confirmada (`SEDGWICK-OFL.txt`).
- `montserrat-*.woff2` (10 variantes de subconjuntos de peso y caracteres cirílico, latino, vietnamita; 12 KB - 74 KB): Fuente Google Fonts OFL.
- **Auditoría de fuentes externas / prohibidas:**
  - Cero archivos de `Graffiti City`, `Aerosoldier` o fuentes comerciales no licenciadas en el directorio ni en el repositorio.
  - Cero referencias en CSS a fuentes que no sean Sedgwick Ave Display o Montserrat.

---

## 4. Estado de Analítica, Cookies y Search Console

1. **Google Analytics 4 (GA4):**
   - ID de medición: `G-YQCLS51XJE`.
   - Código localizado en: `assets/js/analytics.js`.
   - **Comprobación de Consentimiento:**
     - En la primera visita (sin decisión del usuario), GA4 **NO carga** ningún script externo ni envía balizas de red. Los tests e2e automatizados confirmaron que el script de gtag se inyecta **únicamente tras pulsar "Aceptar"**.
     - Tras pulsar "Rechazar", se configuran las banderas `analytics_storage: 'denied'` y `window['ga-disable-G-YQCLS51XJE'] = true`, y se limpian las cookies `_ga*`.
     - El enlace `Preferencias de cookies` (`data-open-cookies` o `#cookie-settings`) está presente en los footers de `index.html` y `portfolio.html`.
2. **Search Console:**
   - Etiqueta de verificación presente en `index.html` y `portfolio.html`:
     `<meta name="google-site-verification" content="nC54d1xXW7ralhJOmq0VH093fih_OC67OsD-GIr9L2k" />`.

---

## 5. Conteo de Tarjetas vs. Contador del Home

- **Conteo real en `content/portfolio.json`:** **39 piezas**.
- **Conteo de elementos `<article>` en `portfolio.html`:** **39 tarjetas**.
- **Conteo de elementos `<article>` en `en/portfolio.html`:** **39 tarjetas**.
- **Texto en `index.html`:** *"39 Presentaciones"*.
- **Texto en `en/index.html`:** *"39 Presentations"*.
- **Conclusión:** El contador actual dice "39", coincidiendo con las 39 tarjetas reales. En la Fase 2 este número se alimentará automáticamente desde el archivo de datos único `data/portfolio.json`.

---

## 6. Resultados de Auditoría Móvil & Accesibilidad (Lighthouse / Playwright)

Se ejecutó auditoría técnica móvil simulando dispositivo móvil de referencia (Google Pixel 5 / Chromium móvil):

| Métrica / Página | Home (`index.html`) | Portafolio (`portfolio.html`) | Meta Plan Maestro | Estado |
|---|---|---|---|---|
| **FCP (First Contentful Paint)** | 156 ms | 144 ms | < 2.5 s | ✅ Excelente |
| **DOMContentLoaded** | 40.2 ms | 23.2 ms | < 1.0 s | ✅ Excelente |
| **Peso total transferido** | 924 KB | 1.12 MB | < 2.0 MB | ✅ Aprobado |
| **Peticiones HTTP** | 13 | 15 | Bajo demanda | ✅ Aprobado |
| **Imágenes sin `alt`** | 0 | 0 | 0 | ✅ Aprobado |
| **Enlaces sin texto accesible** | 0 | 0 | 0 | ✅ Aprobado |
| **Estilos inline (`style=""`)** | 0 | 0 | 0 | ✅ Aprobado |
| **Accesibilidad Axe-core (Móvil)** | 0 violaciones | 0 violaciones | 0 violaciones | ✅ Aprobado |
| **Accesibilidad Axe-core (Desktop)** | 1 fallo contraste (`.quote-submit-btn`) | 0 violaciones | 0 violaciones | ⚠️ Requiere ajuste contraste |

---

## 7. Próximos Pasos (Fase 1: Legal y Riesgos)

Con el respaldo consolidado en `backup-pre-mejora` y la rama de trabajo `mejora-2026-10`, el proyecto está listo para ejecutar la **Fase 1**:
1. Clasificar formalmente cada pieza en `cliente`, `propio`, `fanart` o `encargo-marca`.
2. Segregar las 9 piezas de fan art y las 6 automotrices fuera del filtro "Todos" a su sección delimitada con avisos veraces (secciones 3.3 y 3.3b del plan).
3. Eliminar del modal por defecto la imagen de la Alcaldía de San Felipe.
4. Difuminar/recortar la placa del Ford Ka para salvaguardar la privacidad.
5. Autoalojar y verificar licencias en `assets/fonts/`.
6. Garantizar la presencia del enlace de cookies en las 17 páginas.
7. Actualizar el contenido de las 6 páginas legales en español e inglés y ajustar el lenguaje a persona natural.
