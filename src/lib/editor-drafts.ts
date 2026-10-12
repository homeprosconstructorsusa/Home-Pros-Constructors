import { videoCourseOffers } from "@/content/video-course";
import municipalities from "@/data/massachusetts.json";
import type { LicenseStatus } from "./license";

export type EditorCityOffer = {
  citySlug: string; city: string; county: string; priceCents: number | null;
  currency: string; exclusivityMonths: number | null; scope: string | null; status: LicenseStatus;
};
export function editorDraft(slug: string): EditorCityOffer | undefined {
  const city = municipalities.find((m) => m.slug === slug);
  return city && { citySlug: city.slug, city: city.name, county: city.county, priceCents: videoCourseOffers.city.priceCents, currency: videoCourseOffers.city.currency, exclusivityMonths: videoCourseOffers.city.exclusivityMonths, scope: videoCourseOffers.city.scope, status: "DRAFT" };
}
