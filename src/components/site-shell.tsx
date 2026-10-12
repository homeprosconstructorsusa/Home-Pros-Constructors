import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { MainNavigation } from "./main-navigation";
export function SiteShell({
  children,
  demo,
}: {
  children: React.ReactNode;
  demo: boolean;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Ir para o conteúdo
      </a>
      {demo && (
        <div className="demo-bar">
          PRÉVIA PARA APROVAÇÃO{" "}
          <span>
            · Modelo de Boston · Disponibilidade demonstrativa · Sem cobranças
          </span>
        </div>
      )}
      <header className="site-header">
        <nav className="shell header-inner" aria-label="Navegação principal">
          <Link href="/" className="brand">
            <BrandLogo />
          </Link>
          <MainNavigation />
        </nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="shell footer-inner">
          <div>
            <Link
              href="/"
              className="brand"
              aria-label="Home Pros Constructors — página inicial"
            >
              <BrandLogo />
            </Link>
            <p className="mt-2 text-sm">Sua cidade. Seu próximo negócio.</p>
          </div>
          <div className="text-sm">
            <Link href="/states/massachusetts">Massachusetts</Link>
            <span className="mx-4">·</span>
            <Link href="/cart">Seu carrinho</Link>
            <nav className="social-links" aria-label="Redes sociais da Home Pros Constructors">
              <a href="https://www.youtube.com/@HomeProsConstructorsUsa" target="_blank" rel="noopener noreferrer">YouTube <span aria-hidden="true">↗</span></a>
              <a href="https://www.instagram.com/homeprosconstructors/" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a>
              <a href="https://www.facebook.com/profile.php?id=61582340693737" target="_blank" rel="noopener noreferrer">Facebook <span aria-hidden="true">↗</span></a>
            </nav>
            <p className="mt-3 text-xs text-white/50">
              © {new Date().getFullYear()} Home Pros Constructors · Projeto em
              desenvolvimento
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
