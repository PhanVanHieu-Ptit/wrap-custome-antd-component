import { readdirSync } from 'node:fs';
import { defineConfig } from 'tsup';

// One entry per component folder → adding src/components/Foo/index.ts
// automatically produces dist/foo/index.* (subpath `@phanvanhieu/ui/foo`, see package.json exports).
const componentEntries = Object.fromEntries(
  readdirSync('src/components', { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_')) // `_shared` is internal, not a public entry
    .map((d) => [`${d.name.toLowerCase()}/index`, `src/components/${d.name}/index.ts`]),
);

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'theme/index': 'src/theme/index.ts',
    ...componentEntries,
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'antd', 'antd-style', '@ant-design/icons'],
});
