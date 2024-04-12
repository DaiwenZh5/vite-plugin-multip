import glob from "tiny-glob";
import { resolve } from "../utils/resolve";

export const getScripts = async (path: string): Promise<string[]> => {
  const files = await glob(`${path}/*.{ts,js}`, {
    filesOnly: true,
  });
  const styles = files.filter((file) => !file.includes("layout"));

  return styles.map((file) => {
    return resolve(file);
  });
};
