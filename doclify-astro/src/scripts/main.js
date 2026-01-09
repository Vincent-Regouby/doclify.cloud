/**
 * Doclify - Main JavaScript
 * Handles navigation, mobile menu, smooth scrolling, and interactions
 */

/**
 * Theme Management
 * Gère le switch entre mode clair et foncé
 */
(function initTheme() {
  // Récupérer le thème sauvegardé ou la préférence système
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Appliquer le thème (respecte la préférence système)
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

document.addEventListener('DOMContentLoaded', function() {

  // Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      if (newTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }

      localStorage.setItem('theme', newTheme);

      // Mettre à jour la couleur de fond de Vanta si présent
      if (window.vantaEffect) {
        window.vantaEffect.setOptions({
          backgroundColor: newTheme === 'light' ? 0xf8f9fa : 0x0a0a0a
        });
      }
    });
  }

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Only prevent default if it's not just "#"
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });

  // Form Validation with Security Enhancements

  // Maximum field lengths for DoS protection
  const MAX_LENGTHS = {
    name: 100,
    email: 254,
    phone: 20,
    specialty: 100,
    subject: 200,
    message: 5000
  };

  // Sanitization helper - removes HTML tags and trims
  function sanitizeInput(input) {
    if (!input) return '';
    return input.replace(/<[^>]*>/g, '').trim();
  }

  // Email validation - RFC 5322 simplified (covers 99% of valid emails)
  function validateEmail(email) {
    if (!email) return false;
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(email) && email.length <= 254;
  }

  // French phone number validation (optional field but must be valid if filled)
  function validatePhone(phone) {
    if (!phone) return true; // Phone is optional
    // Format français : 01-09 ou +33
    const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return re.test(phone.replace(/\s/g, ''));
  }

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get and sanitize form values
      const name = sanitizeInput(document.getElementById('name').value);
      const email = sanitizeInput(document.getElementById('email').value);
      const phone = sanitizeInput(document.getElementById('phone').value);
      const specialty = sanitizeInput(document.getElementById('specialty').value);
      const practiceType = sanitizeInput(document.getElementById('practice-type').value);
      const subject = sanitizeInput(document.getElementById('subject').value);
      const message = sanitizeInput(document.getElementById('message').value);

      // Enhanced validation with length checks
      let isValid = true;
      let errorMessage = '';

      if (!name || name.length > MAX_LENGTHS.name) {
        isValid = false;
        errorMessage += 'Le nom est requis (max 100 caractères).\n';
      }

      if (!validateEmail(email)) {
        isValid = false;
        errorMessage += 'Un email valide est requis.\n';
      }

      if (!validatePhone(phone)) {
        isValid = false;
        errorMessage += 'Le numéro de téléphone n\'est pas valide (format attendu : 06 12 34 56 78 ou +33 6 12 34 56 78).\n';
      }

      if (phone && phone.length > MAX_LENGTHS.phone) {
        isValid = false;
        errorMessage += 'Le téléphone est trop long (max 20 caractères).\n';
      }

      if (specialty && specialty.length > MAX_LENGTHS.specialty) {
        isValid = false;
        errorMessage += 'La spécialité est trop longue (max 100 caractères).\n';
      }

      if (subject && subject.length > MAX_LENGTHS.subject) {
        isValid = false;
        errorMessage += 'Le sujet est trop long (max 200 caractères).\n';
      }

      if (!message || message.length > MAX_LENGTHS.message) {
        isValid = false;
        errorMessage += 'Le message est requis (max 5000 caractères).\n';
      }

      if (isValid) {
        /*
         * SECURITY NOTE - Site Statique Astro
         * -----------------------------------
         * Le JWT token et l'URL du webhook sont exposés côté client.
         * C'est une limitation inhérente aux sites statiques sans backend.
         *
         * Mitigations en place :
         * - Token JWT avec claims limités (subject: "doclify-contact-form")
         * - Validation et sanitization côté client
         * - Webhook n8n configuré pour n'accepter que les requêtes autorisées
         *
         * Pour une sécurité renforcée, envisager :
         * - Cloudflare Workers / Netlify Functions comme proxy
         * - Rate limiting sur le webhook n8n
         * - Honeypot fields pour détecter les bots
         */
        // Préparer les données du formulaire (déjà sanitizées)
        const webhookUrl = 'https://n8n.inetshore.com/webhook/ce20bece-0055-44e4-9d44-8e80783f9339';
        const formData = {
          name: name,
          email: email,
          phone: phone || '',
          specialty: specialty || '',
          practiceType: practiceType || '',
          subject: subject || '',
          message: message
        };

        // Envoyer via POST avec JSON body et authentification JWT
        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb2NsaWZ5LWNvbnRhY3QtZm9ybSIsImlzcyI6ImRvY2xpZnkuY2xvdWQiLCJpYXQiOjE3NjU5NTc3NTZ9.Th4jttReg0Qh5DrwcT5MXZ22da9YL4Fj4f1rJR298hQ'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (response.ok) {
            showNotification('Merci ! Nous avons bien reçu votre message. Notre équipe vous contactera sous 24h.', 'success');
            contactForm.reset();
          } else {
            showNotification('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.', 'error');
          }
        })
        .catch(error => {
          console.error('Erreur envoi formulaire:', error);
          showNotification('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.', 'error');
        });
      } else {
        showNotification(errorMessage, 'error');
      }
    });
  }

  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // Header scroll effect
  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.opacity = '0.98';
      header.style.boxShadow = '0 2px 20px var(--shadow-color)';
    } else {
      header.style.opacity = '0.95';
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.feature-card, .step, .testimonial, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add active class to current page link in navigation
  const currentPage = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPage || (currentPage === '/' && linkPath === '/')) {
      link.style.color = 'var(--orange-primary)';
    }
  });

  // Back to top button
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '↑';
  backToTopButton.className = 'back-to-top';

  document.body.appendChild(backToTopButton);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Pricing card interaction
  document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });

  console.log('Doclify website loaded successfully!');
});
