# AI for Human Impact

Landing page for **AI for Human Impact**, a BASIS Schools hackathon (Feb 6–12, 2027). A static HTML site — vanilla HTML/CSS/JS, no build step, no dependencies.

**Live site:** https://basisglobalhacks.com/ (the old `michaelcraft17.github.io/ai-for-human-impact/` URL redirects here)

## Structure

```
index.html        content, base styles and existing functionality
assets/layout.css larger typography, responsive sizing and visual refinements
assets/motion.js   subtle document-scroll decoration
assets/mobile.css  phone layout (640px and narrower only)
assets/mobile.js   phone swipe-row dots and "Read full bio" buttons
assets/
  logo-mark.svg     site logo, also the main favicon
  favicon-192.png   192x192 PNG favicon (Google asks for multiples of 48px)
  og-image.svg      source for the social share image
  og-image.png      1200x630 share image used by Open Graph / Twitter Card tags
favicon.ico         16/32/48px fallback icon at the site root
apple-touch-icon.png 180x180 iPhone home-screen icon
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

## Phone layout

`assets/mobile.css` and `assets/mobile.js` only change screens 640px wide or narrower; desktop and tablet look the same as before. On phones the top bar is hidden, the header shows the logo, Register and the menu (Dates, Judges and Donate are added to the menu), and a bar with Back to top and Register Now stays at the bottom after the hero until the final Register section. Tracks, Speakers and Judges become swipe rows with dots, judge bios show four lines with a "Read full bio" button, and Why join, Hosts, Co-organizers and Sponsors use two-column grids. Larger accessibility-menu text settings fall back to one column. The page is about 12,000px tall at 375px wide, down from about 20,900px.
