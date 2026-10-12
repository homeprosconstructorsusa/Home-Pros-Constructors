// Publish only city contacts explicitly supplied and approved by the owner.
// This availability is independent of the commercial license inventory.
export type CityPartnershipContact = {
  stateSlug: string;
  citySlug: string;
  responsibleName: string;
  contactHref: string | null;
  acceptingPartnerships: boolean;
  demonstration?: boolean;
};
export const cityPartnershipContacts: CityPartnershipContact[] = [];
// Fictional contacts authorized for the private preview, never live inventory.
export const demoCityPartnershipContacts: CityPartnershipContact[] = ["abington", "boston", "cambridge"].map((citySlug) => ({
  stateSlug: "massachusetts", citySlug,
  responsibleName: `Responsável demonstrativo de ${citySlug[0].toUpperCase() + citySlug.slice(1)}`,
  contactHref: null, acceptingPartnerships: true, demonstration: true,
}));
