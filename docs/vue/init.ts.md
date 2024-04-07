# `init.ts`

The `init.ts` file allows you to perform initialization tasks for the Vue application in a centralized manner. This documentation illustrates how to use the `init.ts`. It works only for vue.js

## Usage

The `init.ts` file exports an `init` function that accepts an `App` parameter from Vue import. This function can be used to execute any initialization operations necessary for the application.

### Example of `init.ts`

```typescript
import type { App } from 'vue'

/**
 * @param app Vue application instance.
 */
export const init = (app: App<Element>) => {
  // Perform initialization tasks here
}
```

This can be used for use external libraries in your vue project
