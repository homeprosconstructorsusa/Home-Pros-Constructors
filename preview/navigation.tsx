import { useSyncExternalStore } from "react";
function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
export function usePathname() {
  return useSyncExternalStore(subscribe, () => window.location.hash.startsWith("#/") ? window.location.hash.slice(1).split("#")[0] : "/", () => "/");
}
