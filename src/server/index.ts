import { scripts } from "./scripts";
import mm from "micromatch";
import type { ViteDevServer } from "vite";
import type { Frameworks } from "../utils/input";
import type { Config } from "../types";

export type Params = {
  root: string;
  frameworks: Frameworks;
  config: Config;
};

export const configureServerMiddlewares = (server: ViteDevServer, params: Params) => {
  server.middlewares.use((req, res, next) => {
    if (req.url === "/@multip/refresh-runtime") {
      res.setHeader("Content-Type", "application/javascript");

      return res.end(scripts.refreshRuntime);
    } else if (req.url === "/@multip/dev") {
      res.setHeader("Content-Type", "application/javascript");
      return res.end(scripts.dev(params));
    }

    next();
  });
};

export const handleRestart = (server: ViteDevServer, file: string) => {
  if (!mm.isMatch(file, "**/*.{svelte,vue,tsx,jsx,md,html,css,scss,sass,less,js,ts}")) return;

  server.restart();
};
