// Bundles the game into one self-contained HTML file (dist/nova-hook.html)
// that runs straight off the filesystem — no server, no build chain, no deps.
//
// The source is plain ES modules with no circular imports, so bundling is
// just: resolve the import graph, strip the import/export syntax, and
// concatenate the modules in dependency order inside a single <script>.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entry = join(root, 'src/main.js');

const IMPORT_RE = /^\s*import\s+([\s\S]*?)\s+from\s+['"](.+?)['"];?\s*$/gm;
const SIDE_EFFECT_IMPORT_RE = /^\s*import\s+['"](.+?)['"];?\s*$/gm;

/** Every name a module exports, so `import * as ns` can be rebuilt. */
function exportedNames(code) {
  const names = new Set();
  for (const m of code.matchAll(/^export\s+(?:async\s+)?(?:function|class|const|let|var)\s+([A-Za-z0-9_$]+)/gm)) {
    names.add(m[1]);
  }
  for (const m of code.matchAll(/^export\s*\{([^}]+)\}/gm)) {
    for (const part of m[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop().trim();
      if (name) names.add(name);
    }
  }
  return [...names];
}

const modules = new Map(); // absolute path -> { code, deps, namespaceFor }
const order = [];

function loadModule(file) {
  if (modules.has(file)) return;
  const raw = readFileSync(file, 'utf8');
  const deps = [];
  const namespaces = [];

  let code = raw.replace(IMPORT_RE, (_full, clause, spec) => {
    const dep = resolve(dirname(file), spec);
    deps.push(dep);
    const ns = clause.match(/^\*\s+as\s+([A-Za-z0-9_$]+)$/);
    if (ns) namespaces.push({ name: ns[1], dep });
    return '';
  });
  code = code.replace(SIDE_EFFECT_IMPORT_RE, (_full, spec) => {
    deps.push(resolve(dirname(file), spec));
    return '';
  });

  // Strip the export keyword; the bundle shares one module scope.
  code = code
    .replace(/^export\s+default\s+/gm, 'const __default = ')
    .replace(/^export\s+(?=(?:async\s+)?(?:function|class|const|let|var)\s)/gm, '')
    .replace(/^export\s*\{[^}]*\};?\s*$/gm, '');

  modules.set(file, { code, deps, namespaces, exports: exportedNames(raw) });
  for (const dep of deps) loadModule(dep);

  // Post-order push == dependency order.
  if (!order.includes(file)) order.push(file);
}

loadModule(entry);

// `import * as ns` becomes a plain object, declared right after the module it
// mirrors — importers run their top-level code as soon as they are emitted.
const namespaceFor = new Map(); // dep path -> [alias names]
for (const mod of modules.values()) {
  for (const ns of mod.namespaces) {
    if (!namespaceFor.has(ns.dep)) namespaceFor.set(ns.dep, []);
    const list = namespaceFor.get(ns.dep);
    if (!list.includes(ns.name)) list.push(ns.name);
  }
}

const chunks = [];
for (const file of order) {
  const mod = modules.get(file);
  const rel = file.slice(root.length + 1);
  chunks.push(`\n// ===== ${rel} =====\n${mod.code.trim()}\n`);
  for (const alias of namespaceFor.get(file) || []) {
    chunks.push(`const ${alias} = { ${mod.exports.join(', ')} };\n`);
  }
}

const html = readFileSync(join(root, 'index.html'), 'utf8');
const css = readFileSync(join(root, 'styles.css'), 'utf8');

const bundled = html
  .replace(/\s*<link rel="manifest"[^>]*>/, '')
  .replace(/\s*<link rel="icon"[^>]*>/, '')
  .replace(/\s*<link rel="stylesheet"[^>]*>/, `\n    <style>\n${css}\n    </style>`)
  .replace(
    /\s*<script type="module" src="\.\/src\/main\.js"><\/script>/,
    `\n    <script type="module">\n${chunks.join('')}\n    </script>`,
  )
  // The service worker only exists in the hosted build.
  .replace(/<title>/, '<!-- built by tools/build.js — do not edit -->\n    <title>');

mkdirSync(join(root, 'dist'), { recursive: true });
const out = join(root, 'dist/nova-hook.html');
writeFileSync(out, bundled);

const kb = (Buffer.byteLength(bundled) / 1024).toFixed(1);
console.log(`built ${out} (${kb} KB, ${order.length} modules)`);
