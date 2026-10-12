import Link from "next/link";
import { PageBackdrop } from "./page-backdrop";
import { CityAlbum } from "./city-album";
import type { CityLicense } from "@/lib/license";
import {
  isPurchasable,
  money,
  statusLabels,
  installments,
} from "@/lib/license";
import { AddToCart } from "./cart";
import { CityContent, CityText } from "./city-content";
import { cityPageContent, cityPageOverrides, cityCopy } from "@/content/city-page";
export function CityDetail({ license, demo }: { license: CityLicense; demo: boolean }) {
  const plan = installments(license);
  const pageOverride = cityPageOverrides[license.slug];
  const scene = license.slug === "boston" ? "boston" : license.slug === "abington" ? "abington" : null;
  const sharedIntro = cityCopy(cityPageContent.introduction ?? "", license.city, license.county);
  const [workIntro, ...introDetails] = sharedIntro.split("\n\n");
  const fullDescription = license.description ?? introDetails.join("\n\n");
  const photos = cityPageContent.photosByCity[license.slug] ?? cityPageContent.generalPhotos;
  return (
    <div className={`page-scene ${scene ? `${scene}-scene` : ""}`}>
      {scene && <PageBackdrop scene={scene} />}
      <section className="shell page-space city-product-page">
        <Link href="/states/massachusetts" className="back-link">← Cidades de Massachusetts</Link>
        <div className="detail-layout city-product-layout">
          <header className="city-overview">
            <p className="eyebrow">{license.county} County · Massachusetts</p>
            <h1 className="page-title">{license.city}<span className="text-stone-400">.</span></h1>
            <p className="city-license-label">Licença de uso da cidade · Home Pros Constructors</p>
            <p className="city-license-intro">Adquira uma licença de uso da cidade de {license.city}, em Massachusetts, para atuar comercialmente com a Home Pros Constructors, conforme contrato.</p>
            {(pageOverride?.overviewParagraphs ?? [workIntro]).map((paragraph, index) => <p className={`city-work-intro ${pageOverride && index === 0 ? "font-semibold text-[#17352e]" : ""}`} key={index}>{paragraph}</p>)}
            <ul className="city-support-tags" aria-label="Estrutura para sua atuação">
              <li>Trabalho de casa</li><li>Materiais personalizados</li><li>Treinamento e suporte</li>
            </ul>
          </header>
          <aside className="summary-card city-purchase-summary" aria-label={`Condições da licença de ${license.city}`}>
            <div className="purchase-heading"><h2>Licença de {license.city}</h2><span className={`badge status-${license.status.toLowerCase()}`}>{statusLabels[license.status]}</span></div>
            <div className="purchase-entry">
              <span>Entrada</span>
              <strong>{license.depositCents === null ? "A confirmar" : money(license.depositCents, license.currency)}</strong>
              <p>Valor incluído no carrinho · {license.currency}</p>
            </div>
            <dl className="purchase-breakdown">
              <div><dt>Valor total da licença</dt><dd>{license.totalPriceCents === null ? "A confirmar" : money(license.totalPriceCents, license.currency)}</dd></div>
              <div><dt>Saldo restante</dt><dd>{plan ? money(plan.balanceCents, license.currency) : "A confirmar"}</dd></div>
            </dl>
            {plan && <div className="purchase-plan"><strong>Saldo em {plan.count} {plan.count === 1 ? "parcela mensal" : "parcelas mensais"}</strong><p>{plan.count === 1 ? money(plan.finalCents, license.currency) : <>{plan.count - 1} parcelas de {money(plan.regularCents, license.currency)} e a última de {money(plan.finalCents, license.currency)}.</>}</p></div>}
            <p className="purchase-cart-note">O carrinho considera somente a entrada. O saldo não é cobrado neste carrinho.</p>
            {isPurchasable(license) ? <AddToCart slug={license.slug} /> : <><button className="btn w-full" disabled>{license.status === "SOLD" ? "Licença vendida" : license.status === "RESERVED" ? "Licença reservada" : "Indisponível para compra"}</button><p className="purchase-disclaimer">Explore outra cidade para continuar.</p></>}
            <p className="purchase-disclaimer">Adicionar ao carrinho não reserva a cidade. Nenhum pagamento é cobrado nesta prévia.</p>
            <p className="purchase-demo-note">{demo ? "Prévia: condições do modelo de Boston para revisão. A disponibilidade é demonstrativa." : "As condições finais devem constar no contrato de licença."}</p>
          </aside>
          <div className="city-detail-body">
            {photos.length > 0 ? <div className="city-gallery-area"><p className="eyebrow">Conheça a Home Pros</p><h2>Uma visão da sua atuação.</h2><CityAlbum slug={license.slug} city={license.city} county={license.county} /></div> : <div className="territory-panel"><h2 className="text-3xl font-semibold">{license.city}, MA</h2><p className="mt-4">{license.county} County · Massachusetts</p></div>}
            <section className="city-license-details" aria-label={`Detalhes da licença de ${license.city}`}>
              <div className="city-details-heading"><p className="eyebrow">Explore os detalhes</p><h2>Como funciona sua atuação.</h2><p>Serviços, suporte e condições para atender {license.city}.</p></div>
              <CityContent slug={license.slug} city={license.city} county={license.county} />
              {fullDescription && <details className="city-info-section"><summary><h3>Sobre a Home Pros em {license.city}</h3><span aria-hidden="true">+</span></summary><div className="city-info-body"><CityText text={fullDescription} /></div></details>}
              <details className="city-info-section"><summary><h3>Condições de uso da licença</h3><span aria-hidden="true">+</span></summary><div className="city-info-body"><div className="detail-facts"><div><span>Estado</span><strong>Massachusetts</strong></div><div><span>Condado</span><strong>{license.county}</strong></div><div><span>Representação</span><strong>Um comprador por cidade</strong></div></div><p>Os direitos de uso e as condições finais da licença devem constar no contrato. Adicionar ao carrinho não reserva a cidade. O carrinho inclui somente a entrada, não o valor total da licença. Nenhum pagamento é cobrado nesta prévia.</p></div></details>
          <details className="city-info-section">
            <summary><h3>Perfil de {license.city}</h3><span aria-hidden="true">+</span></summary>
            <div className="city-info-body">
            {license.slug === "boston" ? (
              <>
                <p className="mt-4 city-muted">
                  Boston é o município mais populoso de Massachusetts, segundo a
                  fonte fornecida para esta página.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 city-muted">
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
              <p className="mt-4 leading-7 city-muted">
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
            </div>
          </details>
              {pageOverride && <details className="city-info-section"><summary><h3>{pageOverride.finalSection.title}</h3><span aria-hidden="true">+</span></summary><div className="city-info-body"><CityText text={pageOverride.finalSection.body} /></div></details>}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
