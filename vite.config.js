import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// base './' makes the build work from any GitHub Pages path (user.github.io/repo-name/).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})