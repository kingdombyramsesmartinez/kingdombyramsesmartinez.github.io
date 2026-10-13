import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [
  { name: 'ES - Inicio', path: '/index.html' },
  { name: 'EN - Home', path: '/en/index.html' },
  { name: 'ES - Portafolio', path: '/portfolio.html' },
  { name: 'EN - Portfolio', path: '/en/portfolio.html' },
];

test.describe('Auditoría Automatizada de Accesibilidad (axe-core)', () => {
  for (const pageInfo of PAGES) {
    test(`evaluar WCAG 2.1 AA en ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.path, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');

      // Ejecutar axe-core sin desactivar reglas globalmente
      const axeResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      if (axeResults.violations.length > 0) {
        console.warn(`[AXE-CORE WARNING] ${pageInfo.name} tiene ${axeResults.violations.length} incumplimientos:`);
        for (const v of axeResults.violations) {
          console.warn(`- Regla: ${v.id} (${v.impact}) - ${v.description}`);
          console.warn(`  Ayuda: ${v.helpUrl}`);
          console.warn(`  Nodos afectados (${v.nodes.length}):`);
          v.nodes.slice(0, 3).forEach(n => console.warn(`    * Selector: ${n.target.join(' ')} | Fallo: ${n.failureSummary}`));
        }
      }

      // De acuerdo al requerimiento 8: informar los incumplimientos reales sin desactivar reglas.
      expect(
        axeResults.violations,
        `Incumplimientos de accesibilidad reales detectados por axe-core en ${pageInfo.name}: ${JSON.stringify(
          axeResults.violations.map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodesCount: v.nodes.length,
            targets: v.nodes.map(n => n.target.join(', '))
          })),
          null,
          2
        )}`
      ).toEqual([]);
    });
  }
});
