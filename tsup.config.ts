import { defineConfig } from 'tsup';
import { listComponentEntries } from './scripts/entries.ts';

// One entry per component folder → adding src/components/<category>/Foo/index.ts
// produces dist/foo/index.* (subpath `@phanvanhieu/ui/foo`; run `pnpm exports:sync` to update package.json).
const componentEntries = Object.fromEntries(
  listComponentEntries().map(({ name, source }) => [`${name}/index`, source]),
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
