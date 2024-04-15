import { minify } from "html-minifier-terser";
import type { Config } from "../types";
import fs from "fs";
import glob from "tiny-glob";
import { resolve } from "../utils/resolve";
import { fixPath } from "../utils/path";

export const html = async (body: string, config?: Config, layout?: string, dev?: boolean) => {
  let code = "";

  if (layout && fs.existsSync(layout) && typeof layout === "string") {
    const customHtml = fs.readFileSync(layout, "utf-8");

    const cssPath = await glob(layout.replace(".html", ".{css,scss,sass,less}"), {
      filesOnly: true,
    });

    const scriptPath = await glob(layout.replace(".html", ".{ts,js}"), {
      filesOnly: true,
    });

    if (cssPath.length > 1 || scriptPath.length > 1) {
      throw new Error("Multiple CSS or script files found for the layout.");
    }

    code = customHtml;

    if (cssPath[0] && fs.existsSync(cssPath[0])) {
      code = customHtml.replace(
        "</head>",
        `<script type="module">import "${!dev ? resolve(cssPath[0]) : fixPath(resolve(cssPath[0]), config?.directory || "src/pages")}";</script></head>`
      );
    }

    if (scriptPath[0] && fs.existsSync(scriptPath[0])) {
      code = code.replace(
        "</body>",
        `<script type="module" src="${!dev ? resolve(scriptPath[0]) : fixPath(resolve(scriptPath[0]), config?.directory || "src/pages")}"></script></body>`
      );
    }

    code = code.replace("<slot />", body);
  } else {
    code = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${config?.page?.title ? config.page.title : "Vite App"}</title>
        </head>
        <body>
          ${body}
        </body>
      </html>`;
  }

  const result = await minify(code, {
    collapseWhitespace: config?.minify?.collapseWhitespace || true,
    removeComments: config?.minify?.removeComments || true,
    minifyCSS: config?.minify?.minifyCSS || true,
    minifyJS: config?.minify?.minifyJS || true,
    ...config?.minify,
  });

  return result;
};
