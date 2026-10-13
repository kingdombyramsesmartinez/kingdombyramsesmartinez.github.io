import { test, expect } from '@playwright/test';

const PORTFOLIO_PAGES = [
  { name: 'ES - Portafolio', path: '/portfolio.html' },
  { name: 'EN - Portfolio', path: '/en/portfolio.html' },
];

test.describe('Modal del Portafolio', () => {
  for (const pageInfo of PORTFOLIO_PAGES) {
    test(`apertura, cierre por botón y navegación de carrusel en ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.path);

      const modal = page.locator('#portfolioModal');
      const modalClose = page.locator('#modalCloseBtn');
      const mainContent = page.locator('#mainContent');

      // Inicialmente oculto
      await expect(modal).not.toHaveClass(/open/);
      await expect(modal).toHaveAttribute('aria-hidden', 'true');

      // Buscar una tarjeta con múltiples propuestas (data-proposals) para probar carrusel
      const cardWithCarousel = page.locator('.portfolio-card[data-proposals]').first();
      await expect(cardWithCarousel).toBeVisible();

      // Abrir modal haciendo clic en la tarjeta
      await cardWithCarousel.click();

      // Verificar estado abierto
      await expect(modal).toHaveClass(/open/);
      await expect(modal).toHaveAttribute('aria-hidden', 'false');
      await expect(mainContent).toHaveAttribute('inert', '');
      const isLocked = await page.evaluate(() => document.body.classList.contains('nav-locked'));
      expect(isLocked).toBe(true);

      // El foco debe desplazarse al botón de cerrar
      await expect(modalClose).toBeFocused();

      // Probar controles de carrusel
      const modalNextBtn = page.locator('#modalNextBtn');
      const modalPrevBtn = page.locator('#modalPrevBtn');
      const modalCounter = page.locator('#modalCarouselCounter');

      await expect(modalCounter).toBeVisible();
      const initialCounterText = await modalCounter.textContent();
      expect(initialCounterText).toContain('1 /');

      // Clic en Siguiente imagen
      await modalNextBtn.click();
      const nextCounterText = await modalCounter.textContent();
      expect(nextCounterText).toContain('2 /');

      // Flecha del teclado derecha
      await page.keyboard.press('ArrowRight');
      const thirdCounterText = await modalCounter.textContent();
      expect(thirdCounterText).not.toBe(nextCounterText);

      // Flecha izquierda para retroceder
      await page.keyboard.press('ArrowLeft');
      const backCounterText = await modalCounter.textContent();
      expect(backCounterText).toBe(nextCounterText);

      // Cerrar modal con el botón X
      await modalClose.click();
      await expect(modal).not.toHaveClass(/open/);
      await expect(modal).toHaveAttribute('aria-hidden', 'true');
      const isMainInert = await mainContent.getAttribute('inert');
      expect(isMainInert).toBeNull();
      const isLockedAfterClose = await page.evaluate(() => document.body.classList.contains('nav-locked'));
      expect(isLockedAfterClose).toBe(false);

      // Comprobar restauración del foco a la tarjeta que lo abrió
      await expect(cardWithCarousel).toBeFocused();
    });

    test(`cierre por tecla Escape y backdrop click en ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.path);

      const modal = page.locator('#portfolioModal');
      const firstCard = page.locator('.portfolio-card').first();

      // 1. Abrir y cerrar con tecla Escape
      await firstCard.click();
      await expect(modal).toHaveClass(/open/);

      await page.keyboard.press('Escape');
      await expect(modal).not.toHaveClass(/open/);
      await expect(modal).toHaveAttribute('aria-hidden', 'true');

      // 2. Abrir con teclado (Enter sobre la tarjeta)
      await firstCard.focus();
      await page.keyboard.press('Enter');
      await expect(modal).toHaveClass(/open/);

      // Cerrar haciendo clic en el backdrop fuera del contenido
      // Clic en coordenadas de la esquina del modal (fuera del modal-sheet)
      await modal.click({ position: { x: 10, y: 10 } });
      await expect(modal).not.toHaveClass(/open/);
      await expect(modal).toHaveAttribute('aria-hidden', 'true');
    });
  }
});
