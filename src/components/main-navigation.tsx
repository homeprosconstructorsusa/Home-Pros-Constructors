"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CartCount } from "./cart";

type Section = "licenses" | "courses" | "partnership";
const sections = {
  licenses: {
    label: "Licenças", heading: "Explore as licenças",
    primary: [{ label: "Agência Americana de Marketing", href: "/licenses" }, { label: "Massachusetts", href: "/states/massachusetts" }],
    secondary: [{ label: "Como funciona a atuação", href: "/cities/abington" }, { label: "Converse com a Home Pros", href: "/contact" }],
    note: "Outros estados serão adicionados quando as ofertas estiverem definidas.",
  },
  courses: {
    label: "Cursos", heading: "Explore os cursos",
    primary: [{ label: "Curso de edição de vídeos", href: "/courses/video-editing" }, { label: "Curso completo independente", href: "/courses/video-editing/complete" }],
    secondary: [{ label: "Curso + direito de edição da cidade", href: "/courses/video-editing#editor-cities" }, { label: "Home Pros School", href: "/courses/english" }],
    note: "Conheça as propostas de formação e suas condições. As inscrições ainda estão em preparação.",
  },
  partnership: {
    label: "Parceria", heading: "Escolha sua parceria",
    primary: [{ label: "Com a Home Pros Constructors", href: "/partnership/company" }, { label: "Com o responsável por uma cidade", href: "/partnership/cities" }],
    secondary: [{ label: "Opções de parceria", href: "/partnership" }, { label: "Canais oficiais da Home Pros", href: "/contact" }],
    note: "Escolha a parceria com a empresa ou consulte estados e cidades. Os contatos locais serão publicados quando confirmados.",
  },
};

export function MainNavigation() {
  const [open, setOpen] = useState<Section | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelLeave = () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); };
  const triggers = useRef<Partial<Record<Section, HTMLButtonElement>>>({});
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(null); triggers.current[open]?.focus(); }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { cancelLeave(); document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, [open]);
  const close = () => setOpen(null);
  const trigger = (key: Section) => <button type="button" ref={(node) => { if (node) triggers.current[key] = node; }} className="mega-trigger" aria-expanded={open === key} aria-controls={`mega-${key}`} onPointerEnter={(event) => { if (event.pointerType === "mouse") setOpen(key); }} onClick={(event) => { if (event.detail > 0 && window.matchMedia("(hover: hover)").matches) setOpen(key); else setOpen((current) => current === key ? null : key); }} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); setOpen(key); requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>(`#mega-${key} a`)?.focus()); } }}>{sections[key].label}<span aria-hidden="true">⌄</span></button>;
  return <div className="header-navigation" ref={root} onPointerEnter={cancelLeave} onPointerLeave={(event) => { if (event.pointerType === "mouse") leaveTimer.current = setTimeout(close, 180); }} onBlur={(event) => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) close(); }}>
    <div className="main-nav-links">
      <Link href="/" onClick={close} onPointerEnter={close}>Home</Link>
      {trigger("licenses")}
      <Link href="/shop" onClick={close} onPointerEnter={close}>Loja</Link>
      {trigger("courses")}
      {trigger("partnership")}
      <Link href="/contact" onClick={close} onPointerEnter={close}>Contato</Link>
      <Link href="/cart" className="cart-link nav-cart" onClick={close} onPointerEnter={close}>Carrinho <CartCount /></Link>
    </div>
    {open && <>
      <div className="mega-panel" id={`mega-${open}`} aria-label={`Submenu de ${sections[open].label}`}>
        <div className="shell mega-panel-inner">
          <div className="mega-primary"><p>{sections[open].heading}</p>{sections[open].primary.map((link) => <Link href={link.href} key={link.href} onClick={close}>{link.label}</Link>)}</div>
          <div className="mega-secondary"><p>Saiba mais</p>{sections[open].secondary.map((link) => <Link href={link.href} key={link.href} onClick={close}>{link.label}</Link>)}</div>
          <div className="mega-note"><p>{sections[open].note}</p><button type="button" className="mega-close" onClick={() => { const current = open; close(); triggers.current[current]?.focus(); }} aria-label="Fechar submenu">Fechar ×</button></div>
        </div>
      </div>
      <button type="button" className="mega-scrim" onClick={close} onPointerEnter={(event) => { if (event.pointerType === "mouse") close(); }} tabIndex={-1} aria-label="Fechar menu pelo fundo" />
    </>}
  </div>;
}
