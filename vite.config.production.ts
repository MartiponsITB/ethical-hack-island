
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    // Generate a manifest for PHP to use
    manifest: true,
    // Avoid inlining assets in the HTML
    assetsInlineLimit: 0,
    // Use relative paths for assets
    assetsDir: 'assets',
  },
});
