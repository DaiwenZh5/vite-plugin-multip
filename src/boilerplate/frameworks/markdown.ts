import markdownit from "markdown-it";
import fs from "fs";
import {
  generateImports,
  generateImportsDev,
} from "../../assets/generateImports";

export const markdown = (
  file: string,
  css: string[],
  scripts: string[],
  dev: boolean,
  root: string
): string => {
  const content = fs.readFileSync(file, "utf-8");
  const md = markdownit();

  const html = md.render(content);

  return `
    <div id="app">${html}</div>
    <script type="module">
      ${!dev ? generateImports(css) : generateImportsDev(css, root)}
      ${!dev ? generateImports(scripts) : generateImportsDev(scripts, root)}
    </script>
  `;
};
