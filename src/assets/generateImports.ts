import { fixPath } from "../utils/path";

export const generateImports = (files: string[]) => {
  return files.map((file) => `import '${file}';`).join("\n");
};

export const generateImportsDev = (files: string[], root: string) => {
  return files.map((file) => `import '${fixPath(file, root)}';`).join("\n");
};
