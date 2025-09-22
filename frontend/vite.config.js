import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('gsap')) return 'gsap';       
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor'; 
            return 'vendor';                                
          }
        },
      },
    },
  },
});
