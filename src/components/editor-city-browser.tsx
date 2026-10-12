"use client";
import { useState } from "react";
import Link from "next/link";
import municipalities from "@/data/massachusetts.json";

export function EditorCityBrowser() {
  const [search, setSearch] = useState("");
  const filtered = municipalities.filter((city) => city.name.toLocaleLowerCase("pt-BR").includes(search.trim().toLocaleLowerCase("pt-BR")));
  return <section id="editor-cities" className="editor-city-picker shell">
    <p className="eyebrow">Formação com atuação por cidade</p><h2>Em qual cidade você quer atuar?</h2><p>Explore as 351 cidades de Massachusetts. As ofertas de edição estão em preparação.</p>
    <label htmlFor="editor-city-search">Buscar cidade para edição</label><input id="editor-city-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Busque Abington, Boston, Cambridge…" />
    <p aria-live="polite" className="editor-results">{filtered.length} {filtered.length === 1 ? "cidade encontrada" : "cidades encontradas"}{filtered.length > 12 ? " · Mostrando as primeiras 12. Refine a busca." : ""}</p>
    <div className="editor-city-grid">{filtered.slice(0, 12).map((city) => <Link href={`/courses/video-editing/${city.slug}`} key={city.slug} className="editor-city-card"><span className="eyebrow">{city.county} County</span><h3>{city.name}</h3><span>Curso + direito de edição →</span><small>Oferta em preparação</small></Link>)}</div>
    {filtered.length === 0 && <p>Nenhuma cidade encontrada. Tente outro nome.</p>}
  </section>;
}
