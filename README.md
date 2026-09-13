# datamoc.github.io

The `datamoc` GitHub Pages user site: [https://datamoc.github.io/](https://datamoc.github.io/).
A GitHub user/org site (a repo literally named `<user>.github.io`) always serves the root of
that domain; this is separate from a project's own Pages site (`mwg`'s own docs and examples,
for instance, are a different repo's Pages deployment, served at `/mwg/` rather than here).

## What this is

One self-contained page, `index.html`, plus the local `vendor/mw_games.global.js` runtime. It
links out to the sibling projects (`mwg`, `mwg Pixel Dungeon`) and runs a small, playable Pong
demo directly in the page, using `mw_games.Generator` (a seeded RNG) for deterministic serves.
The demo loads the MWG global bundle from the repository and uses `mw_games.Game`,
`mw_games.Scene2D` and `mw_games.Shape2D` for its loop and rendering; it has no CDN dependency.

## Sibling projects

- **[`mwg`](https://github.com/datamoc/mwg)** - the framework this site's demo borrows one
  utility from. Its own Pages site (examples, API docs) is a separate deployment, at
  [datamoc.github.io/mwg](https://datamoc.github.io/mwg/), built from `mwg`'s own repo.
- **[`mwg-pixel-dungeon`](https://github.com/datamoc/mwg-pixel-dungeon)** - a Shattered Pixel
  Dungeon port built on `mwg`, linked from this page's nav. Also its own separate Pages
  deployment, at
  [datamoc.github.io/mwg-pixel-dungeon](https://datamoc.github.io/mwg-pixel-dungeon/).

## Deployment

GitHub Pages, configured to deploy straight from the `main` branch (repo Settings -> Pages),
not a build workflow: `git log` shows a `.github/workflows/pages.yml` Actions-based deploy was
added, then deliberately removed in favour of this ("chore: use github pages branch
deployment") once the site turned out to need no build step at all. Pushing to `main` is the
entire deploy; there is nothing to run first.

A lightweight GitHub Actions check runs on pushes and pull requests. It validates the static
page and the local MWG bundle without installing runtime dependencies or building the site.

## Working on this locally

Open `index.html` directly in a browser to preview it. The page and MWG runtime work offline
from `file://`; only the external project links need network access.

The vendored runtime is `@datamoc/mw_games@0.8.2`. Update `vendor/mw_games.global.js` from the
published package when upgrading MWG.

## Licence

Not yet declared. Decide and add a `LICENSE` file before treating this repo's content
(the page, its Pong demo code) as reusable elsewhere.
