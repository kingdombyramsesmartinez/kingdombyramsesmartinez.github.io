# KINGDOM — ARQUITECTURA DE SEGURIDAD (v4 Redesign)

## Modelo y Superficie de Ataque
Landing page y portafolio estático (HTML, CSS y JavaScript vainilla), sin base de datos, sin autenticación de usuarios, sin panel administrativo y sin endpoints de backend para captura de datos en esta fase.

## Consecuencias Positivas del Modelo Estático
- Mínima superficie de ataque.
- Sin credenciales ni contraseñas de usuarios almacenadas.
- Sin API pública vulnerable a fallos de inyección o deserialización.
- Sin base de datos susceptible a SQLi.
- Sin almacenamiento ni procesamiento de sesiones.

---

## Estado Real de Controles por Hosting

### 1. Entorno de Publicación: GitHub Pages User Site (`https://kingdombyramsesmartinez.github.io/`)
GitHub Pages sirve archivos estáticos pero **no admite configuración de cabeceras HTTP personalizadas**.
- **Archivo `_headers`:** Se mantiene en la raíz del repositorio pero **está inactivo en GitHub Pages**. Se conserva como artefacto de configuración para una futura migración a Cloudflare Pages.
- **Controles NO activos hoy en GitHub Pages:**
  - `Strict-Transport-Security` (HSTS personalizado).
  - `X-Frame-Options` (DENY/SAMEORIGIN como cabecera HTTP).
  - `frame-ancestors` (la directiva CSP `frame-ancestors` es formalmente ignorada por los navegadores si se entrega en una etiqueta `<meta>`).
  - `Permissions-Policy`.
  - `Cross-Origin-Opener-Policy` (COOP) y `Cross-Origin-Resource-Policy` (CORP).

### 2. Controles Activos y Efectivos vía `<meta>` CSP
La etiqueta `<meta http-equiv="Content-Security-Policy">` presente en todas las páginas HTML garantiza:
- `script-src 'self'`: Bloqueo de scripts remotos, inyecciones de CDNs no autorizadas y runtime externo.
- Ausencia de `'unsafe-inline'` y `'unsafe-eval'`: Bloqueo de inyección XSS clásica y de evaluación dinámica de código.
- `style-src 'self'` y `style-src-attr 'none'`: Bloqueo de CSS externo e inline.
- `object-src 'none'` y `frame-src 'none'`: Bloqueo de plugins e incrustaciones no autorizadas.
- `base-uri 'self'` y `form-action 'self'`: Mitigación de secuestro de base y formularios maliciosos.
- `upgrade-insecure-requests`: Solicitud forzada sobre canal HTTPS.

### 3. Buenas Prácticas de Código Aplicadas
- Sin uso de `eval()`, `new Function()`, `innerHTML` inseguro ni `document.write`.
- Enlaces salientes (`target="_blank"`) forzados con `rel="noopener noreferrer"`.
- Respeto a `prefers-reduced-motion` y accesibilidad para evitar ataques de fatiga visual o inaccesibilidad.

---

## Controles que Dependen de Plataforma / Futuro Hosting (Cloudflare Pages)
Al migrar a un proveedor con soporte perimetral de cabeceras (`_headers` en Cloudflare Pages):
- Activación de cabecera HSTS estricta (`max-age=31536000`).
- Activación de `X-Frame-Options: DENY` y `frame-ancestors 'none'` para blindaje total contra Clickjacking.
- Activación de `Permissions-Policy` para desactivar cámaras, micrófonos y geolocalización a nivel de protocolo.
- Configuración de WAF y mitigación perimetral de DDoS si se asocia dominio propio.
