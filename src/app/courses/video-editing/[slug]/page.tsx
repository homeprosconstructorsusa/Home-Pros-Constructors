import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEditorCityOffer } from "@/lib/editor-offers";
import { EditorCityOfferPage } from "@/components/editor-city-offer";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getEditorCityOffer(slug);
  return { title: offer ? `Curso de edição e direito em ${offer.city}` : "Cidade não encontrada" };
}
export default async function EditorCity({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = await getEditorCityOffer(slug);
  if (!offer) notFound();
  return <EditorCityOfferPage offer={offer} />;
}
