import { test, expect } from '@playwright/test';

test.describe('Consentimiento de Cookies y Redirección de Analítica', () => {
  test('primera visita sin interacción: NO envía solicitudes de analítica ni inicializa scripts externos', async ({ page, context }) => {
    const analyticsRequests = [];

    page.on('request', (req) => {
      const url = req.url();
      if (url.includes('google-analytics.com') || url.includes('googletagmanager.com') || url.includes('doubleclick.net')) {
        analyticsRequests.push(url);
      }
    });

    await page.goto('/index.html', { waitUntil: 'networkidle' });

    // El banner de consentimiento debe estar visible
    const banner = page.locator('#cookieConsentBanner');
    await expect(banner).toBeVisible();

    // No debe existir el tag de script de GA
    const gaTag = await page.locator('#gaScriptTag').count();
    expect(gaTag).toBe(0);

    // Cero solicitudes de red a Google Analytics / Tag Manager
    expect(analyticsRequests, `Solicitudes enviadas sin consentimiento: ${JSON.stringify(analyticsRequests)}`).toEqual([]);

    // Cookies accesibles no deben contener _ga ni _gid
    const cookies = await context.cookies();
    const gaCookies = cookies.filter(c => c.name.startsWith('_ga') || c.name.startsWith('_gid'));
    expect(gaCookies).toEqual([]);
  });

  test('botón Rechazar: no descarga GA y guarda estado denied', async ({ page, context }) => {
    const analyticsRequests = [];
    page.on('request', (req) => {
      const url = req.url();
      if (url.includes('google-analytics.com') || url.includes('googletagmanager.com') || url.includes('doubleclick.net')) {
        analyticsRequests.push(url);
      }
    });

    await page.goto('/index.html');
    const rejectBtn = page.locator('.cookie-btn-reject');
    await rejectBtn.click();

    // El banner se oculta
    const banner = page.locator('#cookieConsentBanner');
    await expect(banner).toHaveClass(/cookie-consent-hiding/);

    // Preferencia persistida
    const savedConsent = await page.evaluate(() => localStorage.getItem('kingdom_cookie_consent'));
    expect(savedConsent).toBe('denied');

    // No debe existir el script de GA
    const gaTag = await page.locator('#gaScriptTag').count();
    expect(gaTag).toBe(0);

    // Cero solicitudes de medición
    expect(analyticsRequests).toEqual([]);

    // Al recargar la página, la preferencia denied persiste y el banner no aparece
    await page.reload({ waitUntil: 'networkidle' });
    const bannerOnReload = await page.locator('#cookieConsentBanner').count();
    expect(bannerOnReload).toBe(0);
    expect(analyticsRequests).toEqual([]);
  });

  test('botón Aceptar: inicializa GA y persiste granted', async ({ page }) => {
    await page.goto('/index.html');

    const acceptBtn = page.locator('.cookie-btn-accept');
    await acceptBtn.click();

    // Script de GA inyectado
    const gaTag = page.locator('#gaScriptTag');
    await expect(gaTag).toHaveCount(1);
    await expect(gaTag).toHaveAttribute('src', /googletagmanager\.com\/gtag\/js\?id=G-YQCLS51XJE/);

    // Preferencia persistida
    const savedConsent = await page.evaluate(() => localStorage.getItem('kingdom_cookie_consent'));
    expect(savedConsent).toBe('granted');
  });

  test('Revocación (Aceptar -> Reabrir configuración -> Rechazar): detiene tracking y elimina cookies', async ({ page, context }) => {
    // 1. Simular visita inicial y aceptar
    await page.goto('/index.html');
    await page.locator('.cookie-btn-accept').click();
    await expect(page.locator('#gaScriptTag')).toHaveCount(1);

    // Simular que GA generó cookies de prueba
    await page.evaluate(() => {
      document.cookie = "_ga=GA1.1.123456789.1600000000; path=/";
      document.cookie = "_ga_YQCLS51XJE=GS1.1.1600000000.1.0.1600000000.0.0.0; path=/";
      document.cookie = "_gid=GA1.1.987654321.1600000000; path=/";
    });

    let currentCookies = await context.cookies();
    let gaFound = currentCookies.some(c => c.name.startsWith('_ga') || c.name.startsWith('_gid'));
    expect(gaFound).toBe(true);

    // 2. Reabrir banner mediante enlace del pie de página
    const openPrefsLink = page.locator('.site-footer a[data-open-cookies]');
    await openPrefsLink.click();

    const banner = page.locator('#cookieConsentBanner');
    await expect(banner).toBeVisible();
    await expect(banner).not.toHaveClass(/cookie-consent-hiding/);

    // 3. Revocar haciendo clic en Rechazar
    await page.locator('.cookie-btn-reject').click();

    // Comprobar estado de revocación
    const consentValue = await page.evaluate(() => localStorage.getItem('kingdom_cookie_consent'));
    expect(consentValue).toBe('denied');

    // Comprobar bandera ga-disable
    const gaDisabled = await page.evaluate(() => window['ga-disable-G-YQCLS51XJE']);
    expect(gaDisabled).toBe(true);

    // Comprobar eliminación de cookies accesibles
    const cookiesAfterRevoke = await page.evaluate(() => document.cookie);
    expect(cookiesAfterRevoke).not.toContain('_ga=');
    expect(cookiesAfterRevoke).not.toContain('_gid=');
  });

  test('comportamiento seguro y funcional cuando localStorage está restringido/bloqueado', async ({ page }) => {
    // Simular SecurityError al intentar acceder a localStorage
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get: () => {
          throw new DOMException('The operation is insecure.', 'SecurityError');
        }
      });
    });

    // La página no debe romperse ni arrojar error no controlado
    const pageErrors = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto('/index.html');
    expect(pageErrors).toEqual([]);

    // El banner debe renderizarse correctamente
    const banner = page.locator('#cookieConsentBanner');
    await expect(banner).toBeVisible();

    // Poder hacer clic en Rechazar sin excepción
    await page.locator('.cookie-btn-reject').click();
    await expect(banner).toHaveClass(/cookie-consent-hiding/);
    expect(pageErrors).toEqual([]);
  });

  test('enlace de más información del banner conduce a la política en el idioma correspondiente', async ({ page }) => {
    // En página española
    await page.goto('/index.html');
    const esLink = page.locator('#cookieConsentBanner .cookie-consent-link');
    await expect(esLink).toHaveAttribute('href', 'legal/cookies.html');
    await esLink.click();
    await expect(page).toHaveURL(/\/legal\/cookies\.html$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');

    // En página inglesa
    await page.goto('/en/index.html');
    const enLink = page.locator('#cookieConsentBanner .cookie-consent-link');
    await expect(enLink).toHaveAttribute('href', 'legal/cookies.html');
    await enLink.click();
    await expect(page).toHaveURL(/\/en\/legal\/cookies\.html$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});
