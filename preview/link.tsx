import type { AnchorHTMLAttributes } from "react";
export default function Link({
  href,
  children,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      {...props}
      href={href.startsWith("/") ? `#${href}` : href}
      onClick={(event) => {
        onClick?.(event);
        if (href.startsWith("#")) {
          event.preventDefault();
          document
            .getElementById(href.slice(1))
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      {children}
    </a>
  );
}
