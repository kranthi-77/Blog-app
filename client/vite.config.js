import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // ← THIS IS ABSOLUTELY CRUCIAL
  build: {
    outDir: 'dist',
    emptyOutDir: true // ← Ensures clean builds
  }
})