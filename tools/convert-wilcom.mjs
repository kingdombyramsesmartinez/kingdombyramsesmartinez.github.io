import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcDir = 'C:/Users/Dell/Pictures/Screenshots';
const outDir = 'c:/Users/Dell/Desktop/kingdom-portafolio/assets';

const files = [
  { name: 'Captura de pantalla 2026-10-05 175308.png', out: 'work-wilcom-01.webp' },
  { name: 'Captura de pantalla 2026-10-05 175947.png', out: 'work-wilcom-02.webp' },
  { name: 'Captura de pantalla 2026-10-05 180020.png', out: 'work-wilcom-03.webp' },
  { name: 'Captura de pantalla 2026-10-05 180041.png', out: 'work-wilcom-04.webp' },
  { name: 'Captura de pantalla 2026-10-05 180118.png', out: 'work-wilcom-05.webp' },
  { name: 'Captura de pantalla 2026-10-05 180149.png', out: 'work-wilcom-06.webp' }
];

async function convert() {
  for (const f of files) {
    const inputPath = path.join(srcDir, f.name);
    const outputPath = path.join(outDir, f.out);
    const meta = await sharp(inputPath).metadata();
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    const stat = fs.statSync(outputPath);
    console.log(`Converted ${f.name} -> ${f.out} (${meta.width}x${meta.height}, ${Math.round(stat.size / 1024)} KB)`);
  }
}

convert().catch(console.error);
