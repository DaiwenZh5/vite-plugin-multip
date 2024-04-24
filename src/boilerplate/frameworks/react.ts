import {
  generateImports,
  generateImportsDev,
} from "../../assets/generateImports";
import { fixPath } from "../../utils/path";

export const react = (
  file: string,
  css: string[],
  scripts: string[],
  dev: boolean,
  root: string
): string => {
  return `
    <div id="app"></div>
    <script type="module">
      import React from '${!dev ? "react" : "./node_modules/.vite/deps/react.js"}';
      import ReactDOM from '${!dev ? "react-dom/client" : "./node_modules/.vite/deps/react-dom_client.js"}';
      import App from '${!dev ? file : fixPath(file, root)}';
      ${!dev ? generateImports(css) : generateImportsDev(css, root)}
      ${!dev ? generateImports(scripts) : generateImportsDev(scripts, root)}

      const e = React.createElement;

      ReactDOM.createRoot(document.getElementById('app')).render(
        e(App, null)
      );
    </script>
  `;
};
