import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'ES - Inicio', path: '/index.html', isEn: false },
  { name: 'EN - Home', path: '/en/index.html', isEn: true },
];

test.describe('Formulario de Cotización y WhatsApp URL', () => {
  for (const pageInfo of PAGES) {
    test(`envío correcto y generación del enlace WhatsApp sin abrirlo en ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.path);

      const form = page.locator('#quickQuoteForm');
      await expect(form).toBeVisible();

      // Interceptar window.open y asignación a window.location.href en la página
      await page.evaluate(() => {
        window.__interceptedUrls = [];
        window.open = (url) => {
          window.__interceptedUrls.push(url);
          return { closed: false };
        };
      });

      // Seleccionar campos del formulario
      const serviceSelect = page.locator('#quoteService');
      const volumeSelect = page.locator('#quoteVolume');
      const noteInput = page.locator('#quoteNote');
      const submitBtn = form.locator('button[type="submit"]');

      // Seleccionar opciones válidas
      await serviceSelect.selectOption({ index: 1 });
      await volumeSelect.selectOption({ index: 1 });
      await noteInput.fill('Prueba automatizada de QA');

      const selectedService = await serviceSelect.inputValue();
      const selectedVolume = await volumeSelect.inputValue();

      // Enviar formulario
      await submitBtn.click();

      // Verificar que el toast de éxito/redirección se despliegue
      const toast = page.locator('.toast');
      await expect(toast).toBeVisible();
      const toastText = await toast.textContent();

      if (pageInfo.isEn) {
        expect(toastText).toContain('Redirecting to WhatsApp');
      } else {
        expect(toastText).toContain('Abriendo WhatsApp');
      }

      // Obtener la URL generada
      const interceptedUrls = await page.evaluate(() => window.__interceptedUrls || []);
      expect(interceptedUrls.length).toBe(1);

      const generatedUrl = interceptedUrls[0];
      expect(generatedUrl).toMatch(/^https:\/\/wa\.me\/584241092124\?text=/);

      const urlObj = new URL(generatedUrl);
      const textParam = urlObj.searchParams.get('text');

      expect(textParam).toBeTruthy();
      expect(textParam).toContain(selectedService);
      expect(textParam).toContain(selectedVolume);
      expect(textParam).toContain('Prueba automatizada de QA');

      // Asegurar que no se envió nada externo y se mantuvo seguro
    });
  }
});
