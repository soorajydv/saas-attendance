import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import process from 'process';
import path from "path"

export default defineConfig({
  define: {
    'process.env': process.env,
  },

  server: {
    host: '0.0.0.0',  // Allows access from external devices (e.g., mobile or LAN)
    port: 5000,       // Change the port to whatever you'd like
    strictPort: true, // Ensures that the server fails if the port is already in use
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }

});