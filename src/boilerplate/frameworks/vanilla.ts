import {
  generateImports,
  generateImportsDev,
} from "../../assets/generateImports";
import fs from "fs";
import { analyzePageWarns } from "../../errors/analyzePageWarns";

export const vanilla = (
  file: string,
  css: string[],
  scripts: string[],
  dev: boolean,
  root: string
): string => {
  const html = fs.readFileSync(file, "utf-8");

  analyzePageWarns(html);

  return `
    ${html}
    <script type="module">
      ${!dev ? generateImports(css) : generateImportsDev(css, root)}
      ${!dev ? generateImports(scripts) : generateImportsDev(scripts, root)}
    </script>
  `;
};
