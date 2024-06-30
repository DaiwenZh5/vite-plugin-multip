import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { multip } from "../../src";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), multip()],
})
