import { readdirSync } from 'node:fs';

const COMPONENTS_DIR = 'src/components';
// Subpaths already taken by non-component entries (see tsup.config.ts / package.json exports).
const RESERVED = new Set(['theme']);

export interface ComponentEntry {
  /** Lowercased folder name: subpath `@phanvanhieu/ui/<name>` and `dist/<name>/index.*`. */
  name: string;
  /** Entry file, e.g. `src/components/data-entry/Select/index.ts`. */
  source: string;
}

const subdirs = (path: string): string[] =>
  readdirSync(path, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_')) // `_shared` is internal, not a public entry
    .map((d) => d.name);

// A folder holding only `index.ts` is a pure `export … from 'antd'` re-export: it needs no subpath
// (same code as `antd`, tree-shakeable from the root) and each extra d.ts entry makes tsup's
// type bundling much heavier (80+ entries runs out of memory). Only real wrappers get a subpath.
const isWrapper = (path: string): boolean => readdirSync(path).some((f) => f !== 'index.ts');

/** One entry per wrapper folder `src/components/<category>/<Component>/`. */
export function listComponentEntries(): ComponentEntry[] {
  const entries = new Map<string, ComponentEntry>();
  for (const category of subdirs(COMPONENTS_DIR)) {
    for (const component of subdirs(`${COMPONENTS_DIR}/${category}`)) {
      if (!isWrapper(`${COMPONENTS_DIR}/${category}/${component}`)) continue;
      const name = component.toLowerCase();
      const source = `${COMPONENTS_DIR}/${category}/${component}/index.ts`;
      const clash = entries.get(name);
      if (clash || RESERVED.has(name)) {
        throw new Error(
          `Duplicate component subpath "${name}": ${source} vs ${clash?.source ?? 'reserved'}`,
        );
      }
      entries.set(name, { name, source });
    }
  }
  return [...entries.values()].sort((a, b) => a.name.localeCompare(b.name));
}
