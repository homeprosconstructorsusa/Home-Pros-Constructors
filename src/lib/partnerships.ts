import municipalities from "@/data/massachusetts.json";
import { cityPartnershipContacts, demoCityPartnershipContacts, type CityPartnershipContact } from "@/content/partnerships";

// Reuse approved geographic data; other states can be registered later.
export const partnershipRegions = [{ slug: "massachusetts", name: "Massachusetts", cities: municipalities }];
export type PartnershipCity = {
  slug: string;
  name: string;
  county: string;
  stateSlug: string;
  stateName: string;
  contact: CityPartnershipContact | null;
};
function hasUsableContact(contact: CityPartnershipContact, demo: boolean) {
  if (!contact.acceptingPartnerships || !contact.responsibleName.trim()) return false;
  if (contact.demonstration) return demo;
  if (!contact.contactHref) return false;
  try {
    const url = new URL(contact.contactHref);
    return url.protocol === "https:" || ((url.protocol === "mailto:" || url.protocol === "tel:") && !!url.pathname.trim());
  } catch { return false; }
}
export function getPartnershipCities(contacts: CityPartnershipContact[] = cityPartnershipContacts, demo = false): PartnershipCity[] {
  const visibleContacts = demo ? [...contacts, ...demoCityPartnershipContacts] : contacts;
  return partnershipRegions.flatMap((region) => region.cities.map((city) => ({
    slug: city.slug, name: city.name, county: city.county,
    stateSlug: region.slug, stateName: region.name,
    contact: visibleContacts.find((contact) => contact.stateSlug === region.slug && contact.citySlug === city.slug && hasUsableContact(contact, demo)) ?? null,
  })));
}
export function getPartnershipCity(stateSlug: string, citySlug: string, demo = false) {
  return getPartnershipCities(undefined, demo).find((city) => city.stateSlug === stateSlug && city.slug === citySlug);
}
