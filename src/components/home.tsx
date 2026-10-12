import Link from "next/link";
import Image from "next/image";
import { PageBackdrop } from "./page-backdrop";
import { StateSelector } from "./state-selector";

const categories = [
  { name: "Licenças de cidades", href: "#states", image: "/photos/backgrounds/home-liberty.png" },
  { name: "Edição de vídeos", href: "/courses/video-editing", image: "/photos/courses/editing.png" },
  { name: "Marketing digital", href: "#services", image: "/photos/home/hero.png" },
  { name: "Home Pros School", href: "#school", image: "/photos/courses/school.png" },
];

export function HomeContent() {
  return (
    <div className="apple-home">
      <section className="home-hero page-scene apple-hero">
        <PageBackdrop scene="home" />
        <div className="shell home-hero-grid">
          <div className="apple-hero-copy">
            <h1 className="home-brand-title">HOME PROS CONSTRUCTORS</h1>
            <h2 className="home-headline">Trabalhe de Qualquer Lugar do Mundo<span>Uma cidade. Muitas possibilidades.</span></h2>
            <p className="home-description">Conecte-se ao mercado americano com treinamento, materiais e suporte para desenvolver sua atuação.</p>
            <div className="home-actions"><Link className="btn" href="#states">Encontrar minha cidade →</Link><Link className="apple-text-link" href="/courses/video-editing">Conhecer os cursos →</Link></div>
            <p className="home-footnote">Massachusetts · 351 cidades e municípios</p>
          </div>
        </div>
      </section>
      <nav className="shell home-category-nav" aria-label="Categorias da Home Pros">
        {categories.map((category) => <Link href={category.href} key={category.name}><Image src={category.image} alt="" width={90} height={90} sizes="90px" /><span>{category.name}</span></Link>)}
      </nav>
      <section className="shell showcase-heading"><p className="eyebrow">Encontre seu caminho</p><h2>Seu próximo passo começa aqui.</h2><p>Representação comercial, formação e soluções para crescer.</p></section>
      <div className="home-showcase-grid">
        <section className="showcase-card showcase-course">
          <div className="showcase-copy"><p className="eyebrow">Cursos · Oferta em preparação</p><h2>Edite histórias.<br />Desenvolva sua atuação.</h2><p>Curso de edição de vídeos com direito exclusivo de edição em uma cidade por 1 ano. Ou escolha o curso completo para atuar de forma independente.</p><Link href="/courses/video-editing" className="apple-text-link">Conhecer o curso →</Link></div>
          <Image src="/photos/courses/editing.png" alt="Cena ilustrativa de um editor trabalhando com vídeos em dois monitores." width={1672} height={941} sizes="(min-width: 760px) 50vw, 100vw" className="showcase-photo" />
        </section>
        <section className="showcase-card showcase-license">
          <div className="showcase-copy"><p className="eyebrow">Licenças de cidades</p><h2>Uma cidade.<br />Seu próximo mercado.</h2><p>Conheça a licença comercial da Home Pros e as condições para representar uma cidade.</p><Link href="/states/massachusetts" className="apple-text-link">Explorar cidades →</Link></div>
          <Image src="/photos/backgrounds/home-liberty.png" alt="Imagem ilustrativa da Estátua da Liberdade e da paisagem de Nova York ao pôr do sol." width={1672} height={941} sizes="(min-width: 760px) 50vw, 100vw" className="showcase-photo" />
        </section>
        <section id="services" className="showcase-card showcase-services">
          <div className="showcase-copy"><p className="eyebrow">Marketing digital</p><h2>Você atende.<br />A Home Pros produz.</h2><p>Websites, vídeos, identidade visual e divulgação para profissionais da construção e dos serviços residenciais.</p><Link href="/cities/abington" className="apple-text-link">Veja como funciona →</Link></div>
          <Image src="/photos/home/hero.png" alt="Cena ilustrativa de uma profissional trabalhando de casa com laptop." width={1536} height={1024} sizes="(min-width: 760px) 50vw, 100vw" className="showcase-photo" />
        </section>
        <section id="school" className="showcase-card showcase-school">
          <div className="showcase-copy"><p className="eyebrow">Home Pros School · Em breve</p><h2>Mais inglês.<br />Novas possibilidades.</h2><p>Conheça nossa escola de inglês. Início das aulas do curso avançado: 1º trimestre de 2027.</p><span className="showcase-small-note">Informações sobre matrículas serão apresentadas nesta área.</span></div>
          <Image src="/photos/courses/school.png" alt="Cena ilustrativa de dois adultos estudando online com laptop e caderno." width={1672} height={941} sizes="(min-width: 760px) 50vw, 100vw" className="showcase-photo" />
        </section>
      </div>
      <div className="page-scene home-states-scene">
        <PageBackdrop scene="market" />
        <section id="states" className="shell apple-states">
          <p className="eyebrow">Escolha seu mercado</p><h2>Comece por Massachusetts.</h2><p>351 cidades. Conheça as artes, os serviços e as condições de cada licença.</p>
          <StateSelector />
          <div className="state-feature-grid"><Link href="/states/massachusetts"><strong>Massachusetts →</strong><span>Explore o catálogo de licenças de cidades.</span></Link><div><strong>Outros estados em breve</strong><span>Massachusetts é o primeiro estado nesta etapa.</span></div></div>
        </section>
      </div>
      <section id="how-it-works" className="shell home-process">
        <div className="home-process-heading"><p className="eyebrow">Um caminho claro</p><h2>Explore. Conheça. Escolha.</h2></div>
        <div className="grid gap-8 md:grid-cols-3">
          {[ ["01", "Explore", "Escolha entre as licenças comerciais e a formação em edição de vídeos."], ["02", "Conheça", "Leia os serviços, a formação e as condições específicas de cada oferta."], ["03", "Escolha", "Revise a cidade e os valores. A prévia ainda não cobra pagamentos."] ].map(([number, title, description]) => <div key={number}><p className="eyebrow">{number}</p><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-3 text-stone-600">{description}</p></div>)}
        </div>
      </section>
      <section className="shell home-closing"><div><p className="eyebrow">Desenvolva sua atuação</p><h2>Oportunidade com estrutura.</h2><p>Trabalhe de casa, atenda o mercado americano e conte com treinamento e suporte. Resultados e remuneração dependem das vendas e das condições contratuais.</p></div><Link href="/courses/video-editing" className="btn">Conhecer edição de vídeos →</Link></section>
    </div>
  );
}
