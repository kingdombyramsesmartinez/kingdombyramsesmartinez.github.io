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

function renderIndex(data, isEn) {
  const assetPrefix = isEn ? "../" : "";
  const legalPrefix = isEn ? "../legal/" : "legal/";
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

  // Nav
  out = out.replaceAll("{{NAV_SKIP}}", data.nav.skip);
  out = out.replaceAll("{{NAV_ABOUT}}", data.nav.about);
  out = out.replaceAll("{{NAV_SERVICES}}", data.nav.services);
  out = out.replaceAll("{{NAV_MATERIALS}}", data.nav.materials);
  out = out.replaceAll("{{NAV_PORTFOLIO}}", data.nav.portfolio);
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

  const servicesHtml = data.services.items.map(s => `
          <article class="glass-card service-card">
            <div>
              <div class="service-index">${s.index}</div>
              <h3 class="service-title">${s.title}</h3>
              <p class="service-body">${s.body}</p>
            </div>
            <a class="link-magic" href="#contacto">${s.cta}</a>
          </article>`).join("");
  out = out.replaceAll("{{SERVICES_ITEMS_HTML}}", servicesHtml);

  // Materials
  out = out.replaceAll("{{MATERIALS_EYEBROW}}", data.materials.eyebrow);
  out = out.replaceAll("{{MATERIALS_TITLE}}", data.materials.title);
  out = out.replaceAll("{{MATERIALS_DESC}}", data.materials.desc);

  const matHeadersHtml = data.materials.tableHeaders.map(h => `<th>${h}</th>`).join("");
  out = out.replaceAll("{{MATERIALS_HEADERS_HTML}}", matHeadersHtml);

  const matRowsHtml = data.materials.rows.map(r => `
              <tr>
                <td class="table-header-cell">${r.tech}</td>
                <td>${r.fabrics}</td>
                <td>${r.params}</td>
                <td>${r.app}</td>
              </tr>`).join("");
  out = out.replaceAll("{{MATERIALS_ROWS_HTML}}", matRowsHtml);

  // Portfolio Teaser
  out = out.replaceAll("{{PORTFOLIO_EYEBROW}}", data.portfolio.eyebrow);
  out = out.replaceAll("{{PORTFOLIO_TITLE}}", data.portfolio.title);
  out = out.replaceAll("{{PORTFOLIO_DESC}}", data.portfolio.desc);
  out = out.replaceAll("{{PORTFOLIO_CTA_EXPLORE}}", data.portfolio.ctaExplore);

  // Contact & Form
  out = out.replaceAll("{{CONTACT_EYEBROW}}", data.contact.eyebrow);
  out = out.replaceAll("{{CONTACT_QUOTE_TITLE}}", data.contact.quoteTitle);
  out = out.replaceAll("{{CONTACT_QUOTE_DESC}}", data.contact.quoteDesc);
  out = out.replaceAll("{{FORM_SERVICE_LABEL}}", data.contact.form.serviceLabel);
  out = out.replaceAll("{{FORM_VOLUME_LABEL}}", data.contact.form.volumeLabel);
  out = out.replaceAll("{{FORM_NOTE_LABEL}}", data.contact.form.noteLabel);
  out = out.replaceAll("{{FORM_NOTE_PLACEHOLDER}}", data.contact.form.notePlaceholder);
  out = out.replaceAll("{{FORM_SUBMIT_BTN}}", data.contact.form.submitBtn);

  const formServicesHtml = data.contact.form.services.map(s => `<option value="${s}">${s}</option>`).join("");
  out = out.replaceAll("{{FORM_SERVICES_OPTIONS_HTML}}", formServicesHtml);

  const formVolumesHtml = data.contact.form.volumes.map(v => `<option value="${v}">${v}</option>`).join("");
  out = out.replaceAll("{{FORM_VOLUMES_OPTIONS_HTML}}", formVolumesHtml);

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
  out = out.replaceAll("{{DRIVE_CATALOG_URL}}", SITE_CONFIG.contact.social.driveCatalog);

  // Modal
  out = out.replaceAll("{{MODAL_CLOSE_ARIA}}", data.modal.closeAria);
  out = out.replaceAll("{{MODAL_CLOSE_TEXT}}", data.modal.closeText);
  out = out.replaceAll("{{MODAL_EYEBROW}}", data.modal.eyebrow);
  out = out.replaceAll("{{MODAL_TECH_LABEL}}", data.modal.techLabel);
  out = out.replaceAll("{{MODAL_GARMENT_LABEL}}", data.modal.garmentLabel);
  out = out.replaceAll("{{MODAL_PRICE_LABEL}}", data.modal.priceLabel);
  out = out.replaceAll("{{MODAL_CTA}}", data.modal.cta);

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
  out = out.replaceAll("{{FOOTER_LINK_SECURITY}}", data.footer.links.security);
  out = out.replaceAll("{{FOOTER_LINK_A11Y}}", data.footer.links.a11y);
  out = out.replaceAll("{{FOOTER_COPYRIGHT}}", data.footer.copyright);
  out = out.replaceAll("{{FOOTER_DISCLAIMER}}", data.footer.disclaimer);
  out = out.replaceAll("{{FOOTER_BROWSER_TRANSLATE}}", data.footer.browserTranslate);

  return out;
}

