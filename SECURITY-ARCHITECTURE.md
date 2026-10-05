# KINGDOM — ARQUITECTURA DE SEGURIDAD

## Modelo
Landing estática, sin base de datos, sin autenticación y sin backend propio para la captura de leads en esta fase.

## Consecuencias positivas
- Menor superficie de ataque.
- Sin credenciales de usuarios que proteger.
- Sin API pública propia.
- Sin base de datos expuesta.
- Sin panel de administración dentro del sitio público.

## Controles incluidos
- CSP estricta.
- HSTS.
- X-Frame-Options / frame-ancestors.
- X-Content-Type-Options.
- Referrer-Policy.
- Permissions-Policy mínima.
- COOP.
- Sin `eval`, `innerHTML` ni `document.write` en el código.
- Sin CDN de JavaScript en producción.
- Accesibilidad y reduced motion.

## Controles que dependen del proveedor
- MFA.
- Protección de cuenta del registrador.
- Bloqueo/transfer lock del dominio.
- Protección del repositorio Git.
- Branch protection.
- Secret scanning.
- Backups.
- Rate limiting de infraestructura si posteriormente aparece un backend.
- WAF/CDN y protección de bots, si el tráfico lo justifica.

## No introducir todavía
- Base de datos solo para “guardar consultas”.
- WordPress/plugin stack innecesario.
- Formularios conectados directamente a APIs con secretos en el navegador.
- API keys privadas dentro de JavaScript.
- Google Analytics/Meta Pixel sin revisar privacidad/consentimiento.
- Iframes o widgets de terceros por defecto.

## Si se agrega backend
Separar: frontend público → API → servicio de datos. Añadir autenticación administrativa, validación estricta, rate limiting, CSRF cuando aplique, logging sin secretos, gestión de errores sin stack traces públicos, backups cifrados y pruebas de seguridad automatizadas.
