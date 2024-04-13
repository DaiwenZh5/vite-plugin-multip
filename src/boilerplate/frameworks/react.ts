import { generateImports } from "../../assets/generateImports";

export const react = (file: string, css: string[], scripts: string[], dev: boolean): string => {
  return `
    <div id="app"></div>
    <script type="module">
      import React from '${!dev ? 'react' : './node_modules/react'}';
      import ReactDOM from '${!dev ? 'react-dom/client' : './node_modules/react-dom/client'}';
      import App from '${file}';
      ${generateImports(css)}
      ${generateImports(scripts)}

      const e = React.createElement;

      ReactDOM.createRoot(document.getElementById('app')).render(
        e(App, null)
      );
    </script>
  `;
};
