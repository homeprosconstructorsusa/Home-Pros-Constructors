import { test } from "node:test";
import assert from "node:assert/strict";
import { getPartnershipCities } from "../src/lib/partnerships";
import { demoCityPartnershipContacts, type CityPartnershipContact } from "../src/content/partnerships";

test("local partnerships require an open operator with a usable contact, independently of license inventory", () => {
  const base: CityPartnershipContact = { stateSlug: "massachusetts", citySlug: "abington", responsibleName: "Test operator", contactHref: "https://example.invalid/contact", acceptingPartnerships: true };
  const cities = getPartnershipCities([
    base,
    { ...base, citySlug: "worcester" },
    { ...base, citySlug: "boston", acceptingPartnerships: false },
    { ...base, citySlug: "cambridge", responsibleName: " " },
    { ...base, citySlug: "salem", contactHref: "javascript:alert(1)" },
    { ...base, citySlug: "does-not-exist" },
    { ...base, citySlug: "acton", contactHref: null },
  ]);
  assert.deepEqual(cities.filter((city) => city.contact).map((city) => city.slug), ["abington", "worcester"]);
  assert.equal(cities.length, 351);
});

test("fictional city contacts are available only in preview mode", () => {
  assert.equal(getPartnershipCities(demoCityPartnershipContacts).filter((city) => city.contact).length, 0);
  const previewCities = getPartnershipCities([], true).filter((city) => city.contact);
  assert.deepEqual(previewCities.map((city) => city.slug), ["abington", "boston", "cambridge"]);
  assert.ok(previewCities.every((city) => city.contact?.demonstration && city.contact.contactHref === null));
});
