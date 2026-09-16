import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

/**
 * When deploying to GitHub Pages at
 * https://saak-sa.github.io/SAAK-Trainee-Guide/ the app has to be served
 * from that subpath. Set BASE_PATH="/SAAK-Trainee-Guide/" in the Actions
 * workflow (or `.env`) — locally the default "/" keeps `npm run dev` clean.
 */
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
