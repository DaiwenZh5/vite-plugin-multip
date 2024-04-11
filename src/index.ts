import type { Plugin } from "vite";
import type { Config } from "./types";
import { resolve } from "./utils/resolve";
import { getInputs, type Frameworks } from "./utils/input";
import glob from "tiny-glob";
import copy from "rollup-plugin-copy";
import { load } from "./load";

export const multip = (config?: Config): Plugin => {
  const root = config?.directory || "src/pages";
  const assets = config?.assets || [];
  const frameworks: Frameworks = {};

  return {
    name: "vite-plugin-multip",
    enforce: "pre",
    async config(viteConfig, env) {
      const pages = await glob("**/*.{svelte,vue,tsx,jsx,md,html}", {
        cwd: root,
        filesOnly: true,
      });

      const [input, recognizedFrameworks] = getInputs(pages, root);

      Object.assign(frameworks, recognizedFrameworks);

      if (!input) throw new Error("No pages found");

      return {
        root: env.command === "build" ? root : "./",
        build: {
          outDir: "dist",
          emptyOutDir: true,
          rollupOptions: {
            input: env.command === "build" ? input : {},
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

      return await load(page, framework, config || {});
    },

    async transformIndexHtml(_, ctx) {
      if (!ctx.server || !ctx.originalUrl) return;
      if (ctx.server.config.command === "build") return;

      const originalUrl = ctx.originalUrl.split("?")[0];

      const pages = resolve(`.${ctx.path.replace("index.html", "") + root}`);
      const page = resolve(`${pages}/${originalUrl}/index.html`);
      const framework = frameworks[page];

      const id = page.replace("index.html", `index.${framework}`);

      if (!framework) return `<!DOCTYPE html><html><title>404</title><body>404</body></html>`;

      return await load(id, framework, config || {});
    }
  };
};
