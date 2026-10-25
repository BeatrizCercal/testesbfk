"use client";

import { useEffect, useMemo, useState } from "react";
import { productGender, productsForCategory, type BabyGender, type CategoryKey } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { useCatalog } from "./useCatalog";

export type CategoryTheme = "boy" | "girl" | "mix";

type Subdivision = "Todos" | BabyGender;

type CategoryCatalogProps = {
  categoryKey: CategoryKey;
  title: string;
  theme: CategoryTheme;
  /** Abas de subdivisão (ex.: Menino / Menina / Unissex). Sem abas quando vazio. */
  subdivisions?: BabyGender[];
};

/** Slug usado na URL (?genero=menino) para poder compartilhar a aba aberta */
const toSlug = (value: Subdivision) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export function CategoryCatalog({
  categoryKey,
  title,
  theme,
  subdivisions = [],
}: CategoryCatalogProps) {
  const { products, catalogMessage } = useCatalog();
  const tabs: Subdivision[] = subdivisions.length > 0 ? ["Todos", ...subdivisions] : [];
  const [active, setActive] = useState<Subdivision>("Todos");

  // Abre a aba indicada na URL, se houver
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("genero");
    const match = subdivisions.find((sub) => toSlug(sub) === fromUrl);
    if (match) setActive(match);
  }, [subdivisions]);

  const selectTab = (tab: Subdivision) => {
    setActive(tab);
    const url = new URL(window.location.href);
    if (tab === "Todos") url.searchParams.delete("genero");
    else url.searchParams.set("genero", toSlug(tab));
    window.history.replaceState(null, "", url);
  };

  const inCategory = useMemo(() => productsForCategory(products, categoryKey), [products, categoryKey]);
  const visible = useMemo(
    () => (active === "Todos" ? inCategory : inCategory.filter((product) => productGender(product) === active)),
    [inCategory, active],
  );


  return (
    <div className={`kids-theme--${theme}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h1 className="sr-only">{title}</h1>

        {tabs.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-2" role="tablist" aria-label={`Filtrar ${title}`}>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active === tab}
                onClick={() => selectTab(tab)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition kids-tab ${
                  tab === "Menino" ? "kids-tab--boy" : tab === "Menina" ? "kids-tab--girl" : ""
                } ${active === tab ? "kids-tab--active" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        <div className="py-10 sm:py-12">
          {visible.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="kids-empty">Nenhum produto cadastrado aqui ainda.</p>
          )}
          {catalogMessage && (
            <p role="status" className="mt-5 text-center text-sm text-brand-pink-600">
              {catalogMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
