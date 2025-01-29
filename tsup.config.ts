import { defineConfig } from 'tsup';

export default defineConfig((o) => ({
  entry: ['src/index.ts'],
  sourcemap: false,
  clean: true,
  minify: !o.watch,
  outDir: 'lib',
  format: ['cjs'],
}));
