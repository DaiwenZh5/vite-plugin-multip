import { generateImports } from "../../css/generateImports";
import fs from "fs";
import { analyzePageWarns } from "../../errors/analyzePageWarns";

export const vanilla = (file: string, css: string[]): string => {
  const html = fs.readFileSync(file, "utf-8");

  analyzePageWarns(html);

  return `
    ${html}
    <script type="module">
      ${generateImports(css)}
    </script>
  `;
};
