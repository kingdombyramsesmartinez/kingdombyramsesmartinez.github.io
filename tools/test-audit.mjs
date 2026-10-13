import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { runAudit } from "./audit-site.mjs";

const CANONICAL_CSP = "default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; script-src 'self' https://*.googletagmanager.com; style-src 'self'; style-src-attr 'none'; script-src-attr 'none'; img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com; font-src 'self'; media-src 'self'; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://stats.g.doubleclick.net; worker-src 'self' blob:; frame-src 'none'; manifest-src 'self'; upgrade-insecure-requests;";

function createValidFixture(tempDir) {
  // Crear estructura mínima válida
  const assetsDir = path.join(tempDir, "assets");
  const cssDir = path.join(assetsDir, "css");
  const imgDir = path.join(assetsDir, "img");
  fs.mkdirSync(cssDir, { recursive: true });
  fs.mkdirSync(imgDir, { recursive: true });

  // Archivos CSS básicos válidos
  for (const name of ["style.css", "urban.css", "legal.css", "404.css"]) {
    fs.writeFileSync(path.join(cssDir, name), ":root { --brand: #ffaa00; }\nbody { color: var(--brand); }");
  }

  // Imagen dummy
  fs.writeFileSync(path.join(imgDir, "sample.webp"), "fake image binary");

  // index.html comercial válido
  const validIndexHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sitio Válido de Prueba</title>
  <meta name="description" content="Descripción válida para página comercial.">
  <meta http-equiv="Content-Security-Policy" content="${CANONICAL_CSP}">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/urban.css">
</head>
<body>
  <h1 id="titulo">Título de prueba</h1>
  <p id="parrafo">Contenido de prueba</p>
  <a href="#parrafo">Ir a párrafo</a>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">Enlace externo seguro</a>
  <img src="assets/img/sample.webp" alt="Texto alternativo descriptivo" srcset="assets/img/sample.webp 480w">
</body>
</html>`;
  fs.writeFileSync(path.join(tempDir, "index.html"), validIndexHtml);
}

// -----------------------------------------------------------------------------
// Pruebas originales conservadas
// -----------------------------------------------------------------------------

test("Auditor - Página válida no genera falsos positivos", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-valid-"));
  try {
    createValidFixture(tempDir);
    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, true, "La página válida debe pasar la auditoría sin violaciones");
    assert.equal(result.violations.length, 0, `Violaciones inesperadas: ${JSON.stringify(result.violations)}`);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor - Detecta deliberadamente IDs duplicados", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-dup-id-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('id="parrafo"', 'id="titulo"');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante un ID duplicado");
    const dupViolation = result.violations.find(v => v.rule === "duplicate-id");
    assert.ok(dupViolation, "Debe existir una infracción de regla duplicate-id");
    assert.match(dupViolation.details, /id="titulo"/, "El mensaje debe especificar el ID duplicado");
    assert.match(dupViolation.details, /found 2 times/, "Debe indicar el recuento de duplicados");
    assert.match(dupViolation.details, /lines: \d+, \d+/, "Debe incluir los números de línea del reporte");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor - Detecta deliberadamente un enlace a un HTML inexistente", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-broken-link-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('</body>', '<a href="inexistente.html">Enlace roto</a></body>');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante un enlace roto");
    const violation = result.violations.find(v => v.rule === "broken-link");
    assert.ok(violation, "Debe registrar regla broken-link");
    assert.match(violation.details, /inexistente\.html/, "Debe indicar el archivo de destino faltante");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor - Detecta deliberadamente una imagen local inexistente", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-broken-src-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('</body>', '<img src="assets/img/no-existe.webp" alt="Faltante"></body>');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante una imagen src inexistente");
    const violation = result.violations.find(v => v.rule === "broken-src");
    assert.ok(violation, "Debe registrar regla broken-src");
    assert.match(violation.details, /no-existe\.webp/, "Debe indicar la imagen faltante");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor - Detecta deliberadamente una referencia rota dentro de srcset", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-broken-srcset-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('srcset="assets/img/sample.webp 480w"', 'srcset="assets/img/sample.webp 480w, assets/img/broken-retina.webp 1080w"');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante un asset roto en srcset");
    const violation = result.violations.find(v => v.rule === "broken-srcset");
    assert.ok(violation, "Debe registrar regla broken-srcset");
    assert.match(violation.details, /broken-retina\.webp/, "Debe indicar la imagen rota de srcset");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor - Detecta deliberadamente un fragmento que no existe en la página de destino", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-broken-anchor-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('href="#parrafo"', 'href="#seccion-inexistente"');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante un ancla inexistente");
    const violation = result.violations.find(v => v.rule === "broken-anchor");
    assert.ok(violation, "Debe registrar regla broken-anchor");
    assert.match(violation.details, /seccion-inexistente/, "Debe indicar el fragmento faltante");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor - Detecta deliberadamente un enlace target=\"_blank\" sin la protección requerida", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-unsafe-blank-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('rel="noopener noreferrer"', '');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante enlace target=_blank desprotegido");
    const violation = result.violations.find(v => v.rule === "unsafe-target-blank");
    assert.ok(violation, "Debe registrar regla unsafe-target-blank");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor - Detecta deliberadamente metadatos obligatorios ausentes (title)", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-missing-meta-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace(/<title>[^<]*<\/title>/, "<title></title>");
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante título vacío");
    const violation = result.violations.find(v => v.rule === "metadata-title");
    assert.ok(violation, "Debe registrar regla metadata-title");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor - Detecta deliberadamente CSP ausente o alterada", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-csp-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace(CANONICAL_CSP, "default-src 'self';");
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante CSP debilitada");
    const violation = result.violations.find(v => v.rule === "csp-mismatch");
    assert.ok(violation, "Debe registrar regla csp-mismatch");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor - Detecta deliberadamente frases de marketing no auditadas", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-mkt-phrase-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('Título de prueba', 'Ofrecemos máxima definición garantizada');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante frases de marketing prohibidas");
    const violation = result.violations.find(v => v.rule === "prohibited-marketing-phrase");
    assert.ok(violation, "Debe registrar regla prohibited-marketing-phrase");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

// -----------------------------------------------------------------------------
// A. Pruebas de regresión de Rutas href
// -----------------------------------------------------------------------------

test("Auditor (href) - Enlace relativo con espacios codificados (%20) pasa si el archivo existe", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-href-rel-space-"));
  try {
    createValidFixture(tempDir);
    const assetsDir = path.join(tempDir, "assets");
    fs.writeFileSync(path.join(assetsDir, "mi archivo.pdf"), "dummy binary");

    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('</body>', '<a href="assets/mi%20archivo.pdf">Descargar PDF</a></body>');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, true, "No debe fallar cuando el archivo relativo con espacios existe");
    assert.equal(result.violations.length, 0);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (href) - Enlace absoluto desde la raíz (/) con espacios codificados pasa si el archivo existe", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-href-abs-space-"));
  try {
    createValidFixture(tempDir);
    const assetsDir = path.join(tempDir, "assets");
    fs.writeFileSync(path.join(assetsDir, "guia de usuario.pdf"), "dummy binary");

    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('</body>', '<a href="/assets/guia%20de%20usuario.pdf">Guía</a></body>');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, true, "No debe fallar cuando el archivo absoluto con espacios existe");
    assert.equal(result.violations.length, 0);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (href) - Ruta que combina query string y fragmento resuelve archivo y comprueba ID destino", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-href-query-frag-"));
  try {
    createValidFixture(tempDir);
    // Crear pagina destino
    const otherPage = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Página Destino</title>
  <meta http-equiv="Content-Security-Policy" content="${CANONICAL_CSP}">
</head>
<body>
  <div id="seccion-detalles">Detalles</div>
</body>
</html>`;
    fs.writeFileSync(path.join(tempDir, "detalle.html"), otherPage);

    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('</body>', '<a href="detalle.html?ref=promo&lang=es#seccion-detalles">Ir a detalles</a></body>');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, true, "Debe resolver archivo sin confundir query string con nombre y verificar el fragmento existente");
    assert.equal(result.violations.length, 0);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (href) - Ruta con query string y fragmento detecta fragmento inexistente en destino HTML", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-href-query-frag-missing-"));
  try {
    createValidFixture(tempDir);
    const otherPage = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Página Destino</title>
  <meta http-equiv="Content-Security-Policy" content="${CANONICAL_CSP}">
</head>
<body>
  <div id="otra-seccion">Detalles</div>
</body>
</html>`;
    fs.writeFileSync(path.join(tempDir, "detalle.html"), otherPage);

    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('</body>', '<a href="detalle.html?v=1#seccion-inexistente">Ir a detalles</a></body>');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar porque el fragmento no existe en detalle.html");
    const violation = result.violations.find(v => v.rule === "broken-anchor");
    assert.ok(violation, "Debe generar regla broken-anchor");
    assert.match(violation.details, /seccion-inexistente/);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (href) - Enlace codificado a un archivo realmente inexistente genera infracción", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-href-missing-encoded-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('</body>', '<a href="assets/archivo%20fantasma.pdf">Descargar</a></body>');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante un archivo codificado inexistente");
    const violation = result.violations.find(v => v.rule === "broken-link");
    assert.ok(violation, "Debe generar regla broken-link");
    assert.match(violation.details, /assets\/archivo%20fantasma\.pdf/, "Debe preservar el href original en el reporte");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (href) - Secuencia porcentual malformada genera diagnóstico controlado sin excepción", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-href-malformed-percent-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('</body>', '<a href="assets/invalido%9Z.pdf">Enlace Malformado</a></body>');
    fs.writeFileSync(indexFile, content);

    let result;
    assert.doesNotThrow(() => {
      result = runAudit({ rootDir: tempDir, quiet: true });
    }, "No debe lanzar excepción no controlada por URI malformada");
    assert.equal(result.passed, false, "Debe fallar determinísticamente");
    const violation = result.violations.find(v => v.rule === "malformed-uri");
    assert.ok(violation, "Debe generar regla malformed-uri");
    assert.match(violation.details, /assets\/invalido%9Z\.pdf/, "Debe identificar el enlace afectado en el mensaje");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (href) - Enlace a otra página HTML comprueba correctamente el ID destino existente", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-href-other-page-id-"));
  try {
    createValidFixture(tempDir);
    const otherPage = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contacto</title>
  <meta http-equiv="Content-Security-Policy" content="${CANONICAL_CSP}">
</head>
<body>
  <h2 id="formulario">Formulario</h2>
</body>
</html>`;
    fs.writeFileSync(path.join(tempDir, "contacto.html"), otherPage);

    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('</body>', '<a href="contacto.html#formulario">Ir a formulario</a></body>');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, true, "Debe validar correctamente el ancla existente en la otra página");
    assert.equal(result.violations.length, 0);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

