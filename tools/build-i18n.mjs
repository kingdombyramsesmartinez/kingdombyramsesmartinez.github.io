import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_CONFIG } from "../assets/js/site.config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const indexTemplatePath = path.join(root, "templates", "index.template.html");
const indexTemplate = fs.readFileSync(indexTemplatePath, "utf8");

const portfolioTemplatePath = path.join(root, "templates", "portfolio.template.html");
const portfolioTemplate = fs.readFileSync(portfolioTemplatePath, "utf8");

const esData = JSON.parse(fs.readFileSync(path.join(root, "content", "es.json"), "utf8"));
const enData = JSON.parse(fs.readFileSync(path.join(root, "content", "en.json"), "utf8"));
const portfolioData = JSON.parse(fs.readFileSync(path.join(root, "content", "portfolio.json"), "utf8"));
const preciosData = JSON.parse(fs.readFileSync(path.join(root, "data", "precios.json"), "utf8"));
const faqData = JSON.parse(fs.readFileSync(path.join(root, "data", "faq.json"), "utf8"));

// Escapa texto para atributos HTML (los campos del portafolio los escribe el dueño)
const esc = (v) => String(v ?? "")
  .replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/**
 * Datos estructurados JSON-LD (Person + Brand Kingdom + WebSite) escritos en el
 * HTML estático en tiempo de build, para que los buscadores los lean sin ejecutar
 * JavaScript. Un bloque application/ld+json no es ejecutable: la CSP no lo afecta.
 * Sin aggregateRating ni reseñas (plan, sección 9).
 */
function buildJsonLd({ isEn, isPortfolio, pageTitle, canonicalUrl }) {
  const siteUrl = SITE_CONFIG.siteUrl;
  const homeUrl = isEn ? `${siteUrl}/en/` : `${siteUrl}/`;
  const ogImageUrl = `${siteUrl}/assets/brand/og-image.png`;
  const lang = isEn ? "en" : "es";

  const personEntity = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    "name": "Ramses Martínez",
    "jobTitle": isEn ? "Textile Graphic Designer & Embroidery Digitizer" : "Diseñador gráfico textil y digitalizador de bordados",
    "url": `${siteUrl}/`,
    "telephone": `+${SITE_CONFIG.contact.whatsappNumber}`,
    "brand": { "@type": "Brand", "name": "Kingdom" },
    "image": {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#primaryimage`,
      "url": ogImageUrl,
      "contentUrl": ogImageUrl,
      "caption": "KINGDOM — Diseño Textil & Bordado Industrial"
    },
    "description": isEn
      ? "Portfolio of Ramses Martínez (Kingdom). Industrial DST/PES embroidery digitizing, sports sublimation and textile design in Barquisimeto, Venezuela."
      : "Portafolio de Ramses Martínez (Kingdom). Digitalización de bordados DST/PES, sublimación deportiva y diseño textil en Barquisimeto, Venezuela.",
    "sameAs": [
      SITE_CONFIG.contact.social.instagram,
      SITE_CONFIG.contact.social.tiktok,
      SITE_CONFIG.contact.social.linkedin
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Barquisimeto",
      "addressRegion": "Lara",
      "addressCountry": "VE"
    },
    "knowsAbout": isEn
      ? ["Industrial DST/PES Embroidery Digitizing", "Sports Sublimation", "Textile Graphic Design"]
      : ["Digitalización de bordados DST/PES", "Sublimación deportiva", "Diseño textil"]
  };

  const websiteEntity = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": `${siteUrl}/`,
    "name": "Kingdom",
    "alternateName": "Kingdom by Ramses Martínez",
    "author": { "@id": `${siteUrl}/#person` },
    "inLanguage": ["es", "en"]
  };

  const graph = [personEntity, websiteEntity];

  if (!isPortfolio) {
    graph.push(
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": pageTitle,
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "about": { "@id": `${siteUrl}/#person` },
        "inLanguage": lang
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-embroidery`,
        "name": isEn ? "Industrial Embroidery Digitizing (DST / PES)" : "Digitalización de Bordado Industrial (DST / PES)",
        "provider": { "@id": `${siteUrl}/#person` },
        "description": isEn
          ? "Technical digitizing calibrated with pull compensation, optimized density and clean stitch paths for industrial embroidery machines."
          : "Digitalización técnica con compensación de estiramiento, densidad calibrada y secuencias limpias para optimizar el paso en máquina bordadora.",
        "serviceType": isEn ? "Embroidery Digitizing" : "Matrices de Bordado"
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-sublimation`,
        "name": isEn ? "Full Print Sports Sublimation" : "Sublimación Deportiva Full Print",
        "provider": { "@id": `${siteUrl}/#person` },
        "description": isEn
          ? "Scale template engineering and color calibration for quick-dry athletic textiles (Dry-Fit, microfiber)."
          : "Diseño de plantillas a escala y calibración de color para textiles deportivos de secado rápido (Dry-Fit, microfibras y win).",
        "serviceType": isEn ? "Sports Apparel Sublimation" : "Sublimación Deportiva"
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-vector`,
        "name": isEn ? "Vector Illustration & Streetwear Graphic Design" : "Ilustración Vectorial & Streetwear",
        "provider": { "@id": `${siteUrl}/#person` },
        "description": isEn
          ? "Character vectorizing, logo cleanups and color separations for screen printing and DTF printing on cotton and blends."
          : "Trazado de personajes, vectorización de logotipos y separación de color para serigrafía o impresión DTF sobre algodón y mezclas.",
        "serviceType": isEn ? "Vector Graphic Design" : "Diseño Vectorial"
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-corporate-embroidery`,
        "name": isEn ? "Embroidered Corporate Uniforms" : "Uniformes Corporativos Bordados",
        "provider": { "@id": `${siteUrl}/#person` },
        "description": isEn
          ? "High-definition embroidered corporate shirts and institutional jackets tailored for businesses and organizations."
          : "Camisas corporativas y chaquetas institucionales con bordado computarizado de alta definición para dotación de personal.",
        "serviceType": isEn ? "Corporate Uniforms" : "Uniformes Corporativos"
      }
    );
  } else {
    graph.push(
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": pageTitle,
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "breadcrumb": { "@id": `${canonicalUrl}#breadcrumb` },
        "inLanguage": lang
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": isEn ? "Home" : "Inicio", "item": homeUrl },
          { "@type": "ListItem", "position": 2, "name": isEn ? "Textile Design Portfolio" : "Portafolio de Diseño Textil", "item": canonicalUrl }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collection`,
        "url": canonicalUrl,
        "name": pageTitle,
        "publisher": { "@id": `${siteUrl}/#person` }
      }
    );
  }

  // Escapar "<" evita que una cadena cierre el bloque </script> por accidente.
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)
    .replaceAll("<", "\\u003c");
  return `<script type="application/ld+json">\n${json}\n  </script>`;
}



