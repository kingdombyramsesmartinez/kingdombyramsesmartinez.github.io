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
     Cotizador Directo a WhatsApp
     -------------------------------------------------------------------------- */
  const quoteForm = qs("#quickQuoteForm");
  const WHATSAPP_NUMBER = "584241092124";

  if (quoteForm) {
    quoteForm.addEventListener("submit", e => {
      e.preventDefault();
      try {
        const service = qs("#quoteService")?.value;
        const volume = qs("#quoteVolume")?.value;
        const note = qs("#quoteNote")?.value.trim() || "Sin observaciones adicionales";

        if (!service || !volume) {
          showToast("Por favor selecciona el servicio y volumen estimado.", "error");
          return;
        }

        const msg = `Hola Ramses, deseo solicitar una cotización con Kingdom Wear:\n\n• Servicio: ${service}\n• Volumen: ${volume}\n• Detalle: ${note}\n\n¿Podrías indicarme disponibilidad y tiempos de confección?`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
        const opened = window.open(url, "_blank", "noopener,noreferrer");

        if (opened) {
          showToast("Se abrió WhatsApp con los datos de tu cotización.", "success");
        } else {
          showToast("El navegador bloqueó la ventana emergente. Usa el enlace directo a WhatsApp.", "error");
        }
      } catch {
        showToast("Ocurrió un error al procesar la cotización. Contáctanos directamente vía WhatsApp.", "error");
      }
    });
  }

  /* --------------------------------------------------------------------------
     Modal de Portafolio y Ficha Técnica
     -------------------------------------------------------------------------- */
  const modal = qs("#portfolioModal");
  const modalClose = qs("#modalCloseBtn");
  const modalImg = qs("#modalImg");
  const modalTitle = qs("#modalTitle");
  const modalTag = qs("#modalTag");
  const modalSpecs = qs("#modalSpecs");
  const modalDesc = qs("#modalDesc");
  let lastActiveTrigger = null;

  function openModal(card) {
    if (!modal) return;
    lastActiveTrigger = card;
    const title = card.dataset.title || "";
    const tag = card.dataset.tag || "";
    const specs = card.dataset.specs || "";
    const desc = card.dataset.desc || "";
    const img = card.dataset.img || "";

    if (modalTitle) modalTitle.textContent = title;
    if (modalTag) modalTag.textContent = tag;
    if (modalSpecs) modalSpecs.textContent = specs;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalImg) modalImg.src = img;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-locked");
    modalClose?.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-locked");
    lastActiveTrigger?.focus();
  }

  qsa(".portfolio-card").forEach(card => {
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
    if (e.key === "Escape" && modal?.classList.contains("open")) {
      closeModal();
    }
  });

  /* --------------------------------------------------------------------------
     Año de Copyright Dinámico
     -------------------------------------------------------------------------- */
  const yearEl = qs("#copyrightYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
