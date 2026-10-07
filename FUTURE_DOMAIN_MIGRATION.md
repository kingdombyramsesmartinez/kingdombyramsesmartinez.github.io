# GUÍA DE MIGRACIÓN FUTURA A DOMINIO PROPIO (.COM)

Este documento detalla los pasos exactos y limpios para cuando se compre y configure el dominio comercial definitivo:

**Dominio Canónico Objetivo:** `https://www.kingdombyramsesmartinez.com`  
**Dominio Apex:** `https://kingdombyramsesmartinez.com`

---

## 1. Archivos a Modificar en el Repositorio

Solo se requerirá actualizar la URL central en los siguientes puntos:

1. **`assets/js/site.config.js`**:
   Cambiar:
   ```javascript
   siteUrl: "https://kingdombyramsesmartinez.github.io",
   ```
   Por:
   ```javascript
   siteUrl: "https://www.kingdombyramsesmartinez.com",
   ```

2. **`assets/js/app.js`**:
   En la sección de JSON-LD (línea ~423):
   ```javascript
   const siteUrl = "https://www.kingdombyramsesmartinez.com";
   ```

3. **`robots.txt`**:
   ```text
   Sitemap: https://www.kingdombyramsesmartinez.com/sitemap.xml
   ```

4. **`sitemap.xml`**:
   Reemplazar `https://kingdombyramsesmartinez.github.io/` por `https://www.kingdombyramsesmartinez.com/` en todas las etiquetas `<loc>` y `<xhtml:link>`.

5. **`.well-known/security.txt`**:
   Actualizar Canonical y Policy a `https://www.kingdombyramsesmartinez.com`.

6. **Crear archivo `CNAME` en la raíz**:
   Contenido exacto:
   ```text
   www.kingdombyramsesmartinez.com
   ```

7. **Recompilar el sitio**:
   ```bash
   npm run build
   npm run audit:local
   ```

---

## 2. Configuración en el Registrador de Dominio (DNS)

Configurar en el panel de control del proveedor del dominio (Namecheap, GoDaddy, Cloudflare, etc.):

- **CNAME para el subdominio www:**
  - Host / Nombre: `www`
  - Destino: `kingdombyramsesmartinez.github.io`
- **Registros A para el dominio raíz (@):**
  - Host / Nombre: `@`
  - Valores IP oficiales de GitHub Pages:
    - `185.199.108.153`
    - `185.199.109.153`
    - `185.199.110.153`
    - `185.199.111.153`

---

## 3. Configuración en GitHub Pages

1. Ir a **Settings > Pages**.
2. En **Custom domain**, ingresar: `www.kingdombyramsesmartinez.com`.
3. Hacer clic en **Save**.
4. Una vez validada la verificación DNS, marcar la casilla **Enforce HTTPS**.
