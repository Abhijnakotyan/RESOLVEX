import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',
  server: {
    host: true,      // Enables access from LAN
    port: 5173,      // Optional: defaults to 5173
    strictPort: true // Optional: avoids random fallback port
  }
});
