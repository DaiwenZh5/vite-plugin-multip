import type { Frameworks } from "../utils/input";

export const getExternalDeps = (frameworks: Frameworks): string[] => {
  return Object
    .values(frameworks)
    .some((f) => f.type === "react") ? ["react-dom"] : [];
};
