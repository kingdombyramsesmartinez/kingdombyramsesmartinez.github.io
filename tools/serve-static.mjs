import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

export function createStaticServer(rootDir = ROOT_DIR) {
  const server = http.createServer((req, res) => {
    try {
      const parsedUrl = new URL(req.url, 'http://localhost');
      let pathname = decodeURIComponent(parsedUrl.pathname);

      // Normalizar ruta inicial
      if (pathname.endsWith('/')) {
        pathname += 'index.html';
      }

      let filePath = path.join(rootDir, pathname);

      // Prevenir directory traversal
      if (!filePath.startsWith(rootDir)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 Forbidden');
        return;
      }

      // Si apunta a un directorio sin slash final, servir index.html o redirigir
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      const content = fs.readFileSync(filePath);
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': content.length,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`500 Server Error: ${err.message}`);
    }
  });

  return server;
}

// Si se ejecuta directamente desde la línea de comandos
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  const port = parseInt(process.argv[2] || process.env.PORT || '4173', 10);
  const serveDir = process.argv[3] ? path.resolve(ROOT_DIR, process.argv[3]) : ROOT_DIR;
  const server = createStaticServer(serveDir);
  server.listen(port, '127.0.0.1', () => {
    console.log(`[static-server] Serving ${serveDir} at http://127.0.0.1:${port}`);
  });
}
