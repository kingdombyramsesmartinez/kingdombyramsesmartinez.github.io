# DESIGN TOKENS SYSTEM — KINGDOM v2.0
## Fuente Única de Verdad de Diseño

Especificación técnica de variables CSS implementadas en `assets/css/style.css`:

### 1. Paleta de Marca (`:root`)
| Token CSS | Valor Hex / RGBA | Función |
|---|---|---|
| `--brand-bg` | `#07070a` | Fondo principal oscuro |
| `--brand-surface` | `#0e0f14` | Superficie de paneles y HUD |
| `--brand-surface-2` | `#111218` | Capa intermedia de tarjetas |
| `--brand-card` | `rgba(18, 20, 28, 0.70)` | Fondo translúcido de módulos |
| `--brand-glass` | `rgba(14, 16, 24, 0.75)` | Cristal blur de modales y nav |
| `--brand-gold` | `#ffc500` | Oro cibernético corporativo |
| `--brand-gold-bright` | `#ffe066` | Acentos de alta luminancia |
| `--brand-gold-glow` | `rgba(255, 197, 0, 0.35)` | Resplandor perimetral |
| `--brand-red` | `#ff1e42` | Láser rojo de acento táctico |
| `--brand-red-glow` | `rgba(255, 30, 66, 0.40)` | Resplandor de botones activos |
| `--brand-wine` | `#6e0f1d` | Tono profundo de contraste |
| `--brand-cyan` | `#00f0ff` | Cyan holográfico de telemetría |
| `--brand-cyan-glow` | `rgba(0, 240, 255, 0.35)` | Brillo de micro-etiquetas |
| `--brand-green` | `#00ff88` | Indicador de estado ONLINE |

### 2. Tipografía y Contenido
| Token CSS | Valor | Función |
|---|---|---|
| `--text-primary` | `#f5f6fa` | Texto principal de alta legibilidad |
| `--text-secondary` | `#c2c5d1` | Texto descriptivo y párrafos |
| `--text-muted` | `#73778a` | Micro-etiquetas y telemetría |
| `--font-display` | `'Arial Black', 'Arial Narrow', Arial, sans-serif` | Titulares condensados de alto impacto |
| `--font-body` | `Inter, ui-sans-serif, system-ui, sans-serif` | Tipografía de lectura fluida |
| `--font-mono` | `'SFMono-Regular', Consolas, monospace` | Datos técnicos, coordenadas y códigos |

### 3. Geometría y Layout
| Token CSS | Valor |
|---|---|
| `--container-max` | `1240px` |
| `--page-padding-desktop` | `32px` |
| `--page-padding-tablet` | `20px` |
| `--page-padding-mobile` | `16px` |
| `--section-space-desktop` | `130px` |
| `--section-space-mobile` | `80px` |
| `--content-readable` | `720px` |
| `--content-narrow` | `540px` |

### 4. Radios y Esquinas
| Token CSS | Valor | Uso |
|---|---|---|
| `--radius-sm` | `6px` | Badges pequeños, tags técnicos |
| `--radius-md` | `10px` | Selects, inputs, swatches |
| `--radius-lg` | `16px` | Tarjetas de métricas y nav scrolled |
| `--radius-xl` | `20px` | Contenedores de cotizador y perfil |
| `--radius-2xl` | `24px` | Tarjeta de holograma y modales |
| `--radius-pill` | `999px` | Botones de navegación y tags circulares |
