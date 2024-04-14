import { generateImports } from "../../assets/generateImports";
import { fixPath } from "../../utils/path";

export const react = (file: string, css: string[], scripts: string[], dev: boolean, root: string): string => {
  return `
    <div id="app"></div>
    <script type="module">
      import React from '${!dev ? 'react' : './node_modules/react'}';
      import ReactDOM from '${!dev ? 'react-dom/client' : './node_modules/react-dom/client'}';
      import App from '${!dev ? file : fixPath(file, root)}';
      ${generateImports(css)}
      ${generateImports(scripts)}

      const e = React.createElement;

      ReactDOM.createRoot(document.getElementById('app')).render(
        e(App, null)
      );
    </script>
  `;
};
