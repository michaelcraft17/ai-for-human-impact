# AI for Human Impact

Landing page for **AI for Human Impact**, a BASIS Schools hackathon (Feb 6–12, 2027). A single static HTML file — vanilla HTML/CSS/JS, no build step, no dependencies.

## Structure

```
index.html        the whole site
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

A few links are intentionally placeholders until real values exist — they're marked with `data-todo-link` attributes in `index.html` (and a visible "add link" / "add email" tag in the footer) so they're easy to find and won't silently point somewhere wrong:

- **Devpost registration link** — nav, hero, and footer "Register" buttons
- **Discord invite link** — footer
- **Sponsor contact email** — footer
- **Custom domain** — none configured; site currently lives on the free `github.io` subdomain

Once you have real values, search `index.html` for `data-todo-link` and swap each `href="#"` for the real URL/`mailto:`, then remove the matching `title`/`aria-disabled` attributes and the `<script>` block's placeholder click-guard (the `a[data-todo-link]` handler near the bottom of the file) is safe to leave in place — it's a no-op guard, but you can delete it once every placeholder is filled in.
