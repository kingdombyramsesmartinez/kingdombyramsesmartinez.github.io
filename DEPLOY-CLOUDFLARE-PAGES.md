# KINGDOM — DESPLIEGUE DE PRODUCCIÓN

## Opción recomendada para esta landing estática

Cloudflare Pages es una opción práctica para servir el proyecto como archivos estáticos y aplicar un archivo `_headers` con cabeceras de seguridad.

### 1. Preparar el dominio
1. Comprar o usar un dominio propio.
2. Activar DNSSEC si el registrador/DNS lo permite y mantener MFA en la cuenta.
3. Crear `security@TU-DOMINIO.com`, `privacy@TU-DOMINIO.com` y, si es necesario, `legal@TU-DOMINIO.com`.
4. Confirmar que el dominio y todos los subdominios que vayan a existir funcionan únicamente por HTTPS.

### 2. Antes de desplegar
Reemplaza en:
- `legal/privacy.html`
- `legal/terms.html`
- `legal/intellectual-property.html`
- `legal/security.html`
- `legal/accessibility.html`
- `.well-known/security.txt`
- `sitemap.xml.template`

los textos `[ ... ]` por información real.

### 3. Crear el repositorio
Sube el contenido de esta carpeta a un repositorio Git privado o controlado.

No subas:
- contraseñas;
- tokens;
- API keys;
- documentos de clientes;
- permisos privados;
- archivos fuente confidenciales.

### 4. Cloudflare Pages
Conecta el repositorio a Cloudflare Pages y utiliza el directorio raíz del proyecto como salida estática.

No hace falta un backend para esta versión.

### 5. Dominio personalizado
Añade el dominio en el proyecto de Pages y verifica DNS.

### 6. Verificación obligatoria post-deploy
Comprueba:
- `https://TU-DOMINIO.com/`
- `https://TU-DOMINIO.com/legal/privacy.html`
- `https://TU-DOMINIO.com/legal/terms.html`
- `https://TU-DOMINIO.com/.well-known/security.txt`

Después revisa las cabeceras HTTP de la home y confirma que aparecen:
- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `X-Frame-Options`

### 7. HSTS
El paquete incluye HSTS para 1 año y `includeSubDomains`. Publícalo solo cuando estés seguro de que todos los subdominios relevantes funcionan por HTTPS. No añadas `preload` hasta haber verificado que cumples las condiciones para incorporarte a la lista de preload.

### 8. Publicidad
Para una primera campaña, mantén la landing sin píxeles de seguimiento ni analítica de terceros. Eso mantiene el inventario tecnológico y de privacidad más simple.

Cuando quieras instalar GA4, Meta Pixel, TikTok Pixel, Hotjar, Clarity, chat, vídeo embebido, formularios, CRM o cualquier otro tercero:
1. registrar el proveedor en el inventario de privacidad;
2. actualizar la política;
3. revisar cookies/tecnologías similares;
4. revisar CSP;
5. determinar si hace falta consentimiento previo;
6. documentar qué datos se envían y con qué finalidad.

### 9. Cambios de código
Después de cada modificación:
1. validar JavaScript;
2. comprobar que no aparezcan `<script>` o `<style>` inline;
3. revisar enlaces externos;
4. comprobar que no haya secretos;
5. desplegar a preview;
6. probar móvil, teclado y reduced-motion;
7. revisar headers;
8. pasar a producción.

### 10. No convertir la landing en aplicación todavía
Si posteriormente quieres formularios, login, panel de vendedores, CRM, pagos o almacenamiento de archivos, no incrustes secretos en el frontend. Esa siguiente fase debe diseñarse con frontend + API + almacenamiento/base de datos + autenticación + rate limiting + logs + backups + gestión de secretos.

