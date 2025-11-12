import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/djrobhan/', // <--- LEGG TIL DENNE LINJEN
  plugins: [react()],
})
