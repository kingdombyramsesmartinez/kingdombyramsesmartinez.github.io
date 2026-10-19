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

      // Seleccionar campos del formulario interactivo
      const serviceRadio = form.locator('input[name="quoteService"]').nth(1);
      const volumeRadio = form.locator('input[name="quoteQuantity"]').nth(1);
      const noteInput = page.locator('#quoteNote');
      const submitBtn = form.locator('button[type="submit"]');

      // Seleccionar opciones válidas haciendo clic en la tarjeta y el chip accesible
      await form.locator('label.quote-service-card').nth(1).click();
      await form.locator('label.quote-chip').nth(1).click();
      await noteInput.fill('Prueba automatizada de QA');

      const selectedServiceName = await serviceRadio.getAttribute('data-name');
      const selectedVolume = await volumeRadio.inputValue();

      // Verificar que el resumen vivo se actualice
      const summaryText = page.locator('#quoteSummaryText');
      await expect(summaryText).toBeVisible();
      const summaryContent = await summaryText.textContent();
      expect(summaryContent).toContain(selectedServiceName);

      // Verificar enlace secundario a correo
      const emailLink = page.locator('#quoteEmailLink');
      await expect(emailLink).toBeVisible();
      await expect(emailLink).toHaveAttribute('href', /^mailto:kingdombrandbqto@gmail\.com\?subject=/);
      const emailHref = await emailLink.getAttribute('href');
      expect(emailHref).not.toContain('undefined');
      expect(emailHref).not.toContain('null');

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
      expect(textParam).toContain(selectedServiceName);
      expect(textParam).toContain(selectedVolume);
      expect(textParam).toContain('Prueba automatizada de QA');

      // Asegurar que no se envió nada externo y se mantuvo seguro
    });
  }
});
