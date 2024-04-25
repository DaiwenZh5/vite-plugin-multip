import type { IndexHtmlTransformContext } from "vite";
import { resolve } from "./resolve";
import type { Frameworks } from "./input";
import type { ResolvedPage } from "../types";

type Params = {
  frameworks: Frameworks;
  root: string;
  originalUrl: string;
}

export const getPageFromIndex = (ctx: IndexHtmlTransformContext, params: Params): ResolvedPage | null => {
  const { frameworks, root, originalUrl } = params;

  const pages = resolve(`.${ctx.path.replace("index.html", "") + root}`);
  const id = resolve(`${pages}/${originalUrl}/index.html`);
  const framework = frameworks[id];

  if (!framework) return null;

  const page = id.replace("index.html", `index.${framework.ext}`);

  return { file: page, framework };
}
