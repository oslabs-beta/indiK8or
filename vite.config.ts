import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/login': 'http://localhost:5000',
      '/logout': 'http://localhost:5000',
      '/pods': 'http://localhost:5000',
      '/dashboard': 'http://localhost:5000',
      '/auth': 'http://localhost:5000',
      '/scan': 'http://localhost:5000',
      '/home': 'http://localhost:5000',
    },
  },
});
