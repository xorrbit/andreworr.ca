# AGENTS.md - AI-Readable Site Maintenance Guide

This file is intentionally published as part of the website. It documents the structure and workflow for andreworr.ca.
## Source of Truth

**HTML files are the only source of truth.** During development, only edit these files:

```
index.html          - Landing page (hero, section cards, contact)
security.html       - Security & Community
software.html       - Software engineering portfolio
vulnerabilities.html - Discovered vulnerabilities (CVE disclosures)
css/style.css       - Single stylesheet
js/main.js          - Minimal JS (nav highlighting)
```

All other files are **derived** and must not be edited during development. They are regenerated from the HTML at commit time.

## Development Workflow

1. Edit HTML/CSS/JS files only
2. When the user asks to commit, regenerate all derived files first (see below), then commit everything together

## Derived Files - Regenerate at Commit Time

When the user asks to commit or deploy, regenerate **all** of the following by reading the current HTML files and producing matching content:

### JSON-LD (embedded in HTML)
- Each HTML page has a `<script type="application/ld+json">` block in `<head>`
- `index.html`: `WebSite`, `ProfilePage`, `Person` schemas
- `security.html`: `ItemList` of `CreativeWork` items
- `software.html`: `ItemList` of `SoftwareSourceCode` items
- `vulnerabilities.html`: `ItemList` of `CreativeWork` items
- These are part of the HTML files so they get updated during development if the page content changes

### llms.txt
- Spec: https://llmstxt.org
- H1 name, blockquote summary, H2 sections with one-line descriptive links for each project/page

### sitemap.xml
- Bump `<lastmod>` dates for any pages that changed

### humans.txt
- Update the "last updated" date

### robots.txt
- Rarely changes - only if new AI bots need explicit Allow rules

## Commit Checklist

1. Read all HTML files to understand current content
2. Regenerate all derived files listed above
3. Bump sitemap.xml dates and humans.txt date
4. Stage everything and commit

## GitHub Pages Config

- `CNAME` - contains `andreworr.ca`
- `.nojekyll` - prevents Jekyll processing

## Color Scheme

CSS custom properties in `css/style.css`:
- `--bg: #0a0e1a` (deep navy)
- `--surface: #111827`
- `--border: #1c2740`
- `--text: #e2e4e9`
- `--text-muted: #7a8599`
- `--accent: #d4a017` (gold)
- `--accent-dim: rgba(212, 160, 23, 0.12)`

## Typography

- Body: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`
- Code/sidebar: `'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', monospace`

## Design Principles

The site deliberately avoids an AI-generated aesthetic:
- No gradient blobs, glassmorphism, or generic hero sections
- Asymmetric layouts, intentional whitespace, sharp edges
- Subtle borders instead of shadows/glows for card separation
- Accent color used sparingly - links, tags, a few key UI elements
- Typography-driven hierarchy: varying font weights and sizes, not uniform card grids
- Micro-interactions: subtle hover color shifts, not animated gradient borders
- ASCII only: use plain hyphens (-), never em dashes, en dashes, or emojis

## Navigation - Left Sidebar

- Fixed left sidebar (`<aside class="sidebar">`) present on all pages
- **The sidebar nav is duplicated in every HTML file.** Any nav changes (adding, removing, or reordering links) must be updated in all pages: `index.html`, `security.html`, `software.html`, `vulnerabilities.html`
- Site name at top links to `/`
- Nav links in order: Security & Community (`/security.html`), Software Engineering (`/software.html`), Discovered Vulnerabilities (`/vulnerabilities.html`)
- Active page highlighted via `.active` class with gold left-border indicator (auto-detected by `js/main.js`)
- Contact links (GitHub, LinkedIn, Email) in sidebar footer
- Copyright and humans.txt link at sidebar bottom
- On mobile (< 768px): sidebar slides in from left via hamburger toggle button, with overlay backdrop
- `js/main.js` handles: active link detection, sidebar open/close toggle, Escape key, overlay click, breakpoint reset

## Page Layout Patterns

### Landing page (`index.html`)
- Hero: name, mono title, 2-3 sentence bio
- Section cards: 3-card grid linking to Security & Community, Software Engineering, and Discovered Vulnerabilities pages
- No separate contact strip or footer (both live in sidebar)

### Subpages (`security.html`, `software.html`, `vulnerabilities.html`)
- Page header: title + short description
- Project list: vertical stack of project cards, optionally grouped under `<h2>` section headings
- Each card: title (linked), date, description paragraph, tags, optional links
- No separate footer (lives in sidebar)

## HTML Card Template

```html
<article class="project-card">
  <div class="project-card__top">
    <h2 class="project-card__title">
      <a href="URL">Project Title</a>
    </h2>
    <span class="project-card__date">YEAR</span>
  </div>
  <p class="project-card__desc">
    Description text.
  </p>
  <div class="project-card__tags">
    <span class="tag">Tag1</span>
    <span class="tag">Tag2</span>
  </div>
  <div class="project-card__links">
    <a href="URL" class="project-card__link">Link Label</a>
  </div>
</article>
```

When cards are grouped under a section heading, use `<h3>` for card titles instead of `<h2>`.

## Owner Info

- **Name:** Andrew Orr
- **Handle:** xorrbit
- **Role:** Staff Vulnerability Research Engineer at Tenable (since 2013)
- **Focus:** Vulnerability research & software engineering
- **Location:** Winnipeg, Canada
- **GitHub:** https://github.com/xorrbit
- **LinkedIn:** https://linkedin.com/in/xorrbit
- **Email:** andrew@andreworr.ca
- **Domain:** andreworr.ca (hosted on GitHub Pages)

## Content Notes

- Security page: professional role, community contributions, and achievements
- Vulnerabilities page: CVE disclosures ordered by year (most recent first)
- Software page projects are ordered: most recent first, then andreworr.ca last as the meta entry
- All Tenable day-job vulnerability research is company confidential - never add specific details
- Content uses real project names and real CVE numbers; nothing is fabricated
- The Cisco SPA100 advisory was co-researched with Alex Weber; all others are sole credit

## Deployment

- Push to `main` branch on GitHub deploys automatically via GitHub Pages
- Custom domain configured via `CNAME` file
- `.nojekyll` prevents Jekyll processing
- No build step - the AI agent is the build step
