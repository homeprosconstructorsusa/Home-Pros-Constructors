"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="shell py-16">
      <h1 className="text-3xl font-semibold">
        O catálogo está temporariamente indisponível
      </h1>
      <p className="my-5">Tente novamente em instantes.</p>
      <button className="btn" onClick={reset}>
        Tentar novamente
      </button>
    </section>
  );
}
