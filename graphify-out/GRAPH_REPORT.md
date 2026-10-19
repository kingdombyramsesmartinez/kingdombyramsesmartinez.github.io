# Graph Report - kingdom by ramses martinez portafolio  (2026-10-19)

## Corpus Check
- Large corpus: 251 files · ~1,125,013 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 357 nodes · 386 edges · 35 communities (29 shown, 6 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34

## God Nodes (most connected - your core abstractions)
1. `KINGDOM — Plan de mejora del portafolio web` - 14 edges
2. `@playwright/test` - 12 edges
3. `11. Prompts para Antigravity` - 10 edges
4. `KINGDOM — Informe de Auditoría y Estado Técnico para Revisión Externa (ChatGPT / Auditor Independiente)` - 10 edges
5. `KINGDOM — REPORTE DE FASE 1B: CIERRE DE FASE 1 Y PUBLICACIÓN TEMPRANA` - 9 edges
6. `Ponytail` - 8 edges
7. `scripts` - 7 edges
8. `Ponytail Help` - 7 edges
9. `AUDIT CONTEXT — KINGDOM by Ramses Martínez` - 7 edges
10. `3. Legal bajo leyes de Venezuela` - 7 edges

## Surprising Connections (you probably didn't know these)
- `4.2 P1 — Defectos Altos (Funcionalidad, Datos y Arquitectura)` --references--> `updateSummary()`  [INFERRED]
  reportes/FASE-4-AUDITORIA.md → assets/js/app.js
- `4. Decisiones de Diseño y Arquitectura Importantes` --references--> `assertNoUnreplacedTokens()`  [INFERRED]
  AUDIT_CONTEXT.md → tools/build-i18n.mjs
- `1. Resumen Ejecutivo de Correcciones (Fase B)` --references--> `assertNoUnreplacedTokens()`  [INFERRED]
  reportes/FASE-4.md → tools/build-i18n.mjs
- `4. Datos estructurados JSON-LD estáticos en el build` --references--> `buildJsonLd()`  [INFERRED]
  reportes/FASE-1B.md → tools/build-i18n.mjs
- `7. Archivos modificados en la Fase 1B` --references--> `buildJsonLd()`  [INFERRED]
  reportes/FASE-1B.md → tools/build-i18n.mjs

## Import Cycles
- None detected.

## Communities (35 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (32): 0. Alcance de esta revisión, 10. Decisiones que solo tú puedes tomar, 11. Prompts para Antigravity, 12. Después de publicar (lo haces tú), 1. Hallazgos (solo lo malo), 2. Prioridades y orden de ejecución, 3.1 Qué aplica y qué hacer, 3.2 Contenido mínimo de cada página legal (para Antigravity) (+24 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (30): 4. Decisiones de Diseño y Arquitectura Importantes, 4. Datos estructurados JSON-LD estáticos en el build, 7. Archivos modificados en la Fase 1B, 1. Resumen Ejecutivo de Correcciones (Fase B), 4.1 P0 — Bloqueantes de Publicación, assertNoUnreplacedTokens(), buildJsonLd(), configData (+22 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (10): @axe-core/playwright, @playwright/test, PAGES, PAGES, PAGES, PORTFOLIO_PAGES, PAGES, PAGES (+2 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (19): devDependencies, @axe-core/playwright, @fontsource-variable/montserrat, @playwright/test, sharp, ttf2woff2, name, private (+11 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (11): sharp, pages, viewports, files, animeIds, institutionalIds, items, raw (+3 more)

### Community 5 - "Community 5"
Cohesion: 0.20
Nodes (10): buildDetailsText(), closeNav(), getSelectedQty(), getSelectedService(), openModal(), renderPrice(), setOptional(), toggleNav() (+2 more)

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (14): 1.1 Entorno y Dependencias, 1.2 Scripts en `package.json`, 1. Stack Tecnológico, Versiones y Scripts, 2.1 Estado de Git (`git status`), 2.2 Resumen Estadístico (`git diff --stat`), 2.3 Commits Locales Pendientes de Push hacia `main`, 2. Resumen de Cambios Locales no Publicados, 3.1 Ponytail (`.agents/skills/ponytail/` y `.agents/rules/AGENTS.md`) (+6 more)

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (13): 1. Declaración de Integridad y Preservación Local, 2.1 Archivos modificados bajo control de versiones (21 archivos), 2.2 Archivos no rastreados (Untracked / Nuevos), 2. Inventario de Archivos en el Repositorio de Trabajo, 3. Resumen Técnico del Diff, 4. Resultados de Comandos y Códigos de Salida, 5. Pruebas Automatizadas de Playwright y Accesibilidad (Axe-Core), 6. Auditoría de Calidad y Rendimiento Móvil (Lighthouse 13.5.0) (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (13): artworkDir, classifyFile(), counts, __dirname, files, groups, itemsParsed, overridesJsonPath (+5 more)

### Community 9 - "Community 9"
Cohesion: 0.18
Nodes (6): defaultRoot, __dirname, PROHIBITED_MARKETING_PHRASES, runAudit(), walk(), STRICT_FORBIDDEN_ALL

### Community 10 - "Community 10"
Cohesion: 0.17
Nodes (11): 2.1 Verificación de Sintaxis y Linting, 2.2 Pruebas Unitarias y de Integración, 2.3 Compilación y Detección Fail-Fast, 2.4 Auditoría Estática Local, 2.5 Pruebas E2E Multi-Viewport (Playwright), 2.6 Auditoría de Calidad y Rendimiento (Lighthouse Móvil), 2. Resultados de las Baterías de Pruebas (Fase C), 3. Verificación Visual y Responsive (+3 more)

### Community 11 - "Community 11"
Cohesion: 0.20
Nodes (7): configPath, __dirname, rawConfig, SITE_CONFIG, __dirname, result, root

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (10): 1.1. Cotizador Interactivo Rediseñado (Sección 6 del Plan), 1.2. Precios Oficiales y Tarjetas de Servicios (Secciones 4 y 6), 1.3. Home: Muestra de Piezas Destacadas de Clientes (Sección 3.3 y Fase 3), 1.4. Preguntas Frecuentes (FAQ) Técnicas, 1.5. Eventos de Google Analytics (GA4), 1. Resumen de Implementación, 2. Decisiones Pendientes (Decisiones B–D), 3. Resultados de Pruebas y Auditorías Automatizadas (+2 more)

### Community 13 - "Community 13"
Cohesion: 0.18
Nodes (10): 1. Inventario de Entorno y Herramientas, 2.1 `git status --short --branch`, 2.2 `git diff --stat`, 2.3 `git diff --check`, 2. Estado Inicial del Árbol de Trabajo (`git status` y `git diff --stat`), 3. Resultados de Comandos de Verificación en Línea Base (Antes de Reparar), 4.2 P1 — Defectos Altos (Funcionalidad, Datos y Arquitectura), 4.3 P2 — Defectos Medios (Marca Personal, Contenido, CSS Auxiliar y Formato) (+2 more)

### Community 14 - "Community 14"
Cohesion: 0.20
Nodes (9): 1. Archivos con insignias oficiales (Alcaldía de San Felipe y TSJ), 2. Pieza "Ford Ka Edition" y privacidad en imágenes, 3.1 Artículos previamente citados y su propósito original:, 3.2 Modificación aplicada:, 3. Páginas legales — Ley sobre el Derecho de Autor y portafolio, 5. Diagnóstico de publicación y estado de ramas, 6. Resultados de pruebas y auditorías automatizadas, 8. Pendientes para siguientes fases (+1 more)

### Community 15 - "Community 15"
Cohesion: 0.22
Nodes (8): Boundaries, Intensity, Output, Persistence, Ponytail, Rules, The ladder, When NOT to be lazy

### Community 16 - "Community 16"
Cohesion: 0.39
Nodes (6): clearGACookies(), createBanner(), disableGATracking(), enableGATracking(), loadGA(), gtag()

### Community 17 - "Community 17"
Cohesion: 0.25
Nodes (7): Configure Default Mode, Deactivate, Levels, More, Ponytail Help, Skills, Update

### Community 18 - "Community 18"
Cohesion: 0.25
Nodes (7): 1. Fuente única de verdad de datos y configuración, 2. Reglas para editar descripciones, 3. Reglas para precios oficiales, Cómo editar el portafolio (Descripciones y Precios), Cómo regenerar el sitio web, KINGDOM by Ramses Martínez — Portafolio Web, Verificación y Pruebas

### Community 19 - "Community 19"
Cohesion: 0.29
Nodes (5): collectFiles(), DEFAULT_DIRS, EXCLUDED_DIRS, runSyntaxCheck(), VALID_EXTS

### Community 20 - "Community 20"
Cohesion: 0.25
Nodes (7): 1. Resumen de objetivos cumplidos, 2. Inventario de renombres de imágenes (`reportes/renombres.csv`), 3. Decisiones técnicas y compatibilidad, 4. Resultados de pruebas y auditorías, 5. Pendientes comerciales para confirmación de Ramses, 6. Cómo probar los cambios localmente, KINGDOM — REPORTE DE FASE 2: DATOS DEL PORTAFOLIO, TÍTULOS, GLIFOS Y PRECIOS

### Community 21 - "Community 21"
Cohesion: 0.29
Nodes (4): __dirname, __filename, MIME_TYPES, ROOT_DIR

### Community 22 - "Community 22"
Cohesion: 0.29
Nodes (6): artworkDir, csvLines, files, renameMap, root, thumbsDir

### Community 23 - "Community 23"
Cohesion: 0.33
Nodes (4): dataDir, enriched, items, root

### Community 24 - "Community 24"
Cohesion: 0.33
Nodes (5): csvPath, lines, renombres, root, targets

### Community 25 - "Community 25"
Cohesion: 0.40
Nodes (4): Boundaries, Hunt, Output, Tags

### Community 26 - "Community 26"
Cohesion: 0.40
Nodes (4): Boundaries, Honesty boundary, Ponytail Gain, Scoreboard

### Community 27 - "Community 27"
Cohesion: 0.40
Nodes (4): Boundaries, Examples, Format, Scoring

### Community 28 - "Community 28"
Cohesion: 0.50
Nodes (3): Boundaries, Output, Scan

## Knowledge Gaps
- **2 isolated node(s):** `@fontsource-variable/montserrat`, `ttf2woff2`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 256 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sharp` connect `Community 4` to `Community 8`, `Community 3`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **What connects `@fontsource-variable/montserrat`, `ttf2woff2` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Why does `4.1 P0 — Bloqueantes de Publicación` connect `Community 1` to `Community 13`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08172043010752689 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._