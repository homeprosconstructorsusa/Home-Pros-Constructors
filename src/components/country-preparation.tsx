import Link from "next/link";
export function CountryPreparation({ country }: { country: "Brasil" | "Canadá" }) {
  return <section className="shell page-space information-page country-preparation">
    <p className="eyebrow">Home Pros Constructors</p>
    <h1 className="page-title">{country}.</h1>
    <span className="badge status-draft">Em preparação</span>
    <p className="information-lead">Este mercado está em preparação.</p>
    <p>O catálogo de licenças para {country === "Brasil" ? "o Brasil" : "o Canadá"} ainda não está disponível. As ofertas e suas condições serão apresentadas quando estiverem definidas.</p>
    <Link className="btn" href="/licenses">Conhecer as licenças nos Estados Unidos →</Link>
  </section>;
}
