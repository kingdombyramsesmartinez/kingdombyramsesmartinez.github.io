# KINGDOM — REPORTE DE FASE 2: DATOS DEL PORTAFOLIO, TÍTULOS, GLIFOS Y PRECIOS

**Fecha:** 14 de octubre de 2026  
**Rama de trabajo:** `mejora-2026-10`  
**Ejecutor:** Antigravity (Pair Programming con Ramses Martínez)  
**Documento base:** `docs/KINGDOM-plan-mejora-portafolio.md` (Revisión 4)  
**Estado:** Fase 2 completada con éxito. Pruebas y auditorías al 100%.

---

## 1. Resumen de objetivos cumplidos

Se implementaron todos los requerimientos de la Fase 2 orientados a la profesionalización y orden técnico del catálogo:
1. **Fuente única de verdad (`content/portfolio.json` y `data/portfolio.json`):** Estructura de datos estandarizada con los 39 ítems y todos los campos requeridos (`id`, `titulo`, `cliente`, `tipo`, `categoria`, `tecnica`, `prenda`, `tela`, `estado`, `precio_usd`, `descripcion`, `imagen`, `miniatura`, `alt`).
2. **Títulos estandarizados:** Aplicación estricta de los 39 títulos normalizados bajo el formato `Cliente — Prenda · Técnica` (Sección 5 del plan maestro), respetando mayúsculas, tildes y caracteres especiales.
3. **Descripciones individuales sobrias:** Redacción de 1 a 2 frases por pieza basadas exclusivamente en datos reales comprobados (prenda, técnica textil y tela). Prohibida la invención de resultados o métricas.
4. **Textos alternativos (`alt`) específicos:** Cada imagen cuenta con un texto alternativo descriptivo detallando prenda, técnica y cliente, eliminando la plantilla repetitiva anterior.
5. **Precios oficiales al detal (Sección 4):**
   - Chaqueta sublimada: `$35`
   - Chaqueta IMPA bordada: `$25`
   - Franela sublimada manga larga: `$18`
   - Franela sublimada manga corta: `$15`
   - Franela con DTF: `$20`
   - Camisa de béisbol (Gigantes BC): `$25`
   - Chemise sublimada: `$18`
   - Camisas corporativas: `$25 con 2 logos bordados · $35 con 5 logos bordados` (sin precio único rígido por pieza)
   - Matriz de bordado: `Desde $5`
   - Tarjetas de presentación: `$5 diseño · $15 (100 impresas con diseño)`
   - Piezas con precio en blanco (`""`): "Academia de Cuatro" (por no especificar longitud de manga en el título) y todas las piezas de `fanart`, `encargo-marca` o propuestas no confirmadas.
6. **Renombrado masivo a minúsculas y ASCII:** 51 archivos de imágenes en `assets/artwork/` y sus 51 miniaturas correspondientes en `assets/artwork/thumbs/` fueron renombrados mediante `git mv` eliminando espacios, mayúsculas y corrigiendo erratas históricas (`guerreras-sc`, `impa-chaqueta-bordada`, `jswim-academy`, `listaprecio-com`, etc.). Se generó el registro completo en `reportes/renombres.csv`.
7. **Compilación estática independiente (`scripts/build-portfolio.mjs`):** Script ejecutable con Node.js nativo (sin dependencias externas) y documentación en `README.md` sobre cómo editar y regenerar el catálogo.
8. **Contador dinámico del home:** Sincronizado desde el total real del JSON (39 presentaciones).
9. **Verificación integral de enlaces:** 0 enlaces rotos, 0 errores 404 de recursos propios.

---

## 2. Inventario de renombres de imágenes (`reportes/renombres.csv`)

Se renombraron 51 archivos binarios principales y 51 miniaturas. Ejemplos representativos:
- `Alexauto-camisa corporativa.webp` → `alexauto-camisa-corporativa.webp`
- `IMPA-chaqueta bordadax.webp` → `impa-chaqueta-bordada.webp` (corrección de errata "bordadax")
- `Gerreras SC-franela manga corta sublimada.webp` → `guerreras-sc-franela-manga-corta-sublimada.webp` (corrección "Gerreras" → "guerreras")
- `Jswim Academi-chaqueta sublimada.webp` → `jswim-academy-chaqueta-sublimada.webp` (corrección "Academi" → "academy")
- `WWW.listaprecio.com-camisa corporativa.webp` → `listaprecio-com-camisa-corporativa.webp`
- `Gigantes BC- camisa de beisbol sublimada .webp` → `gigantes-bc-camisa-de-beisbol-sublimada.webp`
- `academia de cuatro-franela sublimada.webp` → `academia-de-cuatro-franela-sublimada.webp`

*Nota:* Los archivos institucionales con insignias oficiales (`alcaldia de san felipe...` y `TSJ...`) no fueron modificados ni eliminados, conforme a la decisión de Ramses.

---

## 3. Decisiones técnicas y compatibilidad

1. **Paridad bilingüe completa (ES y EN):** Cada pieza en `content/portfolio.json` incluye tanto los campos estandarizados en español (`titulo`, `descripcion`, `alt`, `tecnica`, `prenda`, `tela`, `estado`) como sus equivalentes en inglés (`titulo_en`, `descripcion_en`, `alt_en`, `tecnica_en`, `prenda_en`, `tela_en`, `estado_en`), garantizando que la versión `/en/portfolio.html` cuente con idéntico nivel de detalle y precisión.
2. **Retrocompatibilidad:** Se preservaron los alias tradicionales (`titleEs`, `titleEn`, `descEs`, `descEn`, `image`, `thumb`, etc.) para asegurar que cualquier script existente o visor dinámico mantenga operatividad inmediata.
3. **Filtros por categoría en Portafolio:** Se sincronizó `category` y `categoria` para asegurar que el filtrado por botones ("Todos", "Sublimación Deportiva", "Streetwear & Gráfica", "Branding & Corporativo") opere con fluidez en desktop, tablet y móviles sin ocultar elementos erróneamente.

---

## 4. Resultados de pruebas y auditorías

| Prueba / Auditoría | Comando | Resultado | Estado |
|---|---|---|---|
| Sintaxis JavaScript | `npm run check:js` | 14 archivos analizados | **0 errores (PASS)** |
| Auditoría del Sitio | `npm run audit:local` | 17 páginas HTML, 4 CSS | **0 violaciones, 0 enlaces rotos (PASS)** |
| Tests de Auditor (Regresión) | `npm test` | 33 pruebas unitarias | **33 pasados, 0 fallos (PASS)** |
| E2E Playwright + axe | `npx playwright test` | 135 pruebas en 3 viewports | **127 pasados, 8 skipped (PASS)** |

---

## 5. Pendientes comerciales para confirmación de Ramses

1. **Ortografía de cliente:** Confirmar si el cliente `Jswim Academy` prefiere legal/comercialmente la grafía internacional "Academy" o la variante previa "Academi".
2. **Promesa comercial "Diseño incluido al producir con Kingdom":** Confirmar si se publicará oficialmente en el cotizador y servicios de la Fase 3.
3. **Formas de pago y facturación (Decisión C y D):** Confirmar si se aceptan bolívares a tasa oficial BCV del día, transferencias bancarias o Pago Móvil para incorporarlo en la tabla de precios y FAQ.

---

## 6. Cómo probar los cambios localmente

```bash
# 1. Regenerar los HTML estáticos desde el JSON:
node scripts/build-portfolio.mjs
# o mediante:
npm run build

# 2. Ejecutar auditoría local completa:
npm run audit:local

# 3. Correr la suite de pruebas End-to-End:
npm run test:e2e
```
