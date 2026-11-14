import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// Library build. Vite 8 runs on Rolldown, which is powered by the Oxc
// (Rust) toolchain for parsing and transforming TypeScript/JSX.
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*', 'src/test-setup.ts'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        styles: 'src/styles.ts',
      },
      formats: ['es'],
      cssFileName: 'styles',
    },
    sourcemap: true,
    target: 'es2020',
    rollupOptions: {
      external: [/^react(\/.*)?$/, /^react-dom(\/.*)?$/, /^scheduler(\/.*)?$/],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
    css: false,
  },
});
