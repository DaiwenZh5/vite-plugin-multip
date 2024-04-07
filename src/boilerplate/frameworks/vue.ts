import { generateImports } from "../../assets/generateImports";

export const vue = (file: string, css: string[], scripts: string[]): string => {
  return `
    <div id="app"></div>
    <script type="module">
      import { createApp } from 'vue';
      import App from '${file}';
      ${generateImports(css)}
      ${generateImports(scripts)}
      createApp(App).mount('#app');
    </script>
  `;
};
