# KINGDOM — DESIGNER CUSTOMIZATION MANUAL
## Guía de Personalización Visual y de Marca (v4 Redesign)

Este documento permite a un diseñador modificar la identidad visual, colores, logos, piezas del portafolio y textos de **Kingdom** sin alterar la arquitectura base.

---

## 1. Dónde cambiar los colores y la atmósfera visual

Todos los colores y tokens visuales están definidos en dos puntos sincronizados:

### A. Hoja de Estilos (`assets/css/style.css`):
```css
:root {
  --ink: #070706;                 /* Fondo negro profundo */
  --surface: #0D0D0C;             /* Superficie de tarjetas */
  --surface-alt: #121211;         /* Superficie secundaria */
  --paper: #F7F7F4;               /* Blanco natural */
  --olive: #7A8058;               /* Verde oliva táctico (Acento primario) */
  --olive-bright: #92976E;        /* Verde oliva iluminado */
  --beige: #E9E0D0;               /* Beige natural (Acento secundario) */
  --accent: var(--olive);         /* Token de acento unificado */
}
```

### B. Configuración de Marca (`assets/js/site.config.js`):
Contiene la paleta exportada y los datos de contacto corporativos. Si se actualiza el número de WhatsApp o los correos, se hace directamente en este archivo.

---

## 2. Logo oficial y Favicon

- **Logo oficial de marca:** `assets/brand/logo.svg` (Tag graffiti monocromático oficial).
- **Favicon:** `assets/brand/favicon.svg` y `assets/favicon.png` (Tag graffiti vectorizado).
- **Regla de identidad:** El logo oficial es exclusivamente el tag graffiti monocromático en blanco/negro. No existen variantes en amarillo ni isotipos separados.

---

## 3. Tipografías

- **Títulos destacados (H1, H2 cortos y Wordmark):** `Sefa` ubicada localmente en `assets/fonts/sefa.woff2` y `assets/fonts/sefa.ttf` (reemplazó a Aerosoldier Drip por motivo de licencia comercial libre).
- **Cuerpo de lectura y tablas:** `Montserrat Variable` alojada en `assets/fonts/` (formatos woff2 self-hosted).
- **Prohibido:** Enlazar fuentes desde CDNs externas o Google Fonts para garantizar la privacidad y cumplir la política de seguridad estricta de `AGENTS.md`.

---

## 4. Dónde agregar o editar piezas del Portafolio

Todas las piezas se administran centralizadamente en:
📁 `content/portfolio.json`

Cada entrada tiene la siguiente estructura:
```json
{
  "id": "nueva-pieza",
  "image": "assets/work-nombre.webp",
  "altEs": "Descripción accesible de la imagen en español",
  "altEn": "Accessible image description in English",
  "titleEs": "Título de la pieza en español",
  "titleEn": "Piece title in English",
  "category": "bordado | sublimacion | streetwear | branding",
  "techniqueEs": "Técnica textil utilizada",
  "techniqueEn": "Textile technique in English",
  "garmentEs": "Tipo de prenda o soporte",
  "garmentEn": "Garment type or substrate",
  "availabilityEs": "Bajo pedido / Por unidad",
  "availabilityEn": "Made to order / Per unit",
  "noteEs": "Diseño propio · Mockup referencial",
  "noteEn": "Original design · Reference mockup",
  "descEs": "Descripción técnica de la pieza",
  "descEn": "Technical description of the piece"
}
```

Tras editar `content/portfolio.json`, se ejecuta:
```bash
npm run build
npm run audit:local
```

---

## 5. Edición de Textos en Español e Inglés

Para modificar textos de navegación, biografía, servicios o tablas de materiales:
- **Español:** `content/es.json`
- **Inglés:** `content/en.json`

Al guardar los cambios, compila con `npm run build` para actualizar automáticamente `index.html` y `en/index.html`.
