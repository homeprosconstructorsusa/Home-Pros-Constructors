import Link from "next/link";
import Image from "next/image";
import { PageBackdrop } from "./page-backdrop";
import { StateSelector } from "./state-selector";
import { englishCourseOffer } from "@/content/english-course";
import { money } from "@/lib/license";

const categories = [
  { name: "Agência Americana de Marketing", href: "/licenses", image: "/photos/real/office.webp" },
  { name: "Edição de vídeos", href: "/courses/video-editing", image: "/photos/real/editing.webp" },
  { name: "Marketing digital", href: "#services", image: "/photos/real/professional.webp" },
  { name: "Home Pros School", href: "/courses/english", image: "/photos/real/team.webp" },
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
        {categories.map((category) => <Link href={category.href} key={category.name}><Image src={category.image} alt="" width={106} height={106} sizes="106px" /><span>{category.name}</span></Link>)}
      </nav>
      <section className="shell showcase-heading"><p className="eyebrow">Encontre seu caminho</p><h2>Seu próximo passo começa aqui.</h2><p>Representação comercial, formação e soluções para crescer.</p></section>
      <div className="home-showcase-grid">
        <section className="showcase-card showcase-license">
          <div className="showcase-copy agency-dollar-copy">
            <div className="agency-dollar-scene" aria-hidden="true">
              <Image src="/photos/real/dollars.webp" alt="" width={1600} height={1067} sizes="(min-width: 1480px) 1480px, 100vw" loading="eager" />
              <div className="agency-dollar-gradient" />
            </div>
            <div className="agency-message">
              <p className="eyebrow">Agência Americana de Marketing</p>
              <h2>Trabalhe de casa ou de qualquer lugar.<br /><span>Ganhe em dólares.</span></h2>
              <p>Conheça a proposta da Agência Americana de Marketing e as condições da licença comercial da Home Pros.</p>
              <Link href="/states/massachusetts" className="apple-text-link">Explorar cidades →</Link>
            </div>
          </div>
          <figure className="agency-work-gallery">
            <div className="agency-work-grid">
              <div className="agency-work-frame agency-home-work">
                <Image src="/photos/real/professional.webp" alt="Profissional ao computador em uma estação de trabalho." width={368} height={401} sizes="(min-width: 760px) 368px, 90vw" className="showcase-photo agency-work-photo" />
              </div>
              <div className="agency-work-frame">
                <Image src="/photos/real/office.webp" alt="Ambiente de coworking com mesas de trabalho e luz natural." width={1920} height={1272} sizes="(min-width: 1200px) 488px, (min-width: 760px) 45vw, 90vw" className="showcase-photo agency-work-photo" />
              </div>
            </div>
            <figcaption>Em casa ou em um coworking.</figcaption>
          </figure>
        </section>
        <section id="services" className="showcase-card showcase-services">
          <div className="showcase-copy"><p className="eyebrow">Marketing digital</p><h2>Você atende.<br />A Home Pros produz.</h2><p>Websites, vídeos, identidade visual e divulgação para profissionais da construção e dos serviços residenciais.</p><Link href="/cities/abington" className="apple-text-link">Veja como funciona →</Link></div>
          <Image src="/photos/real/workspace.webp" alt="Estação de trabalho com computador, mesa e iluminação natural." width={1920} height={2560} sizes="(min-width: 760px) 50vw, 100vw" className="showcase-photo" />
        </section>
        <section id="school" className="showcase-card showcase-school">
          <div className="showcase-copy"><p className="eyebrow">Home Pros School · Em breve</p><h2>Mais inglês.<br />Novas possibilidades.</h2><p>Conheça nossa escola de inglês online. Preço proposto: {money(englishCourseOffer.priceCents, englishCourseOffer.currency)}. Início das aulas do curso avançado: {englishCourseOffer.advancedCourseStart}.</p><Link href="/courses/english" className="apple-text-link">Conhecer a Home Pros School →</Link><span className="showcase-small-note">Periodicidade, acesso e condições de matrícula em definição.</span></div>
          <Image src="/photos/real/team.webp" alt="Pessoas reunidas à mesa com um laptop e materiais de trabalho." width={1920} height={2880} sizes="(min-width: 760px) 50vw, 100vw" className="showcase-photo" />
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
        <section className="showcase-card showcase-course home-final-feature">
          <div className="showcase-copy"><p className="eyebrow">Cursos · Oferta em preparação</p><h2>Edite histórias.<br />Desenvolva sua atuação.</h2><p>Curso de edição de vídeos com direito exclusivo de edição em uma cidade por 1 ano. Ou escolha o curso completo para atuar de forma independente.</p><Link href="/courses/video-editing" className="apple-text-link">Conhecer o curso →</Link><span className="showcase-small-note">Resultados e remuneração dependem das vendas e das condições contratuais.</span></div>
          <Image src="/photos/real/editing.webp" alt="Laptop com uma linha do tempo de edição de vídeos aberta." width={1920} height={2880} sizes="(min-width: 1200px) 1180px, 100vw" className="showcase-photo" />
        </section>
    </div>
  );
}
