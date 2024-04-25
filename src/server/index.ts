import type { ViteDevServer } from "vite";
import { scripts } from "./scripts";
import type { Frameworks } from "../utils/input";
import type { Config } from "../types";

export type Params = {
  root: string;
  frameworks: Frameworks;
  config: Config;
};

export const configureServer = (server: ViteDevServer, params: Params) => {
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
