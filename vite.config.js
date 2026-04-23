import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 98.css uses @media (not(hover)) which lightningcss rejects; disable CSS minification
  build: {
    cssMinify: false,
  },
})
