import { getScripts } from "./assets/getScripts";
import { getStyles } from "./assets/getStyles";
import { generateBoilerplate } from "./boilerplate";
import type { Config, Framework } from "./types";
import { getLayout } from "./utils/layouts";

export const load = async (
  id: string,
  framework: Framework,
  config: Config,
  dev: boolean
) => {
  const layout = await getLayout(id);
  const css = await getStyles(id.replace(`index.${framework.ext}`, ""));
  const scripts = await getScripts(id.replace(`index.${framework.ext}`, ""));

  return await generateBoilerplate({
    file: id,
    framework,
    config: config || {},
    layout,
    css,
    scripts,
    dev,
  });
};
