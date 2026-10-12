"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export function CoursesMenu() {
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (menu.current && !menu.current.contains(event.target as Node)) menu.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return <details className="courses-menu" ref={menu}>
    <summary>Cursos <span aria-hidden="true">⌄</span></summary>
    <div className="courses-dropdown">
      <Link href="/courses/video-editing" onClick={() => { if (menu.current) menu.current.open = false; }}>Curso de edição de vídeos<span>Formação + direito exclusivo por cidade</span></Link>
    </div>
  </details>;
}
