import type { Metadata } from "next";
import { CountryPreparation } from "@/components/country-preparation";
export const metadata: Metadata = { title: "Canadá | Em preparação" };
export default function CanadaPage() { return <CountryPreparation country="Canadá" />; }
