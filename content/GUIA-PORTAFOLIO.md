# GUÍA: Gestión del Portafolio, Propuestas y Precios (Kingdom v5)

Todas las piezas y presentaciones del portafolio se configuran en el archivo único:
📁 `content/portfolio.json`

Después de editar cualquier texto, precio o imagen, regenera el sitio con:
```bash
npm run build
npm run audit:local
```

---

## 1. Estructura de una Pieza Básica

Cada objeto dentro del array `portfolio.json` representa una tarjeta en el portafolio:

```json
{
  "id": "mi-diseno",
  "image": "assets/artwork/art-mi-diseno.webp",
  "altEs": "Descripción de la imagen en español",
  "altEn": "Image description in English",
  "titleEs": "Nombre del Diseño",
  "titleEn": "Design Name",
  "category": "sublimacion",
  "techniqueEs": "Sublimación Deportiva Full Print",
  "techniqueEn": "Full Print Sports Sublimation",
  "garmentEs": "Jersey técnico / Dry-Fit",
  "garmentEn": "Performance Dry-Fit Jersey",
  "availabilityEs": "Bajo pedido / Por unidad",
  "availabilityEn": "Made to order / Per unit",
  "noteEs": "Diseño propio · Mockup referencial.",
  "noteEn": "Original design · Concept mockup.",
  "descEs": "Descripción técnica de la prenda o arte.",
  "descEn": "Technical description of the apparel or art."
}
```

---

## 2. Cómo añadir la Etiqueta "Propuesta" y Datos Específicos

Si deseas que la tarjeta tenga una cinta visible de "Propuesta" arriba a la izquierda y datos detallados al hacer clic:

| Campo | Función | Dónde se muestra |
|---|---|---|
| `"ribbonEs"` / `"ribbonEn"` | Texto de la cinta superior (ej. `"Propuesta"` / `"Proposal"`) | En la tarjeta y en el modal |
| `"statusEs"` / `"statusEn"` | Aviso destacado de estado (ej. `"Propuesta presentada al cliente."`) | En el modal arriba |
| `"fabricEs"` / `"fabricEn"` | Tipo de tela ofrecida (ej. `"Taslán impermeable"`) | En la ficha técnica |
| `"priceFinal"` | Precio unitario o por lote (ej. `"USD 35.00 / Unidad"`) | En la ficha técnica |
| `"storyEs"` / `"storyEn"` | Explicación o contexto del diseño | Párrafo inferior del modal |

Ejemplo:
```json
"ribbonEs": "Propuesta",
"ribbonEn": "Proposal",
"statusEs": "Propuesta presentada al cliente. Muestra técnica de chaqueta combinada.",
"statusEn": "Proposal presented to the client. Combined jacket technical sample.",
"fabricEs": "Taslán impermeable con forro térmico microfibra",
"fabricEn": "Waterproof Taslan with microfiber thermal lining",
"priceFinal": "USD 35.00 / Unidad",
"storyEs": "Propuesta integral desarrollada con paleta institucional.",
"storyEn": "Comprehensive concept developed with institutional palette."
```

---

## 3. Carrusel de Propuestas Múltiples (Varias Imágenes y Descripciones en un Mismo Diseño)

Cuando presentas a un cliente **varias propuestas o variantes para un mismo proyecto**, puedes agregar la propiedad `"proposals"` con una lista de imágenes adicionales. Cada una tendrá sus propias flechas (`‹` y `›`), puntos de navegación, y sus descripciones, telas y precios **100% independientes**:

```json
{
  "id": "proyecto-cliente",
  "image": "assets/artwork/art-propuesta-1.webp",
  "titleEs": "Proyecto Cliente — Opción 1 (Chaqueta)",
  "titleEn": "Client Project — Option 1 (Jacket)",
  "category": "sublimacion",
  "techniqueEs": "Sublimación & Confección",
  "techniqueEn": "Sublimation & Assembly",
  "garmentEs": "Chaqueta institucional",
  "garmentEn": "Corporate Jacket",
  "fabricEs": "Taslán impermeable",
  "fabricEn": "Waterproof Taslan",
  "priceFinal": "USD 35.00 / Unidad",
  "descEs": "Primera propuesta: Chaqueta con vivos reflectivos.",
  "descEn": "First proposal: Jacket with reflective piping.",
  "storyEs": "Opción principal para climas fríos.",
  "storyEn": "Main option for cold weather.",
  "ribbonEs": "Propuesta",
  "ribbonEn": "Proposal",
  "proposals": [
    {
      "image": "assets/artwork/art-propuesta-2.webp",
      "altEs": "Opción 2 — Franela Deportiva",
      "altEn": "Option 2 — Sports T-Shirt",
      "titleEs": "Proyecto Cliente — Opción 2 (Franela)",
      "titleEn": "Client Project — Option 2 (T-Shirt)",
      "techniqueEs": "Sublimación Dry-Fit Full Color",
      "techniqueEn": "Full Color Dry-Fit Sublimation",
      "specsEs": "Microfibra Dry-Fit · Cuello V",
      "specsEn": "Dry-Fit Microfiber · V-Neck",
      "fabricEs": "Poliéster Dry-Fit antibacteriano 140g",
      "fabricEn": "140g Antibacterial Dry-Fit Polyester",
      "priceFinal": "USD 18.00 / Unidad",
      "statusEs": "Variante 2: Franela de entrenamiento a juego.",
      "statusEn": "Variant 2: Matching training t-shirt.",
      "descEs": "Segunda propuesta más ligera y económica.",
      "descEn": "Second lighter and more cost-effective proposal.",
      "storyEs": "Diseñada para jornadas de calor.",
      "storyEn": "Designed for hot weather workdays."
    },
    {
      "image": "assets/artwork/art-propuesta-3.webp",
      "titleEs": "Proyecto Cliente — Opción 3 (Gorra Bordada)",
      "titleEn": "Client Project — Option 3 (Embroidered Cap)",
      "techniqueEs": "Bordado 3D Computarizado",
      "techniqueEn": "3D Computerized Embroidery",
      "specsEs": "Gorra 6 Paneles · Cierre metálico",
      "specsEn": "6-Panel Cap · Metal buckle",
      "fabricEs": "Drill algodón pesado",
      "fabricEn": "Heavy cotton drill",
      "priceFinal": "USD 10.00 / Unidad",
      "statusEs": "Variante 3: Gorra complementaria.",
      "statusEn": "Variant 3: Complementary cap.",
      "descEs": "Accesorio institucional con bordado frontal en relieve.",
      "descEn": "Institutional accessory with 3D front embroidery.",
      "storyEs": "Propuesta de merchandising complementario.",
      "storyEn": "Complementary merchandising proposal."
    }
  ]
}
```

### Comportamiento del Modal Interactivo:
1. Al hacer clic en la tarjeta del portafolio se abre la ficha técnica mostrando la imagen principal.
2. Si existen propuestas en `"proposals"`, aparecen automáticamente las **flechas flotantes**, un **contador de diapositiva (ej. `1 / 3`)** y los **puntos indicadores**.
3. Al pasar de diapositiva (con clic o con las teclas `←` / `→`), **cambian instantáneamente**:
   - La imagen y su texto alternativo.
   - El título.
   - La técnica y especificación.
   - La tela ofrecida (`fabric`).
   - El precio unitario de esa variante (`priceFinal`).
   - La descripción y la historia/nota.
   - El mensaje predeterminado del botón de WhatsApp con la referencia exacta de la variante activa.
