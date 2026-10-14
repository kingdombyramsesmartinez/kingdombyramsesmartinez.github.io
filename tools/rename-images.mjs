import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = path.resolve(".");
const artworkDir = path.join(root, "assets", "artwork");
const thumbsDir = path.join(artworkDir, "thumbs");

const files = fs.readdirSync(artworkDir).filter(f => f.endsWith(".webp"));

const renameMap = [
  // 51 files mapping
];

for (const f of files) {
  if (f.startsWith("alcaldia") || f.startsWith("TSJ")) {
    continue;
  }

  let clean = f
    .replace("IMPA-chaqueta bordadax.webp", "impa-chaqueta-bordada.webp")
    .replace("Gerreras SC-franela manga corta sublimada.webp", "guerreras-sc-franela-manga-corta-sublimada.webp")
    .replace("Jswim Academi", "jswim-academy")
    .replace("WWW.listaprecio.com", "listaprecio-com")
    .replace("Paramedicos Acosta ortiz", "paramedicos-acosta-ortiz")
    .replace("Santisima Trinidad", "santisima-trinidad")
    .replace("Promocion Ups", "promocion-ups")
    .replace("Fitness 24-7", "fitness-24-7")
    .replace("Michelle collection", "michelle-collection")
    .replace("Gigantes BC- camisa de beisbol sublimada .webp", "gigantes-bc-camisa-de-beisbol-sublimada.webp")
    .replace("Avengers Doomsday- franela con dtf.webp", "avengers-doomsday-franela-con-dtf.webp")
    .replace("Ferreconstrucciones- franela manga larga sublimada.webp", "ferreconstrucciones-franela-manga-larga-sublimada.webp")
    .replace("kingdom-tarjeta de presentacion.webp", "kingdom-tarjeta-de-presentacion.webp")
    .replace("Oasis Sport-franela con dtf Negra.webp", "oasis-sport-franela-con-dtf-negra.webp");

  clean = clean.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/_+/g, "-")
    .replace(/-+/g, "-");

  if (f !== clean) {
    renameMap.push({ oldName: f, newName: clean });
  }
}

console.log(`Found ${renameMap.length} files to rename.`);

// Create reportes/renombres.csv
const csvLines = [
  "archivo_antiguo,archivo_nuevo,ruta_artwork_antigua,ruta_artwork_nueva,ruta_thumb_antigua,ruta_thumb_nueva"
];

for (const item of renameMap) {
  csvLines.push(
    `"${item.oldName}","${item.newName}","assets/artwork/${item.oldName}","assets/artwork/${item.newName}","assets/artwork/thumbs/${item.oldName}","assets/artwork/thumbs/${item.newName}"`
  );
}

fs.writeFileSync(path.join(root, "reportes", "renombres.csv"), csvLines.join("\n") + "\n", "utf8");
console.log("Wrote reportes/renombres.csv");

// Execute git mv via two-step rename to avoid Windows NTFS case issues
for (const item of renameMap) {
  const oldArt = `assets/artwork/${item.oldName}`;
  const tmpArt = `assets/artwork/${item.newName}.tmp`;
  const newArt = `assets/artwork/${item.newName}`;

  const oldThumb = `assets/artwork/thumbs/${item.oldName}`;
  const tmpThumb = `assets/artwork/thumbs/${item.newName}.tmp`;
  const newThumb = `assets/artwork/thumbs/${item.newName}`;

  execSync(`git mv "${oldArt}" "${tmpArt}"`);
  execSync(`git mv "${tmpArt}" "${newArt}"`);

  if (fs.existsSync(oldThumb)) {
    execSync(`git mv "${oldThumb}" "${tmpThumb}"`);
    execSync(`git mv "${tmpThumb}" "${newThumb}"`);
  }
}

console.log("Git renames completed successfully.");
