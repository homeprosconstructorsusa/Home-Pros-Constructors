export type LicenseStatus = "DRAFT" | "AVAILABLE" | "RESERVED" | "SOLD";
export type CityLicense = {
  slug: string;
  city: string;
  state: string;
  county: string;
  kind: string;
  geoid: string;
  description: string | null;
  depositCents: number | null;
  totalPriceCents: number | null;
  installmentCount: number | null;
  currency: string;
  status: LicenseStatus;
};
export function money(cents: number, currency = "BRL") {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(
    cents / 100,
  );
}
export const statusLabels: Record<LicenseStatus, string> = {
  DRAFT: "Não publicada",
  AVAILABLE: "Disponível",
  RESERVED: "Reservada",
  SOLD: "Vendida",
};
export function isPurchasable(license: CityLicense) {
  return (
    license.status === "AVAILABLE" &&
    license.depositCents !== null &&
    license.totalPriceCents !== null &&
    license.installmentCount !== null &&
    license.depositCents >= 0 &&
    license.totalPriceCents >= license.depositCents &&
    license.installmentCount > 0
  );
}
export function installments(license: CityLicense) {
  if (
    license.totalPriceCents === null ||
    license.depositCents === null ||
    !license.installmentCount
  )
    return null;
  const balanceCents = license.totalPriceCents - license.depositCents;
  const regularCents = Math.floor(balanceCents / license.installmentCount);
  return {
    balanceCents,
    count: license.installmentCount,
    regularCents,
    finalCents: balanceCents - regularCents * (license.installmentCount - 1),
  };
}
