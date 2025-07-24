import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/psychologists': 'http://localhost:3000',
      '/sessions':     'http://localhost:3000',
      '/analytics':     'http://localhost:3000',
    },
  },
});
