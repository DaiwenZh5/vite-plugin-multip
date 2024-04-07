import { defineConfig } from 'vite'
import { multip } from '../../src/index'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), multip()],
})
