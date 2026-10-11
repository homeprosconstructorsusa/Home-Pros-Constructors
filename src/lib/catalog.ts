import type { CityLicense } from "./license";
import { demoCatalog } from "./demo-catalog";
export function isDemoMode() {
  return process.env.CATALOG_MODE === "demo";
}
export async function getCatalog(): Promise<CityLicense[]> {
  if (isDemoMode()) return demoCatalog;
  const { getDb } = await import("./db");
  return getDb().cityLicense.findMany({
    where: { state: "MA", status: { not: "DRAFT" } },
    orderBy: { city: "asc" },
  });
}
export async function getCity(slug: string) {
  return (await getCatalog()).find((city) => city.slug === slug);
}
