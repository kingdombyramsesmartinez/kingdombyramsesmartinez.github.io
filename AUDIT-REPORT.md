# INVENTARIO Y REPORTE DE AUDITORÍA — KINGDOM v4 Redesign
## Portafolio & Identidad: Ramses Martínez × Kingdom

**Fecha:** 2026-10-06  
**Rama activa:** `v4-redesign`  
**Publicación objetivo:** GitHub Pages User Site (`https://kingdombyramsesmartinez.github.io/`)  
**Resultado de Auditoría Local (`npm run audit:local`):** `PASS` (11 páginas HTML y 3 CSS auditados, 0 frases prohibidas, 0 variables CSS indefinidas, 0 enlaces rotos, CSP estricta idéntica).

---

## 1. ESTADO POR ÁREAS DE LA DIRECTIVA v4 (CIERRE FASE 7)

| Área | Estado | Detalle Técnico |
|---|---|---|
| **Veracidad & Claims** | `PASS` | Eliminados todos los claims no comprobables ("planta propia", "control en planta", etc.). Datos biográficos alineados con CV oficial (Lima 2019, Kingdom 2021). |
| **Separación de Código** | `PASS` | Separación estricta de HTML, CSS y JS. Cero atributos `style=""` inline y cero scripts inline en templates ni páginas generadas. |
| **Paleta & Tokens** | `PASS` | Amarillo (`#ffc500`) eliminado por completo. Paleta activa: Base Negro/Gris/Blanco + Acentos Verde Oliva Táctico (`#7A8058`, `#92976E`) y Beige Natural (`#E9E0D0`). |
| **Tipografía** | `PASS` | `Aerosoldier Drip` (`.woff2` / `.otf`) local para títulos H1/H2 y acentos de marca. `Montserrat Variable` (`.woff2`) local para lectura y cuerpo. Cero peticiones de red o CDNs externas. |
| **Portafolio Dedicado** | `PASS` | Portafolio extraído a su propia página (`portfolio.html` y `en/portfolio.html`) con 55 piezas WebP optimizadas, filtros por técnica y modal con ficha técnica. |
| **Arquitectura Bilingüe** | `PASS` | Generador estático `tools/build-i18n.mjs` produce `/index.html` (ES), `/en/index.html` (EN), `portfolio.html` (ES) y `en/portfolio.html` (EN) desde fuentes JSON estructuradas. |
| **Traducción y Accesibilidad** | `PASS` | WCAG 2.1 AA verificado: atributos `translate="no"` en marcas/términos, `:focus-visible` destacado, `prefers-reduced-motion` respetado, todas las imágenes informativas con `alt` útil en ES y EN, imágenes decorativas con `aria-hidden="true"`. |
| **Seguridad & CSP** | `PASS` | Meta CSP estricta idéntica en las 11 páginas HTML. Sin `'unsafe-inline'` ni scripts externos. Archivo `_headers` documentado como inactivo en GitHub Pages y reservado para Cloudflare Pages. |
| **SEO & Manifest** | `PASS` | OG Image de 1200×630 generada (`assets/brand/og-image.png`), `sitemap.xml` con alternancias bidireccionales completas (incluyendo portafolio), `robots.txt` y `site-manifest.json` validados. |
| **CI / Automatización** | `PASS` | Scripts locales de auditoría y validación de assets en ejecución continua sin errores. |

---

## 2. INVENTARIO DE ARCHIVOS AUDITADOS

- `index.html`: Landing en español compilada desde plantilla maestra.
- `en/index.html`: Landing en inglés compilada desde plantilla maestra.
- `portfolio.html`: Galería técnica completa en español (55 piezas de presentación).
- `en/portfolio.html`: Galería técnica completa en inglés (55 piezas de presentación).
- `404.html`: Página de error estática personalizada con navegación de retorno.
- `templates/index.template.html`: Plantilla HTML maestra del home sin contenido hardcodeado.
- `templates/portfolio.template.html`: Plantilla HTML maestra del portafolio.
- `content/es.json` y `content/en.json`: Textos de marca, servicios, fichas técnicas y aviso de traducción del navegador.
- `content/portfolio.json`: 55 piezas de portafolio con datos técnicos, categorías y textos alternativos bilingües.
- `assets/css/style.css`: Hoja de estilos principal unificada con tokens de diseño v4 y tipografía local.
- `assets/css/legal.css`: Hoja de estilos de las páginas legales con foco visible y soporte de movimiento reducido.
- `assets/css/404.css`: Hoja de estilos de la página 404.
- `assets/js/app.js`: Lógica interactiva accesible (modal con trampa de foco, filtros dinámicos, menú móvil, cotizador).
- `assets/js/site.config.js`: Fuente única de configuración de marca, contacto y enlaces.
- `legal/*.html`: 6 páginas informativas legales (privacidad, términos, propiedad intelectual, cookies, seguridad, accesibilidad).
- `sitemap.xml`, `robots.txt`, `site-manifest.json`: Archivos de indexación, rastreo y aplicación web progresiva.
- `tools/build-i18n.mjs` y `tools/audit-site.mjs`: Herramientas de generación y auditoría local.

---

## 3. LO QUE NO SE PUDO VERIFICAR EN ESTE ENTORNO LOCAL

1. **Cabeceras HTTP en Producción:**
   - En este entorno local y en GitHub Pages no se pueden inspeccionar cabeceras HTTP de respuesta perimetrales como `Strict-Transport-Security` (HSTS), `X-Frame-Options` o `Permissions-Policy`, ya que GitHub Pages no admite configuración de cabeceras de servidor personalizadas.
2. **Entorno en Tiempo Real de Redes Sociales:**
   - La previsualización de Open Graph y Twitter Cards no puede ser validada en vivo con los depuradores de Facebook o Twitter/X hasta que los cambios sean publicados y accesibles públicamente en `https://kingdombyramsesmartinez.github.io/`.
3. **Flujo Real de Apertura en App Nativa de WhatsApp Móvil:**
   - Se probó la generación y codificación correcta de URLs `https://wa.me/...` con parámetros encodeados, pero la invocación directa de la aplicación móvil de WhatsApp requiere un dispositivo físico.
4. **Traducción Automática en Motores Reales de Navegadores:**
   - El marcado `translate="no"` y los atributos `lang` cumplen con las especificaciones estándar de Google Chrome, Edge, Safari y Firefox; la ejecución del servicio de traducción en la nube de cada navegador sólo se activa cuando el usuario navega desde un entorno con idioma configurado distinto al de la página.
