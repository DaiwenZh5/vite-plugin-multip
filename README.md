# vite-plugin-multip

The `vite-plugin-multip` plugin enables you to create multi-page applications with Vite!

- 📦 Automatic CSS file importing
- 🧬 Layouts support
- 🔎 Framework recognition
- 📝 Markdown support
- 🥏 Multi-Framework support

# Installation

```bash
npm install vite-plugin-multip
```
*Alternatively, you can use your favorite package manager.*

After installing the plugin, proceed with initialization in the `vite.config.ts` file:

```typescript
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { multip } from "vite-plugin-multip";

export default defineConfig({
  plugins: [
    svelte(),
    multip(), // Optional configuration parameters can be passed here
  ],
});
```
> [!NOTE] 
> In the above example, the Svelte adapter is used, but the plugin also automatically supports Vue and React.

Now, let's start by creating the appropriate directories:

```bash
src/
  pages/
    index.(svelte|tsx|vue)
    subroute/
       index.(svelte|tsx|vue)
```

Remove useful imports in `index.html` (required):

```diff&html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite + Svelte + TS</title>
</head>
<body>
  <div id="app"></div>
- <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

Now, build:

```bash
npm run build
```

> [!NOTE]
> The `dist/` directory can be directly integrated with your backend without modification.

# Framework Support

| Framework | Support |
| --------- | ------- |
| React     | Yes     |
| Vue       | Yes     |
| Svelte    | Yes     |
