import { generateImports } from "../../assets/generateImports";
import { fixPath } from "../../utils/path";

export const svelte = (file: string, css: string[], scripts: string[], dev: boolean, root: string): string => {
  return `
    <div id="app"></div>
    <script type="module">
      import App from '${!dev ? file : fixPath(file, root)}';
      ${generateImports(css)}
      ${generateImports(scripts)}
      const app = new App({ target: document.getElementById('app') });
      export default app;
    </script>
  `;
};
