import markdownit from "markdown-it";
import fs from "fs";
import { generateImports } from "../../css/generateImports";

export const markdown = (file: string, css: string[]): string => {
  const content = fs.readFileSync(file, "utf-8");
  const md = markdownit();

  const html = md.render(content);

  return `
    <div id="app">${html}</div>
    <script type="module">
      ${generateImports(css)} 
    </script>
  `;
};
