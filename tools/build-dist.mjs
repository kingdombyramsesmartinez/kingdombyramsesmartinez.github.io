import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const dist = path.resolve(root, "dist");

console.log("[build:dist] Preparing dist directory...");

// Clean and recreate dist
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Items to copy to dist
const itemsToCopy = [
  "index.html",
  "404.html",
  "portfolio.html",
  "en",
  "legal",
  "assets",
  "site-manifest.json",
  "sitemap.xml",
  "robots.txt",
  ".nojekyll",
  ".well-known"
];

for (const item of itemsToCopy) {
  const srcPath = path.join(root, item);
  const destPath = path.join(dist, item);
  if (fs.existsSync(srcPath)) {
    copyRecursive(srcPath, destPath);
    console.log(`  ✓ Copied: ${item}`);
  } else {
    console.warn(`  ! Warning: Optional item ${item} not found in root`);
  }
}

// Check CNAME if exists
const cnamePath = path.join(root, "CNAME");
if (fs.existsSync(cnamePath)) {
  fs.copyFileSync(cnamePath, path.join(dist, "CNAME"));
  console.log("  ✓ Copied: CNAME");
}

console.log("[build:dist] Production dist successfully created.");
