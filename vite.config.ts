import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const page = (file: string) => fileURLToPath(new URL(file, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves project repositories under "/<repo-name>/".
  // The deploy workflow sets BASE_PATH automatically from the repository name;
  // locally the app is served from the root.
  base: process.env.BASE_PATH ?? '/',
  // Own fixed port (5173 is used by another local project). strictPort makes
  // Vite fail loudly instead of silently picking the next free port.
  server: {
    port: 5180,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      // Multi-page build: portfolio + legal pages (Impressum, privacy policy)
      input: {
        main: page('./index.html'),
        impressum: page('./impressum.html'),
        datenschutz: page('./datenschutz.html'),
      },
    },
  },
})
