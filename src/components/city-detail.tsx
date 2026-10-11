import Link from "next/link";
import type { CityLicense } from "@/lib/license";
import {
  isPurchasable,
  money,
  statusLabels,
  installments,
} from "@/lib/license";
import { AddToCart } from "./cart";
import { CityContent } from "./city-content";
import { cityPageContent, cityCopy } from "@/content/city-page";
export function CityDetail({
  license,
  demo,
}: {
  license: CityLicense;
  demo: boolean;
}) {
  const plan = installments(license);
  return (
    <section className="shell page-space">
      <Link href="/states/massachusetts" className="back-link">
        ← Cidades de Massachusetts
      </Link>
      <div className="detail-layout">
        <div>
          <p className="eyebrow">{license.county} County · Massachusetts</p>
          <h1 className="page-title">
            {license.city}
            <span className="text-stone-400">.</span>
          </h1>
          <p className="intro">
            Home Pros Constructors — Licença de Uso da Cidade
          </p>
          <div className="territory-panel">
            <div className="territory-lines" aria-hidden="true" />
            <div className="relative">
              <p className="eyebrow text-[#d5c29b]">
                Sua cidade. Sua representação.
              </p>
              <h2 className="mt-4 text-4xl font-semibold">
                {license.city}, MA
              </h2>
              <p className="mt-5 text-sm text-white/70">
                {license.kind === "city" ? "Cidade" : "Município"} ·{" "}
                {license.county} County
              </p>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">
              Representar a Home Pros em {license.city}
            </h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-stone-600">
              {license.description ??
                (cityPageContent.introduction
                  ? cityCopy(
                      cityPageContent.introduction,
                      license.city,
                      license.county,
                    )
                  : "Texto da licença em preparação.")}
            </p>
            <div className="detail-facts">
              <div>
                <span>Estado</span>
                <strong>Massachusetts</strong>
              </div>
              <div>
                <span>Condado</span>
                <strong>{license.county}</strong>
              </div>
              <div>
                <span>Representação</span>
                <strong>Um comprador por cidade</strong>
              </div>
            </div>
          </div>
          <CityContent city={license.city} county={license.county} />
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Perfil de {license.city}</h2>
            {license.slug === "boston" ? (
              <>
                <p className="mt-4 text-stone-600">
                  Boston é o município mais populoso de Massachusetts, segundo a
                  fonte fornecida para esta página.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-600">
                  <li>População em 2024: 666.442 habitantes.</li>
                  <li>
                    População projetada para 2026: 659.455 habitantes — projeção
                    da Cubit Planning, não uma contagem oficial.
                  </li>
                  <li>
                    Variação populacional entre 2019 e 2024: redução de 2,6%.
                  </li>
                  <li>
                    Taxa anual adotada na projeção: aproximadamente −0,5%.
                  </li>
                  <li>Renda domiciliar mediana anual em 2024: US$ 97.344.</li>
                  <li>Idade mediana: 33,3 anos.</li>
                </ul>
                <p className="mt-4 text-xs leading-6 text-stone-500">
                  Dados e fonte fornecidos pelo responsável: Massachusetts
                  Demographics / Cubit Planning, com dados do U.S. Census
                  Bureau. Consulta informada em 10/10/2026. Esses indicadores
                  não foram verificados independentemente nesta implementação.
                </p>
              </>
            ) : (
              <p className="mt-4 leading-7 text-stone-600">
                {license.city} pertence ao condado de {license.county}, em
                Massachusetts. Os indicadores populacionais e econômicos
                específicos deste município ainda serão adicionados; os dados de
                Boston não foram replicados aqui.
              </p>
            )}
            <a
              className="mt-5 inline-block text-sm underline"
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(license.city.replaceAll(" ", "_"))},_Massachusetts`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Saiba mais sobre {license.city} — Wikipédia →
            </a>
          </section>
        </div>
        <aside className="summary-card self-start">
          <span className={`badge status-${license.status.toLowerCase()}`}>
            {statusLabels[license.status]}
          </span>
          <h2 className="mt-6 text-xl font-semibold">
            Licença de {license.city}
          </h2>
          <p className="mt-4 text-xs text-stone-500">
            Entrada no carrinho · BRL
          </p>
          <p className="mt-2 text-4xl font-semibold">
            {license.depositCents === null
              ? "A confirmar"
              : money(license.depositCents, license.currency)}
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <p className="flex justify-between gap-3">
              <span>Valor total da licença</span>
              <strong>
                {license.totalPriceCents === null
                  ? "A confirmar"
                  : money(license.totalPriceCents, license.currency)}
              </strong>
            </p>
            {plan && (
              <>
                <p className="flex justify-between gap-3">
                  <span>Saldo restante</span>
                  <strong>{money(plan.balanceCents, license.currency)}</strong>
                </p>
                <p className="leading-6 text-stone-500">
                  {plan.count - 1} parcelas de{" "}
                  {money(plan.regularCents, license.currency)} e a última de{" "}
                  {money(plan.finalCents, license.currency)} ({plan.count}{" "}
                  parcelas mensais).
                </p>
              </>
            )}
          </div>
          <p className="my-6 text-sm leading-6 text-stone-500">
            {demo
              ? "Prévia: condições do modelo enviado para Boston, aplicadas às cidades para revisão. A disponibilidade é demonstrativa."
              : "As condições finais devem constar no contrato de licença."}
          </p>
          {isPurchasable(license) ? (
            <AddToCart slug={license.slug} />
          ) : (
            <>
              <button className="btn w-full" disabled>
                {license.status === "SOLD"
                  ? "Licença vendida"
                  : license.status === "RESERVED"
                    ? "Licença reservada"
                    : "Indisponível para compra"}
              </button>
              <p className="mt-4 text-sm text-stone-500">
                Explore outra cidade para continuar.
              </p>
            </>
          )}
          <div className="mt-6 border-t border-stone-200 pt-6 text-sm leading-6 text-stone-500">
            O carrinho inclui somente a entrada, não o valor total da licença.
            Adicionar ao carrinho não reserva a cidade. Nenhum pagamento é
            cobrado nesta prévia.
          </div>
        </aside>
      </div>
    </section>
  );
}
