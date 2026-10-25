import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('three')) {
            return 'vendor-three';
          }
          if (id.includes('plotly')) {
            return 'vendor-plotly';
          }
          if (id.includes('katex')) {
            return 'vendor-katex';
          }
          if (id.includes('mathjs')) {
            return 'vendor-mathjs';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
