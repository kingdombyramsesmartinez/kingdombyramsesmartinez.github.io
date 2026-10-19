import { chromium } from 'playwright';
import fs from 'fs';

const viewports = [
  { name: 'mobile-360', width: 360, height: 740 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1024', width: 1024, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 }
];

const pages = [
  { slug: 'home-es', url: 'http://127.0.0.1:4173/index.html' },
  { slug: 'portfolio-es', url: 'http://127.0.0.1:4173/portfolio.html' },
  { slug: 'home-en', url: 'http://127.0.0.1:4173/en/index.html' },
  { slug: 'portfolio-en', url: 'http://127.0.0.1:4173/en/portfolio.html' }
];

async function capture() {
  fs.mkdirSync('reportes/evidencias/capturas', { recursive: true });
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    for (const p of pages) {
      await page.goto(p.url, { waitUntil: 'networkidle' });
      const filename = `reportes/evidencias/capturas/${p.slug}-${vp.name}.png`;
      await page.screenshot({ path: filename, fullPage: false });
      console.log('Saved:', filename);
    }
    await page.close();
  }
  await browser.close();
  console.log('ALL_SCREENSHOTS_DONE');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
