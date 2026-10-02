# AI for Human Impact

Landing page for **AI for Human Impact**, a BASIS Schools hackathon (Feb 6–12, 2027). A static HTML site — vanilla HTML/CSS/JS, no build step, no dependencies.

**Live site:** https://michaelcraft17.github.io/ai-for-human-impact/

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

To connect a custom domain later: add a `CNAME` file with the domain, point its DNS at GitHub Pages, and set the domain in the repo's Settings → Pages.

## Outstanding TODOs

A few links are intentionally placeholders until real values exist — they're marked with `data-todo-link` attributes in `index.html` (and a visible "add link" tag in the footer) so they're easy to find and won't silently point somewhere wrong:

- **Devpost registration link** — nav, hero, and footer "Register" buttons
- **Discord invite link** — footer
- **Custom domain** — none configured; site currently lives on the free `github.io` subdomain

Once you have real values, search `index.html` for `data-todo-link` and swap each `href="#"` for the real URL/`mailto:`, then remove the matching `title`/`aria-disabled` attributes and the `<script>` block's placeholder click-guard (the `a[data-todo-link]` handler near the bottom of the file) is safe to leave in place — it's a no-op guard, but you can delete it once every placeholder is filled in.

## Layout and scroll interactions

Restored the original section layouts, track cards, hero arrangement, and statistics panel. Kept larger headings, a wider content container, and more generous section spacing. The two hero logos remain side by side and scale together on small screens. The tablet menu opens below 1001px to leave room for the brand. No dependencies or build step were added.

Pushing to `main` triggers the GitHub Pages deployment.

The visual polish draws on the Neuralink technology page’s thin rules, generous typography and restrained surfaces while preserving the original section layouts and branding. A hero link leads to the mission; the header progress line and mission linework respond to document scrolling. Reduced Motion and Pause Animations disable these decorative effects. No scrolling is intercepted, no sections are pinned, and content remains available without the new script.

A compact reading guide appears after the hero, labels the current section on desktop, and provides a keyboard-friendly Back to top action. Section entrances run once with a short, restrained stagger; content is visible by default if JavaScript is unavailable. Active navigation clears when the reader leaves its section. The guide remains usable with motion disabled.

The hero uses `assets/partner-stanford-nnea-dark-bold.png`, the selected high-resolution transparent NNEA recreation. Both hero logos scale proportionally within the desktop layout; the original logo assets remain available.
