"use client";

import { useEffect, useState } from "react";
import { isProduct, products as initialProducts, PRODUCT_STORAGE_KEY, type Product } from "@/data/products";

/**
 * Catálogo de produtos: começa com o JSON do projeto e, se o admin salvou
 * produtos neste navegador, usa a lista salva.
 */
export function useCatalog() {
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

  return { products, catalogMessage };
}
