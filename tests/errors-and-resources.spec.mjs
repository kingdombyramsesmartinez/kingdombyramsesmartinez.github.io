import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'ES - Inicio', path: '/index.html' },
  { name: 'EN - Home', path: '/en/index.html' },
  { name: 'ES - Portafolio', path: '/portfolio.html' },
  { name: 'EN - Portfolio', path: '/en/portfolio.html' },
];

test.describe('Carga sin errores y recursos propios', () => {
  for (const pageInfo of PAGES) {
    test(`sin errores JS ni fallos 404 de recursos propios en ${pageInfo.name}`, async ({ page }) => {
      const pageErrors = [];
      const failedRequests = [];

      page.on('pageerror', (err) => {
        pageErrors.push(err.message || String(err));
      });

      page.on('response', (response) => {
        const url = response.url();
        const status = response.status();
        // Verificar únicamente recursos locales propios servidos por el servidor de pruebas
        if (url.includes('127.0.0.1:4173') && status >= 400) {
          failedRequests.push({ url, status });
        }
      });

      await page.goto(pageInfo.path, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');

      expect(pageErrors, `Errores JavaScript no controlados en ${pageInfo.name}: ${JSON.stringify(pageErrors)}`).toEqual([]);
      expect(failedRequests, `Recursos locales propios fallidos en ${pageInfo.name}: ${JSON.stringify(failedRequests)}`).toEqual([]);
    });
  }
});
