/* Script clásico (sin import): funciona en file://, servidores locales y GitHub Pages.
   El número de WhatsApp lo inyecta el build en <body data-wa="..."> desde site.config.js. */
(() => {
  "use strict";

  const SITE_CONFIG = {
    contact: {
      whatsappNumber: document.body.dataset.wa || "",
      emailWork: document.body.dataset.emailWork || (document.querySelector("#quoteEmailLink")?.getAttribute("href")?.replace(/^mailto:/, "")?.split("?")[0]) || "kingdombrandbqto@gmail.com"
    }
  };

  // Anti-clickjacking de respaldo del lado del cliente (window.top.location).
  // NOTA TÉCNICA: La protección robusta contra clickjacking requiere cabeceras HTTP
  // reales (Content-Security-Policy con frame-ancestors o X-Frame-Options: DENY).
  // Dado que GitHub Pages es un hosting estático que no permite configurar cabeceras HTTP
  // del servidor web, esta salvaguarda en JS actúa como defensa en profundidad de mejor esfuerzo.
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

  // Retraer el menú automáticamente si el usuario hace scroll o swipe
  window.addEventListener("scroll", () => {
    if (navMenu?.classList.contains("open")) closeNav();
  }, { passive: true });
  
  window.addEventListener("touchmove", () => {
    if (navMenu?.classList.contains("open")) closeNav();
  }, { passive: true });

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
  const liveStatus = qs("#filterLiveStatus");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetFilter = btn.dataset.filter || "all";

      filterButtons.forEach(b => b.setAttribute("aria-pressed", String(b === btn)));

      let visibleCount = 0;
      portfolioCards.forEach(card => {
        const category = card.dataset.category || "";
        if (targetFilter === "all" || category === targetFilter) {
          card.classList.remove("is-hidden");
          visibleCount++;
        } else {
          card.classList.add("is-hidden");
        }
      });

      if (liveStatus) {
        const isEnglish = document.documentElement.lang === "en";
        const label = isEnglish
          ? (visibleCount === 1 ? "1 piece" : `${visibleCount} pieces`)
          : (visibleCount === 1 ? "1 pieza" : `${visibleCount} piezas`);
        liveStatus.textContent = label;
      }
    });
  });

  /* --------------------------------------------------------------------------
     Cotizador Interactivo con Estimado Referencial, Mailto y WhatsApp
     -------------------------------------------------------------------------- */
  const quoteForm = qs("#quickQuoteForm");
  const isEnglish = document.documentElement.lang === "en";

  // Evento global para rastrear clics en WhatsApp (sin datos personales)
  document.addEventListener("click", e => {
    const waLink = e.target.closest('a[href*="wa.me"]');
    if (waLink && typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", {
        link_url: "wa.me",
        page_language: isEnglish ? "en" : "es"
      });
    }

    const cvLink = e.target.closest('a[data-analytics="cv_download"], a[href*="ramses-martinez-cv.pdf"]');
    if (cvLink && typeof window.gtag === "function") {
      window.gtag("event", "cv_download", {
        file_name: "ramses-martinez-cv.pdf",
        page_language: isEnglish ? "en" : "es"
      });
    }

    const mailLink = e.target.closest('a[href^="mailto:"]');
    if (mailLink && typeof window.gtag === "function") {
      window.gtag("event", "email_click", {
        email_type: "work",
        page_language: isEnglish ? "en" : "es"
      });
    }
  });

  if (quoteForm) {
    const serviceRadios = qsa('input[name="quoteService"]', quoteForm);
    const qtyRadios = qsa('input[name="quoteQuantity"]', quoteForm);
    const nameInput = qs("#quoteName", quoteForm);
    const fabricInput = qs("#quoteFabric", quoteForm);
    const logoSelect = qs("#quoteLogo", quoteForm);
    const noteInput = qs("#quoteNote", quoteForm);
    const summaryText = qs("#quoteSummaryText", quoteForm);
    const emailLink = qs("#quoteEmailLink", quoteForm);

    let quoteStarted = false;
    function triggerQuoteStart() {
      if (quoteStarted) return;
      quoteStarted = true;
      if (typeof window.gtag === "function") {
        window.gtag("event", "quote_start", {
          form_name: "quick_quote",
          page_language: isEnglish ? "en" : "es"
        });
      }
    }

    quoteForm.addEventListener("focusin", triggerQuoteStart, { once: true });
    quoteForm.addEventListener("change", triggerQuoteStart, { once: true });

    function getSelectedService() {
      const checked = qs('input[name="quoteService"]:checked', quoteForm);
      if (!checked) return { id: "", name: "", price: 0, unit: "" };
      return {
        id: checked.value,
        name: checked.dataset.name || checked.value,
        price: Number(checked.dataset.price) || 0,
        unit: checked.dataset.unit || ""
      };
    }

    function getSelectedQty() {
      const checked = qs('input[name="quoteQuantity"]:checked', quoteForm);
      return checked ? checked.value : "1–5";
    }

    function buildDetailsText() {
      const parts = [];
      const name = nameInput?.value.trim();
      const fabric = fabricInput?.value.trim();
      const logoVal = logoSelect?.value;
      const note = noteInput?.value.trim();

      if (name) {
        parts.push(isEnglish ? `Client: ${name}` : `Cliente: ${name}`);
      }
      if (fabric) {
        parts.push(isEnglish ? `Garment/Fabric: ${fabric}` : `Prenda/Tela: ${fabric}`);
      }
      if (logoVal === "ready") {
        parts.push(isEnglish ? "Logo: Ready" : "Logo: Listo para confección");
      } else if (logoVal === "none") {
        parts.push(isEnglish ? "Logo: No logo yet" : "Logo: Sin logo aún");
      } else if (logoVal === "need_design") {
        parts.push(isEnglish ? "Logo: Needs design / vectorization" : "Logo: Requiere diseño / vectorización");
      }
      if (note) {
        parts.push(isEnglish ? `Notes: ${note}` : `Observaciones: ${note}`);
      }

      if (parts.length === 0) {
        return isEnglish ? "No additional details" : "Sin detalles adicionales";
      }
      return parts.join(" · ");
    }

    function updateSummary() {
      const s = getSelectedService();
      const q = getSelectedQty();

      if (summaryText) {
        const text = isEnglish
          ? `Your inquiry: ${s.name} · ${q} pieces · Estimated from: ${s.unit}`
          : `Tu solicitud: ${s.name} · ${q} piezas · Estimado: ${s.unit}`;
        summaryText.textContent = text;
      }

      if (emailLink) {
        const details = buildDetailsText();
        const subject = isEnglish
          ? `Quote Request — ${s.name}`
          : `Solicitud de Cotización — ${s.name}`;
        const body = isEnglish
          ? `Hello Ramses,\n\nI would like to quote:\n• Service: ${s.name}\n• Quantity: ${q} pieces\n• Details: ${details}\n\nSent from kingdombyramsesmartinez.github.io`
          : `Hola Ramses,\n\nQuiero cotizar:\n• Servicio: ${s.name}\n• Cantidad: ${q} piezas\n• Detalles: ${details}\n\nEnviado desde kingdombyramsesmartinez.github.io`;

        emailLink.href = `mailto:${SITE_CONFIG.contact.emailWork}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    }

    serviceRadios.forEach(r => r.addEventListener("change", updateSummary));
    qtyRadios.forEach(r => r.addEventListener("change", updateSummary));
    nameInput?.addEventListener("input", updateSummary);
    fabricInput?.addEventListener("input", updateSummary);
    logoSelect?.addEventListener("change", updateSummary);
    noteInput?.addEventListener("input", updateSummary);

    updateSummary();

    quoteForm.addEventListener("submit", e => {
      e.preventDefault();
      try {
        const s = getSelectedService();
        const q = getSelectedQty();
        const details = buildDetailsText();

        if (!s.name) {
          showToast(
            isEnglish ? "Please select a service." : "Por favor selecciona un servicio.",
            "error"
          );
          return;
        }

        if (typeof window.gtag === "function") {
          window.gtag("event", "quote_submit", {
            service_id: s.id,
            quantity_range: q,
            page_language: isEnglish ? "en" : "es"
          });
          window.gtag("event", "whatsapp_click", {
            source: "quick_quote_submit",
            page_language: isEnglish ? "en" : "es"
          });
        }

        const msg = isEnglish
          ? `Hello Ramses, I would like to quote:\n• Service: ${s.name}\n• Quantity: ${q} pieces\n• Details: ${details}\n\nSent from kingdombyramsesmartinez.github.io`
          : `Hola Ramses, quiero cotizar:\n• Servicio: ${s.name}\n• Cantidad: ${q} piezas\n• Detalles: ${details}\n\nEnviado desde kingdombyramsesmartinez.github.io`;

        const url = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;

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
          isEnglish
            ? "An error occurred. Please contact via WhatsApp directly."
            : "Ocurrió un error al procesar la cotización. Contáctame directamente vía WhatsApp.",
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

    const isEnglish = document.documentElement.lang === "en";
    const modalFeatures = qs("#modalFeatures");
    const modalArtNotice = qs("#modalArtNotice");
    const modalNote = qs("#modalNote");

    if (item.isArtistic) {
      if (modalPriceRow) modalPriceRow.hidden = true;
      if (modalFeatures) modalFeatures.hidden = true;
      if (modalWaBtn) modalWaBtn.hidden = true;
      if (modalNote) modalNote.hidden = true;
      if (modalArtNotice) {
        modalArtNotice.hidden = false;
        if (item.tipo === "encargo-marca") {
          modalArtNotice.textContent = isEnglish
            ? "Automotive designs created upon client commission. Names, logos and trademarks of vehicles belong to their respective owners; no affiliation, sponsorship or authorization exists on their part. If you are a rights holder and request the removal of a piece, please write to kingdombrandbqto@gmail.com."
            : "Diseños automotrices realizados por encargo de clientes. Los nombres, logotipos y marcas de los vehículos pertenecen a sus respectivos titulares; no existe afiliación, patrocinio ni autorización por parte de ellos. Si eres titular de derechos y deseas el retiro de una pieza, escribe a kingdombrandbqto@gmail.com.";
        } else {
          modalArtNotice.textContent = isEnglish
            ? "Graphic explorations of fan art created for practice and portfolio purposes. Characters, names, logos and trademarks belong to their respective owners; no affiliation, sponsorship or authorization exists on their part. If you are a rights holder and request the removal of a piece, please write to kingdombrandbqto@gmail.com."
            : "Exploraciones gráficas de fan art realizadas con fines de práctica y portafolio. Los personajes, nombres, logotipos y marcas pertenecen a sus respectivos titulares; no existe afiliación, patrocinio ni autorización por parte de ellos. Si eres titular de derechos y deseas el retiro de una pieza, escribe a kingdombrandbqto@gmail.com.";
        }
      }
    } else {
      if (modalFeatures) modalFeatures.hidden = false;
      if (modalWaBtn) modalWaBtn.hidden = false;
      if (modalNote) modalNote.hidden = false;
      if (modalArtNotice) modalArtNotice.hidden = true;
      renderPrice(modalPriceRow, modalPrice, item.price);

      if (modalWaBtn) {
        const waMsg = isEnglish
          ? `Hello Ramses, I would like to inquire about "${item.title}" from your portfolio (Ref: ${item.specs}).`
          : `Hola Ramses, deseo consultar información y presupuesto sobre "${item.title}" de tu portafolio (Ref: ${item.specs}).`;
        modalWaBtn.href = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;
      }
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

    const isArtistic = card.dataset.artistic === "true";
    const tipo = card.dataset.tipo || "cliente";

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
          story,
          isArtistic,
          tipo
        },
        ...proposals.map(p => ({ ...p, isArtistic, tipo }))
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
          story,
          isArtistic,
          tipo
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
          thumb.src = item.image.includes("/artwork/") && !item.image.includes("/artwork/thumbs/")
            ? item.image.replace("/artwork/", "/artwork/thumbs/")
            : item.image;
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

  /* Los datos estructurados JSON-LD se escriben en el HTML estatico durante el build
     (tools/build-i18n.mjs, buildJsonLd) para que los buscadores los lean sin ejecutar JS. */

})();
