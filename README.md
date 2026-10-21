# datamoc.github.io

The `datamoc` GitHub Pages user site: [https://datamoc.github.io/](https://datamoc.github.io/).
A GitHub user/org site (a repo literally named `<user>.github.io`) always serves the root of
that domain; this is separate from a project's own Pages site (`mwg`'s own docs and examples,
for instance, are a different repo's Pages deployment, served at `/mwg/` rather than here).

## What this is

One page, `index.html`, plus the local MWG and Pyroeis browser runtimes in `vendor/`. It links out to the sibling
projects (`mwg`, `mwg Pixel Dungeon`) and runs a small, playable Pong demo directly in the page,
using `mwg.Generator` (a seeded RNG) for deterministic serves. The demo uses `mwg.Game`,
`mwg.Scene2D` and `mwg.Shape2D` for its loop and rendering. It also runs editable Lua
opponent strategies through the vendored Pyroeis browser bundle in a Web Worker.

## Sibling projects

- **[`mwg`](https://github.com/datamoc/mwg)** - the framework this site's demo borrows one
  utility from. Its own Pages site (examples, API docs) is a separate deployment, at
  [datamoc.github.io/mwg](https://datamoc.github.io/mwg/), built from `mwg`'s own repo.
- **[`mwg-pixel-dungeon`](https://github.com/datamoc/mwg-pixel-dungeon)** - a Shattered Pixel
  Dungeon port built on `mwg`, linked from this page's nav. Also its own separate Pages
  deployment, at
  [datamoc.github.io/mwg-pixel-dungeon](https://datamoc.github.io/mwg-pixel-dungeon/).

The Pong demo imports `playTone` from `@datamoc/mwg-retro-audio/sfx` online from npmjs via esm.sh.
Audio starts after the first keyboard interaction, when the browser allows Web Audio playback.
This is the page's only CDN dependency; the audio package is not bundled in the repository.

The CPU paddle strategy can be edited in the page as Lua. Define `target_y(state)` to receive the
ball, paddle and field values and return the desired top position of the CPU paddle. The default
strategy predicts the ball's arrival, reflects its path off the top and bottom walls, then adds a
small random error. Pyroeis runs the function in a worker with execution limits. Its bundle and
licence are in `vendor/pyroeis.bundle.js` and `vendor/PYROEIS-LICENSE.txt`.

## Deployment

GitHub Pages, configured to deploy straight from the `main` branch (repo Settings -> Pages),
not a build workflow: `git log` shows a `.github/workflows/pages.yml` Actions-based deploy was
added, then deliberately removed in favour of this ("chore: use github pages branch
deployment") once the site turned out to need no build step at all. Pushing to `main` is the
entire deploy; there is nothing to run first.

A lightweight GitHub Actions check runs on pushes and pull requests. It validates the static
page and the local MWG bundle without installing runtime dependencies or building the site.

## Working on this locally

Serve the repository over HTTP(S) to preview it locally. The Lua editor uses a Web Worker, and
retro audio loads from esm.sh, so opening `index.html` from `file://` is not supported.

The vendored runtime is `@datamoc/mwg@0.48.1`, whose global bundle exposes `window.mwg`.
Update `vendor/mwg.global.js` from the published package when upgrading MWG. Its MPL-2.0 licence
is in `vendor/MWG-LICENSE.txt`.

## Licence

Not yet declared. Decide and add a `LICENSE` file before treating this repo's content
(the page, its Pong demo code) as reusable elsewhere.
