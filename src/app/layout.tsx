import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { isDemoMode } from "@/lib/catalog";
import "./globals.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: {
    default: "Home Pros Constructors | Agência Americana de Marketing",
    template: "%s | Home Pros Constructors",
  },
  description:
    "Conheça as licenças de uso das 351 cidades de Massachusetts com a Home Pros Constructors.",
  robots: { index: false, follow: false },
  icons: {
    icon: [{ url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" }, { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" }],
    apple: [{ url: "/icons/icon-180.png", sizes: "180x180", type: "image/png" }],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteShell demo={isDemoMode()}>{children}</SiteShell>
      </body>
    </html>
  );
}
