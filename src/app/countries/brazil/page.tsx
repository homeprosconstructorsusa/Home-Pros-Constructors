import type { Metadata } from "next";
import { CountryPreparation } from "@/components/country-preparation";
export const metadata: Metadata = { title: "Brasil | Em preparação" };
export default function BrazilPage() { return <CountryPreparation country="Brasil" />; }
