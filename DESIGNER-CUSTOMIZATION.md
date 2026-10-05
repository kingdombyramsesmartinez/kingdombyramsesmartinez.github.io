# KINGDOM — DESIGNER CUSTOMIZATION MANUAL
## Guía de Personalización Visual y de Marca (Master Spec v2.0)

Este documento permite a un diseñador gráfico modificar la identidad visual, colores, logos, imágenes, portafolio y textos de KINGDOM sin necesidad de reprogramar la arquitectura JavaScript o reconstruir la estructura HTML.

---

## 1. Dónde cambiar los colores y la atmósfera visual

Todos los colores, brillos (glows), bordes y radios están centralizados en el bloque `:root` al inicio de:
📁 `assets/css/style.css`

```css
:root {
  /* Paleta de Marca Principal */
  --brand-bg: #07070a;            /* Fondo oscuro principal */
  --brand-surface: #0e0f14;       /* Superficie de paneles */
  --brand-card: rgba(18, 20, 28, 0.70); /* Fondo de tarjetas */
  --brand-gold: #ffc500;          /* Oro cibernético corporativo */
  --brand-gold-bright: #ffe066;   /* Oro brillante / highlights */
  --brand-red: #ff1e42;           /* Rojo láser de acentos */
  --brand-cyan: #00f0ff;          /* Cyan holográfico */
  --brand-green: #00ff88;         /* Verde de telemetría online */

  /* Textos */
  --text-primary: #f5f6fa;        /* Texto principal blanco */
  --text-secondary: #c2c5d1;      /* Texto de apoyo plata/humo */
  --text-muted: #73778a;          /* Texto secundario / telemetría */

  /* Bordes y Cristales */
  --border-soft: rgba(255, 255, 255, 0.08);
  --border-glass: rgba(255, 255, 255, 0.15);
  --border-brand: rgba(255, 197, 0, 0.40);

  /* Radios de Esquinas */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
}
```

---

## 2. Dónde cambiar el logo y el favicon

- **Logo principal de navegación y marca:**
  - Archivo: `assets/logo-yellow.webp` (o sustituir en `index.html` por un SVG vectorial en `assets/brand/`).
  - ViewBox recomendado: `0 0 500 337`.
  - Área segura: 10% del alto alrededor del símbolo.
- **Favicon del navegador:**
  - Archivo: `assets/favicon.png` (256x256 px o SVG transparente).
  - Apple touch icon: 180x180 px.

---

## 3. Dónde cambiar las imágenes del Hero y Portafolio

Todas las imágenes se ubican en la carpeta `assets/`:

| Elemento | Archivo | Dimensiones recomendadas |
|---|---|---|
| Hero Banner principal | `assets/hero-banner.webp` | 1920x810 o 1600x900 px |
| Tag central del holograma | `assets/streetwear-tag.webp` | 800x428 px |
| Amigo Café FC (Sublimación) | `assets/work-amigoscafe.webp` | 900x1125 px (aspect-ratio 4:3) |
| Alcaldía de Iribarren (Bordado) | `assets/work-alcaldia.webp` | 900x1125 px |
| Chevrolet Camaro (Bordado) | `assets/work-camaro.webp` | 900x1125 px |
| Dragon Ball Super (Vectorial) | `assets/work-dbs.webp` | 900x1125 px |
| Katsuki Bakugo (Arte Textil) | `assets/work-bakugo.webp` | 900x1125 px |
| Tarjetas Corporativas (Diseño) | `assets/work-tarjetas.webp` | 1200x892 px |

---

## 4. Dónde cambiar los proyectos del Portafolio

En `index.html`, dentro de la sección `<section class="portfolio" id="trabajos">`, cada proyecto se define con una tarjeta `<article class="p-card ...">`.

Cada tarjeta incluye:
1. `data-category`: categoría para los filtros (`bordado`, `sublimacion`, `vector`, `branding`).
2. Imagen `<img>` con `src`, `alt`, `width` y `height`.
3. Título del proyecto y badge técnico de especificación.
4. Datos del modal de inspección:
   - `data-stitches`: puntadas estimadas (ej. 42.500 puntadas o N/A).
   - `data-colors`: número de colores/tintas.
   - `data-machine`: tipo de maquinaria o técnica.

---

## 5. Dónde cambiar los enlaces de contacto y redes sociales

En `index.html`:
- **WhatsApp:** Buscar los enlaces `https://wa.me/584126785058` y reemplazar el número o el texto codificado en `text=`.
- **Email:** Enlace `mailto:kingdombrandbqto@gmail.com`.
- **Teléfono directo:** Enlace `tel:+584126785058`.
- **Instagram / TikTok / LinkedIn:** Enlaces en la sección `<section id="kingdom">` y en el footer.

---

## 6. Dónde editar las cláusulas legales y claims comerciales

- Los avisos de propiedad intelectual y no-patrocinio sobre marcas de terceros están en `legal/intellectual-property.html`.
- Términos de servicio y entregas en `legal/terms.html`.
- Política de privacidad en `legal/privacy.html`.
- Registro de afirmaciones comerciales verificables en `MARKETING-CLAIMS-REGISTER.md`.
