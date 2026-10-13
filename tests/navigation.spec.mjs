import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'ES - Inicio', path: '/index.html' },
  { name: 'EN - Home', path: '/en/index.html' },
  { name: 'ES - Portafolio', path: '/portfolio.html' },
  { name: 'EN - Portfolio', path: '/en/portfolio.html' },
];

test.describe('Menú Móvil', () => {
  for (const pageInfo of PAGES) {
    test(`apertura, cierre y navegación en ${pageInfo.name}`, async ({ page }, testInfo) => {
      await page.goto(pageInfo.path);

      const burgerBtn = page.locator('#burgerBtn');
      const navMenu = page.locator('#navMenu');

      const isBurgerVisible = await burgerBtn.isVisible();

      if (!isBurgerVisible) {
        testInfo.skip(true, 'Menú hamburguesa solo es visible en resoluciones móvil/tableta');
        return;
      }

      // Estado inicial: cerrado
      await expect(burgerBtn).toHaveAttribute('aria-expanded', 'false');
      await expect(navMenu).not.toHaveClass(/open/);

      // 1. Abrir menú con clic
      await burgerBtn.click();
      await expect(burgerBtn).toHaveAttribute('aria-expanded', 'true');
      await expect(navMenu).toHaveClass(/open/);
      const isLockedOnOpen = await page.evaluate(() => document.body.classList.contains('nav-locked'));
      expect(isLockedOnOpen).toBe(true);

      // 2. Cerrar menú con tecla Escape
      await page.keyboard.press('Escape');
      await expect(burgerBtn).toHaveAttribute('aria-expanded', 'false');
      await expect(navMenu).not.toHaveClass(/open/);
      const isLockedAfterEsc = await page.evaluate(() => document.body.classList.contains('nav-locked'));
      expect(isLockedAfterEsc).toBe(false);

      // 3. Volver a abrir y cerrar al hacer clic en un enlace de navegación
      await burgerBtn.click();
      await expect(navMenu).toHaveClass(/open/);

      const firstNavLink = navMenu.locator('.nav-link').first();
      await firstNavLink.click();

      // Al hacer clic en un enlace, el menú debe cerrarse
      await expect(navMenu).not.toHaveClass(/open/);
      await expect(burgerBtn).toHaveAttribute('aria-expanded', 'false');
      const isLockedAfterLink = await page.evaluate(() => document.body.classList.contains('nav-locked'));
      expect(isLockedAfterLink).toBe(false);
    });
  }
});
