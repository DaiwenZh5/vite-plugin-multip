import { defineConfig } from 'vite'
import { multipage } from "../../src/index";

export default defineConfig({
  plugins: [multipage()],
})
