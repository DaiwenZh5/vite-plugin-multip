import { defineConfig } from 'vite'
import { multip } from "../../src/index";
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    svelte(),
    multip({
      page: {
        title: "My Page", // Or () => "Page" 
      }
    })
  ],
})
