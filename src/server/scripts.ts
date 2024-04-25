import type { Params } from ".";

export const scripts = {
  refreshRuntime: `import RefreshRuntime from '/@react-refresh'
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true`,

  dev(params: Params) {
    return `window.__multip__ = {
  root: "${params.root}",
  frameworks: ${JSON.stringify(params.frameworks)},
  config: ${JSON.stringify(params.config)}
};`
  }
};
