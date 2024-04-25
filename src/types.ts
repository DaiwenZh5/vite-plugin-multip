import type { Options } from "html-minifier-terser";
import type { Target } from "rollup-plugin-copy";

export type Config = {
  directory?: string;
  page?: Page;
  minify?: Options;
  assets?: Target[];
};

export type Page = {
  title?: string | ((file: string) => string);
};

export type Framework = {
  type: string;
  ext: string;
};

export type ResolvedPage = {
  file: string;
  framework: Framework;
}
