import fs from "node:fs";
import path from "node:path";

const root = path.resolve(".");
const csvPath = path.join(root, "reportes", "renombres.csv");
const lines = fs.readFileSync(csvPath, "utf8").trim().split("\n").slice(1);

const renombres = lines.map(line => {
  const parts = line.split(",").map(s => s.replace(/^"|"$/g, ""));
  return {
    oldFile: parts[0],
    newFile: parts[1],
    oldArtwork: parts[2],
    newArtwork: parts[3],
    oldThumb: parts[4],
    newThumb: parts[5]
  };
});

console.log(`Loaded ${renombres.length} rename rules.`);

// Files to update: templates, content
const targets = [
  "templates/index.template.html",
  "templates/portfolio.template.html"
];

for (const rel of targets) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) continue;
  let text = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const r of renombres) {
    if (text.includes(r.oldArtwork)) {
      text = text.replaceAll(r.oldArtwork, r.newArtwork);
      changed = true;
      console.log(`Updated ${r.oldArtwork} -> ${r.newArtwork} in ${rel}`);
    } else if (text.includes(r.oldFile)) {
      text = text.replaceAll(r.oldFile, r.newFile);
      changed = true;
      console.log(`Updated ${r.oldFile} -> ${r.newFile} in ${rel}`);
    }
  }
  if (changed) {
    fs.writeFileSync(file, text, "utf8");
  }
}

console.log("Template references updated.");
