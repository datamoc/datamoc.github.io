# Contributing

This is a deliberately small, dependency-free GitHub Pages site.

## Local checks

Use Node.js 18 or newer and run:

```text
npm run check
```

Open `index.html` directly in a browser to preview the page. The local MWG bundle is kept in
`vendor/` so the page remains usable without a network connection.

## Updating MWG

Replace `vendor/mw_games.global.js` with the global bundle from the intended published
`@datamoc/mw_games` version, update the version in `README.md`, then run `npm run check`.
