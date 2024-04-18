import type { UserConfig, Plugin } from "vite";
import type { Framework } from "../types";

export const getFramework = (
  path: string,
  viteConfig: UserConfig
): Framework => {
  const framework = path.split(".").pop();

  if (!framework) return { type: "html", ext: "html" };

  if (framework.endsWith("tsx") || framework.endsWith("jsx")) {
    const ext = framework.endsWith("tsx") ? "tsx" : "jsx";

    if (!viteConfig.plugins) return { type: "react", ext };

    let result = { type: "react", ext };

    viteConfig.plugins.map((plugin) => {
      if (!plugin) return result;

      const pluginName = (plugin as Plugin).name;

      if (!pluginName) result = { type: "react", ext };

      if (pluginName === "solid") result = { type: "solid", ext };
    });

    return result;
  }

  return { type: framework, ext: framework };
};
