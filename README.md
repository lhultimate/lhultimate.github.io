# LHUltimate — personal site

A single-page site about my work as a programmer, featuring
[ScorePlus](https://lhultimate.github.io/ScorePlus/) — my scoreboard and broadcast
graphics software.

Hand-written HTML, CSS and JavaScript. No framework, no package manager, no build step.

## Structure

```
index.html          the page
assets/styles.css   all styling
assets/main.js      scroll reveal, active nav, live clocks
assets/favicon.svg  monogram favicon
.nojekyll           serve files as-is on GitHub Pages
```

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Publish

Settings → Pages → Source: **Deploy from a branch** → Branch: `main`, folder: `/ (root)`.

GitHub Pages for a private repository requires a paid GitHub plan, so this repo must be
public (or the account must have Pages on private repos) before Pages will build.
