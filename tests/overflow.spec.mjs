import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'ES - Inicio', path: '/index.html' },
  { name: 'EN - Home', path: '/en/index.html' },
  { name: 'ES - Portafolio', path: '/portfolio.html' },
  { name: 'EN - Portfolio', path: '/en/portfolio.html' },
];

test.describe('Desbordamiento Horizontal (Overflow)', () => {
  for (const pageInfo of PAGES) {
    test(`sin scroll horizontal en ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.path, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');

      // Evaluar si scrollWidth excede clientWidth en documentElement y body
      const overflow = await page.evaluate(() => {
        const docElem = document.documentElement;
        const body = document.body;

        const docScrollWidth = docElem.scrollWidth;
        const docClientWidth = docElem.clientWidth;
        const bodyScrollWidth = body ? body.scrollWidth : 0;
        const bodyClientWidth = body ? body.clientWidth : 0;

        // Buscar elementos individuales que se salgan del ancho del viewport
        const overflowingElements = [];
        const viewportWidth = window.innerWidth;

        const all = document.querySelectorAll('*');
        for (const el of all) {
          const rect = el.getBoundingClientRect();
          // Elementos visibles cuyo borde derecho sobrepasa el viewport con margen de tolerancia de 1px
          if (rect.width > 0 && rect.height > 0 && rect.right > viewportWidth + 1.5) {
            // Verificar si el padre o antepasado tiene overflow hidden/clip
            const style = window.getComputedStyle(el);
            if (style.display !== 'none' && style.visibility !== 'hidden' && style.position !== 'fixed') {
              overflowingElements.push({
                tag: el.tagName,
                id: el.id,
                className: el.className,
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                viewportWidth
              });
            }
          }
        }

        return {
          hasDocOverflow: docScrollWidth > docClientWidth + 1,
          hasBodyOverflow: bodyScrollWidth > bodyClientWidth + 1,
          docScrollWidth,
          docClientWidth,
          bodyScrollWidth,
          bodyClientWidth,
          overflowingElements: overflowingElements.slice(0, 5) // limitar muestra
        };
      });

      expect(
        overflow.hasDocOverflow,
        `DocumentElement desborda horizontalmente: scrollWidth=${overflow.docScrollWidth} > clientWidth=${overflow.docClientWidth}. Elementos: ${JSON.stringify(overflow.overflowingElements)}`
      ).toBe(false);

      expect(
        overflow.hasBodyOverflow,
        `Body desborda horizontalmente: scrollWidth=${overflow.bodyScrollWidth} > clientWidth=${overflow.bodyClientWidth}`
      ).toBe(false);
    });
  }
});
