import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const pages = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "tools" || entry.name === "_staging" || entry.name === "templates") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) pages.push(full);
  }
}
walk(root);

const fail = [];
const idsByFile = new Map();

// Frases Prohibidas según directiva v4 Sección 3.2
const PROHIBITED_PHRASES = [
  "máxima definición",
  "maxima definicion",
  "garantizar",
  "garantía",
  "garantia",
  "cero ",
  "alta precisión",
  "alta precision",
  "primer nivel",
  "planta",
  "ACTIVO",
  "fotográfico real",
  "fotografico real",
  "muestras reales",
  "reducir roturas",
  "a nivel nacional e internacional"
];

for (const file of pages) {
  const text = fs.readFileSync(file, "utf8");
  idsByFile.set(file, new Set([...text.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1])));

  // 1. Prohibir frases no verificables en páginas públicas de presentación/portafolio
  const isMarketingPage = file.endsWith("index.html") || file.endsWith("404.html");
  if (isMarketingPage) {
    for (const phrase of PROHIBITED_PHRASES) {
      if (text.toLowerCase().includes(phrase.toLowerCase())) {
        fail.push(`${path.relative(root, file)} -> contains prohibited phrase: "${phrase}"`);
      }
    }
  }

  // 2. Prohibir enlaces tel:
  if (/\bhref=["']tel:[^"']*["']/i.test(text)) {
    fail.push(`${path.relative(root, file)} -> contains forbidden 'tel:' link`);
  }

  // 3. Prohibir estilos en línea
  if (/\bstyle\s*=/i.test(text)) {
    fail.push(`${path.relative(root, file)} -> contains forbidden inline style`);
  }

  // 4. Prohibir scripts en línea
  if (/<script(?![^>]*src=)[^>]*>/i.test(text)) {
    fail.push(`${path.relative(root, file)} -> contains forbidden inline script`);
  }

  // 5. Validar que las imágenes tengan alt
  for (const m of text.matchAll(/<img\b([^>]*)>/gi)) {
    const imgTag = m[1];
    if (!/\balt\s*=/i.test(imgTag)) {
      fail.push(`${path.relative(root, file)} -> img missing alt attribute: ${m[0].slice(0, 50)}...`);
    }
  }
}

for (const file of pages) {
  const text = fs.readFileSync(file, "utf8");
  const relDir = path.dirname(file);

  for (const m of text.matchAll(/\bhref=["']([^"']+)["']/g)) {
    const href = m[1];
    if (/^(?:https?:|mailto:|javascript:|data:|#)/i.test(href)) {
      if (href.startsWith("#")) {
        const id = href.slice(1);
        if (id && !idsByFile.get(file)?.has(id)) fail.push(`${path.relative(root, file)} -> missing anchor #${id}`);
      }
      continue;
    }
    const noHash = href.split("#")[0].split("?")[0];
    const target = path.normalize(path.join(relDir, noHash));
    if (!fs.existsSync(target)) fail.push(`${path.relative(root, file)} -> missing ${href}`);
    else if (href.includes("#")) {
      const id = href.split("#")[1];
      if (id && target.endsWith(".html") && !idsByFile.get(target)?.has(id)) fail.push(`${path.relative(root, file)} -> missing anchor ${href}`);
    }
  }

  for (const m of text.matchAll(/\bsrc=["']([^"']+)["']/g)) {
    const src = m[1];
    if (/^(?:https?:|data:|blob:)/i.test(src)) continue;
    const target = path.normalize(path.join(relDir, src.split("?")[0]));
    if (!fs.existsSync(target)) fail.push(`${path.relative(root, file)} -> missing asset ${src}`);
  }
}

if (fail.length) {
  console.error(`FAIL: ${fail.length} audit violations detected:`);
  for (const item of fail) console.error(`- ${item}`);
  process.exit(1);
}
console.log(`PASS: ${pages.length} HTML pages audited; 0 prohibited phrases, 0 broken references, strict CSP compliance.`);
