import Image from "next/image";
import { cityPageContent, cityCopy } from "@/content/city-page";
export function CityContent({
  city,
  county,
  slug,
}: {
  city: string;
  county: string;
  slug: string;
}) {
  const photos = cityPageContent.photosByCity[slug] ?? [];
  return (
    <>
      {photos.length > 0 && (
        <section className="mt-10" aria-label={`Imagens de ${city}`}>
          <div className="grid gap-4 sm:grid-cols-2">
            {photos.map((photo) => (
              <figure key={photo.src}>
                <Image
                  src={photo.src}
                  alt={cityCopy(photo.alt, city, county)}
                  width={1122}
                  height={1402}
                  sizes="(min-width: 900px) 320px, (min-width: 640px) 45vw, 100vw"
                  className="h-auto w-full rounded-xl"
                />
                {photo.caption && (
                  <figcaption className="mt-2 text-sm text-stone-500">
                    {cityCopy(photo.caption, city, county)}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}
      {cityPageContent.sections.map((section) => (
        <section className="mt-10" key={section.title}>
          <h2 className="text-2xl font-semibold">
            {cityCopy(section.title, city, county)}
          </h2>
          <p className="mt-4 whitespace-pre-line leading-8 text-stone-600">
            {cityCopy(section.body, city, county)}
          </p>
        </section>
      ))}
    </>
  );
}
