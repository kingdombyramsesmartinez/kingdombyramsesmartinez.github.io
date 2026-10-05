# Despliegue seguro en GitHub Pages

## 1. Repositorio
- Mantén este proyecto como sitio estático sin secretos, contraseñas, claves API ni archivos `.env`.
- Deja `.nojekyll` en la raíz para servir los archivos estáticos tal como están.
- Activa MFA/2FA en la cuenta de GitHub y protege la rama que publica el sitio.

## 2. GitHub Pages
- Publica desde la rama/carpeta que ya utiliza tu repositorio.
- Fuerza HTTPS en la configuración de Pages cuando GitHub lo ofrezca para el dominio configurado.
- Usa un dominio propio solo después de validar DNS y correo.
- `404.html` se utiliza como página de error personalizada por GitHub Pages.

## 3. Cabeceras de seguridad
GitHub Pages no permite definir arbitrariamente todas las cabeceras HTTP desde el repositorio. El archivo `_headers` incluido es útil para plataformas/CDN que sí lo soporten (por ejemplo, una capa de Cloudflare delante del sitio), pero no debe asumirse que GitHub Pages lo procesa.

## 4. Antes de anunciar el sitio
- Ejecuta `npm run audit:local`.
- Comprueba manualmente WhatsApp, correo, teléfono, redes y Google Drive desde móvil y escritorio.
- Comprueba la URL pública de `/.well-known/security.txt`.
- Comprueba una ruta inexistente para verificar `404.html`.
- Revisa que no queden datos de prueba, marcadores de posición o secretos en el repositorio.

## 5. Seguridad del repositorio
- No subas credenciales.
- Revisa Dependabot/secret scanning si tu repositorio usa componentes con dependencias.
- Conserva historial/backup del proyecto antes de cambios importantes.
