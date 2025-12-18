# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class DoclifyWebsiteController(http.Controller):
    """Controller for Doclify website routes"""

    @http.route('/', type='http', auth='public', website=True, sitemap=True)
    def homepage(self, **kwargs):
        """Homepage route"""
        return request.render('website_doclify.homepage', {
            'page_title': 'Doclify - Transcription médicale par IA',
        })

    @http.route('/fonctionnalites', type='http', auth='public', website=True, sitemap=True)
    def features(self, **kwargs):
        """Features page route"""
        return request.render('website_doclify.features', {
            'page_title': 'Fonctionnalités - Doclify',
        })

    @http.route('/tarifs', type='http', auth='public', website=True, sitemap=True)
    def pricing(self, **kwargs):
        """Pricing page route"""
        return request.render('website_doclify.pricing', {
            'page_title': 'Tarifs - Doclify',
        })

    @http.route('/a-propos', type='http', auth='public', website=True, sitemap=True)
    def about(self, **kwargs):
        """About page route"""
        return request.render('website_doclify.about', {
            'page_title': 'À propos - Doclify',
        })

    @http.route('/contact', type='http', auth='public', website=True, sitemap=True)
    def contact(self, **kwargs):
        """Contact page route"""
        return request.render('website_doclify.contact', {
            'page_title': 'Contact - Doclify',
        })

    @http.route('/contact/submit', type='http', auth='public', website=True, methods=['POST'], csrf=True)
    def contact_submit(self, **post):
        """Handle contact form submission"""
        name = post.get('name', '')
        email = post.get('email', '')
        specialty = post.get('specialty', '')
        message = post.get('message', '')

        # Create a lead in CRM if crm module is installed
        if request.env['ir.module.module'].sudo().search([('name', '=', 'crm'), ('state', '=', 'installed')]):
            request.env['crm.lead'].sudo().create({
                'name': f'Contact website: {name}',
                'contact_name': name,
                'email_from': email,
                'description': f"Spécialité: {specialty}\n\nMessage:\n{message}",
                'type': 'opportunity',
            })

        return request.render('website_doclify.contact_thank_you', {
            'name': name,
        })

    @http.route('/confidentialite', type='http', auth='public', website=True, sitemap=True)
    def privacy(self, **kwargs):
        """Privacy policy page route"""
        return request.render('website_doclify.privacy', {
            'page_title': 'Politique de confidentialité - Doclify',
        })

    @http.route('/conditions-generales', type='http', auth='public', website=True, sitemap=True)
    def terms(self, **kwargs):
        """Terms of service page route"""
        return request.render('website_doclify.terms', {
            'page_title': 'Conditions générales - Doclify',
        })
