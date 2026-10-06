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

// Frases Prohibidas en páginas comerciales / marketing según directiva v4 Sección 3.2
const PROHIBITED_MARKETING_PHRASES = [
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

// Términos estrictamente prohibidos en TODO el sitio (branding antiguo y colores viejos)
const STRICT_FORBIDDEN_ALL = [
  "Kingdom Wear",
  "kingdom wear",
  "#ffc500"
];

for (const file of pages) {
  const text = fs.readFileSync(file, "utf8");
  const relFile = path.relative(root, file);
  idsByFile.set(file, new Set([...text.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1])));

  // 1. Prohibir términos antiguos ("Kingdom Wear", "#ffc500") en cualquier HTML
  for (const term of STRICT_FORBIDDEN_ALL) {
    if (text.toLowerCase().includes(term.toLowerCase())) {
      fail.push(`${relFile} -> contains strictly prohibited term: "${term}"`);
    }
  }

  // 2. Prohibir claims no auditados en páginas públicas de marketing (index.html, 404.html)
  const isMarketingPage = file.endsWith("index.html") || file.endsWith("404.html");
  if (isMarketingPage) {
    for (const phrase of PROHIBITED_MARKETING_PHRASES) {
      if (text.toLowerCase().includes(phrase.toLowerCase())) {
        fail.push(`${relFile} -> contains prohibited marketing phrase: "${phrase}"`);
      }
    }
  }

  // 3. Prohibir enlaces tel:
  if (/\bhref=["']tel:[^"']*["']/i.test(text)) {
    fail.push(`${relFile} -> contains forbidden 'tel:' link`);
  }

  // 4. Prohibir estilos en línea
  if (/\bstyle\s*=/i.test(text)) {
    fail.push(`${relFile} -> contains forbidden inline style`);
  }

  // 5. Prohibir scripts en línea
  if (/<script(?![^>]*src=)[^>]*>/i.test(text)) {
    fail.push(`${relFile} -> contains forbidden inline script`);
  }

  // 6. Validar que las imágenes tengan alt
  for (const m of text.matchAll(/<img\b([^>]*)>/gi)) {
    const imgTag = m[1];
    if (!/\balt\s*=/i.test(imgTag)) {
      fail.push(`${relFile} -> img missing alt attribute: ${m[0].slice(0, 50)}...`);
    }
  }

  // 7. Validar etiqueta <meta Content-Security-Policy> estricta e idéntica
  let cspContent = null;
  const cspHeaderIdx = text.indexOf('Content-Security-Policy');
  if (cspHeaderIdx !== -1) {
    const after = text.substring(cspHeaderIdx);
    const contentMarker = 'content="';
    const contentIdx = after.indexOf(contentMarker);
    if (contentIdx !== -1) {
      const start = contentIdx + contentMarker.length;
      const end = after.indexOf('"', start);
      if (end !== -1) {
        cspContent = after.substring(start, end).trim();
      }
    }
  }

  if (!cspContent) {
    fail.push(`${relFile} -> missing <meta http-equiv="Content-Security-Policy">`);
  } else {
    // Validar que no tenga directivas ignoradas en meta (como frame-ancestors)
    if (cspContent.includes("frame-ancestors")) {
      fail.push(`${relFile} -> meta CSP contains 'frame-ancestors' which is ignored in <meta> tags by browsers`);
    }
    const expectedCsp = "default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; script-src 'self'; style-src 'self'; style-src-attr 'none'; script-src-attr 'none'; img-src 'self' data: blob:; font-src 'self'; media-src 'self'; connect-src 'self'; worker-src 'self' blob:; frame-src 'none'; manifest-src 'self'; upgrade-insecure-requests;";
    if (cspContent !== expectedCsp) {
      fail.push(`${relFile} -> meta CSP differs from canonical specification.\n  Got:      "${cspContent}"\n  Expected: "${expectedCsp}"`);
    }
  }
}

// 8. Auditoría de Hojas de Estilo CSS (legal.css, 404.css, style.css)
const cssFiles = [
  path.join(root, "assets", "css", "style.css"),
  path.join(root, "assets", "css", "legal.css"),
  path.join(root, "assets", "css", "404.css")
];

for (const cssFile of cssFiles) {
  if (!fs.existsSync(cssFile)) {
    fail.push(`Missing CSS file: ${path.relative(root, cssFile)}`);
    continue;
  }
  const cssText = fs.readFileSync(cssFile, "utf8");
  const relCss = path.relative(root, cssFile);

  // Comprobar términos prohibidos en CSS
  if (/#ffc500/i.test(cssText)) {
    fail.push(`${relCss} -> contains prohibited yellow color: "#ffc500"`);
  }
  if (/Kingdom Wear/i.test(cssText)) {
    fail.push(`${relCss} -> contains prohibited term: "Kingdom Wear"`);
  }

  // Comprobar variables CSS var(--xxx) sin definir
  const definedVars = new Set();
  for (const m of cssText.matchAll(/--([a-zA-Z0-9_-]+)\s*:/g)) {
    definedVars.add(m[1]);
  }
  for (const m of cssText.matchAll(/var\(\s*--([a-zA-Z0-9_-]+)/g)) {
    const varName = m[1];
    if (!definedVars.has(varName)) {
      fail.push(`${relCss} -> uses undefined CSS variable: var(--${varName})`);
    }
  }
}

// 8. Auditoría de Enlaces y Assets
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
console.log(`PASS: ${pages.length} HTML pages and ${cssFiles.length} CSS files audited; 0 prohibited phrases, 0 undefined CSS variables, 0 broken references, strict CSP compliance.`);
