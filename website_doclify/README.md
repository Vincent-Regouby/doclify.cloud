# Doclify Website Module for Odoo 19

Official website module for Doclify - AI-powered medical consultation transcription SaaS platform.

## Description

This Odoo 19 module provides a complete, professional website for Doclify, a SaaS service that helps medical professionals (doctors, psychologists, psychiatrists) save time by automatically transcribing and summarizing their consultations using local AI.

## Features

### Public Pages
- **Homepage** (`/`) - Hero section, features, pricing preview, CTA
- **Features** (`/fonctionnalites`) - Detailed feature descriptions
- **Pricing** (`/tarifs`) - Pricing table with FAQ
- **About** (`/a-propos`) - Company story, values, technology stack
- **Contact** (`/contact`) - Contact form with CRM lead integration
- **Privacy Policy** (`/confidentialite`) - RGPD-compliant privacy policy
- **Terms of Service** (`/conditions-generales`) - Complete CGV

### Design Features
- Modern, professional medical/tech aesthetic
- Fully responsive (mobile, tablet, desktop)
- Gradient accents (Blue to Purple)
- Custom SCSS theme with variables
- Clean typography (Inter-inspired)
- Smooth animations and transitions
- SEO optimized meta tags
- Accessibility compliant (ARIA labels, contrast)

### Technical Features
- Odoo 19 compatible
- QWeb templates
- Bootstrap 5 integration
- Custom JavaScript (scroll animations, form validation)
- Website Builder snippets (reusable components)
- Multi-menu support (header + footer)
- Contact form with CRM lead creation
- CSRF protection

## Installation

### Prerequisites
- Odoo 19 (Community or Enterprise)
- Website module enabled
- Portal module enabled

### Install Steps

1. **Copy the module to your Odoo addons directory:**
   ```bash
   cp -r website_doclify /path/to/odoo/addons/
   ```

2. **Update apps list:**
   - Go to Apps menu
   - Click "Update Apps List"

3. **Install the module:**
   - Search for "Doclify Website"
   - Click "Install"

4. **Access the website:**
   - Navigate to your Odoo domain: `http://yourdomain.com/`

## Module Structure

```
website_doclify/
├── __init__.py                          # Module initialization
├── __manifest__.py                       # Module metadata
├── README.md                             # This file
│
├── controllers/
│   ├── __init__.py
│   └── main.py                          # Website routes (/,/fonctionnalites, etc.)
│
├── data/
│   ├── website_data.xml                 # Website configuration
│   └── menu_data.xml                    # Navigation menus
│
├── models/
│   └── __init__.py                      # Models (placeholder)
│
├── security/
│   └── ir.model.access.csv              # Access rights
│
├── static/
│   └── src/
│       ├── scss/
│       │   ├── primary_variables.scss   # Color scheme & variables
│       │   └── doclify_theme.scss       # Main theme styles
│       ├── js/
│       │   └── doclify.js               # Custom JavaScript
│       └── img/
│           └── .gitkeep                 # Placeholder
│
└── views/
    ├── templates.xml                    # Base layout (header/footer)
    ├── pages/
    │   ├── homepage.xml
    │   ├── features.xml
    │   ├── pricing.xml
    │   ├── about.xml
    │   ├── contact.xml
    │   ├── privacy.xml
    │   └── terms.xml
    └── snippets/
        ├── hero_section.xml             # Reusable hero
        ├── features_grid.xml            # Reusable features
        ├── testimonials.xml             # Reusable testimonials
        ├── pricing_cards.xml            # Reusable pricing
        └── cta_section.xml              # Reusable CTA
```

## Configuration

### Color Scheme
The theme uses a medical/tech professional color palette defined in `primary_variables.scss`:

- **Primary:** `#2563EB` (Medical Blue)
- **Secondary:** `#10B981` (Success Green)
- **Accent:** `#8B5CF6` (Purple for AI/Tech)
- **Neutral:** `#1F2937` (Dark gray for text)
- **Background:** `#F9FAFB` (Light gray)

