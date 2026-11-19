import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves project repositories under "/<repo-name>/".
  // The deploy workflow sets BASE_PATH automatically from the repository name;
  // locally the app is served from the root.
  base: process.env.BASE_PATH ?? '/',
})
