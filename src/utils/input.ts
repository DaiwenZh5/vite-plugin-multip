import { dirname } from "path";
import { resolve } from "./resolve";

export type Frameworks = {
  [key: string]: string;
}

export const getInputs = (
  pages: string[],
  root: string
): [Record<string, string>, Frameworks] => {
  const frameworks: Frameworks = {};
  const inputFrameworks: string[] = [];

  const entries = pages.map((page) => {
    const name = dirname(page);
    const framework = page.split(".").pop();

    if (framework) inputFrameworks.push(framework);

    if (name === "." || !name) return "index";

    return name;
  });

  const input = entries.reduce((acc: Record<string, string>, page, index) => {
    const fileName = "index.html";
    const framework = inputFrameworks[index];

    if (page === "index") {
      const path = resolve(root, fileName);

      acc[page] = path;
      frameworks[path] = framework || "html";

      return acc;
    }

    const path = resolve(root, page, fileName);

    acc[page] = path;
    frameworks[path] = framework || "html";

    return acc;
  }, {});

  return [input, frameworks]; // rollup inputs, frameworks for each input
};
