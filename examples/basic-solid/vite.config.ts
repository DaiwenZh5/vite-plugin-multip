import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { multip } from '../../src/index';

export default defineConfig({
  plugins: [solid(), multip()],
})
