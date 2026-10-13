import fs from 'fs';
import path from 'path';

const backupPath = 'C:/Users/Dell/Desktop/kingdom-backup-20261012-063949/content/portfolio.json';
const targetPath = './content/portfolio.json';

const raw = fs.readFileSync(backupPath, 'utf-8');
const items = JSON.parse(raw);

const animeIds = [
  'avengers-doomsday',
  'bakugo-mha',
  'dbs-edition',
  'deku-edition',
  'naruto-edition',
  'tanjiro-edition'
];

const vehicleIds = [
  'camaro-edition',
  'corvette-edition',
  'ford-ka-edition',
  'spark-edition',
  'tahoe-edition',
  'wrangler-edition'
];

const tributeIds = [
  'cr7-edition',
  'messi-edition',
  'ramones-edition'
];

const institutionalIds = [
  'alcaldia-de-san-felipe',
  'tsj'
];

const updated = [];

for (const item of items) {
  if (institutionalIds.includes(item.id)) {
    // Withheld from public gallery pending formal client authorization
    continue;
  }

  if (animeIds.includes(item.id)) {
    item.category = 'fanart';
    item.isArtistic = true;
    item.price = 0;
    item.priceFormatted = 'Exhibición artística';
    item.ribbon = 'Fan Art';
    item.ribbonEn = 'Fan Art';
    item.features = [
      'Obra no oficial sin fines comerciales',
      'Muestra de ilustración y diseño gráfico',
      'No disponible para reproducción comercial ni confección'
    ];
    item.featuresEn = [
      'Unofficial non-commercial artistic work',
      'Graphic design & illustration showcase',
      'Not available for commercial reproduction or apparel sale'
    ];
    item.availability = 'Obra de exhibición artística';
    item.availabilityEn = 'Artistic exhibition piece';
  } else if (vehicleIds.includes(item.id)) {
    item.isArtistic = true;
    item.price = 0;
    item.priceFormatted = 'Estudio gráfico';
    item.ribbon = 'Estudio Gráfico';
    item.ribbonEn = 'Graphic Study';
    item.features = [
      'Estudio de renderizado y diseño automotriz',
      'Muestra de técnicas gráficas vectoriales',
      'Pieza de exhibición técnica'
    ];
    item.featuresEn = [
      'Automotive graphic & rendering study',
      'Vector illustration & technical showcase',
      'Technical exhibition piece'
    ];
    item.availability = 'Estudio gráfico automotriz';
    item.availabilityEn = 'Automotive graphic study';
  } else if (tributeIds.includes(item.id)) {
    item.isArtistic = true;
    item.price = 0;
    item.priceFormatted = 'Homenaje artístico';
    item.ribbon = 'Homenaje Artístico';
    item.ribbonEn = 'Artistic Tribute';
    item.features = [
      'Homenaje gráfico sin fines comerciales',
      'Muestra artística de composición y tipografía',
      'Pieza de portafolio creativo'
    ];
    item.featuresEn = [
      'Non-commercial graphic tribute',
      'Artistic composition & typography showcase',
      'Creative portfolio piece'
    ];
    item.availability = 'Homenaje artístico';
    item.availabilityEn = 'Artistic tribute';
  }

  updated.push(item);
}

fs.writeFileSync(targetPath, JSON.stringify(updated, null, 2), 'utf-8');
console.log(`Successfully processed ${updated.length} portfolio pieces.`);
