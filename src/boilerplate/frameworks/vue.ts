import {
  generateImports,
  generateImportsDev,
} from "../../assets/generateImports";
import { fixPath } from "../../utils/path";

export const vue = (
  file: string,
  css: string[],
  scripts: string[],
  dev: boolean,
  root: string,
  init?: string
): string => {
  scripts = scripts.filter((script) => script.endsWith("init.ts") === false);

  return `
    <div id="app"></div>
    <script type="module">
      import { createApp } from '${!dev ? "vue" : "./node_modules/.vite/deps/vue.js"}';
      import App from '${!dev ? file : fixPath(file, root)}';
      ${init ? `import { init } from '${!dev ? init : fixPath(init, root)}';` : ""}
      ${!dev ? generateImports(css) : generateImportsDev(css, root)}
      ${!dev ? generateImports(scripts) : generateImportsDev(scripts, root)}
      const app = createApp(App);
      ${init ? "init(app);" : ""}
      app.mount('#app');
    </script>
  `;
};
