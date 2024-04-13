import { generateImports } from "../../assets/generateImports";

export const vue = (file: string, css: string[], scripts: string[], dev: boolean, init?: string): string => {
  scripts = scripts.filter((script) => script.endsWith("init.ts") === false);

  return `
    <div id="app"></div>
    <script type="module">
      import { createApp } from '${!dev ? 'vue' : './node_modules/vue'}';
      import App from '${file}';
      ${init ? `import { init } from '${init}';` : ""}
      ${generateImports(css)}
      ${generateImports(scripts)}
      const app = createApp(App);
      ${init ? "init(app);" : ""}
      app.mount('#app');
    </script>
  `;
};
