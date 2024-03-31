import type { Plugin, ResolvedConfig } from "vite";
import type { Config } from "./types";
import { generateBoilerplate } from "./boilerplate";
import { resolve } from "./utils/resolve";
import { createServer } from "./server/create";
import { hotupdate } from "./server/hot";
import { getLayout } from "./utils/layouts";
import { getInputs, type Frameworks } from "./utils/input";
import { getStyles } from "./css/getStyles";
import glob from "tiny-glob";
import copy from "rollup-plugin-copy";

export const multipage = (config?: Config): Plugin => {
  const root = config?.directory || "src/pages";
  const assets = config?.assets || [];
  const frameworks: Frameworks = {};

  return {
    name: "vite-plugin-multip",
    async config(viteConfig) {
      const pages = await glob("**/*.{svelte,vue,tsx,jsx,md,html}", {
        cwd: root,
        filesOnly: true,
      });

      const [input, recognizedFrameworks] = getInputs(pages, root);

      Object.assign(frameworks, recognizedFrameworks);

      if (!input) throw new Error("No input found");

      return {
        root,
        build: {
          outDir: "dist",
          emptyOutDir: true,
          rollupOptions: {
            input,
            output: {
              dir: "dist",
            },
            plugins: [
              copy({
                targets: [{ src: viteConfig.publicDir || "public/", dest: "dist/" }, ...assets],
              }),
            ],
          },
        },
      };
    },

    resolveId(id) {
      return id.includes("index.html") ? id : null;
    },

    async load(id) {
      const fileName = "index.html";
      if (!id.endsWith(fileName)) return null;

      id = resolve(id);

      const framework = frameworks[id];

      if (!framework) return null;

      const page = id.replace(fileName, `index.${framework}`);
      const layout = await getLayout(page);
      const css = await getStyles(page.replace(`index.${framework}`, ""));

      return await generateBoilerplate(
        page,
        framework,
        config || {},
        layout,
        css
      );
    },

    configureServer: createServer,
    handleHotUpdate: hotupdate,
  };
};
