import type { Plugin } from "vite";
import type { Config } from "./types";
import { resolve } from "./utils/resolve";
import { getExternalDeps } from "./utils/config";
import { getInputs, type Frameworks } from "./utils/input";
import { getPageFromIndex } from "./utils/page";
import { configureServer } from "./server";
import { load } from "./load";
import glob from "tiny-glob";
import copy from "rollup-plugin-copy";
import path from "path";

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

      const [input, recognizedFrameworks] = getInputs(pages, root, viteConfig);

      Object.assign(frameworks, recognizedFrameworks);

      if (!input) throw new Error("No pages found");

      const isDev = env.command !== "build";

      return {
        root: !isDev ? root : "./",
        optimizeDeps: {
          include: getExternalDeps(frameworks),
        },
        build: {
          outDir: path.join(
            "../../",
            viteConfig.build?.outDir || "dist/"
          ),
          emptyOutDir: true,
          rollupOptions: {
            input: !isDev ? input : {},
            plugins: [
              copy({
                targets: [
                  {
                    src: viteConfig.publicDir || "public/",
                    dest: viteConfig.build?.outDir || "dist/",
                  },
                  ...assets,
                ],
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

      const page = id.replace(fileName, `index.${framework.ext}`);

      return await load(page, framework, config || {}, false);
    },

    async transformIndexHtml(_, ctx) {
      if (!ctx.server || !ctx.originalUrl || ctx.server.config.command === "build") return;

      const originalUrl = ctx.originalUrl.split("?")[0];

      if (!originalUrl) return;

      const page = getPageFromIndex(ctx, { frameworks, root, originalUrl });

      if (!page) return;

      return await load(page.file, page.framework, config || {}, true);
    },

    configResolved(config) {
      // Replace ../../ from build logs (is pretty ugly)
      if (config.command === "build") {
        config.logger.info = (msg) => {
          console.info(msg.replace("../../", ""));
        }
      }
    },

    configureServer(server) {
      configureServer(server, { root, frameworks, config: config || {} })
    },
  };
};
