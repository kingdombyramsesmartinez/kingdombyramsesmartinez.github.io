#!/usr/bin/env node
/**
 * KINGDOM — Auditor Estático del Sitio Web
 *
 * Misión: Detectar errores reales del proyecto KINGDOM y asegurar que no pueda
 * declarar PASS cuando existan defectos que sus verificaciones deban encontrar.
 *
 * Comprobaciones:
 * 1. Prohibición estricta de branding/colores antiguos en HTML y CSS.
 * 2. Frases comerciales no auditadas en páginas de marketing.
 * 3. Enlaces prohibidos (tel:).
 * 4. Estilos y scripts en línea prohibidos.
 * 5. Atributos alt en etiquetas <img>.
 * 6. Content Security Policy (CSP) en etiquetas <meta> idéntica a la canónica y sin directivas de servidor inválidas (frame-ancestors).
 * 7. Variables CSS no definidas y colores prohibidos en CSS.
 * 8. Detección de IDs duplicados por archivo.
 * 9. Integridad de enlaces y recursos locales (href, src, srcset, anclas locales con/sin fragmento, rutas absolutas /).
 * 10. Enlaces externos con target="_blank" con rel="noopener noreferrer".
 * 11. Metadatos mínimos requeridos (lang coherente, title útil y no vacío, viewport, charset, description en páginas comerciales/principales).
 * 12. Consistencia del catálogo portfolio.json y sus referencias a imágenes/miniaturas.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(__dirname, "..");

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

const CANONICAL_CSP = "default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; script-src 'self' https://*.googletagmanager.com; style-src 'self'; style-src-attr 'none'; script-src-attr 'none'; img-src 'self' data: blob: https://*.google-analytics.com https://analytics.google.com https://*.googletagmanager.com https://www.google.com; font-src 'self'; media-src 'self'; connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://*.googletagmanager.com https://stats.g.doubleclick.net https://www.google.com; worker-src 'self' blob:; frame-src 'none'; manifest-src 'self'; upgrade-insecure-requests;";

export function runAudit(options = {}) {
  const rootDir = options.rootDir ? path.resolve(options.rootDir) : defaultRoot;
  const quiet = options.quiet ?? false;

  const violations = [];
  const passedChecks = [];
  const skippedChecks = [];

  const addViolation = (rule, file, details) => {
    violations.push({
      rule,
      file: file ? path.relative(rootDir, file).replace(/\\/g, "/") : "root",
      details
    });
  };

  // Recolectar páginas HTML
  const pages = [];
  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (_) {
      return;
    }
    for (const entry of entries) {
      if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "tools" || entry.name === "_staging" || entry.name === "templates" || entry.name === "reportes" || entry.name === "motion-graphics" || entry.name === "audit-reports" || entry.name === "graphify-out" || entry.name === "dist" || entry.name === "test-results") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) pages.push(full);
    }
  }
  walk(rootDir);
  pages.sort();

  // Mapa de IDs y mapa de textos
  const idsByFile = new Map();
  const fileContents = new Map();

  for (const file of pages) {
    const text = fs.readFileSync(file, "utf8");
    fileContents.set(file, text);

    // Detección estricta de IDs duplicados
    const idCount = new Map();
    const idLines = new Map();
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const m of line.matchAll(/\bid=["']([^"']+)["']/g)) {
        const id = m[1];
        idCount.set(id, (idCount.get(id) || 0) + 1);
        if (!idLines.has(id)) idLines.set(id, []);
        idLines.get(id).push(i + 1);
      }
    }

    for (const [id, count] of idCount.entries()) {
      if (count > 1) {
        addViolation("duplicate-id", file, `duplicate id="${id}" found ${count} times (lines: ${idLines.get(id).join(", ")})`);
      }
    }

    // Guardar lista única de IDs para validación de anclas
    idsByFile.set(file, new Set(idCount.keys()));
  }

  // Auditoría por página HTML
  for (const file of pages) {
    const text = fileContents.get(file);
    const relFile = path.relative(rootDir, file).replace(/\\/g, "/");
    const relDir = path.dirname(file);

    // 1. Prohibir términos antiguos ("Kingdom Wear", "#ffc500")
    for (const term of STRICT_FORBIDDEN_ALL) {
      if (text.toLowerCase().includes(term.toLowerCase())) {
        addViolation("prohibited-term", file, `contains strictly prohibited term: "${term}"`);
      }
    }

    // 1.1 Validar que no existan tokens de plantilla {{...}} sin resolver
    const unreplacedTokens = [...text.matchAll(/\{\{[A-Z0-9_]+\}\}/g)].map(m => m[0]);
    if (unreplacedTokens.length > 0) {
      const unique = [...new Set(unreplacedTokens)];
      addViolation("unreplaced-template-token", file, `contains unreplaced template token(s): ${unique.join(", ")}`);
    }

    // 1.2 Validar que no existan enlaces mailto:undefined o mailto:null
    if (/href=["']mailto:(undefined|null)/i.test(text)) {
      addViolation("invalid-mailto-link", file, "contains invalid mailto: link with 'undefined' or 'null'");
    }

    // 2. Prohibir claims no auditados en páginas públicas de marketing (index.html, 404.html)
    const isMarketingPage = file.endsWith("index.html") || file.endsWith("404.html");
    if (isMarketingPage) {
      for (const phrase of PROHIBITED_MARKETING_PHRASES) {
        if (text.toLowerCase().includes(phrase.toLowerCase())) {
          addViolation("prohibited-marketing-phrase", file, `contains prohibited marketing phrase: "${phrase}"`);
        }
      }
    }

    // 3. Prohibir enlaces tel:
    if (/\bhref=["']tel:[^"']*["']/i.test(text)) {
      addViolation("forbidden-tel", file, "contains forbidden 'tel:' link");
    }

    // 4. Prohibir estilos en línea
    if (/\bstyle\s*=/i.test(text)) {
      addViolation("forbidden-inline-style", file, "contains forbidden inline style");
    }

    // 5. Prohibir scripts en línea (excepto <script type="application/ld+json"> si existiera, pero inline JS ejecutable)
    for (const m of text.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      const attrs = m[1];
      const body = m[2].trim();
      const hasSrc = /\bsrc\s*=/i.test(attrs);
      const isJsonLd = /\btype\s*=\s*["']application\/ld\+json["']/i.test(attrs);
      if (!hasSrc && !isJsonLd && body.length > 0) {
        addViolation("forbidden-inline-script", file, "contains forbidden inline executable script");
      }
    }

    // 6. Validar que las imágenes tengan alt
    for (const m of text.matchAll(/<img\b([^>]*)>/gi)) {
      const imgTag = m[1];
      if (!/\balt\s*=/i.test(imgTag)) {
        addViolation("missing-img-alt", file, `img missing alt attribute: ${m[0].slice(0, 50)}...`);
      }
    }

    // 7. Validar etiqueta <meta Content-Security-Policy> estricta e idéntica
    let cspContent = null;
    const cspHeaderIdx = text.indexOf("Content-Security-Policy");
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
      addViolation("missing-csp", file, 'missing <meta http-equiv="Content-Security-Policy">');
    } else {
      if (cspContent.includes("frame-ancestors")) {
        addViolation("invalid-meta-csp", file, "meta CSP contains 'frame-ancestors' which is ignored in <meta> tags by browsers");
      }
      if (cspContent !== CANONICAL_CSP) {
        addViolation("csp-mismatch", file, `meta CSP differs from canonical specification.\n  Got:      "${cspContent}"\n  Expected: "${CANONICAL_CSP}"`);
      }
    }

    // 8. Metadatos básicos según función de la página
    // 8.1 lang
    const langMatch = text.match(/<html\b[^>]*\blang=["']([^"']+)["']/i);
    if (!langMatch || !langMatch[1].trim()) {
      addViolation("metadata-lang", file, "missing or empty lang attribute on <html>");
    } else {
      const langVal = langMatch[1].toLowerCase();
      if (relFile.startsWith("en/") && !langVal.startsWith("en")) {
        addViolation("metadata-lang", file, `expected English lang ("en"), found "${langMatch[1]}"`);
      }
      if (!relFile.startsWith("en/") && !langVal.startsWith("es") && !relFile.includes("404")) {
        addViolation("metadata-lang", file, `expected Spanish lang ("es"), found "${langMatch[1]}"`);
      }
    }

    // 8.2 title
    const titleMatch = text.match(/<title>([^<]*)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      addViolation("metadata-title", file, "missing or empty <title> tag");
    }

    // 8.3 viewport
    if (!/<meta\b[^>]*name=["']viewport["']/i.test(text)) {
      addViolation("metadata-viewport", file, 'missing <meta name="viewport"> tag');
    }

    // 8.4 charset
    if (!/<meta\b[^>]*charset=/i.test(text)) {
      addViolation("metadata-charset", file, "missing <meta charset> declaration");
    }

    // 8.5 description (obligatorio en páginas comerciales y legales, opcional en 404 pero deseable)
    const isCommercial = relFile === "index.html" || relFile === "portfolio.html" || relFile === "en/index.html" || relFile === "en/portfolio.html";
    const descMatch = text.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                      text.match(/<meta\b[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    if (isCommercial && (!descMatch || !descMatch[1].trim())) {
      addViolation("metadata-description", file, 'missing or empty <meta name="description"> in commercial page');
    }

    // 9. Enlaces y target="_blank"
    for (const m of text.matchAll(/<a\b([^>]*)>/gi)) {
      const tag = m[0];
      const attrs = m[1];
      const targetMatch = attrs.match(/\btarget=["']([^"']+)["']/i);
      if (targetMatch && targetMatch[1].toLowerCase() === "_blank") {
        const relMatch = attrs.match(/\brel=["']([^"']+)["']/i);
        const relVal = relMatch ? relMatch[1].toLowerCase() : "";
        const hasNoopener = /\bnoopener\b/.test(relVal);
        const hasNoreferrer = /\bnoreferrer\b/.test(relVal);
        if (!hasNoopener || !hasNoreferrer) {
          addViolation("unsafe-target-blank", file, `target="_blank" link missing rel="noopener noreferrer": ${tag.slice(0, 70)}...`);
        }
      }
    }

    // 10. Referencias locales en href, src, srcset
    // 10.1 href
    for (const m of text.matchAll(/\bhref=["']([^"']+)["']/g)) {
      const rawHref = m[1].trim();
      if (!rawHref) continue;

      // Descartar esquemas externos y protocolos especiales
      if (/^(?:https?:|mailto:|tel:|javascript:|data:|blob:)/i.test(rawHref)) {
        continue;
      }

      // Anclas en la misma página
      if (rawHref.startsWith("#")) {
        const anchorId = rawHref.slice(1);
        if (anchorId && anchorId !== "cookie-settings") {
          const pageIds = idsByFile.get(file);
          if (!pageIds || !pageIds.has(anchorId)) {
            addViolation("broken-anchor", file, `same-page anchor not found: #${anchorId}`);
          }
        }
        continue;
      }

      const [pathWithQuery, fragment] = rawHref.split("#");
      const rawPathOnly = pathWithQuery.split("?")[0];
      let pathOnly;
      try {
        pathOnly = decodeURIComponent(rawPathOnly);
      } catch (err) {
        addViolation("malformed-uri", file, `malformed percent-encoding in href: "${rawHref}"`);
        continue;
      }

      let targetPath;
      if (pathOnly.startsWith("/")) {
        // Enlace raíz
        targetPath = path.normalize(path.join(rootDir, pathOnly === "/" ? "index.html" : pathOnly));
      } else {
        targetPath = path.normalize(path.join(relDir, pathOnly === "" ? path.basename(file) : pathOnly));
      }

      // Si apunta a un directorio con trailing slash o sin él
      if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
        const indexInDir = path.join(targetPath, "index.html");
        if (fs.existsSync(indexInDir)) {
          targetPath = indexInDir;
        }
      }

      if (!fs.existsSync(targetPath)) {
        addViolation("broken-link", file, `missing target file for href: "${rawHref}" (resolved: ${path.relative(rootDir, targetPath)})`);
      } else if (fragment && fragment !== "cookie-settings") {
        if (targetPath.endsWith(".html")) {
          const targetIds = idsByFile.get(targetPath);
          if (targetIds && !targetIds.has(fragment)) {
            addViolation("broken-anchor", file, `missing anchor #${fragment} in target "${rawHref}"`);
          }
        }
      }
    }

    // 10.2 src
    for (const m of text.matchAll(/\bsrc=["']([^"']+)["']/g)) {
      const rawSrc = m[1].trim();
      if (!rawSrc || /^(?:https?:|data:|blob:)/i.test(rawSrc)) continue;

      const pathOnly = decodeURIComponent(rawSrc.split("?")[0]);
      let targetPath;
      if (pathOnly.startsWith("/")) {
        targetPath = path.normalize(path.join(rootDir, pathOnly));
      } else {
        targetPath = path.normalize(path.join(relDir, pathOnly));
      }

      if (!fs.existsSync(targetPath)) {
        addViolation("broken-src", file, `missing asset for src: "${rawSrc}" (resolved: ${path.relative(rootDir, targetPath)})`);
      }
    }

    // 10.3 srcset
    for (const m of text.matchAll(/\bsrcset=["']([^"']+)["']/g)) {
      const rawSrcset = m[1].trim();
      const entries = rawSrcset.split(",").map(s => s.trim()).filter(Boolean);
      for (const entry of entries) {
        const urlCandidate = entry.split(/\s+/)[0];
        if (!urlCandidate || /^(?:https?:|data:|blob:)/i.test(urlCandidate)) continue;

        const pathOnly = decodeURIComponent(urlCandidate.split("?")[0]);
        let targetPath;
        if (pathOnly.startsWith("/")) {
          targetPath = path.normalize(path.join(rootDir, pathOnly));
        } else {
          targetPath = path.normalize(path.join(relDir, pathOnly));
        }

        if (!fs.existsSync(targetPath)) {
          addViolation("broken-srcset", file, `missing asset in srcset: "${urlCandidate}" (resolved: ${path.relative(rootDir, targetPath)})`);
        }
      }
    }
  }

  // 11. Auditoría de Hojas de Estilo CSS
  const cssFiles = [
    path.join(rootDir, "assets", "css", "style.css"),
    path.join(rootDir, "assets", "css", "urban.css"),
    path.join(rootDir, "assets", "css", "legal.css"),
    path.join(rootDir, "assets", "css", "404.css")
  ];

  let auditedCssCount = 0;
  for (const cssFile of cssFiles) {
    if (!fs.existsSync(cssFile)) {
      addViolation("missing-css-file", cssFile, `CSS file not found: ${path.relative(rootDir, cssFile)}`);
      continue;
    }
    auditedCssCount++;
    const cssText = fs.readFileSync(cssFile, "utf8");
    const relCss = path.relative(rootDir, cssFile).replace(/\\/g, "/");

    // Comprobar términos prohibidos en CSS
    if (/#ffc500/i.test(cssText)) {
      addViolation("prohibited-color", cssFile, `contains prohibited yellow color: "#ffc500"`);
    }
    if (/Kingdom Wear/i.test(cssText)) {
      addViolation("prohibited-term", cssFile, `contains prohibited term: "Kingdom Wear"`);
    }

    // Comprobar variables CSS var(--xxx) sin definir
    const definedVars = new Set();
    for (const m of cssText.matchAll(/--([a-zA-Z0-9_-]+)\s*:/g)) {
      definedVars.add(m[1]);
    }
    for (const m of cssText.matchAll(/var\(\s*--([a-zA-Z0-9_-]+)/g)) {
      const varName = m[1];
      if (!definedVars.has(varName)) {
        addViolation("undefined-css-var", cssFile, `uses undefined CSS variable: var(--${varName})`);
      }
    }
  }

  // 12. Consistencia del catálogo portfolio.json (busca en data/ o content/)
  const primaryPortfolioPath = path.join(rootDir, "data", "portfolio.json");
  const fallbackPortfolioPath = path.join(rootDir, "content", "portfolio.json");
  const portfolioPath = fs.existsSync(primaryPortfolioPath)
    ? primaryPortfolioPath
    : (fs.existsSync(fallbackPortfolioPath) ? fallbackPortfolioPath : null);

  if (portfolioPath) {
    try {
      const portfolioRaw = fs.readFileSync(portfolioPath, "utf8");
      const items = JSON.parse(portfolioRaw);
      const seenIds = new Set();
      for (const item of items) {
        if (!item.id) {
          addViolation("portfolio-missing-id", portfolioPath, "portfolio item missing 'id' field");
        } else if (seenIds.has(item.id)) {
          addViolation("portfolio-duplicate-id", portfolioPath, `duplicate portfolio id: "${item.id}"`);
        } else {
          seenIds.add(item.id);
        }

        if (item.image) {
          const imgPath = path.resolve(rootDir, item.image);
          if (!fs.existsSync(imgPath)) {
            addViolation("portfolio-missing-image", portfolioPath, `item "${item.id}" image not found: "${item.image}"`);
          }
        }
        if (item.thumb) {
          const thumbPath = path.resolve(rootDir, item.thumb);
          if (!fs.existsSync(thumbPath)) {
            addViolation("portfolio-missing-thumb", portfolioPath, `item "${item.id}" thumb not found: "${item.thumb}"`);
          }
        }
      }
    } catch (err) {
      addViolation("portfolio-json-invalid", portfolioPath, `Failed to parse portfolio.json: ${err.message}`);
    }
  } else {
    skippedChecks.push("portfolio.json not present in data/ or content/");
  }

  // 13. Resumen y salida
  if (!quiet) {
    if (violations.length > 0) {
      console.error(`FAIL: ${violations.length} audit violations detected:`);
      for (const v of violations) {
        console.error(`- [${v.rule}] ${v.file} -> ${v.details}`);
      }
    } else {
      console.log(`PASS: ${pages.length} HTML pages and ${auditedCssCount} CSS files audited; 0 duplicate IDs, 0 broken references, 0 prohibited phrases, strict CSP compliance.`);
    }
  }

  return {
    pagesAudited: pages.length,
    cssAudited: auditedCssCount,
    violations,
    passed: violations.length === 0,
    status: violations.length === 0 ? 0 : 1
  };
}

// Ejecución directa por CLI
const isDirectCall = process.argv[1] && (
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url)) ||
  path.resolve(process.argv[1]).endsWith("audit-site.mjs")
);

if (isDirectCall) {
  const result = runAudit();
  process.exit(result.status);
}
