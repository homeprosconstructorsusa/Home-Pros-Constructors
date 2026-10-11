CREATE TYPE "LicenseStatus" AS ENUM ('DRAFT', 'AVAILABLE', 'RESERVED', 'SOLD');
CREATE TABLE "CityLicense" (
 "id" TEXT NOT NULL,
 "slug" TEXT NOT NULL,
 "city" TEXT NOT NULL,
 "county" TEXT NOT NULL,
 "kind" TEXT NOT NULL,
 "geoid" TEXT NOT NULL,
 "state" TEXT NOT NULL DEFAULT 'MA',
 "description" TEXT,
 "priceCents" INTEGER,
 "currency" TEXT NOT NULL DEFAULT 'USD',
 "status" "LicenseStatus" NOT NULL DEFAULT 'DRAFT',
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updatedAt" TIMESTAMP(3) NOT NULL,
 CONSTRAINT "CityLicense_pkey" PRIMARY KEY ("id"),
 CONSTRAINT "CityLicense_price_nonnegative" CHECK ("priceCents" IS NULL OR "priceCents" >= 0)
);
CREATE UNIQUE INDEX "CityLicense_slug_key" ON "CityLicense"("slug");
CREATE UNIQUE INDEX "CityLicense_state_city_key" ON "CityLicense"("state", "city");
CREATE INDEX "CityLicense_state_status_idx" ON "CityLicense"("state", "status");
CREATE UNIQUE INDEX "CityLicense_geoid_key" ON "CityLicense"("geoid");
