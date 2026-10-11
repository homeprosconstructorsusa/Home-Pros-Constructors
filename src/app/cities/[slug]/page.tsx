import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCity, isDemoMode } from "@/lib/catalog";
import { CityDetail } from "@/components/city-detail";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = await getCity(slug);
  return { title: city ? `Licença de ${city.city}` : "Cidade não encontrada" };
}
export default async function City({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const license = await getCity(slug);
  if (!license) notFound();
  return <CityDetail license={license} demo={isDemoMode()} />;
}
