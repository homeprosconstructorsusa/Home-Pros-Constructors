/* eslint-disable @next/next/no-img-element -- Offline review has no Next image server. */
import type { ImgHTMLAttributes } from "react";
declare global {
  interface Window {
    __HOME_PROS_ASSETS?: Record<string, string>;
  }
}
export default function Image({
  unoptimized,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { unoptimized?: boolean }) {
  const src =
    typeof props.src === "string" && props.src.startsWith("/")
      ? (window.__HOME_PROS_ASSETS?.[props.src] ?? `./public${props.src}`)
      : props.src;
  return <img {...props} loading={props.loading ?? (unoptimized ? "eager" : "lazy")} src={src} alt={props.alt ?? ""} />;
}
