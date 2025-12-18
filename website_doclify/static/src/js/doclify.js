/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.DoclifyWebsite = publicWidget.Widget.extend({
    selector: '.doclify-website',
    events: {
        'submit .doclify-contact-form': '_onContactFormSubmit',
        'click .doclify-scroll-to-top': '_onScrollToTop',
    },

    /**
     * @override
     */
    start: function () {
        this._super.apply(this, arguments);
        this._initScrollAnimations();
        this._initMobileMenu();
    },

    /**
     * Initialize scroll animations for elements
     * @private
     */
    _initScrollAnimations: function () {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all feature cards and pricing cards
        document.querySelectorAll('.feature-card, .pricing-card').forEach(el => {
            observer.observe(el);
        });
    },

    /**
     * Initialize mobile menu functionality
     * @private
     */
    _initMobileMenu: function () {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.doclify-mobile-menu-toggle');
        const mobileMenu = document.querySelector('.doclify-mobile-menu');

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }
    },

    /**
     * Handle contact form submission
     * @private
     * @param {Event} ev
     */
    _onContactFormSubmit: function (ev) {
        const form = ev.currentTarget;
        const submitBtn = form.querySelector('button[type="submit"]');

        // Basic validation
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
            ev.preventDefault();
            alert('Veuillez remplir tous les champs obligatoires.');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            ev.preventDefault();
            alert('Veuillez entrer une adresse email valide.');
            return false;
        }

        // Disable submit button to prevent double submission
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
        }
    },

    /**
     * Scroll to top of page
     * @private
     */
    _onScrollToTop: function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll-to-top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'doclify-scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

export default publicWidget.registry.DoclifyWebsite;
