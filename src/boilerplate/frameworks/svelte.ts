import { generateImports, generateImportsDev } from "../../assets/generateImports";
import { fixPath } from "../../utils/path";

export const svelte = (file: string, css: string[], scripts: string[], dev: boolean, root: string): string => {
  return `
    <div id="app"></div>
    <script type="module">
      import App from '${!dev ? file : fixPath(file, root)}';
      ${!dev ? generateImports(css) : generateImportsDev(css, root)}
      ${!dev ? generateImports(scripts) : generateImportsDev(scripts, root)}
      const app = new App({ target: document.getElementById('app') });
      export default app;
    </script>
  `;
};
