# KINGDOM by Ramses Martínez — Portafolio Web

Sitio oficial de portafolio y marca personal de **Ramses Martínez**: digitalización de matrices de bordado industrial (DST / PES), sublimación deportiva full print e indumentaria personalizada en Barquisimeto, Venezuela.

---

## Cómo editar el portafolio (Descripciones y Precios)

El sitio utiliza una arquitectura de generación estática. **Nunca edites directamente los archivos `.html` generados.**

### 1. Fuente única de verdad de las piezas
Los datos de las 39 piezas del portafolio residen en:
- `content/portfolio.json` (fuente principal utilizada por el build)
- `data/portfolio.json` (réplica sincronizada)

Cada pieza contiene la siguiente estructura estandarizada:

```json
{
  "id": "alexauto",
  "titulo": "Alexauto — Camisa corporativa",
  "titulo_en": "Alexauto — Corporate Work Shirt",
  "cliente": "Alexauto",
  "tipo": "cliente",
  "categoria": "branding",
  "tecnica": "Confección textil y bordado computarizado",
  "tecnica_en": "Garment tailoring and computerized embroidery",
  "prenda": "Camisa corporativa",
  "prenda_en": "Corporate button-down shirt",
  "tela": "Algodón",
  "tela_en": "Cotton",
  "estado": "ejecutado",
  "estado_en": "completed",
  "precio_usd": "$25 con 2 logos bordados · $35 con 5 logos bordados",
  "descripcion": "Camisa corporativa de trabajo para Alexauto con logotipos de marca bordados en alta precisión.",
  "descripcion_en": "Corporate work shirt for Alexauto featuring precision computerized embroidered brand logos.",
  "imagen": "assets/artwork/alexauto-camisa-corporativa.webp",
  "miniatura": "assets/artwork/thumbs/alexauto-camisa-corporativa.webp",
  "alt": "Camisa corporativa para Alexauto con bordados institucionales de precisión",
  "alt_en": "Corporate button-down shirt for Alexauto with precision embroidered company logos"
}
```

### 2. Reglas para editar descripciones
- Redactar entre 1 y 2 frases sobrias y descriptivas.
- Usar **únicamente datos reales y conocidos** (cliente, prenda, técnica textil y tela si aplica).
- **Prohibido** inventar resultados comerciales, métricas o promesas no verificables.
- Mantener la paridad en inglés en los campos correspondientes (`descripcion_en`, `alt_en`, etc.).

### 3. Reglas para precios oficiales
- Todos los precios son **al detal** (por unidad), referenciales en USD.
- **Precios oficiales del sitio (Sección 4 del plan):**
  - Chaqueta sublimada (Novak Repel): `$35`
  - Chaqueta bordada (ej. IMPA): `$25`
  - Franela sublimada manga larga (Dry-Fit): `$18`
  - Franela sublimada manga corta (Dry-Fit): `$15`
  - Franela con DTF (Algodón 20/1): `$20`
  - Camisa de béisbol sublimada (Gigantes BC): `$25`
  - Chemise sublimada: `$18`
  - Camisa corporativa: `$25 con 2 logos bordados · $35 con 5 logos bordados`
  - Matriz de bordado DST/PES: `Desde $5`
  - Tarjetas de presentación: `$5 diseño · $15 (100 impresas con diseño)`
- **Restricciones legales estrictas:**
  - Las piezas de `fanart` y `encargo-marca` **NUNCA** llevan precio (campo `precio_usd: ""`).
  - Las piezas sin tipo de manga definido (ej. "Academia de Cuatro") o propuestas no confirmadas llevan `precio_usd: ""`.

---

## Cómo regenerar el sitio web

Una vez editados los archivos de datos o plantillas, ejecuta cualquiera de los siguientes comandos en la terminal:

```bash
# Opción 1 (comando estándar de build):
npm run build

# Opción 2 (script independiente sin dependencias externas):
node scripts/build-portfolio.mjs
```

El build compilará automáticamente las páginas estáticas tanto en español como en inglés:
- `index.html` y `en/index.html`
- `portfolio.html` y `en/portfolio.html`

---

## Verificación y Pruebas

Para garantizar que no existan enlaces rotos ni violaciones de accesibilidad, seguridad o sintaxis:

```bash
# 1. Comprobar sintaxis JS:
npm run check:js

# 2. Ejecutar auditoría estricta de enlaces, CSP e imágenes:
npm run audit:local

# 3. Ejecutar pruebas unitarias de auditoría:
npm test

# 4. Ejecutar suite completa End-to-End y accesibilidad (Playwright + axe):
npm run test:e2e
```
