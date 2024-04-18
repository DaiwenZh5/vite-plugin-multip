import {
  generateImports,
  generateImportsDev,
} from "../../assets/generateImports";
import { fixPath } from "../../utils/path";

export const solid = (
  file: string,
  css: string[],
  scripts: string[],
  dev: boolean,
  root: string
): string => {
  return `
    <div id="app"></div>
    <script type="module">
      import { render } from '${!dev ? "solid-js/web" : "./node_modules/solid-js/web"}';
      import App from '${!dev ? file : fixPath(file, root)}';
      ${!dev ? generateImports(css) : generateImportsDev(css, root)}
      ${!dev ? generateImports(scripts) : generateImportsDev(scripts, root)}

      const app = document.getElementById('app')

      render(() => App, app)
    </script>
  `;
};
