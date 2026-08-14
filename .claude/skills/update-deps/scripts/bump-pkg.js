// Rewrites version ranges in a package.json to match versions actually
// installed (from `npm list --depth=0 --json`), preserving the existing
// range prefix (^, ~, or exact) and JSON indent width.
//
// Usage: node bump-pkg.js <package.json> <npm-list.json> [indent=2]
const fs = require('fs');

const pkgPath = process.argv[2];
const listPath = process.argv[3];
const indent = process.argv[4] || '2';

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const list = JSON.parse(fs.readFileSync(listPath, 'utf8'));
const installed = list.dependencies || {};

function bumpSection(section) {
  if (!section) return;
  for (const name of Object.keys(section)) {
    const current = section[name];
    const inst = installed[name];
    if (!inst || !inst.version) continue;
    const prefix = (current.match(/^([~^]?)/) || [, ''])[1];
    section[name] = `${prefix}${inst.version}`;
  }
}

bumpSection(pkg.dependencies);
bumpSection(pkg.devDependencies);

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, Number(indent)) + '\n');
console.log('updated', pkgPath);
