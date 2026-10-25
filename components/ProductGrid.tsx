"use client";

import { useEffect, useMemo, useState } from "react";
import { isProduct, products as initialProducts, PRODUCT_STORAGE_KEY, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Blob, Doodle, Sparkle, Star } from "./decor/Shapes";

type ProductTab = "Todos" | "Calçados" | "Acessórios";

const tabs: ProductTab[] = ["Todos", "Calçados", "Acessórios"];

export function ProductGrid() {
  const [active, setActive] = useState<ProductTab>("Todos");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [catalogMessage, setCatalogMessage] = useState("");

  useEffect(() => {
    try {
      const savedProducts = window.localStorage.getItem(PRODUCT_STORAGE_KEY);
      if (!savedProducts) return;

      const parsedProducts: unknown = JSON.parse(savedProducts);
      if (!Array.isArray(parsedProducts) || !parsedProducts.every(isProduct)) {
        setCatalogMessage("Não foi possível exibir os produtos salvos neste navegador.");
        return;
      }
      setProducts(parsedProducts);
    } catch {
      setCatalogMessage("Não foi possível carregar o catálogo salvo neste navegador.");
    }
  }, []);

  const filtered = useMemo(
    () => {
      if (active === "Todos") return products;
      const icon = active === "Calçados" ? "shoe" : "accessory";
      return products.filter((product) => product.icon === icon);
    },
    [active, products]
  );

  return (
    <section id="produtos" className="kids-section" aria-labelledby="produtos-heading">
      <Blob
        className="kids-decor kids-float--slow kids-float kids-decor--desktop"
        color="var(--color-sky-light)"
        style={{ width: 260, left: -90, top: 40 }}
      />
      <Blob
        className="kids-decor kids-float kids-decor--desktop"
        color="var(--color-pink-light)"
        style={{ width: 220, right: -70, bottom: 30 }}
      />
      <Sparkle className="kids-decor kids-twinkle" style={{ width: 20, right: "8%", top: 28 }} />
      <Star
        className="kids-decor kids-twinkle kids-decor--desktop"
        color="var(--color-sky-medium)"
        style={{ width: 24, left: "6%", bottom: 60, animationDelay: "1s" }}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-pink-500">Calçados e acessórios</p>
          <h2 id="produtos-heading" className="kids-title font-display text-2xl font-bold text-brand-ink sm:text-3xl">
            <Star className="kids-title__icon kids-wiggle" color="var(--color-sky)" />
            Produtos em destaque
            <Doodle className="kids-title__doodle kids-decor--desktop" />
          </h2>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar produtos por categoria">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active === tab}
              onClick={() => setActive(tab)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                active === tab
                  ? "bg-brand-pink-500 text-white shadow-soft"
                  : "bg-brand-pink-50 text-brand-ink/70 hover:bg-brand-pink-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {catalogMessage && <p role="status" className="mt-5 text-center text-sm text-brand-pink-600">{catalogMessage}</p>}
      </div>
    </section>
  );
}
