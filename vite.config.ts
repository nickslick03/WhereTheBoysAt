import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  base: '/WhereTheBoysAt/',
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
