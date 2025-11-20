import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Use absolute asset paths so deep links (e.g. /lead) still find the bundle
  // when the static host rewrites to index.html.
  base: '/',
  plugins: [react()],
});
