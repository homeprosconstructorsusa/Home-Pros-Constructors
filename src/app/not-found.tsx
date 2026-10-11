import Link from "next/link";
export default function NotFound() {
  return (
    <section className="shell page-space">
      <p className="eyebrow">404 · Página não encontrada</p>
      <h1 className="page-title">Vamos encontrar sua cidade.</h1>
      <p className="intro">
        Esta página não existe ou a licença ainda não foi publicada.
      </p>
      <Link className="btn mt-8" href="/states/massachusetts">
        Explorar Massachusetts →
      </Link>
    </section>
  );
}
