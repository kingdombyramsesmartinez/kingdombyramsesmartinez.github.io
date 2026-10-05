# AUDITORÍA DEL PAQUETE ORIGINAL

## Encontrado en la versión recibida
- Una sola `index.html` con CSS y JavaScript embebidos.
- Three.js r128 cargado desde cdnjs.
- Google Fonts cargadas desde Google.
- Sin formulario/backend propio.
- Sin almacenamiento local/base de datos.
- Enlaces externos a WhatsApp, Instagram, LinkedIn, TikTok y Google Drive.
- Modal de portafolio sin gestión completa de foco/semántica.
- Varios estilos inline.

## Riesgos principales
1. Dependencias remotas no esenciales aumentan superficie técnica y complican CSP/privacidad.
2. Three.js r128 es muy antiguo frente a la línea actual. Se eliminó la dependencia CDN en esta versión.
3. Los estilos/scripts inline dificultan una CSP estricta.
4. El portafolio contiene material que puede involucrar marcas, personajes o trabajos institucionales de terceros; debe existir una base documental para exhibirlo.
5. Existen afirmaciones objetivas de rendimiento/capacidad que deben estar respaldadas antes de promocionarse.
6. No había una capa legal visible ni un canal formal de reporte de vulnerabilidades.
7. El despliegue debe aplicar cabeceras HTTP; no basta con proteger el HTML.

## Cambios aplicados
- CSS separado en `assets/css/style.css`.
- JavaScript separado en `assets/js/app.js`.
- Sin `<script>` inline.
- Sin `<style>` inline.
- Sin `style=""`.
- Eliminación de Google Fonts remotas.
- Eliminación del runtime CDN de Three.js.
- Visual 3D local mediante Canvas 2D.
- Mejoras de teclado, foco y modal.
- `prefers-reduced-motion`.
- Legal: privacidad, términos, IP, cookies, seguridad y accesibilidad.
- `security.txt`.
- `_headers` con CSP y cabeceras de seguridad.
- Checklist de claims, contratos y lanzamiento.
