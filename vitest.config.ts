import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(root, 'src'),
      '@package-json': path.join(root, 'package.json'),
    },
  },

  test: {
    isolate: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    setupFiles: [path.join(root, 'setup-unit-tests.ts')],
    passWithNoTests: true,
  },
});
