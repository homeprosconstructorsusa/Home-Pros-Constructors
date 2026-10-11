"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { cityPageContent, cityCopy } from "@/content/city-page";

export function CityAlbum({ slug, city, county, compact = false }: {
  slug: string; city: string; county: string; compact?: boolean;
}) {
  const photos = cityPageContent.photosByCity[slug] ?? [];
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  if (!photos.length) return null;
  const photo = photos[index % photos.length];
  const move = (direction: number) => setIndex((current) => (current + direction + photos.length) % photos.length);
  const controls = (
    <div className="album-controls">
      <button type="button" onClick={() => move(-1)} aria-label="Card anterior">←</button>
      <p aria-live="polite">Card {index + 1} de {photos.length}</p>
      <button type="button" onClick={() => move(1)} aria-label="Próximo card">→</button>
    </div>
  );
  return (
    <section className={`city-album ${compact ? "album-compact" : ""}`} aria-label={`Álbum de ${city}`}>
      <button type="button" className="album-cover" onClick={() => dialog.current?.showModal()} aria-label={`Ampliar cards de ${city}`}>
        <Image src={photo.src} alt={cityCopy(photo.alt, city, county)} width={1122} height={1402} sizes={compact ? "(min-width: 640px) 350px, 100vw" : "(min-width: 900px) 650px, 100vw"} className="album-image" />
        <span className="album-enlarge">Ampliar para ler ↗</span>
      </button>
      {controls}
      {!compact && <div className="album-tabs" aria-label="Selecionar card">
        {photos.map((item, position) => <button type="button" key={item.src} aria-label={`Ver card ${position + 1}`} aria-pressed={position === index} onClick={() => setIndex(position)}>{position + 1}</button>)}
      </div>}
      <dialog ref={dialog} className="album-dialog" aria-label={`Cards de ${city} ampliados`} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }}>
        <div className="album-dialog-bar"><strong>{city} · Álbum</strong><button type="button" autoFocus onClick={() => dialog.current?.close()}>Fechar ×</button></div>
        {controls}
        <Image src={photo.src} alt={cityCopy(photo.alt, city, county)} width={1122} height={1402} unoptimized className="album-image" />
      </dialog>
    </section>
  );
}
