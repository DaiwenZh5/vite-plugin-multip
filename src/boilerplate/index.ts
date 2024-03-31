import type { Config } from "../types";
import { markdown } from "./frameworks/markdown";
import { react } from "./frameworks/react";
import { svelte } from "./frameworks/svelte";
import { vanilla } from "./frameworks/vanilla";
import { vue } from "./frameworks/vue";
import { html } from "./html";

export const generateBoilerplate = async (
  file: string,
  framework: string,
  config: Config,
  layout: string,
  css: string[]
) => {
  switch (framework) {
    case "svelte":
      return await html(svelte(file, css), config, layout);
    case "vue":
      return await html(vue(file, css), config, layout);
    case "tsx" || "jsx":
      return await html(react(file, css), config, layout);
    case "md":
      return await html(markdown(file, css), config, layout);
    case "html":
      return await html(vanilla(file, css), config, layout);
    default:
      return "";
  }
};
