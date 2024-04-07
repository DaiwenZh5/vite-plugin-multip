import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vue from '@vitejs/plugin-vue'
import { multip } from '../../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), vue(), multip()],
})
