/**
 * Doclify - Tracking des conversions Umami
 *
 * Événements trackés :
 * - inscription_essai : Clic sur boutons "Essai Gratuit"
 * - telechargement_lead_magnet : Téléchargement de PDF/ressources
 * - inscription_webinaire : Inscription aux webinaires
 * - contact_demo : Demande de démo via formulaire contact
 */

(function() {
  'use strict';

  // Attendre que le DOM soit chargé
  document.addEventListener('DOMContentLoaded', function() {

    // Track tous les liens vers app.doclify.cloud (essai gratuit)
    document.querySelectorAll('a[href*="app.doclify.cloud"]').forEach(function(link) {
      link.addEventListener('click', function() {
        if (typeof umami !== 'undefined') {
          umami.track('inscription_essai', {
            page: window.location.pathname,
            button_text: this.textContent.trim()
          });
        }
      });
    });

    // Track les liens de téléchargement (PDF, ressources)
    document.querySelectorAll('a[href$=".pdf"], a[download]').forEach(function(link) {
      link.addEventListener('click', function() {
        if (typeof umami !== 'undefined') {
          umami.track('telechargement_lead_magnet', {
            page: window.location.pathname,
            file: this.getAttribute('href')
          });
        }
      });
    });

    // Track les inscriptions webinaire (liens spécifiques)
    document.querySelectorAll('a[href*="webinaire"], a[href*="inscription"], .webinar-cta').forEach(function(link) {
      // Éviter de tracker les liens d'essai gratuit
      if (link.href && link.href.includes('app.doclify.cloud')) return;

      link.addEventListener('click', function() {
        if (typeof umami !== 'undefined') {
          umami.track('inscription_webinaire', {
            page: window.location.pathname,
            webinar: this.textContent.trim()
          });
        }
      });
    });

    // Track les soumissions du formulaire contact (demande démo)
    var contactForm = document.querySelector('form[action*="contact"], #contact-form, .contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function() {
        if (typeof umami !== 'undefined') {
          umami.track('contact_demo', {
            page: window.location.pathname
          });
        }
      });
    }

    // Track navigation vers page tarifs (intention d'achat)
    document.querySelectorAll('a[href*="tarifs"]').forEach(function(link) {
      link.addEventListener('click', function() {
        if (typeof umami !== 'undefined') {
          umami.track('visite_tarifs', {
            source_page: window.location.pathname
          });
        }
      });
    });

  });
})();
