import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import municipalities from "../src/data/massachusetts.json";
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});
async function main() {
  for (const m of municipalities) {
    // Rerunning does not overwrite business prices, descriptions or statuses.
    await db.cityLicense.upsert({
      where: { slug: m.slug },
      update: {},
      create: {
        slug: m.slug,
        city: m.name,
        state: "MA",
        county: m.county,
        kind: m.kind,
        geoid: m.geoid,
        status: "DRAFT",
        depositCents: null,
      },
    });
  }
  console.log(
    `Seeded ${municipalities.length} Massachusetts municipalities as drafts; existing records preserved.`,
  );
}
main()
  .finally(() => db.$disconnect())
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
