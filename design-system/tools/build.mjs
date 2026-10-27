#!/usr/bin/env node
/* OUHSD Design System build script. No dependencies. Run from anywhere:
     node design-system/tools/build.mjs
   It does two things:
     1. Bundles tokens.css + icons.css + components.css into v1/ouhsd.css (one file for teams to link)
     2. Reads every --ou-* variable in tokens.css and writes v1/tokens.json (for Figma, Style Dictionary, or code)
   tokens.css is the source of truth. Never edit ouhsd.css or tokens.json by hand. */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const v1 = join(dirname(fileURLToPath(import.meta.url)), '..', 'v1');
const read = (f) => readFileSync(join(v1, f), 'utf8');

const tokens = read('tokens.css');
const icons = read('icons.css');
const components = read('components.css');

const banner = '/* OUHSD Design System v1.0 | ouhsd.css (generated bundle: tokens + icons + components). Do not edit. */\n';
writeFileSync(join(v1, 'ouhsd.css'), banner + [tokens, icons, components].join('\n'));

// Parse custom properties from :root in tokens.css, grouped by the comment headings above them.
const body = tokens.slice(tokens.indexOf(':root'));
const out = {};
let group = 'misc';
for (const line of body.split('\n')) {
  const heading = line.match(/\/\*\s*-{3,}\s*(?:\d+\.\s*)?(.+?)\s*-{3,}\s*\*\//);
  if (heading) { group = heading[1].split(/[:,]/)[0].replace(/\(.*?\)/g, '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'); continue; }
  const m = line.match(/^\s*(--ou-[\w-]+)\s*:\s*([^;]+);\s*(?:\/\*\s*(.*?)\s*\*\/)?/);
  if (!m) continue;
  const [, name, value, note] = m;
  const entry = { $value: value.trim() };
  if (note) entry.$description = note;
  (out[group] ||= {})[name.slice(2)] = entry;
}
writeFileSync(join(v1, 'tokens.json'), JSON.stringify({ $version: '1.0.0', ...out }, null, 2) + '\n');

const count = Object.values(out).reduce((n, g) => n + Object.keys(g).length, 0);
console.log(`Built v1/ouhsd.css (${(readFileSync(join(v1, 'ouhsd.css')).length / 1024).toFixed(1)} KB) and v1/tokens.json (${count} tokens)`);
