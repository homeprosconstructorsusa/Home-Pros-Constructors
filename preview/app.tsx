import { createRoot } from "react-dom/client";
import { useEffect, useSyncExternalStore } from "react";
import { SiteShell } from "@/components/site-shell";
import { HomeContent } from "@/components/home";
import { CatalogBrowser } from "@/components/catalog-browser";
import { CityDetail } from "@/components/city-detail";
import { Cart } from "@/components/cart";
import { demoCatalog } from "@/lib/demo-catalog";
function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
function getRoute() {
  return window.location.hash.startsWith("#/")
    ? window.location.hash.slice(1)
    : "/";
}
function Preview() {
  const route = useSyncExternalStore(subscribe, getRoute, () => "/");
  const license = route.startsWith("/cities/")
    ? demoCatalog.find((city) => city.slug === route.slice(8))
    : undefined;
  useEffect(() => {
    document.title = `${license?.city ?? (route === "/cart" ? "Seu carrinho" : "Home Pros Constructors")} | Prévia para aprovação`;
    window.scrollTo(0, 0);
  }, [route, license]);
  return (
    <SiteShell demo>
      <div key={route}>
        {route === "/" ? (
          <HomeContent />
        ) : route === "/states/massachusetts" ? (
          <CatalogBrowser catalog={demoCatalog} demo />
        ) : route === "/cart" ? (
          <Cart catalog={demoCatalog} demo />
        ) : license ? (
          <CityDetail license={license} demo />
        ) : (
          <section className="shell page-space">
            <h1 className="page-title">Página não encontrada</h1>
            <a className="btn mt-5" href="#/states/massachusetts">
              Explorar cidades
            </a>
          </section>
        )}
      </div>
    </SiteShell>
  );
}
createRoot(document.getElementById("root")!).render(<Preview />);
