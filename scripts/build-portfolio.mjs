/**
 * scripts/build-portfolio.mjs
 * Script de compilación estática del portafolio (ES y EN) desde data/portfolio.json.
 * Permite que los motores de búsqueda rastreen e indexen todo el contenido sin ejecutar JavaScript.
 * Sin dependencias externas (Node.js nativo).
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

console.log("[build-portfolio] Iniciando generación de HTML estático...");

const result = spawnSync("node", ["tools/build-i18n.mjs"], {
  cwd: root,
  stdio: "inherit"
});

if (result.status !== 0) {
  console.error("[build-portfolio] Error al generar el portafolio.");
  process.exit(result.status || 1);
}

console.log("[build-portfolio] Portafolio estático generado con éxito (ES y EN).");
