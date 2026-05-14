// Client-side shim for `startInstance` so the generated types that import
// `start.ts` remain satisfied even when SSR is removed. This file intentionally
// does not create a server or export a runtime `fetch` handler.

export const startInstance = {
  getOptions: async () => ({})
};
