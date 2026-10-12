import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { MainNavigation } from "./main-navigation";
import { CountryNavigation } from "./country-navigation";
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
      <CountryNavigation />
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
            <p className="footer-role">Licenças e atendimento comercial</p>
          </div>
          <div className="text-sm">
            <Link href="/states/massachusetts">Massachusetts</Link>
            <span className="mx-4">·</span>
            <Link href="/cart">Seu carrinho</Link>
            <nav className="social-links" aria-label="Redes sociais da Home Pros Constructors">
              <a className="social-facebook" href="https://www.facebook.com/profile.php?id=61582340693737" target="_blank" rel="noopener noreferrer" aria-label="Facebook da Home Pros Constructors — abre em nova aba" title="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M24 12a12 12 0 1 0-13.875 11.854v-8.385H7.078V12h3.047V9.356c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385A12.003 12.003 0 0 0 24 12Z" /></svg>
              </a>
              <a className="social-instagram" href="https://www.instagram.com/homeprosconstructors/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Home Pros Constructors — abre em nova aba" title="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a className="social-youtube" href="https://www.youtube.com/@HomeProsConstructorsUsa" target="_blank" rel="noopener noreferrer" aria-label="YouTube da Home Pros Constructors — abre em nova aba" title="YouTube">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.6 6.1c-.3-1.1-1.1-1.9-2.2-2.2C17.5 3.4 12 3.4 12 3.4s-5.5 0-7.4.5c-1.1.3-1.9 1.1-2.2 2.2C2 8 2 12 2 12s0 4 .4 5.9c.3 1.1 1.1 1.9 2.2 2.2 1.9.5 7.4.5 7.4.5s5.5 0 7.4-.5c1.1-.3 1.9-1.1 2.2-2.2C22 16 22 12 22 12s0-4-.4-5.9Z"/><path fill="#c92b2b" d="m10 8 6 4-6 4Z"/></svg>
              </a>
            </nav>
            <p className="mt-3 text-xs text-white/50">
              © {new Date().getFullYear()} Home Pros Constructors · Projeto em
              desenvolvimento
            </p>
            <div className="production-credit" aria-label="Produção criativa">
              <span>Produção de vídeos e materiais</span>
              <strong>Make Noise</strong>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
