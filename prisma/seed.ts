import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import municipalities from "../src/data/massachusetts.json";
import { videoCourseOffers } from "../src/content/video-course";
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
  await db.editorCityOffer.createMany({
    data: municipalities.map((m) => ({ courseCode: "video-editing", citySlug: m.slug, city: m.name, county: m.county, state: "MA", status: "DRAFT" as const, priceCents: videoCourseOffers.city.priceCents, currency: videoCourseOffers.city.currency, exclusivityMonths: videoCourseOffers.city.exclusivityMonths, scope: videoCourseOffers.city.scope })),
    skipDuplicates: true,
  });
  await db.editorCityOffer.updateMany({
    where: { courseCode: "video-editing", status: "DRAFT", priceCents: null, exclusivityMonths: null, scope: null },
    data: { priceCents: videoCourseOffers.city.priceCents, exclusivityMonths: videoCourseOffers.city.exclusivityMonths, scope: videoCourseOffers.city.scope },
  });
  console.log("Prepared 351 separate editor offers as drafts; existing offers preserved.");
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
