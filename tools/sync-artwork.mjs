import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const artworkDir = path.join(root, "assets", "artwork");
const portfolioJsonPath = path.join(root, "content", "portfolio.json");

// Leer todos los archivos .webp actuales de assets/artwork
const files = fs.readdirSync(artworkDir).filter(f => f.endsWith(".webp"));

// Helper para convertir slug / texto a Título elegante
function toTitleCase(str) {
  return str
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Clasificación de prenda, técnica y categoría según el nombre del archivo
function classifyFile(filename) {
  const lower = filename.toLowerCase();
  const base = filename.replace(/\.webp$/i, "");

  let category = "sublimacion";
  let garmentEs = "Camiseta Sublimada";
  let garmentEn = "Sublimated Jersey";
  let techniqueEs = "Sublimación Dry-Fit Full Color";
  let techniqueEn = "Full Color Dry-Fit Sublimation";
  let priceRef = "USD 18.00 / Unidad";

  // Precios y especificaciones extraídos de la planilla "PRECIOS de fabricacion.xlsx" (Hoja del Cliente / Detal)
  if (lower.includes("dtf")) {
    category = "streetwear";
    garmentEs = "Camiseta Algodón 100% Full DTF";
    garmentEn = "100% Cotton T-Shirt Full DTF";
    techniqueEs = "Estampado DTF Premium Cuatro Posiciones";
    techniqueEn = "Premium 4-Position DTF Print";
    priceRef = "USD 20.00 / Unidad";
  } else if (lower.includes("corporativa") || lower.includes("columbia")) {
    category = "branding";
    // Alexauto es la única con 2 bordados ($26); todas las demás tienen 5 bordados ($35)
    const isAlexauto = lower.includes("alexauto");
    if (isAlexauto) {
      garmentEs = "Camisa Corporativa Tipo Columbia (2 Bordados)";
      garmentEn = "Corporate Columbia Style Shirt (2 Embroideries)";
      techniqueEs = "Confección Premium & 2 Bordados Computarizados";
      techniqueEn = "Premium Tailoring & 2 Computerized Embroideries";
      priceRef = "USD 26.00 / Unidad";
    } else {
      garmentEs = "Camisa Corporativa Tipo Columbia (5 Bordados)";
      garmentEn = "Corporate Columbia Style Shirt (5 Embroideries)";
      techniqueEs = "Confección Premium & 5 Bordados Computarizados";
      techniqueEn = "Premium Tailoring & 5 Computerized Embroideries";
      priceRef = "USD 35.00 / Unidad";
    }
  } else if (lower.startsWith("bordado") || lower.includes("bordadax") || lower.includes("bordado")) {
    category = "branding";
    garmentEs = "Diseño de Matriz & Bordado Computarizado";
    garmentEn = "Embroidery Matrix Design & Computerized Stitching";
    techniqueEs = "Digitalización Wilcom DST/PES";
    techniqueEn = "Wilcom DST/PES Digitizing";
    priceRef = "USD 5.00 / Matriz";
  } else if (lower.includes("tarjeta")) {
    category = "branding";
    garmentEs = "Tarjetas de Presentación Corporativas";
    garmentEn = "Corporate Business Cards";
    techniqueEs = "Creación de Diseño Gráfico Vectorial + Impresión Glasé 300g";
    techniqueEn = "Vector Graphic Design Creation + 300g Gloss Print";
    priceRef = "USD 5.00 Creación de Diseño · USD 15.00 Impresión de 100 Tarjetas";
  } else if (lower.includes("chaqueta")) {
    category = "sublimacion";
    garmentEs = "Chaqueta Novak Forrada Sublimada";
    garmentEn = "Novak Lined Sublimated Jacket";
    techniqueEs = "Sublimación Full Print, Cierre & Forro Térmico";
    techniqueEn = "Full Print Sublimation, Zipper & Thermal Lining";
    priceRef = "USD 35.00 / Unidad";
  } else if (lower.includes("manga larga") || lower.includes("sudadera")) {
    category = "sublimacion";
    garmentEs = "Sudadera / Franela Manga Larga Dry-Fit Sublimada";
    garmentEn = "Sublimated Long Sleeve Dry-Fit Pullover";
    techniqueEs = "Sublimación Deportiva Dry-Fit";
    techniqueEn = "Dry-Fit Sports Sublimation";
    priceRef = "USD 17.50 / Unidad";
  } else if (lower.includes("beisbol")) {
    category = "sublimacion";
    garmentEs = "Beisbolera Sublimada Full Print";
    garmentEn = "Sublimated Baseball Jersey";
    techniqueEs = "Sublimación Full Print & Botonería Deportiva";
    techniqueEn = "Full Print Sublimation & Sports Buttoning";
    priceRef = "USD 25.00 / Unidad";
  } else if (lower.includes("chemise")) {
    category = "branding";
    garmentEs = "Chemise Piqué Poliéster / Dry-Fit Sublimada";
    garmentEn = "Sublimated Piqué Polyester / Dry-Fit Polo";
    techniqueEs = "Sublimación Dry-Fit & Cuello Tejido";
    techniqueEn = "Dry-Fit Sublimation & Knit Collar";
    priceRef = "USD 18.50 / Unidad";
  } else if (lower.includes("laneros")) {
    category = "sublimacion";
    garmentEs = "Camiseta Gaming Dry-Fit Sublimada";
    garmentEn = "Sublimated Dry-Fit Esports Jersey";
    techniqueEs = "Sublimación Full Color & Microfibra Transpirable";
    techniqueEn = "Full Color Sublimation & Breathable Microfiber";
    priceRef = "USD 18.00 / Unidad";
  } else if (lower.includes("manga corta") || lower.includes("franela")) {
    category = "sublimacion";
    garmentEs = "Franela Dry-Fit Sublimada";
    garmentEn = "Dry-Fit Sublimated T-Shirt";
    techniqueEs = "Sublimación Deportiva Dry-Fit Full Color";
    techniqueEn = "Full Color Dry-Fit Sports Sublimation";
    priceRef = "USD 13.80 / Unidad";
  }

  // Agrupamiento por cliente
  let clientKey = "";
  if (base.startsWith("Fitness 24-7-")) {
    clientKey = "Fitness 24/7";
  } else if (base.startsWith("bordado")) {
    clientKey = "Muestrario de Bordado";
  } else if (base === "kingdom-tarjeta de presentacion") {
    clientKey = "Kingdom Presentación";
  } else if (base.startsWith("TSJ")) {
    clientKey = "TSJ";
  } else {
    const parts = base.split("-");
    clientKey = parts[0].trim();
  }

  // Nombre de variante/producto descriptivo
  let variantName = base;
  if (base.includes("-")) {
    variantName = base.split("-").slice(1).join("-").trim();
  }

  return {
    filename,
    imagePath: `assets/artwork/${filename}`,
    clientKey,
    clientDisplay: toTitleCase(clientKey),
    variantDisplay: toTitleCase(variantName),
    category,
    garmentEs,
    garmentEn,
    techniqueEs,
    techniqueEn,
    priceRef
  };
}

// Analizar todos los archivos
const itemsParsed = files.map(classifyFile);

// Agrupar por clientKey
const groups = new Map();
for (const item of itemsParsed) {
  if (!groups.has(item.clientKey)) {
    groups.set(item.clientKey, []);
  }
  groups.get(item.clientKey).push(item);
}

// Construir array final de portfolio.json
const portfolioOutput = [];

for (const [clientKey, fileList] of groups.entries()) {
  const main = fileList[0];
  const proposals = fileList.slice(1);

  // Slug ID único
  const idSlug = clientKey
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const hasProposals = proposals.length > 0;
  const totalCount = fileList.length;

  const ribbonEs = hasProposals ? (totalCount === 2 ? "2 propuestas" : `${totalCount} propuestas`) : null;
  const ribbonEn = hasProposals ? (totalCount === 2 ? "2 proposals" : `${totalCount} proposals`) : null;

  const cardObj = {
    id: idSlug,
    image: main.imagePath,
    altEs: `Presentación textil y propuesta gráfica para ${main.clientDisplay}`,
    altEn: `Textile design presentation and concept artwork for ${main.clientDisplay}`,
    titleEs: main.clientDisplay,
    titleEn: main.clientDisplay,
    category: main.category,
    techniqueEs: main.techniqueEs,
    techniqueEn: main.techniqueEn,
    garmentEs: main.garmentEs,
    garmentEn: main.garmentEn,
    priceEs: main.priceRef,
    priceEn: main.priceRef,
    priceFinal: main.priceRef,
    availabilityEs: "Bajo pedido / Por lote o unidad",
    availabilityEn: "Made to order / Bulk or single",
    noteEs: "Diseño propio · Mockup referencial.",
    noteEn: "Original design · Concept mockup.",
    descEs: main.filename.includes("tarjeta") 
      ? "Servicio de diseño y reproducción: $5 por la creación del diseño gráfico vectorial y $15 por la impresión de 100 tarjetas en papel glasé 300g."
      : `Propuesta de diseño y presentación gráfica de alta resolución para ${main.clientDisplay} (${main.variantDisplay}).`,
    descEn: main.filename.includes("tarjeta")
      ? "Design and printing service: $5 for the vector graphic design creation and $15 for printing 100 business cards on 300g gloss cardstock."
      : `High-resolution design concept and presentation artwork for ${main.clientDisplay} (${main.variantDisplay}).`,
    statusEs: main.filename.includes("tarjeta")
      ? "Tarifas: $5 creación del diseño gráfico · $15 paquete de 100 tarjetas impresas."
      : `Propuesta técnica para ${main.clientDisplay}: ${main.variantDisplay}.`,
    statusEn: main.filename.includes("tarjeta")
      ? "Rates: $5 graphic design creation · $15 package of 100 printed cards."
      : `Technical design proposal for ${main.clientDisplay}: ${main.variantDisplay}.`,
    fabricEs: main.filename.includes("tarjeta") ? "Papel Glasé 300g acabado mate o brillante" : (main.category === "streetwear" ? "Algodón peinado pesado 240g" : (main.category === "branding" ? "Taslán / Gabardina microfibra institucional" : "Microfibra Dry-Fit antibacteriana 140g")),
    fabricEn: main.filename.includes("tarjeta") ? "300g Gloss paper matte or gloss finish" : (main.category === "streetwear" ? "Heavy combed cotton 240g" : (main.category === "branding" ? "Taslan / Microfiber twill" : "Antibacterial Dry-Fit microfiber 140g")),
    storyEs: main.filename.includes("tarjeta")
      ? "Desarrollo de identidad visual comercial y papelería corporativa con tipografía y acabados de alta definición."
      : `Desarrollo adaptado a la identidad gráfica y especificaciones textiles de ${main.clientDisplay}.`,
    storyEn: main.filename.includes("tarjeta")
      ? "Commercial visual identity and stationery design with high-definition typography and finishes."
      : `Artwork tailored to the visual identity and textile requirements of ${main.clientDisplay}.`
  };

  if (ribbonEs) {
    cardObj.ribbonEs = ribbonEs;
    cardObj.ribbonEn = ribbonEn;
  }

  if (hasProposals) {
    cardObj.proposals = proposals.map(p => ({
      image: p.imagePath,
      altEs: `Variante de propuesta — ${p.clientDisplay} (${p.variantDisplay})`,
      altEn: `Proposal variant — ${p.clientDisplay} (${p.variantDisplay})`,
      titleEs: `${p.clientDisplay} — ${p.variantDisplay}`,
      titleEn: `${p.clientDisplay} — ${p.variantDisplay}`,
      techniqueEs: p.techniqueEs,
      techniqueEn: p.techniqueEn,
      specsEs: `${p.garmentEs} · Bajo pedido`,
      specsEn: `${p.garmentEn} · Made to order`,
      fabricEs: p.category === "streetwear" ? "Algodón peinado pesado 240g" : (p.category === "branding" ? "Taslán / Gabardina microfibra institucional" : "Microfibra Dry-Fit antibacteriana 140g"),
      fabricEn: p.category === "streetwear" ? "Heavy combed cotton 240g" : (p.category === "branding" ? "Taslan / Microfiber twill" : "Antibacterial Dry-Fit microfiber 140g"),
      priceFinal: p.priceRef,
      priceEs: p.priceRef,
      priceEn: p.priceRef,
      statusEs: `Variante: ${p.variantDisplay}`,
      statusEn: `Variant: ${p.variantDisplay}`,
      descEs: `Alternativa complementaria de diseño y confección para ${p.clientDisplay}.`,
      descEn: `Complementary design and manufacturing alternative for ${p.clientDisplay}.`,
      storyEs: `Diseño desarrollado para diversificar la indumentaria manteniendo la línea gráfica institucional.`,
      storyEn: `Design developed to diversify apparel while preserving brand identity.`
    }));
  }

  portfolioOutput.push(cardObj);
}

// Guardar portfolio.json
fs.writeFileSync(portfolioJsonPath, JSON.stringify(portfolioOutput, null, 2) + "\n", "utf8");
console.log(`¡Éxito! Generadas ${portfolioOutput.length} tarjetas de cliente a partir de ${files.length} imágenes.`);

// Resumen por categoría
const counts = { sublimacion: 0, streetwear: 0, branding: 0 };
for (const it of portfolioOutput) counts[it.category] = (counts[it.category] || 0) + 1;
console.log("Tarjetas por categoría:", counts);
