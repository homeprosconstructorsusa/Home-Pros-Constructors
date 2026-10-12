"use client";
import { useState } from "react";
import Link from "next/link";
import { getPartnershipCities, partnershipRegions } from "@/lib/partnerships";

export function PartnershipCityBrowser({ demo = false }: { demo?: boolean }) {
  const [state, setState] = useState("massachusetts");
  const [search, setSearch] = useState("");
  const [readyOnly, setReadyOnly] = useState(true);
  const [selected, setSelected] = useState("");
  const cities = getPartnershipCities(undefined, demo).filter((city) => city.stateSlug === state);
  const filtered = cities.filter((city) => (!readyOnly || city.contact) && city.name.toLowerCase().includes(search.trim().toLowerCase()));
  const city = filtered.find((city) => city.slug === selected);
  return <section className="shell page-space information-page">
    <Link className="back-link" href="/partnership">← Opções de parceria</Link>
    <p className="eyebrow">Parceria com uma cidade</p><h1 className="page-title">Encontre seu parceiro local.</h1>
    <p className="information-lead">Escolha o estado e a cidade.</p>
    <p>As cidades prontas para parceria aparecem com o responsável e um canal de contato publicados.</p>
    {demo && <p className="partnership-demo-note">Prévia para aprovação: Abington, Boston e Cambridge possuem responsáveis e contatos fictícios. A disponibilidade é demonstrativa.</p>}
    <div className="partnership-filters">
      <div><label htmlFor="partnership-state">Estado da parceria</label><select id="partnership-state" value={state} onChange={(event) => { setState(event.target.value); setSelected(""); setSearch(""); }}>{partnershipRegions.map((region) => <option key={region.slug} value={region.slug}>{region.name}</option>)}<option disabled>Outros estados · Em preparação</option></select></div>
      <div><label htmlFor="partnership-search">Buscar cidade para parceria</label><input id="partnership-search" type="search" value={search} placeholder="Boston, Abington, Cambridge…" onChange={(event) => { setSearch(event.target.value); setSelected(""); }} /></div>
      <div><label htmlFor="partnership-city">Cidade da parceria</label><select id="partnership-city" value={selected} disabled={filtered.length === 0} onChange={(event) => setSelected(event.target.value)}><option value="">Selecione uma cidade</option>{filtered.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name}{entry.contact ? " · Aberta a parceiros" : " · Em preparação"}</option>)}</select></div>
    </div>
    <label className="partnership-availability"><input type="checkbox" checked={readyOnly} onChange={(event) => { setReadyOnly(event.target.checked); setSelected(""); }} />Mostrar somente cidades prontas para parceria</label>
    <p className="partnership-results" aria-live="polite">{filtered.length} cidades encontradas · {cities.filter((entry) => entry.contact).length} {demo ? "exemplos de parceria aberta." : "com parceria aberta e contato publicado."}</p>
    {filtered.length === 0 ? <div className="empty-state"><h2>{readyOnly ? "Parcerias locais em preparação" : "Nenhuma cidade encontrada"}</h2><p>{readyOnly ? "As cidades prontas aparecerão aqui quando os responsáveis e seus contatos forem publicados." : "Tente outro nome de cidade."}</p><button className="btn" onClick={() => { setReadyOnly(false); setSearch(""); setSelected(""); }}>Consultar cidades em preparação</button></div> : city ? <div className="partnership-callout selected-partnership-city"><span className={`badge ${city.contact ? "status-available" : "status-draft"}`}>{city.contact ? `Aberta a parceiros${city.contact.demonstration ? " · Demonstração" : ""}` : "Parceria em preparação"}</span><h2>{city.name}, {city.stateName}</h2><p>{city.contact ? `Responsável: ${city.contact.responsibleName}` : "O contato do responsável ainda não foi publicado para esta cidade."}</p><Link className="btn" href={`/partnership/cities/${city.stateSlug}/${city.slug}`}>Ver parceria de {city.name} →</Link></div> : <p>Selecione uma cidade para consultar sua situação de parceria.</p>}
  </section>;
}
