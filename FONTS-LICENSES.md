# REGISTRO DE LICENCIAS Y TIPOGRAFÍAS — KINGDOM

Este documento recopila el inventario de fuentes tipográficas autohospedadas (self-hosted) utilizadas en el proyecto, su formato técnico, ubicación en el repositorio y estado de licenciamiento.

---

## 1. Montserrat Variable
- **Uso en el sitio:** Tipografía principal de lectura, navegación, descripciones, formularios, tablas técnicas y componentes accesibles.
- **Ubicación:** `assets/fonts/montserrat-*.woff2`
- **Formatos:** WOFF2 Variable (pesos 100 a 900) con subconjuntos latinos y extendidos.
- **Diseñador / Fundición:** Julieta Ulanovsky, Sol Matas, Juan Pablo del Peral, Jacques Le Bailly.
- **Licencia:** **SIL Open Font License (OFL) v1.1**.
- **Permisos:** Uso comercial, web, modificación y redistribución local sin restricciones.

---

## 2. Sefa
- **Uso en el sitio:** Títulos principales (H1 del hero, H2 cortos de sección, acentos de marca y encabezados de portafolio).
- **Ubicación:**
  - `assets/fonts/sefa.woff2` (compresión web optimizada WOFF2, ~12 KB).
  - `assets/fonts/sefa.ttf` (archivo TrueType local de respaldo).
  - `assets/fonts/SEFA-LICENSE.txt` (licencia de distribución del autor).
- **Formatos:** WOFF2 (primario con preload) y TTF (fallback local con `font-display: swap`).
- **Diseñador / Fundición:** ArtiXLabs / Lukman Dsgn (`https://www.creativefabrica.com/designer/artixlabs/`, PayPal: `https://www.paypal.com/paypalme/lkmdsgn`).
- **Origen del archivo:** Instalación local en sistema `C:\Users\Dell\AppData\Local\Microsoft\Windows\Fonts\Sefa (TTF).ttf` y paquete de distribución `C:\Users\Dell\Downloads\sefa`.
- **Licencia:** **Free Font License** (100% Free for personal and commercial use).
- **Permisos:** Uso personal y comercial en logotipos, productos digitales, impresos y modificaciones outline autorizadas.
- **Cobertura de glifos:** Verificada con soporte para `á, é, í, ó, ú, ü, ñ, Ñ, &, ×, 0-9`. Glifos `¿` y `¡` no incluidos nativamente por el autor (gestionados con fallback seguro en el stack tipográfico).

---

## 3. Fuentes Históricas / Retiradas
- **Aerosoldier Drip:**
  - **Estado:** Retirada y eliminada completamente de `assets/fonts/` (`aerosoldier-drip.otf` y `aerosoldier-drip.woff2`).
  - **Motivo de retiro:** Reemplazada por motivo de licencia para garantizar cumplimiento estricto y uso comercial 100% libre mediante la tipografía Sefa.
- **Graffiti City.otf:**
  - **Estado:** Retirada y eliminada de `assets/fonts/`.
  - **Motivo de retiro:** Sustitución estética y optimización de bundle estático.
