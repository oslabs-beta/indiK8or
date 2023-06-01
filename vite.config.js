import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/login/**': { target: 'http://localhost:3000/' },
      '/auth': 'http://localhost:3000/',
    },
  },
});
