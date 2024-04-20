import { minify } from "html-minifier-terser";
import type { Config } from "../types";
import fs from "fs";
import { resolve } from "../utils/resolve";
import { getLayoutByType } from "../utils/layouts";
import { fixPath } from "../utils/path";

export const html = async (
  body: string,
  file: string,
  config?: Config,
  layout?: string,
  dev?: boolean
) => {
  let code = "";

  if (layout && fs.existsSync(layout) && typeof layout === "string") {
    code = fs.readFileSync(layout, "utf-8");

    code = code.replace("<slot />", body);
  } else if (fs.existsSync(resolve("index.html"))) {
    const content = fs.readFileSync(resolve("index.html"), "utf-8");

    code = content.replace("<slot />", body);

    if (code === content) {
      code = code.replace("</body>", `${body}</body>`);
    }
  } else {
    code = "";
  }

  if (!code) {
    // Catch-all for when no index.html is found
    // Pretty rare case, because without the index.html the dev mode dosn't work

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

  const cssPath = await getLayoutByType(file, "{css,scss,sass,less}");
  const scriptPath = await getLayoutByType(file, "{ts,js}");

  if (cssPath) {
    code = code.replace(
      "</head>",
      `<script type="module">import "${!dev ? resolve(cssPath) : fixPath(resolve(cssPath), config?.directory || "src/pages")}";</script></head>`
    )
  }

  if (scriptPath) {
    code = code.replace(
      "</body>",
      `<script type="module">import "${!dev ? resolve(scriptPath) : fixPath(resolve(scriptPath), config?.directory || "src/pages")}";</script></body>`
    )
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
