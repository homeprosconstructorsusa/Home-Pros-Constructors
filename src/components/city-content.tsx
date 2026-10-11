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
