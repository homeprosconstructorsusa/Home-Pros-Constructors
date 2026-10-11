import municipalities from "@/data/massachusetts.json";
import type { CityLicense } from "./license";
// Boston payment model supplied by the owner. Applying it to all cities and the two unavailable statuses are for design review only.
export const demoCatalog: CityLicense[] = municipalities.map((m) => ({
  slug: m.slug,
  city: m.name,
  state: "MA",
  county: m.county,
  kind: m.kind,
  geoid: m.geoid,
  description: null,
  depositCents: 99700,
  totalPriceCents: 348500,
  installmentCount: 18,
  currency: "BRL",
  status:
    m.slug === "chelmsford"
      ? "RESERVED"
      : m.slug === "worcester"
        ? "SOLD"
        : "AVAILABLE",
}));
