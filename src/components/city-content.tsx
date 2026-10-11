import Image from "next/image";
import { cityPageContent, cityCopy } from "@/content/city-page";
export function CityContent({
  city,
  county,
}: {
  city: string;
  county: string;
}) {
  return (
    <>
      {cityPageContent.photos.length > 0 && (
        <section className="mt-10" aria-label={`${city} photo gallery`}>
          <div className="grid gap-4 sm:grid-cols-2">
            {cityPageContent.photos.map((photo) => (
              <figure key={photo.src}>
                <Image
                  src={photo.src}
                  alt={cityCopy(photo.alt, city, county)}
                  width={1200}
                  height={800}
                  className="aspect-[3/2] w-full rounded-xl object-cover"
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
