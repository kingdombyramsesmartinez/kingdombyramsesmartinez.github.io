import { SITE_CONFIG } from "./site.config.js";

(() => {
  "use strict";

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
        const opened = window.open(url, "_blank", "noopener,noreferrer");

        if (opened) {
          showToast(
            isEnglish ? "WhatsApp opened with your quote request." : "Se abrió WhatsApp con los datos de tu cotización.",
            "success"
          );
        } else {
          showToast(
            isEnglish ? "Pop-up blocked. Please use the direct WhatsApp link." : "El navegador bloqueó la ventana emergente. Usa el enlace directo a WhatsApp.",
            "error"
          );
        }
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
  const modalPrice = qs("#modalPrice");
  const modalDesc = qs("#modalDesc");
  const modalWaBtn = qs("#modalWaBtn");
  const mainContent = qs("#mainContent");
  let lastActiveTrigger = null;

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
    const price = card.dataset.price || "";
    const desc = card.dataset.desc || "";
    const img = card.dataset.img || "";
    const cardImg = qs("img", card);
    const altText = cardImg ? cardImg.getAttribute("alt") || title : title;

    if (modalTitle) modalTitle.textContent = title;
    if (modalTag) modalTag.textContent = tag;
    if (modalSpecs) modalSpecs.textContent = specs;
    if (modalPrice) modalPrice.textContent = price;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalImg) {
      modalImg.src = img;
      modalImg.alt = altText;
    }

    if (modalWaBtn) {
      const isEnglish = document.documentElement.lang === "en";
      const waMsg = isEnglish
        ? `Hello Ramses, I would like to inquire about the piece "${title}" from your portfolio (Ref: ${specs}).`
        : `Hola Ramses, deseo consultar información y presupuesto sobre la pieza "${title}" de tu portafolio (Ref: ${specs}).`;
      modalWaBtn.href = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-locked");

    if (mainContent) mainContent.setAttribute("inert", "");

    modalClose?.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-locked");

    if (mainContent) mainContent.removeAttribute("inert");

    lastActiveTrigger?.focus();
  }

  portfolioCards.forEach(card => {
    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card);
      }
    });
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
      }
    }
  });

  /* --------------------------------------------------------------------------
     Año de Copyright Dinámico
     -------------------------------------------------------------------------- */
  const yearEl = qs("#copyrightYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
