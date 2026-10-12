import Link from "next/link";
import type { PartnershipCity } from "@/lib/partnerships";
import { DemoPartnershipContact } from "./demo-partnership-contact";

export function PartnershipPage() {
  return <section className="shell page-space information-page">
    <p className="eyebrow">Parceria Home Pros</p><h1 className="page-title">Vamos trabalhar juntos.</h1>
    <p className="information-lead">Escolha com quem você quer fazer parceria.</p>
    <div className="information-grid license-overview-grid">
      <Link className="information-card" href="/partnership/company"><h2>Com a Home Pros Constructors</h2><p>Converse com a empresa sobre uma proposta de parceria geral.</p><strong>Conhecer esse caminho →</strong></Link>
      <Link className="information-card" href="/partnership/cities"><h2>Com o responsável por uma cidade</h2><p>Escolha o estado e a cidade para consultar as parcerias locais e seus responsáveis.</p><strong>Escolher estado e cidade →</strong></Link>
    </div>
  </section>;
}

export function CompanyPartnershipPage({ demo = false }: { demo?: boolean }) {
  return <section className="shell page-space information-page">
    <Link className="back-link" href="/partnership">← Opções de parceria</Link>
    <p className="eyebrow">Parceria com a empresa</p><h1 className="page-title">Home Pros Constructors.</h1>
    <p className="information-lead">Apresente sua proposta à Home Pros.</p>
    <p>Para uma parceria geral com a empresa, conheça nossos canais oficiais e entre em contato pelo canal de sua preferência. As condições de uma parceria serão definidas conforme a proposta.</p>
    <div className="partnership-callout"><h2>Contato institucional</h2><p>Os perfis oficiais de Instagram, Facebook e YouTube já estão disponíveis. E-mail, telefone e um formulário específico de parceria ainda estão em preparação.</p>{demo && <DemoPartnershipContact target="Home Pros Constructors" />}<Link className="apple-text-link" href="/contact">Ver canais oficiais →</Link></div>
    <Link className="apple-text-link" href="/partnership/cities">Prefere uma parceria local? Escolha a cidade →</Link>
  </section>;
}

export function CityPartnershipPage({ city }: { city: PartnershipCity }) {
  const contact = city.contact;
  return <section className="shell page-space information-page">
    <Link className="back-link" href="/partnership/cities">← Escolher outra cidade</Link>
    <p className="eyebrow">Parceria local · {city.stateName}</p><h1 className="page-title">{city.name}.</h1>
    <p className="information-lead">Parceria com a operação Home Pros em {city.name}.</p>
    <div className="partnership-callout">
      <span className={`badge ${contact ? "status-available" : "status-draft"}`}>{contact ? `Aberta a parceiros${contact.demonstration ? " · Demonstração" : ""}` : "Em preparação"}</span>
      {contact ? <><h2>{contact.responsibleName}</h2><p>{contact.demonstration ? "Responsável e contato fictícios para aprovação do fluxo de parceria." : `Responsável pela operação local em ${city.name}, ${city.stateName}. Utilize o canal publicado para apresentar sua proposta diretamente.`}</p>{contact.demonstration ? <DemoPartnershipContact target={`${city.name}, ${city.stateName}`} /> : <a className="btn" href={contact.contactHref!} target={contact.contactHref!.startsWith("https:") ? "_blank" : undefined} rel="noopener noreferrer">Falar com o responsável →</a>}</> : <><h2>Contato do responsável em preparação</h2><p>Ainda não há um responsável e um canal de parceria publicados para esta cidade. A opção de contato direto aparecerá quando essas informações forem confirmadas.</p><Link className="btn" href="/partnership/company">Conhecer a parceria com a Home Pros →</Link></>}
    </div>
    <p>A disponibilidade de parceria local é própria dessa operação. A compra de uma licença e a matrícula em um curso têm condições separadas.</p>
  </section>;
}
