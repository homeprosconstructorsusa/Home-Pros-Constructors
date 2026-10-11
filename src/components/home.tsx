import Link from "next/link";
import Image from "next/image";
import { StateSelector } from "./state-selector";
export function HomeContent() {
  return (
    <>
      <section className="home-hero">
        <div className="shell home-hero-grid">
          <div>
            <p className="home-kicker">Licenças exclusivas de cidades americanas</p>
            <h1 className="home-brand-title">HOME PROS CONSTRUCTORS</h1>
            <h2 className="home-headline">Trabalhe de Qualquer Lugar do Mundo<span>Seu próximo mercado está nos Estados Unidos.</span></h2>
            <p className="home-description">Trabalhe de casa e construa sua atuação no mercado americano. Represente uma cidade, conecte profissionais a soluções de marketing digital e conte com treinamento e suporte.</p>
            <p className="home-dollar">Oportunidade de ganhar em dólares com vendas ao mercado americano. Comissões e moeda de recebimento conforme contrato; resultados dependem das vendas.</p>
            <div className="home-actions">
              <Link className="btn home-primary" href="#states">Encontrar minha cidade →</Link>
              <Link className="home-secondary" href="#how-it-works">Como funciona ↗</Link>
            </div>
            <p className="home-footnote">Uma licença por cidade · Treinamento progressivo · Produção pela Home Pros</p>
          </div>
          <figure className="home-visual">
            <Image src="/photos/home/hero.png" alt="Cena ilustrativa de uma profissional trabalhando com laptop em casa, com a paisagem de Boston ao fundo." width={1536} height={1024} sizes="(min-width: 900px) 560px, 100vw" loading="eager" className="home-hero-image" />
            <figcaption className="home-visual-caption"><span>PRIMEIRO MERCADO</span><strong>Massachusetts</strong><p>351 cidades. Uma nova possibilidade para você.</p><small>Imagem ilustrativa</small></figcaption>
          </figure>
        </div>
      </section>
      <section className="shell home-benefits" aria-label="O que acompanha sua atuação">
        <div><span>01 / FLEXIBILIDADE</span><h2>Seu trabalho, de onde estiver.</h2><p>Atenda clientes à distância e organize sua rotina com orientação da Home Pros.</p></div>
        <div><span>02 / ESTRUTURA</span><h2>Você atende. Nós produzimos.</h2><p>A Home Pros executa os serviços de marketing vendidos. Você desenvolve o relacionamento com os clientes.</p></div>
        <div><span>03 / APRENDIZADO</span><h2>Comece com apoio.</h2><p>Treinamento para atendimento e materiais personalizados. Home Pros School: aulas de inglês a partir do 1º trimestre de 2027.</p></div>
      </section>
      <section id="states" className="shell py-16">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-stone-500">
          Escolha seu mercado
        </p>
        <h2 className="mt-3 text-3xl font-semibold">Comece pelo estado</h2>
        <StateSelector />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link
            href="/states/massachusetts"
            className="rounded-xl border border-stone-200 bg-white p-8 transition hover:border-[#173e33]"
          >
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-800">
              Primeiro mercado
            </span>
            <h3 className="mt-6 text-2xl font-semibold">Massachusetts →</h3>
            <p className="mt-3 text-stone-500">
              Explore as 351 páginas de cidades e as condições da licença.
            </p>
          </Link>
          <div className="rounded-xl border border-dashed border-stone-300 p-8">
            <p className="text-xs uppercase tracking-widest text-stone-500">
              Próximos passos
            </p>
            <h3 className="mt-6 text-2xl font-semibold">
              Outros estados em breve
            </h3>
            <p className="mt-3 text-stone-500">
              Somente Massachusetts está disponível nesta etapa.
            </p>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="shell home-process">
        <div className="home-process-heading"><p className="eyebrow">Um caminho claro para começar</p><h2>Da escolha da cidade ao seu próximo passo.</h2></div>
        <div className="grid gap-8 md:grid-cols-3">
        {[
          [
            "01",
            "Explore",
            "Busque a cidade e conheça a oportunidade de representação.",
          ],
          [
            "02",
            "Conheça",
            "Veja os serviços, treinamento e condições da licença.",
          ],
          [
            "03",
            "Selecione",
            "Adicione a entrada da licença ao carrinho e revise seu pedido.",
          ],
        ].map(([n, t, d]) => (
          <div key={n}>
            <p className="text-sm text-stone-500">{n}</p>
            <h3 className="mt-4 text-xl font-semibold">{t}</h3>
            <p className="mt-3 text-stone-600">{d}</p>
          </div>
        ))}
        </div>
      </section>
      <section className="shell home-closing"><div><p className="eyebrow">Conheça sua cidade de representação</p><h2>Explore o mercado. Escolha com clareza.</h2><p>Veja os cards, os serviços e as condições antes de adicionar uma licença ao carrinho.</p></div><Link href="/states/massachusetts" className="btn">Explorar Massachusetts →</Link></section>
    </>
  );
}
