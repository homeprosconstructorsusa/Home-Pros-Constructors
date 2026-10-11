"use client";
import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { CART_KEY, parseCart } from "@/lib/cart-storage";
import type { CityLicense } from "@/lib/license";
import { money, statusLabels, installments } from "@/lib/license";
import { quoteCart } from "@/lib/quote";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("cart-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cart-change", callback);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(CART_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}
function useCart() {
  return parseCart(useSyncExternalStore(subscribe, snapshot, () => "[]"));
}
function save(slugs: string[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new Event("cart-change"));
}
export function CartCount() {
  const items = useCart();
  return (
    <span
      className="cart-count"
      aria-label={`${items.length} cidades no carrinho`}
    >
      {items.length}
    </span>
  );
}
export function AddToCart({ slug }: { slug: string }) {
  const items = useCart();
  const [error, setError] = useState("");
  const added = items.includes(slug);
  return (
    <div>
      <button
        className="btn w-full"
        disabled={added}
        onClick={() => {
          try {
            save([...new Set([...parseCart(snapshot()), slug])]);
            setError("");
          } catch {
            setError(
              "Não foi possível salvar o carrinho. Ative o armazenamento local do navegador.",
            );
          }
        }}
      >
        {added ? "Adicionada ao carrinho ✓" : "Adicionar licença ao carrinho →"}
      </button>
      <p aria-live="polite" className="mt-3 text-sm">
        {error ||
          (added ? "Cidade adicionada. Você pode revisá-la no carrinho." : "")}
      </p>
      {added && (
        <Link href="/cart" className="text-sm underline">
          Ver carrinho →
        </Link>
      )}
    </div>
  );
}
export function Cart({
  catalog,
  demo,
}: {
  catalog: CityLicense[];
  demo: boolean;
}) {
  const slugs = useCart();
  const quote = quoteCart(slugs, catalog);
  const [error, setError] = useState("");
  function update(next: string[]) {
    try {
      save(next);
      setError("");
    } catch {
      setError(
        "Não foi possível atualizar o carrinho. Verifique as permissões de armazenamento do navegador.",
      );
    }
  }
  return (
    <section className="shell page-space">
      <div className="eyebrow">Seu próximo passo</div>
      <h1 className="page-title">
        Seu carrinho<span className="text-stone-400">.</span>
      </h1>
      <p className="intro">
        Revise suas cidades. O carrinho considera somente a entrada de cada
        licença.
      </p>
      <div className="cart-layout">
        <div>
          {slugs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true">
                →
              </div>
              <h2>Seu carrinho está vazio</h2>
              <p>
                Encontre uma cidade para representar. Comece por Massachusetts.
              </p>
              <Link className="btn" href="/states/massachusetts">
                Explorar cidades →
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm">
                  {slugs.length}{" "}
                  {slugs.length === 1
                    ? "cidade selecionada"
                    : "cidades selecionadas"}
                </p>
                <button
                  className="text-sm underline"
                  onClick={() => update([])}
                >
                  Esvaziar carrinho
                </button>
              </div>
              <div className="space-y-4">
                {quote.items.map(({ slug, license, available }) => (
                  <article key={slug} className="cart-item">
                    <div className="city-monogram" aria-hidden="true">
                      {license?.city.slice(0, 2).toUpperCase() ?? "?"}
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/cities/${slug}`}
                        className="text-lg font-semibold"
                      >
                        {license?.city ?? "Cidade não reconhecida"}
                      </Link>
                      <p className="mt-1 text-sm text-stone-500">
                        {license
                          ? `${license.county} County · Massachusetts`
                          : "Este item não está mais no catálogo."}
                      </p>
                      <span
                        className={`badge status-${license?.status.toLowerCase() ?? "sold"} mt-2`}
                      >
                        {license
                          ? statusLabels[license.status]
                          : "Indisponível"}
                      </span>
                      {license && installments(license) && (
                        <p className="mt-2 text-xs leading-5 text-stone-500">
                          Valor da licença: {money(license.totalPriceCents!)} ·
                          Saldo: {money(installments(license)!.balanceCents)} em{" "}
                          {license.installmentCount} parcelas.
                        </p>
                      )}
                      {!available && (
                        <p className="mt-2 text-sm text-red-700">
                          Esta licença está indisponível. Remova-a para
                          continuar.
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {license?.depositCents === null || !license
                          ? "Entrada a confirmar"
                          : money(license.depositCents)}
                      </p>
                      <button
                        className="mt-3 text-sm text-stone-500 underline"
                        onClick={() =>
                          update(
                            parseCart(snapshot()).filter(
                              (item) => item !== slug,
                            ),
                          )
                        }
                      >
                        Remover
                        <span className="sr-only">
                          {" "}
                          {license?.city ?? slug}
                        </span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-stone-500">
                Adicionar uma licença ao carrinho não reserva a cidade.
                Disponibilidade e preços devem ser conferidos antes de qualquer
                pagamento futuro.
              </p>
            </>
          )}
          {error && (
            <p role="alert" className="mt-4 text-red-700">
              {error}
            </p>
          )}
        </div>
        <aside className="summary-card">
          <div className="eyebrow">
            {demo ? "Resumo da prévia" : "Resumo do pedido"}
          </div>
          <h2 className="mt-3 text-2xl font-semibold">Suas licenças</h2>
          <div className="summary-row">
            <span>Licenças disponíveis</span>
            <span>{quote.items.filter((item) => item.available).length}</span>
          </div>
          <div className="summary-row">
            <span>Entradas no carrinho</span>
            <span>{money(quote.depositTotalCents)}</span>
          </div>
          <p className="my-4 text-xs leading-5 text-stone-500">
            {demo
              ? "Condições do modelo de Boston, aplicadas às cidades para revisão. A disponibilidade é demonstrativa."
              : "Revise as condições completas no contrato de licença."}
          </p>
          <div className="summary-row">
            <span>Valor total das licenças</span>
            <span>{money(quote.contractTotalCents)}</span>
          </div>
          <div className="summary-row">
            <span>Saldo a parcelar</span>
            <span>{money(quote.remainingBalanceCents)}</span>
          </div>
          <p className="my-4 text-xs leading-5 text-stone-500">
            O saldo será parcelado conforme as condições de cada licença. Ele
            não é cobrado neste carrinho.
          </p>
          <div className="summary-total">
            <span>Total de entradas</span>
            <strong>{money(quote.depositTotalCents)}</strong>
          </div>
          <button className="btn w-full mt-6" disabled>
            Pagamento não habilitado
          </button>
          <p className="mt-4 text-sm leading-6 text-stone-500">
            Nenhum pagamento será cobrado. A integração de pagamentos e o
            contrato final ainda estão pendentes.
          </p>
          <Link
            href="/states/massachusetts"
            className="mt-6 inline-block text-sm underline"
          >
            Continuar explorando →
          </Link>
        </aside>
      </div>
    </section>
  );
}
