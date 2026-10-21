import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const runtime = await readFile(new URL('../vendor/mwg.global.js', import.meta.url), 'utf8');
const audioModule = await readFile(new URL('../vendor/mwg-retro-audio-tone.js', import.meta.url), 'utf8');

const checks = [
  ['index.html exists', html.length > 0],
  ['local MWG runtime is referenced', html.includes('vendor/mwg.global.js')],
  ['audio module is loaded locally', html.includes("from './vendor/mwg-retro-audio-tone.js'") && audioModule.includes('export function playTone')],
  ['esm.sh is not referenced', !html.includes('esm.sh')],
  ['MWG Game is used through mwg', html.includes('new mwg.Game(')],
  ['MWG Scene2D is used through mwg', html.includes('extends mwg.Scene2D')],
  ['MWG Shape2D is used through mwg', html.includes('new mwg.Shape2D()')],
  ['vendored runtime exposes the mwg global', runtime.startsWith('var mwg=' )],
  ['vendored runtime is not empty', runtime.length > 100_000],
];

const failures = checks.filter(([, passed]) => !passed);
for (const [label, passed] of checks) console.log(`${passed ? 'ok' : 'not ok'} - ${label}`);

if (failures.length > 0) process.exitCode = 1;
