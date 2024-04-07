import { generateImports } from "../../assets/generateImports";

export const svelte = (file: string, css: string[], scripts: string[]): string => {
  return `
    <div id="app"></div>
    <script type="module">
      import App from '${file}';
      ${generateImports(css)}
      ${generateImports(scripts)}
      const app = new App({ target: document.getElementById('app') });
      export default app;
    </script>
  `;
};
