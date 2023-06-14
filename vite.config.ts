import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '/test/setup.ts',
  },
  server: {
    port: 5000,
    proxy: {
      '/login/**': { target: 'http://localhost:4000/' },
      '/auth': 'http://localhost:4000/',
    },
  },
});

