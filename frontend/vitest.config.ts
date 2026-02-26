import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    passWithNoTests: true,
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['**/*.test.tsx'],
  },
});
