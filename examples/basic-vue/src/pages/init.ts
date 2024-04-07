import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import type { App } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'

export const init = (app: App<Element>) => {
  app.use(createBootstrap());
}
