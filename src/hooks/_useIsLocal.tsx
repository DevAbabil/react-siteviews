export const useIsLocal = (): boolean =>
  ["MTI3LjAuMC4x", "bG9jYWxob3N0"].includes(btoa(location.hostname));
