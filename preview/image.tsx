/* eslint-disable @next/next/no-img-element -- Offline review has no Next image server. */
/* Static review uses the same local assets without the Next.js image server. */
import type { ImgHTMLAttributes } from "react";
export default function Image(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      src={
        typeof props.src === "string" && props.src.startsWith("/")
          ? `./public${props.src}`
          : props.src
      }
      alt={props.alt ?? ""}
    />
  );
}
