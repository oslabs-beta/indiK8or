import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      // "/login": "http://localhost:4000/",
      '/login': {
        target: 'http://your-backend-server.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/login/, ''),
      },
      "/logout": "http://localhost:4000/",
      "/dashboard": "http://localhost:4000/",
      "/pod": "http://localhost:4000/",
      "/scan": "http://localhost:4000/",
      "/grafana": "http://localhost:4000/",
      "/auth": "http://localhost:4000/",
    },
  },
});
