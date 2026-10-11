"use client";
import { useState } from "react";
import Link from "next/link";
import type { CityLicense } from "@/lib/license";
import { money, statusLabels } from "@/lib/license";
export function CatalogBrowser({
  catalog,
  demo,
}: {
  catalog: CityLicense[];
  demo: boolean;
}) {
  const [search, setSearch] = useState("");
  const [county, setCounty] = useState("");
  const [status, setStatus] = useState("");
  const counties = [...new Set(catalog.map((city) => city.county))].sort();
  const filtered = catalog.filter(
    (city) =>
      city.city.toLowerCase().includes(search.trim().toLowerCase()) &&
      (!county || city.county === county) &&
      (!status || city.status === status),
  );
  return (
    <section className="shell page-space">
      <Link href="/" className="back-link">
        ← Todos os estados
      </Link>
      <div className="catalog-heading">
        <div>
          <p className="eyebrow">
            Estado de Massachusetts · Licenças de cidades
          </p>
          <h1 className="page-title">
            Massachusetts<span className="text-stone-400">.</span>
          </h1>
          <p className="intro">
            351 cidades e municípios. Encontre sua próxima oportunidade de
            representação.
          </p>
        </div>
        <div className="catalog-stat">
          <strong>351</strong>
          <span>
            municípios
            <br />
            em 14 condados
          </span>
        </div>
      </div>
      <div className="filter-bar">
        <div className="search-field">
          <label htmlFor="city-search">Buscar cidades</label>
          <input
            id="city-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Busque Boston, Cambridge, Salem…"
          />
        </div>
        <div>
          <label htmlFor="county-filter">Condado</label>
          <select
            id="county-filter"
            value={county}
            onChange={(event) => setCounty(event.target.value)}
          >
            <option value="">Todos os condados</option>
            {counties.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status-filter">Disponibilidade</label>
          <select
            id="status-filter"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="">Todas as situações</option>
            <option value="AVAILABLE">Disponível</option>
            <option value="RESERVED">Reservada</option>
            <option value="SOLD">Vendida</option>
          </select>
        </div>
      </div>
      <div className="results-line">
        <p aria-live="polite">
          Exibindo <strong>{filtered.length}</strong> de {catalog.length}{" "}
          cidades{demo ? " · Disponibilidade demonstrativa" : ""}
        </p>
        {(search || county || status) && (
          <button
            className="underline"
            onClick={() => {
              setSearch("");
              setCounty("");
              setStatus("");
            }}
          >
            Limpar filtros
          </button>
        )}
      </div>
      {catalog.length === 0 ? (
        <div className="empty-state">
          <h2>Catálogo em preparação</h2>
          <p>
            Nenhuma licença real foi publicada. Os registros continuam em
            rascunho até a aprovação dos preços e direitos de uso.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <h2>Nenhuma cidade encontrada</h2>
          <p>Tente outro nome, condado ou filtro de disponibilidade.</p>
          <button
            className="btn"
            onClick={() => {
              setSearch("");
              setCounty("");
              setStatus("");
            }}
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="city-grid">
          {filtered.map((city) => (
            <Link
              href={`/cities/${city.slug}`}
              className="city-card"
              key={city.slug}
            >
              <div className="flex justify-between items-center gap-3">
                <span className={`badge status-${city.status.toLowerCase()}`}>
                  {statusLabels[city.status]}
                </span>
                <span className="text-stone-400" aria-hidden="true">
                  →
                </span>
              </div>
              <p className="mt-8 text-xs uppercase tracking-widest text-stone-500">
                {city.county} County
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{city.city}</h2>
              <div className="mt-6 border-t border-stone-100 pt-4 flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-stone-500">
                    {demo ? "Entrada do modelo" : "Entrada da licença"}
                  </p>
                  <p className="mt-1 font-semibold">
                    {city.depositCents === null
                      ? "A confirmar"
                      : money(city.depositCents)}
                  </p>
                </div>
                <span className="text-xs text-stone-500">Ver detalhes →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
      <p className="mt-8 text-xs leading-6 text-stone-500">
        Nomes dos municípios: US Census Bureau CitySDK, 2022. Os registros
        geográficos não estabelecem direitos de licença ou disponibilidade
        comercial.
      </p>
    </section>
  );
}
