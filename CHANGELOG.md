# CHANGELOG — KINGDOM WEAR v3.0

## [3.0.0] - 2026-10-02

### Rediseño Integral (Luxury Industrial / Editorial Textile / Glassmorphism)
- **Eliminación Total del Tema Cyber/Neón:**
  - Retirados los elementos HUD, scanlines, retículas neón, cursor personalizado invasivo, simulación de audio sintetizado y rail de hilo.
  - Eliminado el motor 3D experimental con Canvas 2D / pseudo-render, sustituido por una presentación editorial fotográfica real y fichas técnicas de compatibilidad de materiales.
- **Nuevo Sistema Cromático v3.0:**
  - Base monocromática dominante (negro profundo `#070706`, blanco natural `#F7F7F4`, grises cálidos).
  - Acentos controlados: verde oliva táctico (`#7A8058`, 3–7%) y beige natural (`#E9E0D0`, 2–6%).
- **Glassmorphism y Botones Biselados 3D:**
  - Superficies con `backdrop-filter: blur(16px)` calibradas para alto contraste y legibilidad.
  - Botones principales `.btn-premium` con relieve táctil sobrio, bisel 3D superior e inferior y respuesta física natural.
- **Tipografía y Microinteracciones:**
  - Estructura editorial en Montserrat para lectura fluida, títulos semánticos H1/H2 y clases `.link-magic` para enlaces con subrayado animado CSS nativo sin JavaScript.
- **Assets Vectoriales de Marca:**
  - Creados `assets/brand/logo.svg` y `assets/brand/favicon.svg` oficiales.
  - Creado `assets/js/site.config.js` para centralizar datos de marca, teléfonos y canales de contacto.
- **Auditoría Local y Rendimiento:**
  - Script `npm run audit:local` superado con 8 páginas HTML verificadas y 0 enlaces o assets rotos.
