import { generateImports } from "../../assets/generateImports";
import fs from "fs";
import { analyzePageWarns } from "../../errors/analyzePageWarns";

export const vanilla = (file: string, css: string[], scripts: string[]): string => {
  const html = fs.readFileSync(file, "utf-8");

  analyzePageWarns(html);

  return `
    ${html}
    <script type="module">
      ${generateImports(css)}
      ${generateImports(scripts)}
    </script>
  `;
};
