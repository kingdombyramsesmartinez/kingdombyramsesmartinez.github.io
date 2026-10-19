/**
 * KINGDOM — GESTIÓN DE CONSENTIMIENTO Y GOOGLE ANALYTICS 4
 * Respeto estricto a la privacidad, carga condicional sin rastreo previo
 * y revocación activa inmediata en tiempo de ejecución.
 */
(() => {
  "use strict";

  const GA_MEASUREMENT_ID = "G-YQCLS51XJE";
  const CONSENT_KEY = "kingdom_cookie_consent"; // Valores: 'granted', 'denied'

  // Detectar idioma desde la etiqueta <html> y ruta
  const isEn = (document.documentElement.lang || "es").toLowerCase().startsWith("en");

  // Determinar prefijo relativo hacia páginas legales
  const isInsideEn = window.location.pathname.includes("/en/");
  const legalPrefix = isInsideEn ? "legal/" : (isEn ? "en/legal/" : "legal/");

  const i18n = {
    es: {
      title: "POLÍTICA DE PRIVACIDAD Y COOKIES",
      desc: "Usamos analítica opcional para mejorar tu experiencia. No activamos cookies sin tu permiso.",
      accept: "Aceptar",
      reject: "Rechazar",
      policy: "Más información",
      policyHref: isInsideEn ? "../legal/cookies.html" : "legal/cookies.html"
    },
    en: {
      title: "PRIVACY & COOKIES NOTICE",
      desc: "We use optional analytics to improve your experience. No cookies activate without your consent.",
      accept: "Accept",
      reject: "Decline",
      policy: "Learn more",
      policyHref: isInsideEn ? "legal/cookies.html" : "en/legal/cookies.html"
    }
  };

  const t = isEn ? i18n.en : i18n.es;

  // Eliminar cookies accesibles de Google Analytics (_ga, _ga_*, _gid, etc.)
  function clearGACookies() {
    try {
      const cookieNames = ["_ga", `_ga_${GA_MEASUREMENT_ID.replace("G-", "")}`, "_gid", "_gat", "_gat_gtag_" + GA_MEASUREMENT_ID];
      const hostParts = window.location.hostname.split(".");
      const domains = [
        "",
        window.location.hostname,
        "." + window.location.hostname
      ];

      // Añadir dominios superiores si procede
      if (hostParts.length > 1) {
        domains.push("." + hostParts.slice(-2).join("."));
      }

      const paths = ["/", "/en/", "/legal/", "/en/legal/", window.location.pathname];

      cookieNames.forEach(name => {
        domains.forEach(domain => {
          paths.forEach(p => {
            const domainAttr = domain ? `; domain=${domain}` : "";
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${p}${domainAttr}; SameSite=Lax`;
          });
        });
      });
    } catch (_) {
      // Ignorar de forma segura si cookies están deshabilitadas
    }
  }

  // Activa la bandera de opt-out de Google Analytics para inhabilitar cualquier recolección en esta ventana
  function disableGATracking() {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied"
      });
    }
    clearGACookies();
  }

  // Habilita la recolección si se concede consentimiento
  function enableGATracking() {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied"
      });
    }
  }

  // Inyecta el script de Google Analytics una vez otorgado el consentimiento
  function loadGA() {
    enableGATracking();

    if (window._gaLoaded) return;
    window._gaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: true
    });

    const script = document.createElement("script");
    script.id = "gaScriptTag";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  // Verificar estado previo guardado en localStorage
  let savedConsent = null;
  try {
    savedConsent = localStorage.getItem(CONSENT_KEY);
  } catch (_) {
    // Si el almacenamiento local está bloqueado por el navegador
  }

  if (savedConsent === "granted") {
    loadGA();
  } else if (savedConsent === "denied") {
    disableGATracking();
  }

  // Renderizar o mostrar el banner de consentimiento
  function createBanner() {
    let banner = document.getElementById("cookieConsentBanner");
    if (banner) {
      banner.classList.remove("cookie-consent-hiding");
      return;
    }

    banner = document.createElement("aside");
    banner.id = "cookieConsentBanner";
    banner.className = "cookie-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", t.title);
    banner.setAttribute("aria-live", "polite");

    const inner = document.createElement("div");
    inner.className = "cookie-consent-inner";

    const titleEl = document.createElement("div");
    titleEl.className = "cookie-consent-title";
    titleEl.textContent = t.title;

    const textEl = document.createElement("p");
    textEl.className = "cookie-consent-text";
    textEl.textContent = t.desc + " ";

    const linkEl = document.createElement("a");
    linkEl.className = "cookie-consent-link";
    linkEl.href = t.policyHref;
    linkEl.textContent = t.policy;
    linkEl.setAttribute("aria-label", isEn ? "Read our Cookie and Privacy Policy" : "Leer nuestra Política de Cookies y Privacidad");
    textEl.appendChild(linkEl);

    const actions = document.createElement("div");
    actions.className = "cookie-consent-actions";

    const btnReject = document.createElement("button");
    btnReject.type = "button";
    btnReject.className = "cookie-btn cookie-btn-reject";
    btnReject.textContent = t.reject;

    const btnAccept = document.createElement("button");
    btnAccept.type = "button";
    btnAccept.className = "cookie-btn cookie-btn-accept";
    btnAccept.textContent = t.accept;

    actions.appendChild(btnReject);
    actions.appendChild(btnAccept);

    inner.appendChild(titleEl);
    inner.appendChild(textEl);
    inner.appendChild(actions);
    banner.appendChild(inner);

    function removeBanner() {
      banner.classList.add("cookie-consent-hiding");
    }

    btnReject.addEventListener("click", () => {
      try { localStorage.setItem(CONSENT_KEY, "denied"); } catch (_) {}
      disableGATracking();
      removeBanner();
    });

    btnAccept.addEventListener("click", () => {
      try { localStorage.setItem(CONSENT_KEY, "granted"); } catch (_) {}
      loadGA();
      removeBanner();
    });

    document.body.appendChild(banner);
  }

  // Si no hay preferencia registrada (primera visita), abrir el banner
  if (!savedConsent) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", createBanner);
    } else {
      createBanner();
    }
  }

  // API pública y enlace para reabrir el gestor o revocar preferencias
  window.resetKingdomConsent = function() {
    createBanner();
  };

  function setupResetLinks() {
    // Escuchar cualquier clic en enlaces con clase o hash #cookie-settings
    document.querySelectorAll('a[href*="#cookie-settings"], [data-open-cookies]').forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        window.resetKingdomConsent();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupResetLinks);
  } else {
    setupResetLinks();
  }
})();
