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

## 2. Sedgwick Ave Display
- **Uso en el sitio:** Títulos principales (H1 del hero, H2 cortos de sección, acentos de marca y encabezados de portafolio).
- **Ubicación:**
  - `assets/fonts/sedgwick-ave-display.woff2` (compresión web optimizada WOFF2, ~55 KB).
  - `assets/fonts/sedgwick-ave-display.ttf` (archivo TrueType local de respaldo).
  - `assets/fonts/SEDGWICK-OFL.txt` (licencia completa SIL Open Font License v1.1).
- **Formatos:** WOFF2 (primario con preload) y TTF (fallback local con `font-display: swap`).
- **Diseñador / Fundición:** The Sedgwick Ave Project Authors (Pedro Leal, Kevin Burke; Google Fonts).
- **Origen del archivo:** Paquete oficial `Sedgwick_Ave_Display.zip` descargado en `C:\Users\Dell\Downloads\`.
- **Licencia:** **SIL Open Font License (OFL) Version 1.1**.
- **Permisos:** 100% libre para uso personal y comercial, embedding web, empaquetado y modificación.
- **Cobertura de glifos:** Verificada con cobertura del 100% de los glifos requeridos: `á, é, í, ó, ú, ü, ñ, Ñ, ¿, ¡, &, ×, 0-9` (0 glifos faltantes en tabla `cmap`).

---

## 3. Fuentes Históricas / Retiradas
- **Sefa:**
  - **Estado:** Retirada y eliminada de `assets/fonts/`.
  - **Motivo de retiro:** Sustitución por Sedgwick Ave Display para contar con licencia estándar SIL Open Font License (OFL v1.1) y soporte nativo completo para caracteres de apertura en español (`¿`, `¡`).
- **Aerosoldier Drip:**
  - **Estado:** Retirada y eliminada completamente de `assets/fonts/`.
  - **Motivo de retiro:** Reemplazada por motivo de licencia para garantizar cumplimiento comercial 100% libre.
- **Graffiti City.otf:**
  - **Estado:** Retirada y eliminada de `assets/fonts/`.
  - **Motivo de retiro:** Sustitución estética y optimización de bundle estático.
