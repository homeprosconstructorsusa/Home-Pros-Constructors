ALTER TABLE "CityLicense" RENAME COLUMN "priceCents" TO "depositCents";
ALTER TABLE "CityLicense" ADD COLUMN "totalPriceCents" INTEGER;
ALTER TABLE "CityLicense" ADD COLUMN "installmentCount" INTEGER;
ALTER TABLE "CityLicense" ALTER COLUMN "currency" SET DEFAULT 'BRL';
ALTER TABLE "CityLicense" ADD CONSTRAINT "CityLicense_payment_terms" CHECK (
 ("totalPriceCents" IS NULL OR "totalPriceCents" >= 0)
 AND ("installmentCount" IS NULL OR "installmentCount" > 0)
 AND ("depositCents" IS NULL OR "totalPriceCents" IS NULL OR "totalPriceCents" >= "depositCents")
);
