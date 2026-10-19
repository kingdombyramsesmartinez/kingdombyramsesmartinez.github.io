# Security Policy & Contact

Para reportar una vulnerabilidad relacionada con el sitio publicado, utiliza **kingdombrandbqto@gmail.com**.

No envíes contraseñas, tokens, datos personales innecesarios ni información de clientes. Evita pruebas que interrumpan servicios o modifiquen datos.

El archivo público `/.well-known/security.txt` contiene el canal operativo del sitio.

## Arquitectura de Alojamiento y Cabeceras HTTP
Este sitio se hospeda exclusivamente en **GitHub Pages** como un portafolio web 100% estático. Dado que GitHub Pages no admite configuración de cabeceras HTTP personalizadas a nivel de servidor:
- Las directivas HTTP como `X-Frame-Options`, `Content-Security-Policy: frame-ancestors` y `Strict-Transport-Security` (HSTS) **no están activas en el servidor**.
- La seguridad en el cliente se gestiona mediante directivas `<meta http-equiv="Content-Security-Policy">` soportadas en HTML y salvaguardas defensivas de mejor esfuerzo en JavaScript (`window.top.location`). El archivo `_headers` se conserva únicamente para eventuales migraciones a plataformas perimetrales (e.g. Cloudflare Pages).
