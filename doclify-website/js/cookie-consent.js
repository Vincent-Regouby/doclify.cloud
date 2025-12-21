/**
 * Doclify - Cookie Consent Manager (RGPD/GDPR Compliant)
 *
 * Gère le consentement des cookies conformément au RGPD.
 * Bloque tous les scripts de tracking jusqu'au consentement.
 */

(function() {
  'use strict';

  const CONSENT_KEY = 'doclify_cookie_consent';
  const CONSENT_VERSION = '1.0';
  const CONSENT_EXPIRY_DAYS = 365;

  // Configuration des catégories de cookies
  const cookieCategories = {
    necessary: {
      name: 'Nécessaires',
      description: 'Cookies essentiels au fonctionnement du site.',
      required: true
    },
    analytics: {
      name: 'Analytiques',
      description: 'Nous aident à comprendre comment vous utilisez le site.',
      required: false
    },
    marketing: {
      name: 'Marketing',
      description: 'Utilisés pour les publicités ciblées (LinkedIn Ads).',
      required: false
    }
  };

  // Vérifier si le consentement existe et est valide
  function getStoredConsent() {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) return null;

      const consent = JSON.parse(stored);

      // Vérifier la version
      if (consent.version !== CONSENT_VERSION) return null;

      // Vérifier l'expiration
      if (consent.expiry && new Date(consent.expiry) < new Date()) {
        localStorage.removeItem(CONSENT_KEY);
        return null;
      }

      return consent;
    } catch (e) {
      return null;
    }
  }

  // Sauvegarder le consentement
  function saveConsent(preferences) {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + CONSENT_EXPIRY_DAYS);

    const consent = {
      version: CONSENT_VERSION,
      date: new Date().toISOString(),
      expiry: expiry.toISOString(),
      preferences: preferences
    };

    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    return consent;
  }

  // Charger les scripts autorisés
  function loadConsentedScripts(preferences) {
    // Google Analytics
    if (preferences.analytics) {
      loadGoogleAnalytics();
    }

    // LinkedIn Insight Tag
    if (preferences.marketing) {
      loadLinkedInInsight();
    }

    // Déclencher un événement pour d'autres scripts
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
      detail: preferences
    }));
  }

  // Charger Google Analytics 4
  function loadGoogleAnalytics() {
    // Placeholder - sera configuré avec le vrai ID GA4 plus tard
    if (window.GA_MEASUREMENT_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + window.GA_MEASUREMENT_ID;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', window.GA_MEASUREMENT_ID, {
        'anonymize_ip': true
      });
    }
  }

  // Charger LinkedIn Insight Tag
  function loadLinkedInInsight() {
    // Placeholder - sera configuré avec le vrai Partner ID plus tard
    if (window.LINKEDIN_PARTNER_ID) {
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(window.LINKEDIN_PARTNER_ID);

      (function(l) {
        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);
      })(window.lintrk);
    }
  }

  // Créer et afficher la bannière
  function showBanner() {
    // Ne pas afficher si déjà présente
    if (document.getElementById('cookie-consent-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookie-title');
    banner.setAttribute('aria-describedby', 'cookie-description');
    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-banner-text">
          <h3 id="cookie-title">🍪 Ce site utilise des cookies</h3>
          <p id="cookie-description">
            Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic.
            Vous pouvez personnaliser vos préférences ou accepter tous les cookies.
            <a href="/confidentialite.html" target="_blank">En savoir plus</a>
          </p>
        </div>
        <div class="cookie-banner-actions">
          <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">
            Tout accepter
          </button>
          <button id="cookie-reject-all" class="cookie-btn cookie-btn-secondary">
            Refuser
          </button>
          <button id="cookie-customize" class="cookie-btn cookie-btn-link">
            Personnaliser
          </button>
        </div>
      </div>
      <div id="cookie-preferences" class="cookie-preferences" hidden>
        <div class="cookie-preferences-header">
          <h4>Paramètres des cookies</h4>
          <button id="cookie-close-preferences" class="cookie-close" aria-label="Fermer">×</button>
        </div>
        <div class="cookie-categories">
          <div class="cookie-category">
            <div class="cookie-category-header">
              <label class="cookie-switch">
                <input type="checkbox" id="cookie-necessary" checked disabled>
                <span class="cookie-slider"></span>
              </label>
              <span class="cookie-category-name">Nécessaires</span>
              <span class="cookie-category-required">(obligatoires)</span>
            </div>
            <p class="cookie-category-desc">Cookies essentiels au fonctionnement du site. Ils ne peuvent pas être désactivés.</p>
          </div>
          <div class="cookie-category">
            <div class="cookie-category-header">
              <label class="cookie-switch">
                <input type="checkbox" id="cookie-analytics">
                <span class="cookie-slider"></span>
              </label>
              <span class="cookie-category-name">Analytiques</span>
            </div>
            <p class="cookie-category-desc">Nous aident à comprendre comment vous utilisez le site (Google Analytics).</p>
          </div>
          <div class="cookie-category">
            <div class="cookie-category-header">
              <label class="cookie-switch">
                <input type="checkbox" id="cookie-marketing">
                <span class="cookie-slider"></span>
              </label>
              <span class="cookie-category-name">Marketing</span>
            </div>
            <p class="cookie-category-desc">Utilisés pour les publicités ciblées et le remarketing (LinkedIn Ads).</p>
          </div>
        </div>
        <div class="cookie-preferences-actions">
          <button id="cookie-save-preferences" class="cookie-btn cookie-btn-primary">
            Enregistrer mes préférences
          </button>
        </div>
      </div>
    `;

    // Ajouter les styles
    addStyles();

    // Ajouter au DOM
    document.body.appendChild(banner);

    // Animation d'entrée
    requestAnimationFrame(() => {
      banner.classList.add('cookie-banner-visible');
    });

    // Attacher les événements
    attachEventListeners();
  }

  // Ajouter les styles CSS
  function addStyles() {
    if (document.getElementById('cookie-consent-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'cookie-consent-styles';
    styles.textContent = `
      #cookie-consent-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
        border-top: 1px solid #333;
        padding: 1.25rem 1.5rem;
        z-index: 99999;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.5);
        transform: translateY(100%);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }

      #cookie-consent-banner.cookie-banner-visible {
        transform: translateY(0);
      }

      .cookie-banner-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1.5rem;
      }

      .cookie-banner-text {
        flex: 1;
        min-width: 280px;
      }

      .cookie-banner-text h3 {
        color: #fff;
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
      }

      .cookie-banner-text p {
        color: #b0b0b0;
        font-size: 0.9rem;
        line-height: 1.5;
        margin: 0;
      }

      .cookie-banner-text a {
        color: #ff6b35;
        text-decoration: underline;
      }

      .cookie-banner-text a:hover {
        color: #ff8555;
      }

      .cookie-banner-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .cookie-btn {
        padding: 0.7rem 1.25rem;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
        font-family: inherit;
      }

      .cookie-btn-primary {
        background: linear-gradient(135deg, #ff6b35, #ff8555);
        color: #fff;
      }

      .cookie-btn-primary:hover {
        background: linear-gradient(135deg, #ff8555, #ff9a75);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
      }

      .cookie-btn-secondary {
        background: #2a2a2a;
        color: #fff;
        border: 1px solid #444;
      }

      .cookie-btn-secondary:hover {
        background: #333;
        border-color: #555;
      }

      .cookie-btn-link {
        background: transparent;
        color: #b0b0b0;
        padding: 0.7rem 0.75rem;
      }

      .cookie-btn-link:hover {
        color: #ff6b35;
      }

      /* Preferences Panel */
      .cookie-preferences {
        background: #1a1a1a;
        border-radius: 12px;
        margin-top: 1rem;
        padding: 1.25rem;
        border: 1px solid #333;
      }

      .cookie-preferences[hidden] {
        display: none;
      }

      .cookie-preferences-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid #333;
      }

      .cookie-preferences-header h4 {
        color: #fff;
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
      }

      .cookie-close {
        background: none;
        border: none;
        color: #888;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
      }

      .cookie-close:hover {
        color: #fff;
      }

      .cookie-categories {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .cookie-category {
        padding: 0.75rem;
        background: #0f0f0f;
        border-radius: 8px;
      }

      .cookie-category-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .cookie-category-name {
        color: #fff;
        font-weight: 500;
        font-size: 0.95rem;
      }

      .cookie-category-required {
        color: #666;
        font-size: 0.8rem;
      }

      .cookie-category-desc {
        color: #888;
        font-size: 0.85rem;
        margin: 0.5rem 0 0 3rem;
        line-height: 1.4;
      }

      /* Toggle Switch */
      .cookie-switch {
        position: relative;
        display: inline-block;
        width: 44px;
        height: 24px;
      }

      .cookie-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .cookie-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #333;
        transition: 0.3s;
        border-radius: 24px;
      }

      .cookie-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: #fff;
        transition: 0.3s;
        border-radius: 50%;
      }

      .cookie-switch input:checked + .cookie-slider {
        background: linear-gradient(135deg, #ff6b35, #ff8555);
      }

      .cookie-switch input:checked + .cookie-slider:before {
        transform: translateX(20px);
      }

      .cookie-switch input:disabled + .cookie-slider {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .cookie-preferences-actions {
        margin-top: 1rem;
        text-align: right;
      }

      /* Mobile Responsive */
      @media (max-width: 768px) {
        #cookie-consent-banner {
          padding: 1rem;
        }

        .cookie-banner-content {
          flex-direction: column;
          align-items: stretch;
        }

        .cookie-banner-actions {
          justify-content: center;
        }

        .cookie-btn {
          flex: 1;
          min-width: 100px;
          text-align: center;
        }

        .cookie-category-desc {
          margin-left: 0;
          margin-top: 0.75rem;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // Attacher les événements
  function attachEventListeners() {
    const banner = document.getElementById('cookie-consent-banner');
    const preferences = document.getElementById('cookie-preferences');

    // Accepter tout
    document.getElementById('cookie-accept-all').addEventListener('click', function() {
      const prefs = { necessary: true, analytics: true, marketing: true };
      saveConsent(prefs);
      loadConsentedScripts(prefs);
      hideBanner();
    });

    // Refuser (seulement nécessaires)
    document.getElementById('cookie-reject-all').addEventListener('click', function() {
      const prefs = { necessary: true, analytics: false, marketing: false };
      saveConsent(prefs);
      loadConsentedScripts(prefs);
      hideBanner();
    });

    // Personnaliser
    document.getElementById('cookie-customize').addEventListener('click', function() {
      preferences.hidden = false;
    });

    // Fermer personnalisation
    document.getElementById('cookie-close-preferences').addEventListener('click', function() {
      preferences.hidden = true;
    });

    // Sauvegarder préférences
    document.getElementById('cookie-save-preferences').addEventListener('click', function() {
      const prefs = {
        necessary: true,
        analytics: document.getElementById('cookie-analytics').checked,
        marketing: document.getElementById('cookie-marketing').checked
      };
      saveConsent(prefs);
      loadConsentedScripts(prefs);
      hideBanner();
    });
  }

  // Cacher la bannière
  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.remove('cookie-banner-visible');
      setTimeout(() => {
        banner.remove();
      }, 400);
    }
  }

  // API publique pour modifier le consentement
  window.CookieConsent = {
    show: showBanner,
    getConsent: getStoredConsent,
    hasConsent: function(category) {
      const consent = getStoredConsent();
      return consent && consent.preferences && consent.preferences[category];
    },
    reset: function() {
      localStorage.removeItem(CONSENT_KEY);
      showBanner();
    }
  };

  // Initialisation
  function init() {
    const consent = getStoredConsent();

    if (consent) {
      // Consentement existant - charger les scripts autorisés
      loadConsentedScripts(consent.preferences);
    } else {
      // Pas de consentement - afficher la bannière
      showBanner();
    }
  }

  // Lancer à la fin du chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
