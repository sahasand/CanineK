# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML website for Canine Kingdom Co, a not-for-profit dog care organization. The site is deployed via GitHub Pages at https://sahasand.github.io/CanineK/.

## Architecture

**Core Structure:**
- Static HTML pages with shared navigation and styling
- Single CSS file (`styles.css`) with responsive design and full-screen image sections
- Minimal JavaScript (`script.js`) for basic interactions
- PHP contact form (`send_email.php`) for email processing
- Background images (`img1.png` - `img999.png`) used as full-screen backgrounds

**Page Architecture:**
- `index.html` - Hero page with social call-to-actions
- `our-story.html` - Multi-section storytelling with full-screen image backgrounds and overlay text boxes
- `services.html` - Coming soon placeholder with Tidio chat integration
- `contact.html` - Contact form with responsive email fallback
- `plan.html` - Plan overview with centered image display

**Key Design Patterns:**
- Full-screen background images with positioned text overlays
- Responsive design with mobile-first approach (768px breakpoint)
- Text boxes with semi-transparent backgrounds positioned left/right
- Consistent navigation across all pages
- Facebook integration throughout for community building

## Development Workflow

**File Structure:**
- All assets (HTML, CSS, JS, images) are in the root directory
- No build process or dependencies - direct file editing
- Contact form requires PHP server (won't work on GitHub Pages)

**Styling System:**
- Main styles in `styles.css` with CSS Grid and Flexbox
- Contact form styles separated in `contact-form.css`
- Responsive breakpoints at 768px for mobile
- Hero sections use `.hero-image` with background images
- Story sections use `.full-screen-image` with ID-based background images

**GitHub Pages Deployment:**
- Repository: https://github.com/sahasand/CanineK
- Deployment: Push to main branch deploys automatically
- Contact form (PHP) will not function on GitHub Pages - consider static form alternatives

**Analytics & Integrations:**
- Google Analytics tracking ID: G-9RWXX5XV4W
- Tidio chat widget on services page
- Facebook page integration throughout site

## Common Issues

**GitHub Pages:**
- Ensure repository is public and Pages is enabled in settings
- PHP contact form requires alternative solution (Netlify Forms, Formspree, etc.)
- Case-sensitive file paths in production

**Mobile Responsiveness:**
- Contact form hides on mobile, shows email banner instead
- Image sizing uses percentage-based responsive design
- Text overlay positioning adjusts for smaller screens