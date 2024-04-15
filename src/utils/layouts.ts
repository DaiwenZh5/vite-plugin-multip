import glob from "tiny-glob";
import { dirname } from "path";
import { resolve } from "./resolve";

export const getLayout = async (id: string): Promise<string> => {
  const layouts = await glob("../**/layout.html", {
    cwd: dirname(id),
    filesOnly: true,
  });

  if (layouts.length < 1 || typeof layouts[0] != "string") return "";

  const nearestLayout = layouts.sort((a, b) => {
    return a.length - b.length;
  });

  if (nearestLayout.length < 1 || typeof nearestLayout[0] != "string")
    throw new Error("Nearest layout not found");

  const layout = nearestLayout.map(
    (p) => resolve(dirname(id), p)
  )[0];

  if (!layout) throw new Error("Layout not found");

  return resolve(dirname(id), layout)
};
