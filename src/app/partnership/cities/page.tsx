import type { Metadata } from "next";
import { PartnershipCityBrowser } from "@/components/partnership-city-browser";
import { isDemoMode } from "@/lib/catalog";
export const metadata: Metadata = { title: "Parceria por estado e cidade" };
export default function PartnershipCities() { return <PartnershipCityBrowser demo={isDemoMode()} />; }
