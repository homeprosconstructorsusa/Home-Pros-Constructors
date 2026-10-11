/* eslint-disable @next/next/no-img-element -- Offline review has no Next image server. */
import type { ImgHTMLAttributes } from "react";
declare global {
  interface Window {
    __HOME_PROS_ASSETS?: Record<string, string>;
  }
}
// One shared Blob URL per embedded image keeps 351 albums from duplicating
// large base64 strings in the DOM. These URLs last for the document lifetime.
const assetUrls = new Map<string, string>();
function embeddedImage(path: string) {
  const cached = assetUrls.get(path);
  if (cached) return cached;
  const data = window.__HOME_PROS_ASSETS?.[path];
  if (!data) return `./public${path}`;
  const separator = data.indexOf(",");
  const mime = data.slice(5, data.indexOf(";"));
  const binary = atob(data.slice(separator + 1));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  const url = URL.createObjectURL(new Blob([bytes], { type: mime }));
  assetUrls.set(path, url);
  return url;
}
export default function Image({
  unoptimized,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { unoptimized?: boolean }) {
  const src =
    typeof props.src === "string" && props.src.startsWith("/")
      ? embeddedImage(props.src)
      : props.src;
  return <img {...props} loading={props.loading ?? (unoptimized ? "eager" : "lazy")} src={src} alt={props.alt ?? ""} />;
}
