"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  clearDirectCheckoutItem,
  readCart,
  saveCart,
  saveDirectCheckoutItem,
  type CartItem,
} from "@/data/cart";
import {
  formatBRL,
  isProduct,
  products as initialProducts,
  PRODUCT_STORAGE_KEY,
  type Product,
} from "@/data/products";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const productId = decodeURIComponent(params.id);
  const [product, setProduct] = useState<Product | null>(
    () => initialProducts.find((item) => item.id === productId) ?? null,
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [catalogMessage, setCatalogMessage] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    try {
      const savedProducts = window.localStorage.getItem(PRODUCT_STORAGE_KEY);
      if (!savedProducts) return;

      const parsedProducts: unknown = JSON.parse(savedProducts);
      if (!Array.isArray(parsedProducts) || !parsedProducts.every(isProduct)) {
        setCatalogMessage("Não foi possível carregar os produtos salvos neste navegador.");
        return;
      }

      const savedProduct = parsedProducts.find((item) => item.id === productId);
      if (savedProduct) setProduct(savedProduct);
    } catch {
      setCatalogMessage("Não foi possível carregar os produtos salvos neste navegador.");
    }
  }, [productId]);

  useEffect(() => {
    if (product?.sizes?.length === 1) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  function makeCartItem(): CartItem | null {
    if (!product) return null;
    if (product.sizes?.length && !selectedSize) {
      setCartMessage("Selecione um tamanho antes de continuar.");
      return null;
    }
    return { product, quantity, ...(selectedSize ? { size: selectedSize } : {}) };
  }

  function addToCart(): void {
    const item = makeCartItem();
    if (!item) return;

    try {
      const cart = readCart();
      const existingIndex = cart.findIndex(
        (cartItem) => cartItem.product.id === item.product.id && cartItem.size === item.size,
      );
      if (existingIndex >= 0) {
        cart[existingIndex] = {
          ...cart[existingIndex],
          quantity: cart[existingIndex].quantity + item.quantity,
        };
      } else {
        cart.push(item);
      }

      saveCart(cart);
      setCartMessage("Produto adicionado à sacola.");
    } catch {
      setCartMessage("Não foi possível salvar o produto na sacola. Tente novamente.");
    }
  }

  function buyNow(): void {
    const item = makeCartItem();
    if (!item) return;

    try {
      clearDirectCheckoutItem();
      saveDirectCheckoutItem(item);
      router.push("/checkout");
    } catch {
      setCartMessage("Não foi possível iniciar a compra. Tente novamente.");
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/#produtos"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-sky-600 transition hover:text-brand-pink-500"
        >
          <span aria-hidden="true">←</span> Voltar para os produtos
        </Link>

        {product ? (
          <article className="grid gap-8 rounded-2xl bg-white sm:gap-10 md:grid-cols-2 md:items-start">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#F6F6F6] sm:aspect-[4/3] md:aspect-square">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : null}
              {product.image && product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-brand-sky-500 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="flex flex-col py-1 md:py-4">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-pink-500">
                {product.icon === "shoe" ? "Calçado infantil" : "Acessório infantil"}
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-5 border-b border-brand-sky-100 pb-5">
                {product.oldPrice && (
                  <p className="text-base text-black/45 line-through">{formatBRL(product.oldPrice)}</p>
                )}
                <p className="mt-1 text-3xl font-extrabold text-brand-ink">{formatBRL(product.price)}</p>
                <p className="mt-1 text-sm text-black/60">{product.installments}</p>
              </div>

              <section className="mt-6" aria-labelledby="description-heading">
                <h2 id="description-heading" className="text-base font-bold text-brand-ink">
                  Sobre o produto
                </h2>
                <p className="mt-2 leading-7 text-black/70">
                  {product.description || "Um produto especial para acompanhar os momentos do dia a dia."}
                </p>
              </section>

              {product.sizes && product.sizes.length > 0 && (
                <fieldset className="mt-6">
                  <legend className="text-sm font-bold text-brand-ink">
                    Tamanho{selectedSize ? `: ${selectedSize}` : ""}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        aria-pressed={selectedSize === size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-h-11 min-w-11 rounded-lg border px-3 text-sm font-semibold transition ${
                          selectedSize === size
                            ? "border-brand-pink-500 bg-brand-pink-500 text-white"
                            : "border-brand-sky-100 text-brand-ink hover:border-brand-pink-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-bold text-brand-ink">Quantidade</span>
                <div className="flex h-11 items-center rounded-lg border border-brand-sky-100">
                  <button
                    type="button"
                    aria-label="Diminuir quantidade"
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                    className="flex h-full w-10 items-center justify-center text-brand-ink/70 transition hover:text-brand-pink-500"
                  >
                    −
                  </button>
                  <span aria-live="polite" className="w-6 text-center text-sm font-semibold text-brand-ink">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Aumentar quantidade"
                    onClick={() => setQuantity((current) => current + 1)}
                    className="flex h-full w-10 items-center justify-center text-brand-ink/70 transition hover:text-brand-pink-500"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={addToCart}
                  className="min-h-12 rounded-lg border-2 border-brand-pink-500 px-5 py-3 text-sm font-bold text-brand-pink-600 transition hover:bg-brand-pink-50"
                >
                  Adicionar ao carrinho
                </button>
                <button
                  type="button"
                  onClick={buyNow}
                  className="min-h-12 rounded-lg bg-brand-pink-500 px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brand-pink-600"
                >
                  Comprar agora
                </button>
              </div>

              {cartMessage && (
                <p role="status" className="mt-4 text-sm font-semibold text-brand-sky-600">
                  {cartMessage}
                </p>
              )}

              {catalogMessage && (
                <p role="status" className="mt-4 text-sm text-brand-pink-600">
                  {catalogMessage}
                </p>
              )}
            </div>
          </article>
        ) : (
          <section className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-2xl font-bold text-brand-ink">Produto não encontrado</h1>
            <p className="max-w-md text-brand-ink/70">
              Este produto pode ter sido removido do catálogo.
            </p>
            {catalogMessage && (
              <p role="status" className="text-sm text-brand-pink-600">
                {catalogMessage}
              </p>
            )}
            <Link
              href="/#produtos"
              className="mt-2 rounded-full bg-brand-pink-500 px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-brand-pink-600"
            >
              Ver produtos
            </Link>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