function renderPortfolioPage(data, isEn) {
  const assetPrefix = isEn ? "../" : "";
  const legalPrefix = isEn ? "../legal/" : "legal/";
  const siteUrl = SITE_CONFIG.siteUrl;
  const canonicalUrl = isEn ? `${siteUrl}/en/portfolio.html` : `${siteUrl}/portfolio.html`;
  const homeHref = isEn ? "index.html" : "index.html";
  const portfolioLangHref = isEn ? "../portfolio.html" : "en/portfolio.html";

  let out = portfolioTemplate;

  // Language & Metadata
  out = out.replaceAll("{{LANG}}", data.lang);
  out = out.replaceAll("{{DIR}}", data.dir);
  out = out.replaceAll("{{PORTFOLIO_PAGE_TITLE}}", `${data.portfolio.title} — Kingdom`);
  out = out.replaceAll("{{PORTFOLIO_PAGE_DESC}}", data.portfolio.desc);
  out = out.replaceAll("{{PORTFOLIO_CANONICAL_URL}}", canonicalUrl);
  out = out.replaceAll("{{SITE_URL}}", siteUrl);
  out = out.replaceAll("{{ASSET_PREFIX}}", assetPrefix);
  out = out.replaceAll("{{LEGAL_PREFIX}}", legalPrefix);
  out = out.replaceAll("{{HOME_PAGE_HREF}}", homeHref);
  out = out.replaceAll("{{PORTFOLIO_LANG_HREF}}", portfolioLangHref);

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
  out = out.replaceAll("{{PORTFOLIO_DESC}}", data.portfolio.desc);
  out = out.replaceAll("{{PORTFOLIO_DISCLAIMER}}", data.portfolio.disclaimer);

  // Filters
  const filtersHtml = data.portfolio.filters.map((f, i) => `
          <button class="filter-btn" type="button" data-filter="${f.id}" aria-pressed="${i === 0 ? "true" : "false"}">
            ${f.label}
          </button>`).join("");
  out = out.replaceAll("{{PORTFOLIO_FILTERS_HTML}}", filtersHtml);

  // Cards (Clean view: info is hidden inside data attributes until clicked to open modal)
  const cardsHtml = portfolioData.map(p => {
    const title = isEn ? p.titleEn : p.titleEs;
    const tag = isEn ? p.techniqueEn : p.techniqueEs;
    const garment = isEn ? p.garmentEn : p.garmentEs;
    const avail = isEn ? p.availabilityEn : p.availabilityEs;
    const price = isEn ? p.priceEn : p.priceEs;
    const note = isEn ? p.noteEn : p.noteEs;
    const desc = isEn ? p.descEn : p.descEs;
    const alt = isEn ? p.altEn : p.altEs;
    const specs = `${garment} · ${avail}`;
    const clickHint = isEn ? "Click to view details" : "Clic para ver detalle";

    return `
          <article class="portfolio-card portfolio-card-clean" tabindex="0" role="button" aria-haspopup="dialog"
                   data-category="${p.category}"
                   data-title="${title}"
                   data-tag="${tag}"
                   data-specs="${specs}"
                   data-price="${price}"
                   data-desc="${desc} (${note})"
                   data-img="${assetPrefix}${p.image}">
            <img src="${assetPrefix}${p.image}" alt="${alt}" width="1080" height="1350" loading="lazy" decoding="async"/>
            <div class="portfolio-card-hint">${clickHint}</div>
          </article>`;
  }).join("");
  out = out.replaceAll("{{PORTFOLIO_CARDS_HTML}}", cardsHtml);

  // Modal
  out = out.replaceAll("{{MODAL_CLOSE_ARIA}}", data.modal.closeAria);
  out = out.replaceAll("{{MODAL_CLOSE_TEXT}}", data.modal.closeText);
  out = out.replaceAll("{{MODAL_EYEBROW}}", data.modal.eyebrow);
  out = out.replaceAll("{{MODAL_TECH_LABEL}}", data.modal.techLabel);
  out = out.replaceAll("{{MODAL_GARMENT_LABEL}}", data.modal.garmentLabel);
  out = out.replaceAll("{{MODAL_PRICE_LABEL}}", data.modal.priceLabel);
  out = out.replaceAll("{{MODAL_CTA}}", data.modal.cta);
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