// -----------------------------------------------------------------------------
// B. IDs HTML entre múltiples páginas
// -----------------------------------------------------------------------------

test("Auditor (IDs) - Dos páginas distintas pueden tener el mismo ID sin infracción", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-cross-page-id-"));
  try {
    createValidFixture(tempDir);
    // index.html ya tiene id="titulo" e id="parrafo"
    // Creamos page2.html con id="titulo" también
    const page2 = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Segunda Página</title>
  <meta http-equiv="Content-Security-Policy" content="${CANONICAL_CSP}">
</head>
<body>
  <h1 id="titulo">Título de la segunda página</h1>
</body>
</html>`;
    fs.writeFileSync(path.join(tempDir, "page2.html"), page2);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, true, "No debe marcar duplicate-id entre archivos independientes");
    assert.equal(result.violations.filter(v => v.rule === "duplicate-id").length, 0);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

// -----------------------------------------------------------------------------
// C. Enlaces externos (target="_blank" y rel)
// -----------------------------------------------------------------------------

test("Auditor (externos) - Detecta ausencia de noopener cuando noreferrer está presente", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-missing-noopener-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('rel="noopener noreferrer"', 'rel="noreferrer"');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar si falta noopener");
    const violation = result.violations.find(v => v.rule === "unsafe-target-blank");
    assert.ok(violation, "Debe registrar regla unsafe-target-blank");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (externos) - Detecta ausencia de noreferrer cuando noopener está presente", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-missing-noreferrer-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('rel="noopener noreferrer"', 'rel="noopener"');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar si falta noreferrer");
    const violation = result.violations.find(v => v.rule === "unsafe-target-blank");
    assert.ok(violation, "Debe registrar regla unsafe-target-blank");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (externos) - Enlace sin target=\"_blank\" no recibe infracción injustificada", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-external-no-blank-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('target="_blank" rel="noopener noreferrer"', '');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, true, "Enlace externo regular sin _blank no requiere rel");
    assert.equal(result.violations.filter(v => v.rule === "unsafe-target-blank").length, 0);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

// -----------------------------------------------------------------------------
// D. Metadatos
// -----------------------------------------------------------------------------

test("Auditor (meta) - Detecta atributo lang ausente o vacío", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-missing-lang-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('<html lang="es">', '<html>');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar cuando falta lang");
    const violation = result.violations.find(v => v.rule === "metadata-lang");
    assert.ok(violation, "Debe registrar regla metadata-lang");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (meta) - Detecta idioma incorrecto en página dentro de en/", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-wrong-lang-en-"));
  try {
    createValidFixture(tempDir);
    const enDir = path.join(tempDir, "en");
    fs.mkdirSync(enDir, { recursive: true });
    const enPage = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>English Section with Spanish Lang</title>
  <meta name="description" content="Commercial description in English section.">
  <meta http-equiv="Content-Security-Policy" content="${CANONICAL_CSP}">
</head>
<body>
  <h1>Hello</h1>
</body>
</html>`;
    fs.writeFileSync(path.join(enDir, "index.html"), enPage);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar si en/index.html tiene lang=es");
    const violation = result.violations.find(v => v.rule === "metadata-lang" && v.file === "en/index.html");
    assert.ok(violation, "Debe registrar metadata-lang para en/index.html");
    assert.match(violation.details, /expected English lang/);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (meta) - Detecta viewport ausente", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-missing-viewport-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante viewport ausente");
    const violation = result.violations.find(v => v.rule === "metadata-viewport");
    assert.ok(violation, "Debe registrar regla metadata-viewport");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (meta) - Detecta charset ausente", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-missing-charset-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace('<meta charset="utf-8">', '');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante charset ausente");
    const violation = result.violations.find(v => v.rule === "metadata-charset");
    assert.ok(violation, "Debe registrar regla metadata-charset");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (meta) - Detecta description ausente o vacía en página comercial", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-missing-description-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace(/<meta name="description"[^>]*>/, '');
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante description ausente en página comercial");
    const violation = result.violations.find(v => v.rule === "metadata-description");
    assert.ok(violation, "Debe registrar regla metadata-description");
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (meta) - Conserva la excepción de description para páginas donde no es obligatoria", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-optional-description-"));
  try {
    createValidFixture(tempDir);
    // 404.html no es página comercial según la regla isCommercial (solo index.html y portfolio.html)
    const errPage = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Página no encontrada</title>
  <meta http-equiv="Content-Security-Policy" content="${CANONICAL_CSP}">
</head>
<body>
  <h1>404</h1>
</body>
</html>`;
    fs.writeFileSync(path.join(tempDir, "404.html"), errPage);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, true, "404.html sin description no debe producir infracción");
    assert.equal(result.violations.filter(v => v.rule === "metadata-description").length, 0);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

// -----------------------------------------------------------------------------
// E. CSS y catálogo
// -----------------------------------------------------------------------------

test("Auditor (CSS) - Detecta uso de variable CSS sin definición", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-undef-css-var-"));
  try {
    createValidFixture(tempDir);
    const urbanCss = path.join(tempDir, "assets", "css", "urban.css");
    fs.appendFileSync(urbanCss, "\n.hero { color: var(--color-inexistente); }");

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante variable CSS no definida");
    const violation = result.violations.find(v => v.rule === "undefined-css-var");
    assert.ok(violation, "Debe registrar regla undefined-css-var");
    assert.match(violation.details, /--color-inexistente/);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (catálogo) - Detecta ID duplicado en content/portfolio.json", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-portfolio-dup-id-"));
  try {
    createValidFixture(tempDir);
    const contentDir = path.join(tempDir, "content");
    fs.mkdirSync(contentDir, { recursive: true });
    const portfolio = [
      { id: "item-1", title: "Item 1" },
      { id: "item-1", title: "Item 1 duplicado" }
    ];
    fs.writeFileSync(path.join(contentDir, "portfolio.json"), JSON.stringify(portfolio, null, 2));

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar ante IDs duplicados en catálogo");
    const violation = result.violations.find(v => v.rule === "portfolio-duplicate-id");
    assert.ok(violation, "Debe registrar regla portfolio-duplicate-id");
    assert.match(violation.details, /item-1/);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (catálogo) - Detecta imagen del catálogo inexistente", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-portfolio-missing-img-"));
  try {
    createValidFixture(tempDir);
    const contentDir = path.join(tempDir, "content");
    fs.mkdirSync(contentDir, { recursive: true });
    const portfolio = [
      { id: "item-1", title: "Item 1", image: "assets/img/foto-fantasma.webp" }
    ];
    fs.writeFileSync(path.join(contentDir, "portfolio.json"), JSON.stringify(portfolio, null, 2));

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar si la imagen de un item no existe");
    const violation = result.violations.find(v => v.rule === "portfolio-missing-image");
    assert.ok(violation, "Debe registrar regla portfolio-missing-image");
    assert.match(violation.details, /foto-fantasma\.webp/);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (catálogo) - Detecta miniatura del catálogo inexistente", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-portfolio-missing-thumb-"));
  try {
    createValidFixture(tempDir);
    const contentDir = path.join(tempDir, "content");
    fs.mkdirSync(contentDir, { recursive: true });
    const portfolio = [
      { id: "item-1", title: "Item 1", thumb: "assets/img/thumb-fantasma.webp" }
    ];
    fs.writeFileSync(path.join(contentDir, "portfolio.json"), JSON.stringify(portfolio, null, 2));

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar si la miniatura de un item no existe");
    const violation = result.violations.find(v => v.rule === "portfolio-missing-thumb");
    assert.ok(violation, "Debe registrar regla portfolio-missing-thumb");
    assert.match(violation.details, /thumb-fantasma\.webp/);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test("Auditor (catálogo) - Fixture positivo del catálogo no genera falsos positivos", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-portfolio-valid-"));
  try {
    createValidFixture(tempDir);
    const contentDir = path.join(tempDir, "content");
    fs.mkdirSync(contentDir, { recursive: true });
    const portfolio = [
      { id: "item-1", title: "Item 1", image: "assets/img/sample.webp", thumb: "assets/img/sample.webp" }
    ];
    fs.writeFileSync(path.join(contentDir, "portfolio.json"), JSON.stringify(portfolio, null, 2));

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, true, "Catálogo con imágenes reales existentes no debe generar violaciones");
    assert.equal(result.violations.length, 0);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

// -----------------------------------------------------------------------------
// F. CSP
// -----------------------------------------------------------------------------

test("Auditor (CSP) - Detecta meta CSP completamente ausente", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-fixture-csp-missing-"));
  try {
    createValidFixture(tempDir);
    const indexFile = path.join(tempDir, "index.html");
    let content = fs.readFileSync(indexFile, "utf8");
    content = content.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/, "");
    fs.writeFileSync(indexFile, content);

    const result = runAudit({ rootDir: tempDir, quiet: true });
    assert.equal(result.passed, false, "Debe fallar cuando la etiqueta meta CSP está totalmente ausente");
    const violation = result.violations.find(v => v.rule === "missing-csp");
    assert.ok(violation, "Debe registrar regla missing-csp");
    assert.match(violation.details, /missing <meta http-equiv="Content-Security-Policy">/);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
