import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { isDemoMode } from "@/lib/catalog";
import "./globals.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: {
    default: "Home Pros Constructors | Licenças de cidades",
    template: "%s | Home Pros Constructors",
  },
  description:
    "Conheça as licenças de uso das 351 cidades de Massachusetts com a Home Pros Constructors.",
  robots: { index: false, follow: false },
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
