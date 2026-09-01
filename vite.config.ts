import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const root = resolve(__dirname);

export default defineConfig({
  // Keep the original static pages in the production bundle alongside the
  // React scaffold. GitHub Pages serves these entry points directly.
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        chapter1: resolve(root, 'chapter1/index.html'),
        chapter2: resolve(root, 'chapter2/index.html'),
        chapter3: resolve(root, 'chapter3/index.html'),
        iris: resolve(root, 'iris.html'),
        cv: resolve(root, 'cv/index.html'),
        portfolio: resolve(root, 'portfolio/index.html'),
      },
    },
  },
});
