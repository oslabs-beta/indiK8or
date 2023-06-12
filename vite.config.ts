// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: '/test/setup.js',
//   },
//   server: {
//     port: 5000,
//     proxy: {
//       '/login/**': { target: 'http://localhost:4000/' },
//       '/auth': 'http://localhost:4000/',
//     },
//   },
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
