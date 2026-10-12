CREATE TABLE "EditorCityOffer" (
  "id" TEXT NOT NULL,
  "courseCode" TEXT NOT NULL DEFAULT 'video-editing',
  "citySlug" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "county" TEXT NOT NULL,
  "state" TEXT NOT NULL DEFAULT 'MA',
  "priceCents" INTEGER,
  "currency" TEXT NOT NULL DEFAULT 'BRL',
  "exclusivityMonths" INTEGER,
  "scope" TEXT,
  "status" "LicenseStatus" NOT NULL DEFAULT 'DRAFT',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "EditorCityOffer_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "EditorCityOffer_courseCode_citySlug_key" ON "EditorCityOffer"("courseCode", "citySlug");
CREATE INDEX "EditorCityOffer_state_status_idx" ON "EditorCityOffer"("state", "status");
