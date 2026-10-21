import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nombre-de-tu-repositorio/', // <--- ¡Reemplaza esto por el nombre exacto de tu repo en GitHub!
})