### Customization

#### Change Colors
Edit `/website_doclify/static/src/scss/primary_variables.scss`:
```scss
$primary: #YOUR_COLOR;
$secondary: #YOUR_COLOR;
```

#### Edit Content
All pages are in `/website_doclify/views/pages/`. Edit the XML templates to change text, images, or structure.

#### Modify Menus
Edit `/website_doclify/data/menu_data.xml` to add/remove menu items.

### Contact Form Integration

The contact form automatically creates CRM leads if the `crm` module is installed:

```python
# In controllers/main.py
@http.route('/contact/submit', type='http', auth='public', methods=['POST'])
def contact_submit(self, **post):
    # Creates a crm.lead record
    request.env['crm.lead'].sudo().create({...})
```

## Routes

| Route | Description | Controller Method |
|-------|-------------|------------------|
| `/` | Homepage | `homepage()` |
| `/fonctionnalites` | Features page | `features()` |
| `/tarifs` | Pricing page | `pricing()` |
| `/a-propos` | About page | `about()` |
| `/contact` | Contact page | `contact()` |
| `/contact/submit` | Contact form submission | `contact_submit()` |
| `/confidentialite` | Privacy policy | `privacy()` |
| `/conditions-generales` | Terms of service | `terms()` |

## Website Builder Snippets

The module provides 5 reusable snippets accessible in the Odoo Website Builder:

1. **Hero Section** - Large header with gradient title
2. **Features Grid** - 3-column feature cards
3. **Testimonials** - Customer testimonial cards
4. **Pricing Cards** - 3-tier pricing table
5. **CTA Section** - Call-to-action banner

## SEO & Accessibility

### SEO Features
- Proper meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Semantic HTML structure
- Sitemap integration (`sitemap=True` on routes)
- Clean URLs (French-friendly)

### Accessibility
- ARIA labels where needed
- Proper heading hierarchy (h1-h6)
- High contrast ratios (WCAG AA compliant)
- Keyboard navigation support
- Screen reader friendly

## RGPD Compliance

The module includes:
- Comprehensive privacy policy page
- Cookie disclosure (technical cookies only)
- Data processing transparency
- User rights information
- Contact information for DPO

## Branding

### Key Messages
- **Value Proposition:** "Gagnez 2h par semaine sur vos comptes-rendus"
- **Differentiation:** Local AI, French hosting, RGPD compliance
- **Price:** 49€/month HT (vs 119-600$ competitors)
- **Target:** Psychologists, psychiatrists, medical professionals in France

### Trust Signals
- RGPD compliant
- French data sovereignty
- Local AI (no cloud APIs)
- Encryption & security

## Development

### Testing Locally

1. Start Odoo in development mode:
   ```bash
   ./odoo-bin -d your_db -u website_doclify --dev all
   ```

2. Access the website:
   ```
   http://localhost:8069/
   ```

### Updating Styles

After modifying SCSS files, restart Odoo and clear browser cache. Odoo compiles SCSS to CSS automatically.

### Adding New Pages

1. Create controller route in `controllers/main.py`:
   ```python
   @http.route('/new-page', type='http', auth='public', website=True)
   def new_page(self, **kwargs):
       return request.render('website_doclify.new_page')
   ```

2. Create template in `views/pages/new_page.xml`

3. Add to `__manifest__.py` data list

## Support

For issues or questions:
- **Email:** contact@doclify.cloud
- **Technical Support:** support@doclify.cloud

## License

LGPL-3 (same as Odoo)

## Author

Doclify - https://doclify.cloud

## Version History

- **19.0.1.0.0** (2025-01-29) - Initial release
  - Complete website with 7 pages
  - 5 reusable snippets
  - Custom theme & styles
  - Contact form with CRM integration
  - RGPD-compliant privacy policy
