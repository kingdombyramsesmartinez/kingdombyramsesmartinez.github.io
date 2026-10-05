import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const pages = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "tools") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) pages.push(full);
  }
}
walk(root);

const fail=[];
const idsByFile = new Map();
for (const file of pages) {
  const text = fs.readFileSync(file,"utf8");
  idsByFile.set(file, new Set([...text.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1])));
}

for (const file of pages) {
  const text = fs.readFileSync(file,"utf8");
  const relDir = path.dirname(file);
  for (const m of text.matchAll(/\bhref=["']([^"']+)["']/g)) {
    const href=m[1];
    if (/^(?:https?:|mailto:|tel:|javascript:|data:|#)/i.test(href)) {
      if (href.startsWith("#")) {
        const id=href.slice(1);
        if (id && !idsByFile.get(file)?.has(id)) fail.push(`${path.relative(root,file)} -> missing anchor #${id}`);
      }
      continue;
    }
    const noHash=href.split("#")[0].split("?")[0];
    const target=path.normalize(path.join(relDir,noHash));
    if (!fs.existsSync(target)) fail.push(`${path.relative(root,file)} -> missing ${href}`);
    else if (href.includes("#")) {
      const id=href.split("#")[1];
      if (id && target.endsWith(".html") && !idsByFile.get(target)?.has(id)) fail.push(`${path.relative(root,file)} -> missing anchor ${href}`);
    }
  }
  for (const m of text.matchAll(/\bsrc=["']([^"']+)["']/g)) {
    const src=m[1];
    if (/^(?:https?:|data:|blob:)/i.test(src)) continue;
    const target=path.normalize(path.join(relDir,src.split("?")[0]));
    if (!fs.existsSync(target)) fail.push(`${path.relative(root,file)} -> missing asset ${src}`);
  }
}

if (fail.length) {
  console.error(`FAIL: ${fail.length} broken internal references`);
  for (const item of fail) console.error(`- ${item}`);
  process.exit(1);
}
console.log(`PASS: ${pages.length} HTML pages audited; no broken local href/src references.`);
