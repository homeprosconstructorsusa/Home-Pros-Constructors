import type { Metadata } from "next";
import { getCatalog, isDemoMode } from "@/lib/catalog";
import { CatalogBrowser } from "@/components/catalog-browser";
export const metadata: Metadata = {
  title: "Licenças das cidades de Massachusetts",
};
export const dynamic = "force-dynamic";
export default async function Massachusetts() {
  return <CatalogBrowser catalog={await getCatalog()} demo={isDemoMode()} />;
}
