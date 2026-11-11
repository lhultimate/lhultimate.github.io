# Website

A single-page site about my work as a programmer, featuring
[ScorePlus](https://lhultimate.github.io/ScorePlus/) — my scoreboard and broadcast
graphics software. It's my only project right now, I'm thinking about making just a standalone broadcasting software that can be for live events outside of sports.

Hand-written HTML, CSS and JavaScript. No framework, no package manager, no build step.

## Structure

```
index.html          the page
assets/styles.css   all styling
assets/main.js      scroll reveal, active nav, live clocks
assets/favicon.svg  monogram favicon
assets/scoreplus-on-air.png  hero screenshot of ScorePlus on air (copied from the ScorePlus site)
.nojekyll           serve files as-is on GitHub Pages
```

## Run locally
I don't know why you would want to run it yourself, but here's the steps:

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Publish

Settings → Pages → Source: **Deploy from a branch** → Branch: `main`, folder: `/ (root)`.

GitHub Pages for a private repository requires a paid GitHub plan, so this repo must be
public (or the account must have Pages on private repos) before Pages will build.
