import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tapp/', // базовый путь для GitHub Pages (имя репозитория)
  server: {
    port: 3000,
    open: true,
  },

  resolve: {
    alias: {
      '@/*': '/src',
      '@/app': '/src/app',
      '@/pages': '/src/pages',
      '@/layouts': '/src/layouts',
      '@/widgets': '/src/widgets',
      '@/features': '/src/features',
      '@/entities': '/src/entities',
      '@/shared': '/src/shared',
    },
  },
});
