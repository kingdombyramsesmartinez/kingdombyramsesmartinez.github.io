#!/usr/bin/env node
/**
 * KINGDOM — Verificador Automatizado de Sintaxis JavaScript
 * Analiza archivos .js, .mjs y .cjs excluyendo .git, node_modules y temporales.
 * Permite especificar directorios objetivo como argumentos (útil para pruebas controladas).
 * Retorna código 0 si todos pasan, o código distinto de 0 si hay errores sintácticos.
 */

import { readdirSync, statSync } from 'node:fs';
import { resolve, relative, extname } from 'node:path';
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const DEFAULT_DIRS = ['assets/js', 'tools'];
const VALID_EXTS = new Set(['.js', '.mjs', '.cjs']);
const EXCLUDED_DIRS = new Set(['.git', 'node_modules', 'tmp', 'temp', 'dist', 'coverage']);

function collectFiles(dirPath, rootDir, files = []) {
  let entries;
  try {
    entries = readdirSync(dirPath, { withFileTypes: true });
  } catch (err) {
    return files;
  }

  for (const entry of entries) {
    const fullPath = resolve(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.has(entry.name)) {
        collectFiles(fullPath, rootDir, files);
      }
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (VALID_EXTS.has(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

export function runSyntaxCheck(targetPaths, options = { quiet: false }) {
  const rootDir = process.cwd();
  const searchDirs = (targetPaths && targetPaths.length > 0) ? targetPaths : DEFAULT_DIRS;
  const targetFiles = [];

  for (const dir of searchDirs) {
    const fullDir = resolve(rootDir, dir);
    let st;
    try {
      st = statSync(fullDir);
    } catch (_) {
      continue;
    }
    if (st.isDirectory()) {
      collectFiles(fullDir, rootDir, targetFiles);
    } else if (st.isFile()) {
      const ext = extname(fullDir).toLowerCase();
      if (VALID_EXTS.has(ext)) {
        targetFiles.push(fullDir);
      }
    }
  }

  targetFiles.sort();

  if (!options.quiet) {
    console.log(`[check:js] Analizando sintaxis de JavaScript (${targetFiles.length} archivos encontrados)...`);
  }

  const passed = [];
  const failed = [];

  for (const file of targetFiles) {
    const rel = relative(rootDir, file).replace(/\\/g, '/');
    const res = spawnSync(process.execPath, ['--check', file], {
      encoding: 'utf8'
    });

    if (res.status === 0) {
      passed.push(rel);
    } else {
      const errorMsg = (res.stderr || res.stdout || 'Error de sintaxis desconocido').trim();
      failed.push({
        file: rel,
        error: errorMsg
      });
    }
  }

  if (!options.quiet) {
    for (const p of passed) {
      console.log(`  ✓ OK: ${p}`);
    }

    if (failed.length > 0) {
      console.error('\n[check:js] ERRORES DE SINTAXIS DETECTADOS:');
      for (const f of failed) {
        console.error(`\n  ✗ ERROR en ${f.file}:`);
        console.error(`    ${f.error.split('\n').join('\n    ')}`);
      }
      console.error(`\n[check:js] Resumen: ${passed.length} aprobados, ${failed.length} fallidos.`);
    } else {
      console.log(`\n[check:js] Resumen: ${passed.length} analizados y aprobados. 0 errores.`);
    }
  }

  return {
    total: targetFiles.length,
    passed,
    failed,
    status: failed.length === 0 ? 0 : 1
  };
}

// Ejecución directa por CLI
const isDirectCall = process.argv[1] && (
  resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')) ||
  resolve(process.argv[1]).endsWith('check-js-syntax.mjs')
);

if (isDirectCall) {
  const cliArgs = process.argv.slice(2);
  const result = runSyntaxCheck(cliArgs);
  process.exit(result.status);
}
