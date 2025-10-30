#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const TOKENS_PATH = path.resolve(__dirname, 'tokens.json');
const OUT_CSS = path.resolve(__dirname, 'dist', 'tokens.css');

function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      flatten(v, key, out);
    } else {
      out[key] = v;
    }
  }
  return out;
}

function emitScope(varsObj) {
  const lines = [];
  for (const [key, value] of Object.entries(varsObj)) {
    const name = key.split('.').pop();
    const cssVar = `--${name}`;
    lines.push(`  ${cssVar}: ${value};`);
  }
  return lines.join('\n');
}

function main() {
  const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
  const lightFlat = flatten(tokens.light);
  const darkFlat = flatten(tokens.dark);
  const content = `:root{\n${emitScope(lightFlat)}\n}\n\n[data-theme="dark"]{\n${emitScope(darkFlat)}\n}\n`;
  fs.writeFileSync(OUT_CSS, content);
  console.log(`Wrote ${OUT_CSS}`);
}

main();
