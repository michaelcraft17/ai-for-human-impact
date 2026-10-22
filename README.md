# AI for Human Impact

Landing page for **AI for Human Impact**, a BASIS Schools hackathon (Feb 6–12, 2027). A static HTML site — vanilla HTML/CSS/JS, no build step, no dependencies.

**Live site:** https://basisglobalhacks.com/ (the old `michaelcraft17.github.io/ai-for-human-impact/` URL redirects here)

## Structure

```
index.html        content, base styles and existing functionality
assets/layout.css larger typography, responsive sizing and visual refinements
assets/motion.js   subtle document-scroll decoration
assets/
  favicon.svg      site favicon
  og-image.svg      source for the social share image
  og-image.png      1200x630 share image used by Open Graph / Twitter Card tags
robots.txt
sitemap.xml
```

## Run locally

No build step. Serve the directory with any static file server, e.g.:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/index.html`.

## Deploy

Deployed to **GitHub Pages** via the GitHub Actions workflow in `.github/workflows/deploy.yml`, which publishes `main` on every push. No build step is required — it just uploads the repository root as the Pages artifact.

**Custom domain:** `basisglobalhacks.com` (registered at Namecheap). Because the site deploys via Actions, the domain is set in the repo's Settings → Pages, not with a `CNAME` file. DNS at Namecheap → Advanced DNS:

- `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `AAAA` records for `@` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
- `CNAME` record for `www` → `michaelcraft17.github.io.`

Keep auto-renew on: if the domain lapses while it's configured, the old `github.io` URL redirects to a dead domain.

## Layout and scroll interactions

Restored the original section layouts, track cards, hero arrangement, and statistics panel. Kept larger headings, a wider content container, and more generous section spacing. The two hero logos remain side by side and scale together on small screens. The tablet menu opens below 1001px to leave room for the brand. No dependencies or build step were added.

Pushing to `main` triggers the GitHub Pages deployment.

The visual polish draws on the Neuralink technology page’s thin rules, generous typography and restrained surfaces while preserving the original section layouts and branding. A hero link leads to the mission; the header progress line and mission linework respond to document scrolling. Reduced Motion and Pause Animations disable these decorative effects. No scrolling is intercepted, no sections are pinned, and content remains available without the new script.

A compact reading guide appears after the hero, labels the current section on desktop, and provides a keyboard-friendly Back to top action. Section entrances run once with a short, restrained stagger; content is visible by default if JavaScript is unavailable. Active navigation clears when the reader leaves its section. The guide remains usable with motion disabled.

The hero uses `assets/partner-stanford-nnea-dark-bold.png`, the selected high-resolution transparent NNEA recreation. Both hero logos scale proportionally within the desktop layout; the original logo assets remain available.
