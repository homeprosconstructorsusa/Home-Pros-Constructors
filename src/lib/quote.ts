import type { CityLicense } from "./license";
import { isPurchasable } from "./license";
export function quoteCart(slugs: string[], catalog: CityLicense[]) {
  const unique = [...new Set(slugs)];
  const items = unique.map((slug) => {
    const license = catalog.find((city) => city.slug === slug);
    return {
      slug,
      license: license ?? null,
      available: Boolean(
        license && isPurchasable(license) && license.currency === "BRL",
      ),
    };
  });
  const depositTotalCents = items.reduce(
    (sum, item) => sum + (item.available ? item.license!.depositCents! : 0),
    0,
  );
  const contractTotalCents = items.reduce(
    (sum, item) => sum + (item.available ? item.license!.totalPriceCents! : 0),
    0,
  );
  return {
    items,
    depositTotalCents,
    contractTotalCents,
    remainingBalanceCents: contractTotalCents - depositTotalCents,
    currency: "BRL",
    valid: items.length > 0 && items.every((item) => item.available),
  };
}