function renderIndex(data, isEn) {
  const assetPrefix = isEn ? "../" : "";
  const legalPrefix = "legal/";
  const siteUrl = SITE_CONFIG.siteUrl;
  const canonicalUrl = isEn ? `${siteUrl}/en/` : `${siteUrl}/`;
  const portfolioPageHref = isEn ? "portfolio.html" : "portfolio.html";

  let out = indexTemplate;

  // Language & Metadata
  out = out.replaceAll("{{LANG}}", data.lang);
  out = out.replaceAll("{{DIR}}", data.dir);
  out = out.replaceAll("{{META_TITLE}}", data.meta.title);
  out = out.replaceAll("{{META_DESCRIPTION}}", data.meta.description);
  out = out.replaceAll("{{OG_TITLE}}", data.meta.ogTitle);
  out = out.replaceAll("{{OG_DESC}}", data.meta.ogDesc);
  out = out.replaceAll("{{OG_LOCALE}}", data.meta.ogLocale);
  out = out.replaceAll("{{OG_LOCALE_ALT}}", data.meta.ogLocaleAlt);
  out = out.replaceAll("{{CANONICAL_URL}}", canonicalUrl);
  out = out.replaceAll("{{SITE_URL}}", siteUrl);
  out = out.replaceAll("{{ASSET_PREFIX}}", assetPrefix);
  out = out.replaceAll("{{LEGAL_PREFIX}}", legalPrefix);
  out = out.replaceAll("{{JSON_LD}}", buildJsonLd({ isEn, isPortfolio: false, pageTitle: data.meta.title, canonicalUrl }));

  // Nav
  out = out.replaceAll("{{NAV_SKIP}}", data.nav.skip);
  out = out.replaceAll("{{NAV_ABOUT}}", data.nav.about);
  out = out.replaceAll("{{NAV_SERVICES}}", data.nav.services);
  out = out.replaceAll("{{NAV_MATERIALS}}", data.nav.materials);
  out = out.replaceAll("{{NAV_PORTFOLIO}}", data.nav.portfolio);
  out = out.replaceAll("{{NAV_FAQ}}", data.nav.faq || "FAQ");
  out = out.replaceAll("{{NAV_CONTACT}}", data.nav.contact);
  out = out.replaceAll("{{NAV_QUOTE}}", data.nav.quoteCta);
  out = out.replaceAll("{{NAV_MENU}}", data.nav.menu);
  out = out.replaceAll("{{NAV_LANG_TEXT}}", data.nav.langSwitchText);
  out = out.replaceAll("{{NAV_LANG_HREF}}", data.nav.langSwitchHref);
  out = out.replaceAll("{{NAV_LANG_TARGET}}", isEn ? "es" : "en");
  out = out.replaceAll("{{NAV_LANG_ARIA}}", data.nav.langSwitchAria);

  // Hero
  out = out.replaceAll("{{HERO_EYEBROW}}", data.hero.eyebrow);
  out = out.replaceAll("{{HERO_TITLE_LINE1}}", data.hero.titleLine1);
  out = out.replaceAll("{{HERO_TITLE_LINE2}}", data.hero.titleLine2);
  out = out.replaceAll("{{HERO_TITLE_LINE3}}", data.hero.titleLine3);
  out = out.replaceAll("{{HERO_LEAD}}", data.hero.lead);
  out = out.replaceAll("{{HERO_CTA_WA}}", data.hero.ctaWhatsapp);
  out = out.replaceAll("{{HERO_CTA_PORTFOLIO}}", data.hero.ctaPortfolio);
  out = out.replaceAll("{{PORTFOLIO_PAGE_HREF}}", portfolioPageHref);

  const heroWaMsg = encodeURIComponent(
    isEn
      ? "Hello Ramses, I would like to request a quote with Kingdom."
      : "Hola Ramses, deseo solicitar una cotización con Kingdom."
  );
  out = out.replaceAll("{{HERO_WA_MSG}}", heroWaMsg);

  const badgesHtml = data.hero.badges.map(b => `<span>${b}</span>`).join("\n            ");
  out = out.replaceAll("{{HERO_BADGES_HTML}}", badgesHtml);

  // Trust Strip
  const trustHtml = data.trust.map(t => `<div class="trust-item">${t}</div>`).join("\n        ");
  out = out.replaceAll("{{TRUST_ITEMS_HTML}}", trustHtml);

  // About / Trayectoria
  out = out.replaceAll("{{ABOUT_EYEBROW}}", data.about.eyebrow);
  out = out.replaceAll("{{ABOUT_TITLE}}", data.about.title);
  out = out.replaceAll("{{ABOUT_DESC}}", data.about.desc);
  out = out.replaceAll("{{ABOUT_TOOLS_TITLE}}", data.about.toolsTitle);

  const timelineHtml = data.about.timeline.map(item => `
          <div class="process-step">
            <span class="step-number">${item.period}</span>
            <div class="step-title">${item.title}</div>
            <p class="step-desc">${item.desc}</p>
          </div>`).join("");
  out = out.replaceAll("{{ABOUT_TIMELINE_HTML}}", timelineHtml);

  const toolsHtml = data.about.tools.map(tool => `
            <span class="tool-badge" translate="no">
              ${tool}
            </span>`).join("");
  out = out.replaceAll("{{ABOUT_TOOLS_HTML}}", toolsHtml);

  // Services
  out = out.replaceAll("{{SERVICES_EYEBROW}}", data.services.eyebrow);
  out = out.replaceAll("{{SERVICES_TITLE}}", data.services.title);
  out = out.replaceAll("{{SERVICES_DESC}}", data.services.desc);

  const servicesHtml = preciosData.servicios.map(s => `
          <article class="glass-card service-card">
            <div>
              <div class="service-header-row">
                <div class="service-index">${isEn ? s.index_en : s.index}</div>
                <span class="service-badge">${isEn ? s.badge_en : s.badge_es}</span>
              </div>
              <h3 class="service-title">${isEn ? s.title_en : s.title_es}</h3>
              <p class="service-body">${isEn ? s.body_en : s.body_es}</p>
            </div>
            <a class="link-magic" href="#contacto">${isEn ? s.cta_en : s.cta_es}</a>
          </article>`).join("");
  out = out.replaceAll("{{SERVICES_ITEMS_HTML}}", servicesHtml);

  // Pricing Table in Services
  out = out.replaceAll("{{PRICING_TABLE_EYEBROW}}", data.pricingTable.eyebrow);
  out = out.replaceAll("{{PRICING_TABLE_TITLE}}", data.pricingTable.title);
  out = out.replaceAll("{{PRICING_TABLE_DESC}}", data.pricingTable.desc);
  out = out.replaceAll("{{PRICING_TABLE_WRAP_LABEL}}", data.pricingTable.wrapLabel);
  out = out.replaceAll("{{PRICING_TABLE_NOTE}}", isEn ? preciosData.nota_pago_en : preciosData.nota_pago_es);

  const pricingHeadersHtml = data.pricingTable.headers.map(h => `<th>${h}</th>`).join("");
  out = out.replaceAll("{{PRICING_TABLE_HEADERS_HTML}}", pricingHeadersHtml);

  const pricingRowsHtml = preciosData.tabla_precios.map(r => `
              <tr>
                <td class="table-header-cell">${isEn ? r.servicio_en : r.servicio_es}</td>
                <td>${isEn ? r.tela_en : r.tela_es}</td>
                <td><strong>${r.precio}</strong></td>
              </tr>`).join("");
  out = out.replaceAll("{{PRICING_TABLE_ROWS_HTML}}", pricingRowsHtml);

  // Materials
  out = out.replaceAll("{{MATERIALS_EYEBROW}}", data.materials.eyebrow);
  out = out.replaceAll("{{MATERIALS_TITLE}}", data.materials.title);
  out = out.replaceAll("{{MATERIALS_DESC}}", data.materials.desc);

  const matHeadersHtml = data.materials.tableHeaders.map(h => `<th>${h}</th>`).join("");
  out = out.replaceAll("{{MATERIALS_HEADERS_HTML}}", matHeadersHtml);
  out = out.replaceAll("{{TECH_TABLE_WRAP_LABEL}}", isEn ? "Technical Specifications Table" : "Tabla de Especificaciones Técnicas");

  const matRowsHtml = data.materials.rows.map(r => `
              <tr>
                <td class="table-header-cell">${r.tech}</td>
                <td>${r.fabrics}</td>
                <td>${r.params}</td>
                <td>${r.app}</td>
              </tr>`).join("");
  out = out.replaceAll("{{MATERIALS_ROWS_HTML}}", matRowsHtml);

  // Portfolio Teaser & Featured Client Items (Home)
  const portfolioCount = portfolioData.length;
  const ctaExploreText = (data.portfolio.ctaExplore || "")
    .replaceAll("{{PORTFOLIO_COUNT}}", portfolioCount);
  out = out.replaceAll("{{PORTFOLIO_EYEBROW}}", data.portfolio.eyebrow);
  out = out.replaceAll("{{PORTFOLIO_TITLE}}", data.portfolio.title);
  out = out.replaceAll("{{PORTFOLIO_DESC}}", data.portfolio.desc);
  out = out.replaceAll("{{PORTFOLIO_CTA_EXPLORE}}", ctaExploreText);

  const featuredIds = [
    "impa",
    "alexauto",
    "gigantes-bc",
    "guerreras-sc",
    "muestrario-de-bordado",
    "oasis-sport",
    "ferreconstrucciones",
    "fitness-24-7"
  ];
  const featuredItems = featuredIds
    .map(id => portfolioData.find(item => item.id === id))
    .filter(Boolean);

  const featuredItemsHtml = featuredItems.map(item => `
          <a class="glass-card featured-card" href="${portfolioPageHref}#${item.id}">
            <div class="featured-thumb-wrap">
              <img src="${assetPrefix}${item.miniatura}" alt="${esc(isEn ? item.altEn : item.altEs)}" width="400" height="300" loading="lazy" decoding="async"/>
            </div>
            <div class="featured-card-info">
              <span class="featured-card-tag">${esc(isEn ? item.techniqueEn : item.techniqueEs)}</span>
              <h3 class="featured-card-title">${esc(isEn ? item.titleEn : item.titleEs)}</h3>
              <span class="featured-card-meta">${esc(isEn ? item.fabricEn : item.fabricEs)}</span>
            </div>
          </a>`).join("");
  out = out.replaceAll("{{PORTFOLIO_FEATURED_ITEMS_HTML}}", featuredItemsHtml);

  // FAQ Accordion
  out = out.replaceAll("{{FAQ_EYEBROW}}", data.faq.eyebrow);
  out = out.replaceAll("{{FAQ_TITLE}}", data.faq.title);
  out = out.replaceAll("{{FAQ_DESC}}", data.faq.desc);

  const faqItemsHtml = faqData.map(q => `
          <details class="faq-item glass-card">
            <summary class="faq-question">
              <span>${esc(isEn ? q.pregunta_en : q.pregunta_es)}</span>
              <span class="faq-icon" aria-hidden="true"></span>
            </summary>
            <div class="faq-answer">
              <p>${esc(isEn ? q.respuesta_en : q.respuesta_es)}</p>
            </div>
          </details>`).join("");
  out = out.replaceAll("{{FAQ_ITEMS_HTML}}", faqItemsHtml);

  // Contact & Interactive Quote
  out = out.replaceAll("{{CONTACT_EYEBROW}}", data.contact.eyebrow);
  out = out.replaceAll("{{CONTACT_QUOTE_TITLE}}", data.contact.quoteTitle);
  out = out.replaceAll("{{CONTACT_QUOTE_DESC}}", data.contact.quoteDesc);

  const qData = data.quoteInteractive;
  out = out.replaceAll("{{QUOTE_STEP1_TITLE}}", qData.step1Title);
  out = out.replaceAll("{{QUOTE_STEP2_TITLE}}", qData.step2Title);
  out = out.replaceAll("{{QUOTE_STEP3_TITLE}}", qData.step3Title);
  out = out.replaceAll("{{QUOTE_NAME_LABEL}}", qData.nameLabel);
  out = out.replaceAll("{{QUOTE_NAME_PLACEHOLDER}}", qData.namePlaceholder);
  out = out.replaceAll("{{QUOTE_FABRIC_LABEL}}", qData.fabricLabel);
  out = out.replaceAll("{{QUOTE_FABRIC_PLACEHOLDER}}", qData.fabricPlaceholder);
  out = out.replaceAll("{{QUOTE_LOGO_LABEL}}", qData.logoLabel);
  out = out.replaceAll("{{QUOTE_LOGO_YES}}", qData.logoYes);
  out = out.replaceAll("{{QUOTE_LOGO_NO}}", qData.logoNo);
  out = out.replaceAll("{{QUOTE_LOGO_NEED}}", qData.logoNeed);
  out = out.replaceAll("{{QUOTE_LOGO_HELPER}}", qData.logoHelper);
  out = out.replaceAll("{{QUOTE_NOTE_LABEL}}", qData.noteLabel);
  out = out.replaceAll("{{QUOTE_NOTE_PLACEHOLDER}}", qData.notePlaceholder);
  out = out.replaceAll("{{QUOTE_SUMMARY_TAG}}", qData.summaryTag);
  out = out.replaceAll("{{QUOTE_ESTIMATE_BADGE}}", qData.estimateBadge);
  out = out.replaceAll("{{QUOTE_SUBMIT_WA_BTN}}", qData.submitBtn);
  out = out.replaceAll("{{QUOTE_PREFER_EMAIL}}", qData.preferEmail);
  out = out.replaceAll("{{QUOTE_TRUST_TEXT}}", qData.trustText);

  const quoteCardsHtml = preciosData.servicios.map((s, idx) => `
                <label class="quote-service-card" for="quoteService_${s.id}">
                  <input type="radio" name="quoteService" id="quoteService_${s.id}" value="${s.id}" data-name="${esc(isEn ? s.title_en : s.title_es)}" data-price="${s.price_from}" data-unit="${esc(isEn ? s.price_unit_en : s.price_unit_es)}" ${idx === 0 ? "checked" : ""} class="sr-only quote-service-radio"/>
                  <div class="quote-service-card-inner">
                    <div class="quote-service-header">
                      <span class="quote-service-badge">${esc(isEn ? s.badge_en : s.badge_es)}</span>
                    </div>
                    <div class="quote-service-name">${esc(isEn ? s.title_en : s.title_es)}</div>
                    <p class="quote-service-desc">${esc(isEn ? s.body_en : s.body_es)}</p>
                  </div>
                </label>`).join("");
  out = out.replaceAll("{{QUOTE_SERVICES_CARDS_HTML}}", quoteCardsHtml);

  const qtyOptions = ["1–5", "6–24", "25–100", "100+"];
  const qtyChipsHtml = qtyOptions.map((qty, idx) => {
    const chipId = `quoteQty_${qty.replace(/[^\w]/g, "_")}`;
    return `
                <label class="quote-chip" for="${chipId}">
                  <input type="radio" name="quoteQuantity" id="${chipId}" value="${qty}" ${idx === 0 ? "checked" : ""} class="sr-only"/>
                  <span class="quote-chip-text">${qty}</span>
                </label>`;
  }).join("");
  out = out.replaceAll("{{QUOTE_QTY_CHIPS_HTML}}", qtyChipsHtml);

  // Contact Info Blocks
  out = out.replaceAll("{{BLOCK1_TITLE}}", data.contact.blocks.block1Title);
  out = out.replaceAll("{{BLOCK1_DESC}}", data.contact.blocks.block1Desc);
  out = out.replaceAll("{{BLOCK1_WA_LABEL}}", data.contact.blocks.whatsappLabel);
  out = out.replaceAll("{{BLOCK1_EMAIL_LABEL}}", data.contact.blocks.emailWorkLabel);

  out = out.replaceAll("{{BLOCK2_TITLE}}", data.contact.blocks.block2Title);
  out = out.replaceAll("{{BLOCK2_DESC}}", data.contact.blocks.block2Desc);
  out = out.replaceAll("{{BLOCK2_EMAIL_LABEL}}", data.contact.blocks.emailPersonalLabel);
  out = out.replaceAll("{{BLOCK2_LINKEDIN_LABEL}}", data.contact.blocks.linkedinLabel);

  out = out.replaceAll("{{LOCATION_LABEL}}", data.contact.blocks.locationLabel);
  out = out.replaceAll("{{LOCATION_VAL}}", data.contact.blocks.locationVal);
  out = out.replaceAll("{{CATALOG_LABEL}}", data.contact.blocks.catalogLabel);
  out = out.replaceAll("{{CATALOG_LINK_TEXT}}", data.contact.blocks.catalogLink);

  out = out.replaceAll("{{WHATSAPP_NUMBER}}", SITE_CONFIG.contact.whatsappNumber);
  out = out.replaceAll("{{WHATSAPP_DISPLAY}}", SITE_CONFIG.contact.whatsappDisplay);
  out = out.replaceAll("{{EMAIL_WORK}}", SITE_CONFIG.contact.emailWork);
  out = out.replaceAll("{{EMAIL_PERSONAL}}", SITE_CONFIG.contact.emailPersonal);
  out = out.replaceAll("{{LINKEDIN_URL}}", SITE_CONFIG.contact.social.linkedin);
  out = out.replaceAll("{{INSTAGRAM_URL}}", SITE_CONFIG.contact.social.instagram);
  out = out.replaceAll("{{TIKTOK_URL}}", SITE_CONFIG.contact.social.tiktok);
  out = out.replaceAll("{{DRIVE_CATALOG_URL}}", SITE_CONFIG.contact.social.driveCatalog);

  // Modal
  out = out.replaceAll("{{MODAL_CLOSE_ARIA}}", data.modal.closeAria);
  out = out.replaceAll("{{MODAL_CLOSE_TEXT}}", data.modal.closeText);
  out = out.replaceAll("{{MODAL_EYEBROW}}", data.modal.eyebrow);
  out = out.replaceAll("{{MODAL_TECH_LABEL}}", data.modal.techLabel);
  out = out.replaceAll("{{MODAL_GARMENT_LABEL}}", data.modal.garmentLabel);
  out = out.replaceAll("{{MODAL_PRICE_LABEL}}", data.modal.priceLabel);
  out = out.replaceAll("{{MODAL_CTA}}", data.modal.cta);
  out = out.replaceAll("{{MODAL_PRICE_REF}}", isEn ? "Reference price" : "Precio de referencia");
  out = out.replaceAll("{{MODAL_FEAT_1}}", isEn ? "High quality" : "Alta calidad");
  out = out.replaceAll("{{MODAL_FEAT_2}}", isEn ? "Customizable" : "Personalizable");
  out = out.replaceAll("{{MODAL_FEAT_3}}", isEn ? "Size range" : "Variedad de tallas");
  out = out.replaceAll("{{MODAL_FEAT_4}}", isEn ? "Several colors" : "Varios colores");
  out = out.replaceAll("{{MODAL_NOTE}}", isEn ? "Ask about prices, lead times and customization." : "Consulta por precios, tiempos de entrega y personalización.");
  out = out.replaceAll("{{MODAL_PREV}}", isEn ? "Previous image" : "Imagen anterior");
  out = out.replaceAll("{{MODAL_NEXT}}", isEn ? "Next image" : "Siguiente imagen");

  const modalWaMsg = encodeURIComponent(
    isEn
      ? "Hello Ramses, I saw this work in your portfolio and would like to quote something similar."
      : "Hola Ramses, vi este trabajo en tu portafolio y deseo cotizar algo similar."
  );
  out = out.replaceAll("{{MODAL_WA_MSG}}", modalWaMsg);

  // Footer
  out = out.replaceAll("{{FOOTER_BRAND_DESC}}", data.footer.brandDesc);
  out = out.replaceAll("{{FOOTER_LEGAL_TITLE}}", data.footer.legalTitle);
  out = out.replaceAll("{{FOOTER_LINK_PRIVACY}}", data.footer.links.privacy);
  out = out.replaceAll("{{FOOTER_LINK_TERMS}}", data.footer.links.terms);
  out = out.replaceAll("{{FOOTER_LINK_IP}}", data.footer.links.ip);
  out = out.replaceAll("{{FOOTER_LINK_COOKIES}}", data.footer.links.cookies);
  out = out.replaceAll("{{FOOTER_LINK_COOKIE_PREFS}}", isEn ? "Cookie Settings" : "Preferencias de Cookies");
  out = out.replaceAll("{{FOOTER_LINK_SECURITY}}", data.footer.links.security);
  out = out.replaceAll("{{FOOTER_LINK_A11Y}}", data.footer.links.a11y);
  out = out.replaceAll("{{FOOTER_COPYRIGHT}}", data.footer.copyright);
  out = out.replaceAll("{{FOOTER_DISCLAIMER}}", data.footer.disclaimer);
  out = out.replaceAll("{{FOOTER_BROWSER_TRANSLATE}}", data.footer.browserTranslate);

  return out;
}

