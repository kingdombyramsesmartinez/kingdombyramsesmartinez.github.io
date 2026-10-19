import { test, expect } from '@playwright/test';

const EMAIL = 'kingdombrandbqto@gmail.com';

test.describe('Botón de correo y página 404', () => {
  for (const { path, subject, toast } of [
    { path: '/index.html', subject: 'Contacto Laboral', toast: /Copiado/ },
    { path: '/en/index.html', subject: 'Work Inquiry', toast: /Copied/ },
  ]) {
    test(`botón de correo abre mailto con asunto y copia la dirección en ${path}`, async ({ page, context, browserName }) => {
      await page.goto(path);
      const btn = page.locator('.hire-btn[data-copy-email]');
      const href = await btn.getAttribute('href');
      expect(href).toMatch(new RegExp(`^mailto:${EMAIL}\\?subject=`));
      expect(decodeURIComponent(href)).toContain(subject);

      test.skip(browserName !== 'chromium', 'permisos de portapapeles solo en Chromium');
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      // Evita que el navegador de pruebas intente abrir un cliente de correo real.
      await page.evaluate(() => window.addEventListener('click', e => e.preventDefault()));
      await btn.click();
      await expect(page.locator('#toastRegion .toast')).toHaveText(toast);
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(EMAIL);
    });
  }

  test('ruta inexistente sirve la 404 personalizada con estilos y botones visibles', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.locator('h1')).toHaveText(/no está en el catálogo/);
    await expect(page.locator('.brand-badge img')).toHaveJSProperty('complete', true);
    // Con el banner de cookies abierto, ambos botones deben poder pulsarse (no quedan tapados).
    await expect(page.locator('#cookieConsentBanner')).toBeVisible();
    for (const sel of ['.error-actions .btn-premium', '.error-actions .btn-secondary']) {
      await page.locator(sel).scrollIntoViewIfNeeded();
      await page.locator(sel).click({ trial: true, timeout: 3000 });
    }
  });
});
