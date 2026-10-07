# DESIGN TOKENS SYSTEM — KINGDOM v4 (Street-Editorial Industrial)

## Fuente Única de Verdad de Diseño

Especificación técnica de variables CSS implementadas en `assets/css/style.css` y sincronizadas en `assets/js/site.config.js`:

### 1. Paleta de Marca (`:root`)

La dirección de color fue confirmada formalmente por Ramses Martínez: **se eliminó el amarillo corporativo** y se adoptó una base sobria con acentos tácticos textiles.

| Token CSS | Valor Hex / RGBA | Función |
|---|---|---|
| `--ink` | `#070706` | Fondo negro profundo de contraste editorial |
| `--surface` | `#0D0D0C` | Superficie primaria de tarjetas y paneles |
| `--surface-alt` | `#121211` | Superficie secundaria para elevación sutil |
| `--paper` | `#F7F7F4` | Blanco natural cálido para texto y contraste |
| `--white-100` | `#FFFFFF` | Blanco puro para titulares principales |
| `--gray-400` | `#9B9B97` | Texto secundario y etiquetas |
| `--gray-500` | `#70706C` | Leyendas, bordes y notas al pie |
| `--line-light` | `rgba(255, 255, 255, 0.11)` | Separadores y bordes sobrios |
| `--line-subtle` | `rgba(255, 255, 255, 0.05)` | Retículas internas |
| `--olive` | `#7A8058` | Verde oliva táctico (Acento de marca primario) |
| `--olive-bright` | `#92976E` | Verde oliva iluminado para interacciones y hover |
| `--beige` | `#E9E0D0` | Beige natural (Acento de marca secundario) |
| `--accent` | `var(--olive)` | Token unificado de acento para CTAs y estados activos |

### 2. Tipografía y Jerarquía

| Token CSS | Valor | Uso |
|---|---|---|
| `--font-graffiti` | `'Sedgwick Ave Display', 'Montserrat', sans-serif` | Wordmark de marca y títulos H1/H2 cortos (alojada localmente en `assets/fonts/sedgwick-ave-display.woff2` y `.ttf`) |
| `--font-sans` | `'Montserrat Variable', 'Montserrat', sans-serif` | Cuerpo de lectura, navegación, formularios y fichas técnicas |
| `--font-mono` | `ui-monospace, 'SFMono-Regular', Menlo, Monaco, Consolas, monospace` | Indicadores de paso, metadatos y fichas técnicas |

### 3. Geometría y Espaciado

| Token CSS | Valor | Uso |
|---|---|---|
| `--max-w` | `1240px` | Ancho máximo del contenedor principal |
| `--space-section` | `110px` | Separación vertical entre bloques de contenido |
| `--radius-sm` | `4px` | Botones de filtro, badges e inputs |
| `--radius-md` | `8px` | Tarjetas de portafolio y paneles técnicos |
| `--radius-lg` | `14px` | Contenedores principales y modal |
| `--radius-pill` | `9999px` | Botones de cierre y etiquetas redondeadas |

### 4. Transiciones y Accesibilidad

| Token CSS | Valor | Uso |
|---|---|---|
| `--ease-premium` | `cubic-bezier(0.16, 1, 0.3, 1)` | Curva de animación suave para modales y hover |
| `min-height` táctil | `≥ 44px` | Botones y controles según directivas WCAG 2.1 AA |
| `@media (prefers-reduced-motion)` | Reducción total de animaciones y transiciones instantáneas |
