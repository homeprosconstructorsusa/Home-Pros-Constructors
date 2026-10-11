import type { Metadata } from "next";
import { Cart } from "@/components/cart";
import { getCatalog, isDemoMode } from "@/lib/catalog";
export const metadata: Metadata = { title: "Seu carrinho" };
export const dynamic = "force-dynamic";
export default async function CartPage() {
  return <Cart catalog={await getCatalog()} demo={isDemoMode()} />;
}
