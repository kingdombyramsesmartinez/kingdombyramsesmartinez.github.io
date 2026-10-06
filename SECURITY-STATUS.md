# ESTADO DE SEGURIDAD FRONTEND & ARQUITECTURA — KINGDOM (v4 Redesign)

**Fecha de Evaluación:** 2026-10-06  
**Entorno de Publicación Actual:** GitHub Pages (`https://kingdombqto.github.io/KINGDOM/`)  
**Estado Global:** `PASS` (Cero vulnerabilidades, sin backend, estricto cumplimiento con `AGENTS.md`)

---

## 1. Verificación de Seguridad en Repositorio

- **Secretos y Credenciales:** `PASS`. Ninguna API key privada, token de acceso, credencial ni URL privada de administración expuesta en el código fuente.
- **Sin CDNs ni Runtime JS de Terceros:** `PASS`. Todas las fuentes (`Montserrat Variable`, `Aerosoldier Drip`), scripts y estilos se sirven exclusivamente desde rutas locales (`assets/`).
- **Cero Estilos y Scripts Inline:** `PASS`. Sin etiquetas `<script>` o `<style>` embebidas ni atributos `style=""` en las plantillas o archivos HTML generados.
- **Tratamiento de Enlaces Salientes:** `PASS`. Todos los enlaces externos con `target="_blank"` cuentan rigurosamente con `rel="noopener noreferrer"`.
- **Sin Manipulación Insegura del DOM:** `PASS`. No se usa `eval()`, ni `new Function()`, ni inyecciones arbitrarias de datos no verificados.

---

## 2. Realidad de Seguridad en Hosting Actual (GitHub Pages)

GitHub Pages es un servicio de alojamiento puramente estático que **no permite configurar cabeceras HTTP personalizadas**. En consecuencia:

### ⚠️ Protecciones que NO se aplican en GitHub Pages:
- **`Strict-Transport-Security` (HSTS):** No se envía la cabecera HSTS personalizada (`max-age=31536000`).
- **`X-Frame-Options`:** No se envía como cabecera HTTP desde el servidor.
- **`Permissions-Policy`:** No se envía (las APIs del navegador no están restringidas por cabecera de servidor).
- **`frame-ancestors`:** La directiva `frame-ancestors` de CSP **es expresamente ignorada por los navegadores cuando se define en una etiqueta `<meta>`** (la especificación W3C exige que venga en cabecera HTTP).
- **`_headers`:** El archivo `_headers` está presente en la raíz del repositorio, pero se conserva **únicamente como preparación para una futura migración a Cloudflare Pages**. En GitHub Pages es completamente inerte.

---

## 3. Lo que SÍ protege la CSP mediante `<meta>`

Todas las páginas HTML del sitio implementan de forma idéntica la siguiente directiva mediante `<meta http-equiv="Content-Security-Policy">`:

```text
default-src 'self';
base-uri 'self';
object-src 'none';
form-action 'self';
script-src 'self';
style-src 'self';
style-src-attr 'none';
script-src-attr 'none';
img-src 'self' data: blob:;
font-src 'self';
media-src 'self';
connect-src 'self';
worker-src 'self' blob:;
frame-src 'none';
manifest-src 'self';
upgrade-insecure-requests;
```

### ✅ Protecciones efectivas logradas mediante `<meta>`:
1. **Mitigación de Cross-Site Scripting (XSS):**
   - `script-src 'self'`: Bloquea la inyección de scripts externos y librerías de terceros.
   - `script-src-attr 'none'`: Bloquea handlers de eventos inline (`onclick="..."`, etc.).
   - Ausencia de `'unsafe-inline'` y `'unsafe-eval'`: Bloquea ejecución de scripts inline y de `eval()`.
2. **Mitigación de inyección de estilos:**
   - `style-src 'self'`: Impide la carga de hojas de estilo externas.
   - `style-src-attr 'none'`: Impide la inyección de atributos `style="..."` inline.
3. **Restricción de Recursos y Conexiones:**
   - `default-src 'self'`: Cualquier recurso no especificado se limita al propio origen.
   - `object-src 'none'`: Bloquea complementos obsoletos (Flash, Java applets).
   - `frame-src 'none'`: Impide que la página embeba iframes de terceros.
   - `connect-src 'self'`: Restringe llamadas `fetch` y `XMLHttpRequest` únicamente al propio origen.
   - `base-uri 'self'`: Evita ataques de inyección sobre la etiqueta `<base>`.
   - `upgrade-insecure-requests`: Obliga a solicitar recursos vía HTTPS.

---

## 4. Contacto y Divulgación de Seguridad
- Canal de reporte documentado en `SECURITY.md` y `legal/security.html`: **`kingdombrandbqto@gmail.com`**.
- Archivo `/.well-known/security.txt` publicado y enlazado.
