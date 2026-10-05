import { readFileSync, writeFileSync } from 'node:fs';
import { listComponentEntries } from './entries.ts';

// Regenerates package.json#exports from the component folders so the tsup entries
// and the published subpaths can never drift apart.
//   node scripts/sync-exports.ts           write
//   node scripts/sync-exports.ts --check   fail if out of date (CI / prepublish)

interface ExportCondition {
  types: string;
  default: string;
}
interface ExportTarget {
  import: ExportCondition;
  require: ExportCondition;
}

const target = (dir: string): ExportTarget => ({
  import: { types: `./dist/${dir}index.d.ts`, default: `./dist/${dir}index.js` },
  require: { types: `./dist/${dir}index.d.cts`, default: `./dist/${dir}index.cjs` },
});

const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as {
  exports: Record<string, unknown>;
};

const exportsMap: Record<string, ExportTarget | string> = {
  '.': target(''),
  './theme': target('theme/'),
  ...Object.fromEntries(
    listComponentEntries().map(({ name }) => [`./${name}`, target(`${name}/`)]),
  ),
  './package.json': './package.json',
};

if (process.argv.includes('--check')) {
  if (JSON.stringify(pkg.exports) !== JSON.stringify(exportsMap)) {
    console.error('package.json#exports is out of date. Run `pnpm exports:sync`.');
    process.exit(1);
  }
} else {
  pkg.exports = exportsMap;
  writeFileSync('package.json', `${JSON.stringify(pkg, null, 2)}\n`);
}