function renderPortfolioPage(data, isEn) {
  const assetPrefix = isEn ? "../" : "";
  const legalPrefix = "legal/";
  const siteUrl = SITE_CONFIG.siteUrl;
  const canonicalUrl = isEn ? `${siteUrl}/en/portfolio.html` : `${siteUrl}/portfolio.html`;
  const homeHref = isEn ? "./" : "/";
  const portfolioLangHref = isEn ? "../portfolio.html" : "en/portfolio.html";

  let out = portfolioTemplate;

  // Language & Metadata
  out = out.replaceAll("{{LANG}}", data.lang);
  out = out.replaceAll("{{DIR}}", data.dir);
  out = out.replaceAll("{{PORTFOLIO_PAGE_TITLE}}", `${data.portfolio.title} | KINGDOM — Kingdom by Ramses Martínez`);
  out = out.replaceAll("{{JSON_LD}}", buildJsonLd({
    isEn,
    isPortfolio: true,
    pageTitle: `${data.portfolio.title} | KINGDOM — Kingdom by Ramses Martínez`,
    canonicalUrl
  }));
  out = out.replaceAll("{{PORTFOLIO_PAGE_DESC}}", data.portfolio.desc);
  out = out.replaceAll("{{PORTFOLIO_CANONICAL_URL}}", canonicalUrl);
  out = out.replaceAll("{{SITE_URL}}", siteUrl);
  out = out.replaceAll("{{OG_LOCALE}}", data.meta.ogLocale);
  out = out.replaceAll("{{OG_LOCALE_ALT}}", data.meta.ogLocaleAlt);
  out = out.replaceAll("{{ASSET_PREFIX}}", assetPrefix);
  out = out.replaceAll("{{LEGAL_PREFIX}}", legalPrefix);
  out = out.replaceAll("{{HOME_PAGE_HREF}}", homeHref);
  out = out.replaceAll("{{PORTFOLIO_LANG_HREF}}", portfolioLangHref);
  out = out.replaceAll("{{BREADCRUMB_ARIA_LABEL}}", isEn ? "Breadcrumb navigation" : "Migas de pan");
  out = out.replaceAll("{{BREADCRUMB_HOME}}", isEn ? "Home" : "Inicio");

  // Nav
  out = out.replaceAll("{{NAV_SKIP}}", data.nav.skip);
  out = out.replaceAll("{{NAV_ABOUT}}", data.nav.about);
  out = out.replaceAll("{{NAV_SERVICES}}", data.nav.services);
  out = out.replaceAll("{{NAV_MATERIALS}}", data.nav.materials);
  out = out.replaceAll("{{NAV_CONTACT}}", data.nav.contact);
  out = out.replaceAll("{{NAV_MENU}}", data.nav.menu);
  out = out.replaceAll("{{NAV_LANG_TEXT}}", data.nav.langSwitchText);
  out = out.replaceAll("{{NAV_LANG_TARGET}}", isEn ? "es" : "en");
  out = out.replaceAll("{{NAV_LANG_ARIA}}", data.nav.langSwitchAria);
  out = out.replaceAll("{{PORTFOLIO_CTA_BACK}}", data.portfolio.ctaBack);

  // Portfolio Section Headers
  out = out.replaceAll("{{PORTFOLIO_EYEBROW}}", data.portfolio.eyebrow);
  out = out.replaceAll("{{PORTFOLIO_TITLE}}", data.portfolio.title);
  out = out.replaceAll("{{PORTFOLIO_SECTION_HEADING}}", isEn ? "Catalog Pieces" : "Piezas del Catálogo");
  out = out.replaceAll("{{PORTFOLIO_DESC}}", data.portfolio.desc);
  out = out.replaceAll("{{PORTFOLIO_DISCLAIMER}}", data.portfolio.disclaimer);

  // Filters
  const filtersHtml = data.portfolio.filters.map((f, i) => `
          <button class="filter-btn" type="button" data-filter="${f.id}" aria-pressed="${i === 0 ? "true" : "false"}">
            ${f.label}
          </button>`).join("");
  out = out.replaceAll("{{PORTFOLIO_FILTERS_HTML}}", filtersHtml);

  // Helper to render a card
  function renderCard(p) {
    const title = isEn ? p.titleEn : p.titleEs;
    const tag = isEn ? p.techniqueEn : p.techniqueEs;
    const garment = isEn ? p.garmentEn : p.garmentEs;
    const avail = isEn ? p.availabilityEn : p.availabilityEs;
    const price = p.priceFinal || (isEn ? p.priceEn : p.priceEs) || "";
    const note = isEn ? p.noteEn : p.noteEs;
    const desc = isEn ? p.descEn : p.descEs;
    const alt = isEn ? p.altEn : p.altEs;
    const specs = `${garment} · ${avail}`;
    const ribbon = isEn ? p.ribbonEn : p.ribbonEs;
    const status = isEn ? p.statusEn : p.statusEs;
    const fabric = isEn ? p.fabricEn : p.fabricEs;
    const story = isEn ? p.storyEn : p.storyEs;
    const clickHint = isEn ? "Click to view details" : "Clic para ver detalle";

    const ribbonHtml = ribbon ? `<div class="portfolio-ribbon">${esc(ribbon)}</div>` : "";

    const proposalsList = (p.proposals || []).map(prop => ({
      image: `${assetPrefix}${prop.image}`,
      alt: isEn ? (prop.altEn || alt) : (prop.altEs || alt),
      title: isEn ? (prop.titleEn || title) : (prop.titleEs || title),
      specs: prop.specsEn || prop.specsEs ? (isEn ? prop.specsEn : prop.specsEs) : specs,
      tag: isEn ? (prop.techniqueEn || tag) : (prop.techniqueEs || tag),
      fabric: isEn ? (prop.fabricEn || fabric) : (prop.fabricEs || fabric),
      price: SITE_CONFIG.pricing?.enabled ? (prop.priceFinal || (isEn ? prop.priceEn : prop.priceEs) || price) : "",
      desc: isEn ? (prop.descEn || desc) : (prop.descEs || desc),
      story: isEn ? (prop.storyEn || story) : (prop.storyEs || story),
      status: isEn ? (prop.statusEn || status) : (prop.statusEs || status)
    }));

    const proposalsJsonAttr = proposalsList.length > 0 ? ` data-proposals="${esc(JSON.stringify(proposalsList))}"` : "";

    const isArtistic = p.isArtistic || p.category === "fanart" || p.tipo === "fanart" || p.tipo === "encargo-marca";
    const artisticAttr = isArtistic ? ' data-artistic="true"' : "";
    const priceAttr = (!isArtistic && SITE_CONFIG.pricing?.enabled) ? ` data-price="${esc(price)}"` : "";

    return `
          <article id="${p.id}" class="portfolio-card portfolio-card-clean" tabindex="0" role="button" aria-haspopup="dialog"
                   data-category="${p.categoria || p.category}"
                   data-tipo="${p.tipo || "cliente"}"
                   data-title="${esc(title)}"
                   data-tag="${esc(tag)}"
                   data-specs="${esc(specs)}"${priceAttr}${artisticAttr}
                   data-desc="${esc(desc)}${note ? ` (${esc(note)})` : ""}"
                   data-status="${esc(status)}"
                   data-fabric="${esc(fabric)}"
                   data-story="${esc(story)}"
                   data-img="${assetPrefix}${p.image}"${proposalsJsonAttr}>
            <div class="pc-media">
              ${ribbonHtml}
              <img src="${assetPrefix}${p.image.replace("assets/artwork/", "assets/artwork/thumbs/")}"
                   srcset="${encodeURI(`${assetPrefix}${p.image.replace("assets/artwork/", "assets/artwork/thumbs/")}`)} 480w, ${encodeURI(`${assetPrefix}${p.image}`)} 1080w"
                   sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 960px) calc((100vw - 64px) / 2), 360px"
                   alt="${esc(alt)}" width="1080" height="1350" loading="lazy" decoding="async"/>
            </div>
            <div class="pc-body">
              <h3 class="pc-title">${esc(title)}</h3>
              <p class="pc-desc">${esc(desc)}</p>
              <div class="pc-foot">
                <span class="pc-action-hint">${clickHint}</span>
                <span class="pc-arrow" aria-hidden="true">→</span>
              </div>
              <span class="visually-hidden">${clickHint}</span>
            </div>
          </article>`;
  }

  // Segregate pieces: Main (cliente + propio: 24), Fanart (9), Encargo-marca (6)
  const clientPieces = portfolioData.filter(p => p.tipo !== "fanart" && p.tipo !== "encargo-marca");
  const fanartPieces = portfolioData.filter(p => p.tipo === "fanart");
  const encargoPieces = portfolioData.filter(p => p.tipo === "encargo-marca");

  const cardsHtml = clientPieces.map(renderCard).join("");
  const fanartCardsHtml = fanartPieces.map(renderCard).join("");
  const encargoCardsHtml = encargoPieces.map(renderCard).join("");

  out = out.replaceAll("{{PORTFOLIO_CARDS_HTML}}", cardsHtml);
  out = out.replaceAll("{{FANART_CARDS_HTML}}", fanartCardsHtml);
  out = out.replaceAll("{{ENCARGO_CARDS_HTML}}", encargoCardsHtml);

  out = out.replaceAll("{{FANART_SUBGROUP_TITLE}}", data.portfolio.fanartSubgroupTitle);
  out = out.replaceAll("{{FANART_SUBGROUP_DESC}}", data.portfolio.fanartSubgroupDesc);
  out = out.replaceAll("{{FANART_DISCLAIMER}}", data.portfolio.fanartDisclaimer);
  out = out.replaceAll("{{ENCARGO_SUBGROUP_TITLE}}", data.portfolio.encargoSubgroupTitle);
  out = out.replaceAll("{{ENCARGO_SUBGROUP_DESC}}", data.portfolio.encargoSubgroupDesc);
  out = out.replaceAll("{{ENCARGO_DISCLAIMER}}", data.portfolio.encargoDisclaimer);
  out = out.replaceAll("{{CLIENT_LOGOS_DISCLAIMER}}", data.portfolio.clientLogosDisclaimer);

  // Modal
  out = out.replaceAll("{{MODAL_CLOSE_ARIA}}", data.modal.closeAria);
  out = out.replaceAll("{{MODAL_CLOSE_TEXT}}", data.modal.closeText);
  out = out.replaceAll("{{MODAL_EYEBROW}}", data.modal.eyebrow);
  out = out.replaceAll("{{MODAL_TECH_LABEL}}", data.modal.techLabel);
  out = out.replaceAll("{{MODAL_GARMENT_LABEL}}", data.modal.garmentLabel);
  out = out.replaceAll("{{MODAL_FABRIC_LABEL}}", data.modal.fabricLabel);
  out = out.replaceAll("{{MODAL_PRICE_LABEL}}", data.modal.priceLabel);
  out = out.replaceAll("{{MODAL_CTA}}", data.modal.cta);
  out = out.replaceAll("{{MODAL_PRICE_REF}}", isEn ? "Reference price" : "Precio de referencia");
  out = out.replaceAll("{{MODAL_FEAT_1}}", isEn ? "High quality" : "Alta calidad");
  out = out.replaceAll("{{MODAL_FEAT_2}}", isEn ? "Customizable" : "Personalizable");
  out = out.replaceAll("{{MODAL_FEAT_3}}", isEn ? "Size range" : "Variedad de tallas");
  out = out.replaceAll("{{MODAL_FEAT_4}}", isEn ? "Several colors" : "Varios colores");
  out = out.replaceAll("{{MODAL_NOTE}}", isEn ? "Ask about prices, lead times and customization." : "Consulta por precios, tiempos de entrega y personalización.");
  out = out.replaceAll("{{MODAL_PREV}}", isEn ? "Previous image" : "Imagen anterior");
  out = out.replaceAll("{{MODAL_NEXT}}", isEn ? "Next image" : "Siguiente imagen");
  out = out.replaceAll("{{WHATSAPP_NUMBER}}", SITE_CONFIG.contact.whatsappNumber);

  const modalWaMsg = encodeURIComponent(
    isEn
      ? "Hello Ramses, I saw this work in your portfolio and would like to quote something similar."
      : "Hola Ramses, vi este trabajo en tu portafolio y deseo cotizar algo similar."
  );
  out = out.replaceAll("{{MODAL_WA_MSG}}", modalWaMsg);

  // Footer
  out = out.replaceAll("{{FOOTER_BRAND_DESC}}", data.footer.brandDesc);
  out = out.replaceAll("{{FOOTER_LEGAL_TITLE}}", data.footer.legalTitle);
  out = out.replaceAll("{{FOOTER_LINK_PRIVACY}}", data.footer.links.privacy);
  out = out.replaceAll("{{FOOTER_LINK_TERMS}}", data.footer.links.terms);
  out = out.replaceAll("{{FOOTER_LINK_IP}}", data.footer.links.ip);
  out = out.replaceAll("{{FOOTER_LINK_COOKIES}}", data.footer.links.cookies);
  out = out.replaceAll("{{FOOTER_LINK_COOKIE_PREFS}}", isEn ? "Cookie Settings" : "Preferencias de Cookies");
  out = out.replaceAll("{{FOOTER_LINK_SECURITY}}", data.footer.links.security);
  out = out.replaceAll("{{FOOTER_LINK_A11Y}}", data.footer.links.a11y);
  out = out.replaceAll("{{FOOTER_COPYRIGHT}}", data.footer.copyright);
  out = out.replaceAll("{{FOOTER_DISCLAIMER}}", data.footer.disclaimer);
  out = out.replaceAll("{{FOOTER_BROWSER_TRANSLATE}}", data.footer.browserTranslate);

  return out;
}

// 1. Build Index ES & EN
const esHtml = renderIndex(esData, false);
fs.writeFileSync(path.join(root, "index.html"), esHtml, "utf8");
console.log("Generated: index.html (ES)");

const enDir = path.join(root, "en");
if (!fs.existsSync(enDir)) fs.mkdirSync(enDir, { recursive: true });
const enHtml = renderIndex(enData, true);
fs.writeFileSync(path.join(enDir, "index.html"), enHtml, "utf8");
console.log("Generated: en/index.html (EN)");

// 2. Build Portfolio ES & EN
const esPortfolioHtml = renderPortfolioPage(esData, false);
fs.writeFileSync(path.join(root, "portfolio.html"), esPortfolioHtml, "utf8");
console.log("Generated: portfolio.html (ES)");

const enPortfolioHtml = renderPortfolioPage(enData, true);
fs.writeFileSync(path.join(enDir, "portfolio.html"), enPortfolioHtml, "utf8");
console.log("Generated: en/portfolio.html (EN)");
