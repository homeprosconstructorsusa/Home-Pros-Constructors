import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const [slug, status, deposit, total, months] = process.argv.slice(2);
const statuses = ["DRAFT", "AVAILABLE", "RESERVED", "SOLD"] as const;
const validNumber = (value: string | undefined) =>
  value === undefined ||
  (/^\d+$/.test(value) &&
    Number.isSafeInteger(Number(value)) &&
    Number(value) <= 2147483647);
if (
  !slug ||
  !statuses.includes(status as (typeof statuses)[number]) ||
  ![deposit, total, months].every(validNumber)
)
  throw new Error(
    "Usage: npm run catalog:set -- city-slug DRAFT|AVAILABLE|RESERVED|SOLD [deposit-cents total-cents months]. Currency BRL.",
  );
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});
async function main() {
  const existing = await db.cityLicense.findUniqueOrThrow({ where: { slug } });
  const depositCents =
    deposit === undefined ? existing.depositCents : Number(deposit);
  const totalPriceCents =
    total === undefined ? existing.totalPriceCents : Number(total);
  const installmentCount =
    months === undefined ? existing.installmentCount : Number(months);
  if (
    status === "AVAILABLE" &&
    (depositCents === null ||
      totalPriceCents === null ||
      installmentCount === null ||
      totalPriceCents < depositCents ||
      installmentCount < 1)
  )
    throw new Error(
      "An available license needs valid confirmed deposit, total price and installment count",
    );
  const updated = await db.cityLicense.update({
    where: { slug },
    data: {
      status: status as (typeof statuses)[number],
      depositCents,
      totalPriceCents,
      installmentCount,
      currency: "BRL",
    },
  });
  console.log(
    `${updated.city}: ${updated.status}; entry ${updated.depositCents ?? "pending"} cents. Demo catalog is unaffected.`,
  );
}
main()
  .finally(() => db.$disconnect())
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
