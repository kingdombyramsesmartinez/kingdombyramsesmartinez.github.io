import { test, expect } from '@playwright/test';

test.describe('Navegación de Idiomas y Enlaces de Pie de Página', () => {
  test('conmutador de idioma ES -> EN y EN -> ES en inicio y portafolio', async ({ page }) => {
    async function openMenuIfMobile() {
      const burger = page.locator('#burgerBtn');
      if (await burger.isVisible()) {
        const isExpanded = await burger.getAttribute('aria-expanded');
        if (isExpanded !== 'true') {
          await burger.click();
          await expect(page.locator('#navMenu')).toHaveClass(/open/);
        }
      }
    }

    // 1. Inicio ES -> EN
    await page.goto('/index.html');
    await openMenuIfMobile();
    const esToEnLink = page.locator('#navMenu a[hreflang="en"]');
    await expect(esToEnLink).toBeVisible();
    await esToEnLink.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/en\/?(index\.html)?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // 2. EN -> ES
    await openMenuIfMobile();
    const enToEsLink = page.locator('#navMenu a[hreflang="es"]');
    await expect(enToEsLink).toBeVisible();
    await enToEsLink.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/(index\.html)?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');

    // 3. Portafolio ES -> EN
    await page.goto('/portfolio.html');
    await openMenuIfMobile();
    const portEsToEn = page.locator('#navMenu a[hreflang="en"]');
    await expect(portEsToEn).toBeVisible();
    await portEsToEn.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/en\/portfolio\.html$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // 4. Portafolio EN -> ES
    await openMenuIfMobile();
    const portEnToEs = page.locator('#navMenu a[hreflang="es"]');
    await expect(portEnToEs).toBeVisible();
    await portEnToEs.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/portfolio\.html$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });

  test('enlaces de pie de página (footer) resuelven con código 200 en ES y EN', async ({ page }) => {
    const pagesToTest = ['/index.html', '/en/index.html', '/portfolio.html', '/en/portfolio.html'];

    for (const testPath of pagesToTest) {
      await page.goto(testPath);
      const footerLinks = page.locator('.site-footer a');
      const count = await footerLinks.count();

      for (let i = 0; i < count; i++) {
        const link = footerLinks.nth(i);
        const href = await link.getAttribute('href');

        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('https://')) {
          continue; // Enlaces internos/anclas/externos
        }

        // Probar resolución del recurso interno
        const targetUrl = new URL(href, page.url()).href;
        const response = await page.request.get(targetUrl);
        expect(response.status(), `Enlace roto en footer (${testPath} -> ${href})`).toBe(200);
      }
    }
  });

  test('interacción con preferencias de cookies en pie de página reabre el banner', async ({ page }) => {
    await page.goto('/index.html');

    // Aceptar primero cookies
    const acceptBtn = page.locator('.cookie-btn-accept');
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
    }

    const consentBanner = page.locator('#cookieConsentBanner');
    await expect(consentBanner).toHaveClass(/cookie-consent-hiding/);

    // Clic en 'Preferencias de Cookies' del pie de página
    const cookieSettingsLink = page.locator('.site-footer a[data-open-cookies]');
    await cookieSettingsLink.click();

    // El banner debe volver a ser visible y no tener cookie-consent-hiding
    await expect(consentBanner).not.toHaveClass(/cookie-consent-hiding/);
    await expect(consentBanner).toBeVisible();
  });
});
