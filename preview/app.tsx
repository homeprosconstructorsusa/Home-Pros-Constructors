import { createRoot } from "react-dom/client";
import { useEffect, useSyncExternalStore } from "react";
import { LicensesPage, ShopPage, ContactPage } from "@/components/information-pages";
import { SiteShell } from "@/components/site-shell";
import { VideoCourse } from "@/components/video-course";
import { CompleteVideoCourse } from "@/components/complete-video-course";
import { EditorCityOfferPage } from "@/components/editor-city-offer";
import { editorDraft } from "@/lib/editor-drafts";
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
  const fullRoute = useSyncExternalStore(subscribe, getRoute, () => "/");
  const route = fullRoute.split("#")[0];
  const license = route.startsWith("/cities/")
    ? demoCatalog.find((city) => city.slug === route.slice(8))
    : undefined;
  const editorOffer = route.startsWith("/courses/video-editing/") ? editorDraft(route.slice("/courses/video-editing/".length)) : undefined;
  useEffect(() => {
    document.title = `${license?.city ?? editorOffer?.city ?? (route === "/licenses" ? "Licenças" : route === "/shop" ? "Loja" : route === "/contact" ? "Contato" : route === "/cart" ? "Seu carrinho" : route.startsWith("/courses/video-editing") ? "Curso de edição de vídeos" : "Home Pros Constructors")} | Prévia para aprovação`;
    const anchor = fullRoute.split("#")[1];
    if (anchor) document.getElementById(anchor)?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [route, fullRoute, license, editorOffer?.city]);
  return (
    <SiteShell demo>
      <div key={route}>
        {route === "/" ? (
          <HomeContent />
        ) : route === "/licenses" ? (
          <LicensesPage />
        ) : route === "/shop" ? (
          <ShopPage />
        ) : route === "/contact" ? (
          <ContactPage />
        ) : route === "/states/massachusetts" ? (
          <CatalogBrowser catalog={demoCatalog} demo />
        ) : route === "/cart" ? (
          <Cart catalog={demoCatalog} demo />
        ) : route === "/courses/video-editing" ? (
          <VideoCourse />
        ) : route === "/courses/video-editing/complete" ? (
          <CompleteVideoCourse />
        ) : editorOffer ? (
          <EditorCityOfferPage offer={editorOffer} />
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
