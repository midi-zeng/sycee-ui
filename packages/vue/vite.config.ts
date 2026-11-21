import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'node:url';

// Library build. Vite 8 runs on Rolldown, which is powered by the Oxc
// (Rust) toolchain for parsing and transforming TypeScript/JSX.
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*', 'src/test-setup.ts'],
      cleanVueFileName: true,
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
      external: [/^vue(\/.*)?$/, /^@vue\/.*$/, /^ninepatch-core$/, /^@sycee-ui\/utils$/],
    },
  },
  test: {
    alias: {
      '@sycee-ui/utils': fileURLToPath(new URL('../utils/src/index.ts', import.meta.url)),
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
    css: false,
  },
});
