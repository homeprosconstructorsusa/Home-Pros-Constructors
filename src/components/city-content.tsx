import { cityPageContent, cityPageOverrides, cityCopy } from "@/content/city-page";

export function CityText({ text }: { text: string }) {
  return <>{text.split("\n\n").map((block, index) => {
    const lines = block.split("\n");
    return lines.every((line) => line.startsWith("• "))
      ? <ul key={index}>{lines.map((line, position) => <li key={position}>{line.slice(2)}</li>)}</ul>
      : <p key={index} className="whitespace-pre-line">{block}</p>;
  })}</>;
}

const sectionOrder = ["O que fazemos?", "Sua atuação como licenciado", "Materiais e treinamento", "Inglês: do zero ao avançado", "Remuneração do licenciado", "Assessorias e serviços de parceiros", "Projeção comercial — sem garantia de resultado"];

export function CityContent({ slug, city, county }: { slug: string; city: string; county: string }) {
  const sections = [...cityPageContent.sections].sort((a, b) => {
    const rank = (title: string) => {
      const position = sectionOrder.indexOf(title);
      return position === -1 ? sectionOrder.length : position;
    };
    return rank(a.title) - rank(b.title);
  });
  return <>{sections.map((section) => <details className="city-info-section" key={section.title} open={section.title === "O que fazemos?"}>
    <summary><h3>{cityCopy(section.title, city, county)}</h3><span aria-hidden="true">+</span></summary>
    <div className="city-info-body"><CityText text={cityCopy(cityPageOverrides[slug]?.sectionBodies[section.title] ?? section.body, city, county)} /></div>
  </details>)}</>;
}
