import { test, expect } from '@playwright/test';

const PORTFOLIO_PAGES = [
  { name: 'ES - Portafolio', path: '/portfolio.html', totalExpected: 39, isEn: false },
  { name: 'EN - Portfolio', path: '/en/portfolio.html', totalExpected: 39, isEn: true },
];

test.describe('Filtros y Contador del Portafolio', () => {
  for (const pageInfo of PORTFOLIO_PAGES) {
    test(`filtrado de tarjetas y actualización de contador en ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.path);

      const cards = page.locator('.portfolio-card');
      const totalCards = await cards.count();
      expect(totalCards).toBe(pageInfo.totalExpected);

      const filterButtons = page.locator('.filter-btn');
      const btnCount = await filterButtons.count();
      expect(btnCount).toBeGreaterThan(0);

      const liveStatus = page.locator('#filterLiveStatus');

      // Iterar por cada botón de filtro y verificar comportamiento
      for (let i = 0; i < btnCount; i++) {
        const btn = filterButtons.nth(i);
        const filterCategory = await btn.getAttribute('data-filter');

        await btn.click();

        // 1. Verificar aria-pressed
        await expect(btn).toHaveAttribute('aria-pressed', 'true');

        // Los demás botones deben tener aria-pressed="false"
        for (let j = 0; j < btnCount; j++) {
          if (j !== i) {
            await expect(filterButtons.nth(j)).toHaveAttribute('aria-pressed', 'false');
          }
        }

        // 2. Comprobar visibilidad de tarjetas
        const visibleCards = page.locator('.portfolio-card:not(.is-hidden)');
        const visibleCount = await visibleCards.count();

        if (filterCategory === 'all') {
          expect(visibleCount).toBe(pageInfo.totalExpected);
        } else {
          expect(visibleCount).toBeGreaterThan(0);
          expect(visibleCount).toBeLessThanOrEqual(pageInfo.totalExpected);

          // Todas las visibles deben coincidir con la categoría seleccionada
          for (let k = 0; k < visibleCount; k++) {
            const cardCategory = await visibleCards.nth(k).getAttribute('data-category');
            expect(cardCategory).toBe(filterCategory);
          }
        }

        // 3. Comprobar mensaje del contador para lectores de pantalla
        const statusText = await liveStatus.textContent();
        if (pageInfo.isEn) {
          const expectedStatus = visibleCount === 1 ? '1 piece' : `${visibleCount} pieces`;
          expect(statusText).toBe(expectedStatus);
        } else {
          const expectedStatus = visibleCount === 1 ? '1 pieza' : `${visibleCount} piezas`;
          expect(statusText).toBe(expectedStatus);
        }
      }

      // Volver a activar 'all'
      const allBtn = page.locator('.filter-btn[data-filter="all"]');
      await allBtn.click();
      const allVisible = await page.locator('.portfolio-card:not(.is-hidden)').count();
      expect(allVisible).toBe(pageInfo.totalExpected);
    });
  }
});
