import { getScripts } from "./assets/getScripts";
import { getStyles } from "./assets/getStyles";
import { generateBoilerplate } from "./boilerplate";
import type { Config } from "./types";
import { getLayout } from "./utils/layouts";

export const load = async (id: string, framework: string, config: Config) => {
  const layout = await getLayout(id);
  const css = await getStyles(id.replace(`index.${framework}`, ""));
  const scripts = await getScripts(id.replace(`index.${framework}`, ""));

  return await generateBoilerplate({
    file: id,
    framework,
    config: config || {},
    layout,
    css,
    scripts
  });
}
