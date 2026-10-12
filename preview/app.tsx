import { createRoot } from "react-dom/client";
import { useEffect, useSyncExternalStore } from "react";
import { LicensesPage, ShopPage, ContactPage } from "@/components/information-pages";
import { SiteShell } from "@/components/site-shell";
import { VideoCourse } from "@/components/video-course";
import { CompleteVideoCourse } from "@/components/complete-video-course";
import { EnglishCourse } from "@/components/english-course";
import { CountryPreparation } from "@/components/country-preparation";
import { PartnershipPage, CompanyPartnershipPage, CityPartnershipPage } from "@/components/partnership-pages";
import { PartnershipCityBrowser } from "@/components/partnership-city-browser";
import { getPartnershipCity } from "@/lib/partnerships";
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
  const partnershipParts = route.split("/");
  const partnershipCity = route.startsWith("/partnership/cities/") && partnershipParts.length === 5 ? getPartnershipCity(partnershipParts[3], partnershipParts[4], true) : undefined;
  const license = route.startsWith("/cities/")
    ? demoCatalog.find((city) => city.slug === route.slice(8))
    : undefined;
  const editorOffer = route.startsWith("/courses/video-editing/") ? editorDraft(route.slice("/courses/video-editing/".length)) : undefined;
  useEffect(() => {
    document.title = `${license?.city ?? editorOffer?.city ?? partnershipCity?.name ?? (route.startsWith("/partnership") ? "Parceria" : route === "/countries/brazil" ? "Brasil" : route === "/countries/canada" ? "Canadá" : route === "/courses/english" ? "Home Pros School" : route === "/licenses" ? "Licenças" : route === "/shop" ? "Loja" : route === "/contact" ? "Contato" : route === "/cart" ? "Seu carrinho" : route.startsWith("/courses/video-editing") ? "Curso de edição de vídeos" : "Home Pros Constructors")} | Prévia para aprovação`;
    const anchor = fullRoute.split("#")[1];
    if (anchor) document.getElementById(anchor)?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [route, fullRoute, license, editorOffer?.city, partnershipCity?.name]);
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
        ) : route === "/courses/english" ? (
          <EnglishCourse />
        ) : route === "/countries/brazil" ? (
          <CountryPreparation country="Brasil" />
        ) : route === "/countries/canada" ? (
          <CountryPreparation country="Canadá" />
        ) : route === "/partnership" ? (
          <PartnershipPage />
        ) : route === "/partnership/company" ? (
          <CompanyPartnershipPage demo />
        ) : route === "/partnership/cities" ? (
          <PartnershipCityBrowser demo />
        ) : partnershipCity ? (
          <CityPartnershipPage city={partnershipCity} />
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
