import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPartnershipCity } from "@/lib/partnerships";
import { CityPartnershipPage } from "@/components/partnership-pages";
import { isDemoMode } from "@/lib/catalog";
type Props = { params: Promise<{ state: string; slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, slug } = await params;
  const city = getPartnershipCity(state, slug, isDemoMode());
  return { title: city ? `Parceria em ${city.name}, ${city.stateName}` : "Cidade não encontrada" };
}
export default async function PartnershipCity({ params }: Props) {
  const { state, slug } = await params;
  const city = getPartnershipCity(state, slug, isDemoMode());
  if (!city) notFound();
  return <CityPartnershipPage city={city} />;
}
