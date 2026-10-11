import Link from "next/link";
import { StateSelector } from "./state-selector";
export function HomeContent() {
  return (
    <>
      <section className="bg-[#102c28] text-white">
        <div className="shell grid gap-12 py-20 md:grid-cols-[1.3fr_1fr] md:py-28">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[.25em] text-[#d5c29b]">
              Home Pros Constructors · Licenças de cidades
            </p>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-tight md:text-7xl">
              Sua cidade.
              <br />
              <span className="text-[#d5c29b]">Seu próximo negócio.</span>
            </h1>
            <p className="my-8 max-w-lg text-lg leading-8 text-stone-300">
              Trabalhe de casa representando a Home Pros Constructors. Conecte
              companhias da construção e de serviços residenciais a soluções de
              marketing digital, com treinamento e suporte.
            </p>
            <Link className="btn !bg-[#d5c29b] !text-[#102c28]" href="#states">
              Escolher minha cidade →
            </Link>
            <p className="mt-5 text-xs text-white/50">
              Um comprador por cidade · Condições conforme contrato
            </p>
          </div>
          <div className="relative flex min-h-72 items-end overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#396354] to-[#152f2a] p-8">
            <div
              className="absolute right-8 top-10 text-8xl font-black text-white/10"
              aria-hidden="true"
            >
              MA
            </div>
            <div>
              <p className="text-sm text-[#d5c29b]">NOSSO PRIMEIRO ESTADO</p>
              <h2 className="mt-3 text-4xl font-semibold">Massachusetts</h2>
              <p className="mt-4 text-stone-300">
                351 cidades e municípios.
                <br />
                Encontre sua oportunidade de representação.
              </p>
            </div>
          </div>
        </div>
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
      <section className="shell grid gap-8 rounded-xl bg-[#eae8df] p-8 md:grid-cols-3">
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
      </section>
    </>
  );
}
