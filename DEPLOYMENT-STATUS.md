# ESTADO DE DESPLIEGUE Y COMPATIBILIDAD — KINGDOM v4 Redesign

**Fecha:** 2026-10-05  
**Rama activa:** `v4-redesign`  
**Destino de Publicación Actual:** GitHub Pages (`https://kingdombqto.github.io/KINGDOM/`)  
**Destino de Producción Recomendado / Alterno:** Cloudflare Pages (cuando se asocie dominio propio)  

---

## 1. Comportamiento de Seguridad y CSP por Plataforma

| Plataforma | Comportamiento de Cabeceras HTTP | Estrategia de Seguridad Implementada |
|---|---|---|
| **GitHub Pages** | **No procesa `_headers` ni cabeceras HTTP personalizadas.** | Se implementó una etiqueta estricta `<meta http-equiv="Content-Security-Policy">` directamente en el `<head>` de cada una de las 9 páginas HTML generadas. |
| **Cloudflare Pages** | **Aplica `_headers` a nivel de servidor perimetral.** | Se mantiene el archivo `_headers` en la raíz con CSP rigurosa, `Permissions-Policy`, `X-Frame-Options: DENY`, y directivas de caché estática para assets. |

---

## 2. Archivos Críticos de Despliegue en Raíz

- `.nojekyll`: Presente en raíz para evitar que el motor de Jekyll de GitHub Pages ignore archivos estáticos o fuentes.
- `index.html`: Versión en español compilada.
- `en/index.html`: Versión en inglés compilada.
- `404.html`: Página personalizada de error 404 compatible con la identidad de marca y bilingüe.
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
