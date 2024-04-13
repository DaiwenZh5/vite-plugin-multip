import { generateImports } from "../../assets/generateImports";

export const solid = (file: string, css: string[], scripts: string[], dev: boolean): string => {
  return `
    <div id="app"></div>
    <script type="module">
      import { render } from '${!dev ? 'solid-js/web' : './node_modules/solid-js/web'}';
      import App from '${file}';
      ${generateImports(css)}
      ${generateImports(scripts)}

      const app = document.getElementById('app')

      render(() => App, app)
    </script>
  `;
};
