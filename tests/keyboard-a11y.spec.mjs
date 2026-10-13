import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'ES - Inicio', path: '/index.html' },
  { name: 'EN - Home', path: '/en/index.html' },
  { name: 'ES - Portafolio', path: '/portfolio.html' },
  { name: 'EN - Portfolio', path: '/en/portfolio.html' },
];

test.describe('Navegación por Teclado, Foco Visible y Nombres Accesibles', () => {
  for (const pageInfo of PAGES) {
    test(`todos los controles interactivos tienen nombre accesible en ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.path);

      // Evaluar botones, enlaces e inputs clave
      const namelessElements = await page.evaluate(() => {
        const interactive = document.querySelectorAll('button, a[href], input, select, textarea, [role="button"]');
        const invalid = [];

        for (const el of interactive) {
          // Si está oculto deliberadamente, ignorar
          const style = window.getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') continue;
          if (el.closest('[hidden]')) continue;

          // Cálculo estándar de nombre accesible
          const ariaLabel = el.getAttribute('aria-label') || '';
          const ariaLabelledBy = el.getAttribute('aria-labelledby') || '';
          const title = el.getAttribute('title') || '';
          const placeholder = el.getAttribute('placeholder') || '';
          const alt = el.querySelector('img')?.getAttribute('alt') || '';
          const text = (el.textContent || '').trim();

          // Comprobar si tiene etiqueta <label for="id"> asociada
          let labelText = '';
          if (el.id) {
            const labelEl = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
            if (labelEl) labelText = (labelEl.textContent || '').trim();
          }

          const hasName = Boolean(
            ariaLabel.trim() ||
            ariaLabelledBy.trim() ||
            labelText ||
            title.trim() ||
            alt.trim() ||
            text ||
            placeholder.trim()
          );

          if (!hasName) {
            invalid.push({
              tag: el.tagName,
              id: el.id,
              className: el.className,
              outerHTML: el.outerHTML.slice(0, 120)
            });
          }
        }
        return invalid;
      });

      expect(namelessElements, `Controles interactivos sin nombre accesible en ${pageInfo.name}: ${JSON.stringify(namelessElements)}`).toEqual([]);
    });

    test(`enlace de salto (skip link) recibe foco y se vuelve visible al pulsar Tab en ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.path);

      const skipLink = page.locator('.skip-link');
      if (await skipLink.count() > 0) {
        await page.keyboard.press('Tab');
        await expect(skipLink).toBeFocused();

        // Esperar a que la transición CSS de top: 16px se complete
        await expect.poll(async () => {
          const box = await skipLink.boundingBox();
          return box ? box.y : -100;
        }, { timeout: 3000 }).toBeGreaterThanOrEqual(10);
      }
    });

    test(`los elementos interactivos muestran foco visible (:focus-visible) en ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.path);

      // Simular navegación secuencial con Tab
      let foundFocusVisible = false;

      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        const focusCheck = await page.evaluate(() => {
          const active = document.activeElement;
          if (!active || active === document.body) return null;
          const style = window.getComputedStyle(active);
          const outlineStyle = style.outlineStyle;
          const outlineWidth = parseFloat(style.outlineWidth) || 0;
          const boxShadow = style.boxShadow;
          return {
            tagName: active.tagName,
            outlineStyle,
            outlineWidth,
            hasOutline: outlineStyle !== 'none' && outlineWidth > 0,
            hasBoxShadow: Boolean(boxShadow && boxShadow !== 'none')
          };
        });

        if (focusCheck && (focusCheck.hasOutline || focusCheck.hasBoxShadow)) {
          foundFocusVisible = true;
          break;
        }
      }

      expect(foundFocusVisible, `Al menos un control debe evidenciar indicador visual de foco visible`).toBe(true);
    });
  }
});
