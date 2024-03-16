import type { Options } from "html-minifier-terser";

export type Config = {
  directory?: string;
  page?: Page;
  minify?: Options;
};

export type Page = {
  title?: string | ((file: string) => string);
}
