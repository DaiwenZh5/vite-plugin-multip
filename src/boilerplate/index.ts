import type { Config, Framework } from "../types";
import { markdown } from "./frameworks/markdown";
import { react } from "./frameworks/react";
import { svelte } from "./frameworks/svelte";
import { vanilla } from "./frameworks/vanilla";
import { vue } from "./frameworks/vue";
import { html } from "./html";
import { getInitFile } from "../utils/vue";
import { solid } from "./frameworks/solid";

type BoilerplateOptions = {
  file: string;
  framework: Framework;
  config: Config;
  layout: string;
  css: string[];
  scripts: string[];
  dev: boolean;
};

export const generateBoilerplate = async (options: BoilerplateOptions) => {
  const { file, framework, config, layout, css, scripts, dev } = options;

  switch (framework.type) {
    case "svelte":
      return await html(
        svelte(file, css, scripts, dev, config.directory || "src/pages"),
        config,
        layout,
        dev
      );
    case "vue":
      const init = await getInitFile(file);

      return await html(
        vue(file, css, scripts, dev, config.directory || "src/pages", init),
        config,
        layout,
        dev
      );
    case "react":
      return await html(
        react(file, css, scripts, dev, config.directory || "src/pages"),
        config,
        layout,
        dev
      );
    case "solid":
      return await html(
        solid(file, css, scripts, dev, config.directory || "src/pages"),
        config,
        layout,
        dev
      );
    case "md":
      return await html(
        markdown(file, css, scripts, dev, config.directory || "src/pages"),
        config,
        layout,
        dev
      );
    case "html":
      return await html(
        vanilla(file, css, scripts, dev, config.directory || "src/pages"),
        config,
        layout,
        dev
      );
    default:
      return "";
  }
};
