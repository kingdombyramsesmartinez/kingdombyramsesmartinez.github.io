import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * KINGDOM — CONFIGURACIÓN CENTRAL DE MARCA Y CONTENIDO (v4)
 * Adaptador ESM derivado directamente de data/config.json (fuente única de verdad).
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.resolve(__dirname, "../../data/config.json");
const rawConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));

export const SITE_CONFIG = Object.freeze({
  brand: Object.freeze({
    name: rawConfig.brand?.name || "KINGDOM",
    alternateName: rawConfig.brand?.alternateName || "Kingdom by Ramses Martínez",
    fullName: rawConfig.brand?.fullName || "KINGDOM by Ramses Martínez",
    owner: rawConfig.brand?.owner || "Ramses Martínez",
    tagline: rawConfig.brand?.tagline || "Diseño Textil, Bordado Industrial & Sublimación",
    location: rawConfig.brand?.location || "Barquisimeto, Estado Lara, Venezuela",
    originCountry: rawConfig.brand?.originCountry || "Venezuela"
  }),
  siteUrl: rawConfig.site_url || "https://kingdombyramsesmartinez.github.io",
  contact: Object.freeze({
    whatsappNumber: rawConfig.whatsapp_number || "",
    whatsappDisplay: rawConfig.whatsapp_display || "",
    emailWork: rawConfig.email_work || "",
    social: Object.freeze({
      instagram: rawConfig.instagram_url || "",
      tiktok: rawConfig.tiktok_url || "",
      linkedin: rawConfig.linkedin_url || "",
      driveCatalog: rawConfig.catalogo_url || "",
      gbpReviewUrl: rawConfig.gbp_review_url || ""
    })
  }),
  cvPath: rawConfig.cv_path || "",
  pricing: Object.freeze({
    enabled: rawConfig.pricing_enabled !== false
  }),
  palette: Object.freeze({
    ink: rawConfig.palette?.ink || "#070706",
    surface: rawConfig.palette?.surface || "#0D0D0C",
    surfaceAlt: rawConfig.palette?.surfaceAlt || "#121211",
    paper: rawConfig.palette?.paper || "#F7F7F4",
    olive: rawConfig.palette?.olive || "#7A8058",
    beige: rawConfig.palette?.beige || "#E9E0D0"
  })
});
