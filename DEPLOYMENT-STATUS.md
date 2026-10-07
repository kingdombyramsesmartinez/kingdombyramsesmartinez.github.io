# ESTADO DE DESPLIEGUE Y COMPATIBILIDAD — KINGDOM v4 Redesign

**Fecha:** 2026-10-07  
**Rama activa:** `main`  
**Destino de Publicación:** GitHub Pages (`https://kingdombyramsesmartinez.github.io`)  
**Destino Futuro / Alterno:** Cloudflare Pages o dominio propio (`www.kingdombyramsesmartinez.com`, futuro, no contratado)

---

## 1. Comportamiento de Seguridad y Cabeceras HTTP por Plataforma

| Plataforma | Comportamiento del archivo `_headers` | Estado Real de Cabeceras | Mecanismo de Seguridad Aplicado |
|---|---|---|---|
| **GitHub Pages** (Actual) | **Ignorado por completo.** El servidor no lee ni aplica `_headers`. | HSTS personalizado, `X-Frame-Options`, `Permissions-Policy` y `frame-ancestors` **no están activos**. | Etiqueta `<meta http-equiv="Content-Security-Policy">` idéntica en el `<head>` de todas las páginas HTML para mitigar XSS y bloquear recursos externos. |
| **Cloudflare Pages** (Futuro) | **Procesado nativamente en el borde.** | Se aplican todas las directivas de seguridad (`HSTS`, `X-Frame-Options`, `Permissions-Policy`, `frame-ancestors`). | El archivo `_headers` se conserva en la raíz del repositorio listo para entrar en operación tras la migración. |

---

## 2. Archivos Críticos de Despliegue en Raíz

- `.nojekyll`: Presente en la raíz para evitar que el motor Jekyll de GitHub Pages ignore archivos estáticos, carpetas ocultas o fuentes.
- `_headers`: Archivo de cabeceras HTTP preservado para Cloudflare Pages (**documentado como no activo en GitHub Pages**).
- `index.html`: Landing page principal en español.
- `portfolio.html`: Galería dedicada del portafolio en español (41 fichas técnicas / 61 imágenes de presentación).
- `en/index.html`: Landing page en inglés.
- `en/portfolio.html`: Galería dedicada del portafolio en inglés (41 fichas técnicas / 61 imágenes de presentación).
- `404.html`: Página personalizada de error 404 estática y bilingüe.
- `sitemap.xml`: Mapa del sitio XML con alternate tags `xhtml:link` bidireccionales.
- `robots.txt`: Reglas de rastreo con referencia a `sitemap.xml`.
- `site-manifest.json`: Web App Manifest con iconos de marca y tema oscuro.
- `.github/workflows/audit.yml`: Pipeline de CI para validar compilación y auditoría antes de cualquier merge a producción.

---

## 3. Comandos de Verificación Previos a Despliegue

```bash
# Compilar páginas estáticas bilingües
npm run build

# Ejecutar auditoría automatizada
npm run audit:local
```
