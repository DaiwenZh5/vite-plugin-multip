import type { Config } from "../types";
import { markdown } from "./frameworks/markdown";
import { react } from "./frameworks/react";
import { svelte } from "./frameworks/svelte";
import { vanilla } from "./frameworks/vanilla";
import { vue } from "./frameworks/vue";
import { html } from "./html";

type BoilerplateOptions = {
  file: string,
  framework: string,
  config: Config,
  layout: string,
  css: string[],
  scripts: string[]
}

export const generateBoilerplate = async (options: BoilerplateOptions) => {
  const { file, framework, config, layout, css, scripts } = options;

  switch (framework) {
    case "svelte":
      return await html(svelte(file, css, scripts), config, layout);
    case "vue":
      return await html(vue(file, css, scripts), config, layout);
    case "tsx" || "jsx":
      return await html(react(file, css, scripts), config, layout);
    case "md":
      return await html(markdown(file, css, scripts), config, layout);
    case "html":
      return await html(vanilla(file, css, scripts), config, layout);
    default:
      return "";
  }
};
