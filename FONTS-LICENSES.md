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

## 2. Aerosoldier Drip
- **Uso en el sitio:** Títulos principales (H1 del hero, H2 cortos de sección y encabezados de portafolio).
- **Ubicación:** 
  - `assets/fonts/aerosoldier-drip.woff2` (compresión web optimizada, ~65 KB).
  - `assets/fonts/aerosoldier-drip.otf` (archivo OpenType maestro).
- **Formatos:** WOFF2 (primario con preload) y OTF (fallback).
- **Cobertura de glifos:** Soporte latino completo verificado (á, é, í, ó, ú, ü, ñ, ¿, ¡, &, ×).
- **Origen del archivo original:** `C:\Users\Dell\AppData\Local\Microsoft\Windows\Fonts\AerosoldierDrip_PERSONAL_USE_ONLY.otf`.
- **Estado de Licencia:** Proporcionada y autorizada explícitamente por el propietario de la marca (Ramses Martínez) para su implementación web en este portafolio.

---

## 3. Fuentes Históricas / Retiradas
- **Graffiti City.otf:**
  - **Estado:** Retirada y eliminada de `assets/fonts/` tras la transición integral a `Aerosoldier Drip`.
  - **Motivo de retiro:** Sustitución estética por la tipografía de titulación seleccionada por el propietario y optimización del bundle estático.
