import { dirname } from "path";
import { resolve } from "./resolve";
import type { Plugin, UserConfig } from "vite";
import type { Framework } from "../types";

export type Frameworks = {
  [key: string]: Framework;
}

export const getInputs = (
  pages: string[],
  root: string,
  viteConfig: UserConfig,
): [Record<string, string>, Frameworks] => {
  const frameworks: Frameworks = {};
  const inputFrameworks: Framework[] = [];
  const pagesWithoutLayouts = pages.filter((page) => !page.includes("layout"));

  const entries = pagesWithoutLayouts.map((page) => {
    const name = dirname(page);
    const framework = page.split(".").pop();

    if (!framework) return name;

    if (framework.endsWith("tsx") || framework.endsWith("jsx")) {
      if (!viteConfig.plugins) return "react";

      const ext = framework.endsWith("tsx") ? "tsx" : "jsx";

      // Plugin returns .name property, but it's not in the type
      // @ts-ignore
      viteConfig.plugins.forEach((plugin: Plugin) => {
        if (plugin.name === "solid") {
          inputFrameworks.push({ type: "solid", ext });
        } else if (!plugin.name) {
          inputFrameworks.push({ type: "react", ext });
        }
      });
    } else {
      inputFrameworks.push({ type: framework, ext: framework });
    }

    if (name === "." || !name) return "index";

    return name;
  });

  const input = entries.reduce((acc: Record<string, string>, page, index) => {
    const fileName = "index.html";
    const framework = inputFrameworks[index];

    if (page === "index") {
      const path = resolve(root, fileName);

      acc[page] = path;

      if (!framework) frameworks[path] = { type: "html", ext: "html" };
      else frameworks[path] = { type: framework.type || "html", ext: framework.ext || "html" };

      return acc;
    }

    const path = resolve(root, page, fileName);

    acc[page] = path;

    if (!framework) frameworks[path] = { type: "html", ext: "html" };
    else frameworks[path] = { type: framework.type || "html", ext: framework.ext || "html" };

    return acc;
  }, {});

  return [input, frameworks]; // rollup inputs, frameworks for each input
};
