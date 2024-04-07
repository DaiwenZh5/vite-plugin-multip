import { dirname } from "path";
import glob from "tiny-glob";
import { resolve } from "./resolve";

export const getInitFile = async (id: string): Promise<string> => {
  const init = await glob("../**/init.ts", {
    cwd: dirname(id),
    filesOnly: true,
  });

  if (init.length < 1 || typeof init[0] != "string") return "";

  const nearestInit = init.sort((a, b) => {
    return a.split("/").length - b.split("/").length;
  });

  if (nearestInit.length < 1 || typeof nearestInit[0] != "string")
    throw new Error("Nearest init file not found");

  return resolve(dirname(id), nearestInit[0]);
}
