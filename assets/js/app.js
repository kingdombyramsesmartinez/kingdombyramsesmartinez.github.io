/* Script clásico (sin import): funciona en file://, servidores locales y GitHub Pages.
   El número de WhatsApp lo inyecta el build en <body data-wa="..."> desde site.config.js. */
(() => {
  "use strict";

  const SITE_CONFIG = { contact: { whatsappNumber: document.body.dataset.wa || "584241092124" } };

  // Anti-clickjacking de respaldo (no ocultar la página en localhost ni en previewers)
  if (window.top !== window.self) {
    try {
      if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
        window.top.location = window.self.location;
      }
    } catch (_) {
      // Ignorar de forma segura en entornos locales o visores de desarrollo
    }
  }

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* --------------------------------------------------------------------------
     Toast System
     -------------------------------------------------------------------------- */
  const toastRegion = qs("#toastRegion");
  let toastTimer;

  function showToast(message, type = "success") {
    if (!toastRegion) return;
    toastRegion.textContent = "";
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastRegion.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 220);
    }, 4000);
  }

  /* --------------------------------------------------------------------------
     Mobile Navigation
     -------------------------------------------------------------------------- */
  const burger = qs("#burgerBtn");
  const navMenu = qs("#navMenu");

  function closeNav() {
    navMenu?.classList.remove("open");
    burger?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-locked");
  }

  function toggleNav() {
    const isOpen = navMenu?.classList.contains("open");
    if (isOpen) closeNav();
    else {
      navMenu?.classList.add("open");
      burger?.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-locked");
    }
  }

  burger?.addEventListener("click", toggleNav);
  qsa(".nav-link", navMenu).forEach(link => link.addEventListener("click", closeNav));

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && navMenu?.classList.contains("open")) {
      closeNav();
      burger?.focus();
    }
  });

  /* --------------------------------------------------------------------------
     Filtros del Portafolio
     -------------------------------------------------------------------------- */
  const filterButtons = qsa(".filter-btn");
  const portfolioCards = qsa(".portfolio-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetFilter = btn.dataset.filter || "all";

      filterButtons.forEach(b => b.setAttribute("aria-pressed", String(b === btn)));

      portfolioCards.forEach(card => {
        const category = card.dataset.category || "";
        if (targetFilter === "all" || category === targetFilter) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     Cotizador Directo a WhatsApp (Fuente: site.config.js)
     -------------------------------------------------------------------------- */
  const quoteForm = qs("#quickQuoteForm");
  const isEnglish = document.documentElement.lang === "en";

  if (quoteForm) {
    quoteForm.addEventListener("submit", e => {
      e.preventDefault();
      try {
        const service = qs("#quoteService")?.value;
        const volume = qs("#quoteVolume")?.value;
        const note = qs("#quoteNote")?.value.trim() || (isEnglish ? "No additional notes" : "Sin observaciones adicionales");

        if (!service || !volume) {
          showToast(
            isEnglish ? "Please select the service and volume." : "Por favor selecciona el servicio y volumen estimado.",
            "error"
          );
          return;
        }

        const msg = isEnglish
          ? `Hello Ramses, I would like to request a quote with Kingdom:\n\n• Service: ${service}\n• Estimated Volume: ${volume}\n• Details: ${note}\n\nCould you please let me know availability and lead time?`
          : `Hola Ramses, deseo solicitar una cotización con Kingdom:\n\n• Servicio: ${service}\n• Volumen: ${volume}\n• Detalle: ${note}\n\n¿Podrías indicarme disponibilidad y tiempos de confección?`;

        const url = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
        
        // Abrir directamente en nueva pestaña o redirigir sin que el bloqueador de popups lo cancele
        const opened = window.open(url, "_blank", "noopener,noreferrer");
        if (!opened || opened.closed || typeof opened.closed === "undefined") {
          window.location.href = url;
        }

        showToast(
          isEnglish ? "Redirecting to WhatsApp..." : "Abriendo WhatsApp con tu pedido...",
          "success"
        );
      } catch {
        showToast(
          isEnglish ? "An error occurred. Please contact via WhatsApp directly." : "Ocurrió un error al procesar la cotización. Contáctanos directamente vía WhatsApp.",
          "error"
        );
      }
    });
  }

  /* --------------------------------------------------------------------------
     Modal Accesible con Trampa de Foco y Alt Dinámico
     -------------------------------------------------------------------------- */
  const modal = qs("#portfolioModal");
  const modalClose = qs("#modalCloseBtn");
  const modalImg = qs("#modalImg");
  const modalTitle = qs("#modalTitle");
  const modalTag = qs("#modalTag");
  const modalSpecs = qs("#modalSpecs");
  const modalDesc = qs("#modalDesc");
  const modalStatus = qs("#modalStatus");
  const modalFabricRow = qs("#modalFabricRow");
  const modalFabric = qs("#modalFabric");
  const modalPriceRow = qs("#modalPriceRow");
  const modalPrice = qs("#modalPrice");
  const modalStory = qs("#modalStory");
  const modalCarouselNav = qs("#modalCarouselNav");
  const modalPrevBtn = qs("#modalPrevBtn");
  const modalNextBtn = qs("#modalNextBtn");
  const modalCarouselDots = qs("#modalCarouselDots");
  const modalCarouselCounter = qs("#modalCarouselCounter");

  // Muestra un bloque opcional solo si el dueño escribió contenido (textContent: nunca HTML).
  function setOptional(wrapper, target, value) {
    const text = (value || "").trim();
    if (target) target.textContent = text;
    if (wrapper) wrapper.hidden = !text;
  }

  // Renderiza el precio; si incluye múltiples opciones (separadas por " · "), crea una división de línea entre ambos
  function renderPrice(wrapper, target, value) {
    const text = (value || "").trim();
    if (!wrapper || !target) return;
    wrapper.hidden = !text;
    if (!text) return;

    target.textContent = "";
    if (text.includes(" · ")) {
      const parts = text.split(" · ");
      parts.forEach((part, index) => {
        if (index > 0) {
          const divider = document.createElement("span");
          divider.className = "pm-price-divider";
          divider.setAttribute("aria-hidden", "true");
          target.appendChild(divider);
        }
        const itemSpan = document.createElement("span");
        itemSpan.className = "pm-price-item";
        itemSpan.textContent = part.trim();
        target.appendChild(itemSpan);
      });
    } else {
      target.textContent = text;
    }
  }
  const modalWaBtn = qs("#modalWaBtn");
  const mainContent = qs("#mainContent");
  let lastActiveTrigger = null;

  // Estado del carrusel de propuestas
  let activeProposals = [];
  let currentProposalIndex = 0;

  function updateProposalSlide(index) {
    if (!activeProposals || activeProposals.length === 0) return;
    currentProposalIndex = (index + activeProposals.length) % activeProposals.length;
    const item = activeProposals[currentProposalIndex];

    if (modalTitle) modalTitle.textContent = item.title;
    if (modalTag) modalTag.textContent = item.tag;
    if (modalSpecs) modalSpecs.textContent = item.specs;
    if (modalDesc) modalDesc.textContent = item.desc;
    setOptional(modalStatus, modalStatus, item.status);
    setOptional(modalFabricRow, modalFabric, item.fabric);
    renderPrice(modalPriceRow, modalPrice, item.price);
    setOptional(modalStory, modalStory, item.story);

    if (modalImg) {
      modalImg.src = item.image;
      modalImg.alt = item.alt || item.title;
    }

    if (modalCarouselCounter) {
      modalCarouselCounter.textContent = `${currentProposalIndex + 1} / ${activeProposals.length}`;
    }

    if (modalCarouselDots) {
      qsa(".modal-carousel-dot", modalCarouselDots).forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentProposalIndex);
      });
    }

    if (modalWaBtn) {
      const isEnglish = document.documentElement.lang === "en";
      const waMsg = isEnglish
        ? `Hello Ramses, I would like to inquire about "${item.title}" from your portfolio (Ref: ${item.specs}).`
        : `Hola Ramses, deseo consultar información y presupuesto sobre "${item.title}" de tu portafolio (Ref: ${item.specs}).`;
      modalWaBtn.href = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;
    }
  }

  function getFocusableElements(element) {
    return qsa(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      element
    );
  }

  function openModal(card) {
    if (!modal) return;
    lastActiveTrigger = card;

    const title = card.dataset.title || "";
    const tag = card.dataset.tag || "";
    const specs = card.dataset.specs || "";
    const desc = card.dataset.desc || "";
    const img = card.dataset.img || "";
    const cardImg = qs("img", card);
    const altText = cardImg ? cardImg.getAttribute("alt") || title : title;
    const status = card.dataset.status || "";
    const fabric = card.dataset.fabric || "";
    const price = card.dataset.price || "";
    const story = card.dataset.story || "";

    // Parsear propuestas si existen para activar carrusel
    let proposals = [];
    if (card.dataset.proposals) {
      try {
        proposals = JSON.parse(card.dataset.proposals);
      } catch (_) {
        proposals = [];
      }
    }

    if (Array.isArray(proposals) && proposals.length > 0) {
      activeProposals = [
        {
          image: img,
          alt: altText,
          title,
          tag,
          specs,
          desc,
          status,
          fabric,
          price,
          story
        },
        ...proposals
      ];
    } else {
      activeProposals = [
        {
          image: img,
          alt: altText,
          title,
          tag,
          specs,
          desc,
          status,
          fabric,
          price,
          story
        }
      ];
    }

    // Configuración de controles de carrusel
    const hasMultiple = activeProposals.length > 1;
    if (modalCarouselNav) modalCarouselNav.hidden = !hasMultiple;
    if (modalCarouselCounter) modalCarouselCounter.hidden = !hasMultiple;
    if (modalCarouselDots) {
      modalCarouselDots.hidden = !hasMultiple;
      modalCarouselDots.innerHTML = "";
      if (hasMultiple) {
        activeProposals.forEach((item, idx) => {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = `modal-carousel-dot pm-thumb${idx === 0 ? " active" : ""}`;
          dot.setAttribute("aria-label", `${document.documentElement.lang === "en" ? "View image" : "Ver imagen"} ${idx + 1}`);
          const thumb = document.createElement("img");
          thumb.src = item.image;
          thumb.alt = "";
          thumb.loading = "lazy";
          dot.appendChild(thumb);
          dot.addEventListener("click", () => updateProposalSlide(idx));
          modalCarouselDots.appendChild(dot);
        });
      }
    }

    updateProposalSlide(0);

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-locked");

    if (mainContent) mainContent.setAttribute("inert", "");

    modalClose?.focus();
  }

  modalPrevBtn?.addEventListener("click", () => updateProposalSlide(currentProposalIndex - 1));
  modalNextBtn?.addEventListener("click", () => updateProposalSlide(currentProposalIndex + 1));

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-locked");

    if (mainContent) mainContent.removeAttribute("inert");

    lastActiveTrigger?.focus();
  }

  // Delegación de eventos global para apertura confiable de cualquier tarjeta de portafolio
  document.addEventListener("click", e => {
    const card = e.target.closest(".portfolio-card");
    if (card) {
      openModal(card);
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".portfolio-card");
      if (card && document.activeElement === card) {
        e.preventDefault();
        openModal(card);
      }
    }
  });

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (modal?.classList.contains("open")) {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "Tab") {
        const focusables = getFocusableElements(modal);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      } else if (e.key === "ArrowLeft") {
        updateProposalSlide(currentProposalIndex - 1);
      } else if (e.key === "ArrowRight") {
        updateProposalSlide(currentProposalIndex + 1);
      }
    }
  });

  /* --------------------------------------------------------------------------
     Año de Copyright Dinámico
     -------------------------------------------------------------------------- */
  const yearEl = qs("#copyrightYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --------------------------------------------------------------------------
     Inyección de Datos Estructurados JSON-LD (Schema.org / Entity SEO)
     Cumple estrictamente con CSP (script externo con src, sin inline <script>)
     -------------------------------------------------------------------------- */
  try {
    const isEn = document.documentElement.lang === "en";
    const path = window.location.pathname.toLowerCase();
    const isPortfolio = path.includes("portfolio.html");
    const siteUrl = "https://kingdombyramsesmartinez.github.io";
    const canonicalUrl = isPortfolio
      ? (isEn ? `${siteUrl}/en/portfolio.html` : `${siteUrl}/portfolio.html`)
      : (isEn ? `${siteUrl}/en/` : `${siteUrl}/`);
    const homeUrl = isEn ? `${siteUrl}/en/` : `${siteUrl}/`;
    const logoUrl = `${siteUrl}/assets/brand/kingdom-logo-white.png`;
    const ogImageUrl = `${siteUrl}/assets/brand/og-image.png`;

    const orgEntity = {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "KINGDOM",
      "alternateName": [
        "Kingdom by Ramses Martínez",
        "Kingdom Ramses Martinez",
        "Kingdom"
      ],
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        "url": logoUrl,
        "contentUrl": logoUrl,
        "caption": "KINGDOM Logo"
      },
      "image": {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#primaryimage`,
        "url": ogImageUrl,
        "contentUrl": ogImageUrl,
        "caption": "KINGDOM — Diseño Textil & Bordado Industrial"
      },
      "description": isEn
        ? "Official website of KINGDOM (Kingdom by Ramses Martínez). Textile design studio, industrial DST/PES embroidery digitizing, sports sublimation and custom apparel in Barquisimeto, Venezuela."
        : "Sitio oficial de KINGDOM (Kingdom by Ramses Martínez). Estudio de diseño textil, matrices de bordado industrial DST/PES, sublimación deportiva y streetwear en Barquisimeto, Venezuela.",
      "founder": {
        "@type": "Person",
        "@id": `${siteUrl}/#founder`,
        "name": "Ramses Martínez",
        "jobTitle": isEn ? "Textile Designer & Embroidery Digitizer" : "Diseñador Textil y Digitalizador de Bordado",
        "sameAs": ["https://www.linkedin.com/in/ramses-martinez-bqto"]
      },
      "sameAs": [
        "https://instagram.com/kingdom_vzla",
        "https://www.tiktok.com/@kingdom_vzla",
        "https://www.linkedin.com/in/ramses-martinez-bqto"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+584241092124",
          "contactType": "customer service",
          "availableLanguage": ["Spanish", "English"],
          "url": "https://wa.me/584241092124"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Barquisimeto",
        "addressRegion": "Lara",
        "addressCountry": "VE"
      }
    };

    const websiteEntity = {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "KINGDOM",
      "alternateName": "Kingdom by Ramses Martínez",
      "publisher": { "@id": `${siteUrl}/#organization` },
      "inLanguage": isEn ? "en" : "es"
    };

    const graph = [orgEntity, websiteEntity];

    if (!isPortfolio) {
      graph.push(
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          "url": canonicalUrl,
          "name": document.title,
          "isPartOf": { "@id": `${siteUrl}/#website` },
          "about": { "@id": `${siteUrl}/#organization` },
          "inLanguage": isEn ? "en" : "es"
        },
        {
          "@type": "Service",
          "@id": `${siteUrl}/#service-embroidery`,
          "name": isEn ? "Industrial Embroidery Digitizing (DST / PES)" : "Digitalización de Bordado Industrial (DST / PES)",
          "provider": { "@id": `${siteUrl}/#organization` },
          "description": isEn
            ? "Technical digitizing calibrated with pull compensation, optimized density and clean stitch paths for industrial embroidery machines."
            : "Digitalización técnica con compensación de estiramiento, densidad calibrada y secuencias limpias para optimizar el paso en máquina bordadora.",
          "serviceType": isEn ? "Embroidery Digitizing" : "Matrices de Bordado"
        },
        {
          "@type": "Service",
          "@id": `${siteUrl}/#service-sublimation`,
          "name": isEn ? "Full Print Sports Sublimation" : "Sublimación Deportiva Full Print",
          "provider": { "@id": `${siteUrl}/#organization` },
          "description": isEn
            ? "Scale template engineering and color calibration for quick-dry athletic textiles (Dry-Fit, microfiber)."
            : "Diseño de plantillas a escala y calibración de color para textiles deportivos de secado rápido (Dry-Fit, microfibras y win).",
          "serviceType": isEn ? "Sports Apparel Sublimation" : "Sublimación Deportiva"
        },
        {
          "@type": "Service",
          "@id": `${siteUrl}/#service-vector`,
          "name": isEn ? "Vector Illustration & Streetwear Graphic Design" : "Ilustración Vectorial & Streetwear",
          "provider": { "@id": `${siteUrl}/#organization` },
          "description": isEn
            ? "Character vectorizing, logo cleanups and color separations for screen printing and DTF printing on cotton and blends."
            : "Trazado de personajes, vectorización de logotipos y separación de color para serigrafía o impresión DTF sobre algodón y mezclas.",
          "serviceType": isEn ? "Vector Graphic Design" : "Diseño Vectorial"
        }
      );
    } else {
      graph.push(
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          "url": canonicalUrl,
          "name": document.title,
          "isPartOf": { "@id": `${siteUrl}/#website` },
          "breadcrumb": { "@id": `${canonicalUrl}#breadcrumb` },
          "inLanguage": isEn ? "en" : "es"
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": isEn ? "Home" : "Inicio",
              "item": homeUrl
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": isEn ? "Textile Design Portfolio" : "Portafolio de Diseño Textil",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "CollectionPage",
          "@id": `${canonicalUrl}#collection`,
          "url": canonicalUrl,
          "name": document.title,
          "publisher": { "@id": `${siteUrl}/#organization` }
        }
      );
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);
  } catch (_) {
    // Fail-safe silencioso
  }

})();
