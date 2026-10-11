import Link from "next/link";
import { CartCount } from "./cart";
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
            <span className="brand-symbol" aria-hidden="true">
              ⌂
            </span>
            <span>
              HOME PROS<span className="brand-subtitle">CONSTRUCTORS</span>
            </span>
          </Link>
          <div className="header-links">
            <Link href="/states/massachusetts">Explorar cidades</Link>
            <Link href="/cart" className="cart-link">
              Carrinho <CartCount />
            </Link>
          </div>
        </nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="shell footer-inner">
          <div>
            <p className="font-bold">HOME PROS CONSTRUCTORS</p>
            <p className="mt-2 text-sm">Sua cidade. Seu próximo negócio.</p>
          </div>
          <div className="text-sm">
            <Link href="/states/massachusetts">Massachusetts</Link>
            <span className="mx-4">·</span>
            <Link href="/cart">Seu carrinho</Link>
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
