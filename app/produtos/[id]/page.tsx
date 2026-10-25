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
  productGender,
  type Product,
} from "@/data/products";
import { Blob, Sparkle, Star } from "@/components/decor/Shapes";

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
  const [cartAdded, setCartAdded] = useState(false);

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
      setCartAdded(false);
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
      setCartAdded(true);
      setCartMessage("Produto adicionado à sacola.");
    } catch {
      setCartAdded(false);
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

  const tone = product ? productTone(product) : "boy";
  const backHref = product ? categoryHref(product) : "/";

  return (
    <>
      <Header />
      <main className={`kids-section kids-pd kids-pd--${tone}`}>
        <Star className="kids-decor kids-twinkle" color="var(--color-yellow)" style={{ width: 28, left: "3%", top: 40 }} />
        <Sparkle
          className="kids-decor kids-twinkle kids-decor--desktop"
          color="var(--color-pink)"
          style={{ width: 20, right: "5%", top: 70, animationDelay: "1s" }}
        />
        <Blob
          className="kids-decor kids-float--slow kids-float kids-decor--desktop"
          color="var(--pd-soft)"
          style={{ width: 280, left: -110, bottom: 20 }}
        />

        <div className="kids-pd__inner">
          <Link href={backHref} className="kids-pd__back">
            <span aria-hidden="true">←</span> Voltar para os produtos
          </Link>

          {product ? (
            <article className="kids-pd__grid">
              <div className="kids-pd__media">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    priority
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : null}
                {product.badge && <span className="kids-pd__badge">{product.badge}</span>}
              </div>

              <div className="kids-pd__info">
                <div className="kids-pd__tags">
                  <span className="kids-pd__tag">
                    {product.icon === "shoe" ? "Calçado infantil" : "Acessório infantil"}
                  </span>
                  <span className="kids-pd__tag is-tone">{audienceLabel(product)}</span>
                </div>

                <h1 className="kids-pd__title">{product.name}</h1>

                <div className="kids-pd__price-box">
                  {product.oldPrice && <p className="kids-pd__old-price">{formatBRL(product.oldPrice)}</p>}
                  <p className="kids-pd__price">{formatBRL(product.price)}</p>
                  <p className="kids-pd__installments">{product.installments}</p>
                </div>

                <section className="kids-pd__block" aria-labelledby="description-heading">
                  <h2 id="description-heading" className="kids-pd__label">
                    Sobre o produto
                  </h2>
                  <p className="kids-pd__description">
                    {product.description || "Um produto especial para acompanhar os momentos do dia a dia."}
                  </p>
                </section>

                {product.sizes && product.sizes.length > 0 && (
                  <fieldset className="kids-pd__block">
                    <legend className="kids-pd__label">
                      Tamanho{selectedSize ? `: ${selectedSize}` : ""}
                    </legend>
                    <div className="kids-pd__sizes">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          aria-pressed={selectedSize === size}
                          onClick={() => {
                            setSelectedSize(size);
                            setCartMessage("");
                          }}
                          className="kids-pd__size"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                <div className="kids-pd__block kids-pd__qty">
                  <span className="kids-pd__label">Quantidade</span>
                  <div className="kids-stepper">
                    <button
                      type="button"
                      aria-label="Diminuir quantidade"
                      onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span aria-live="polite">{quantity}</span>
                    <button type="button" aria-label="Aumentar quantidade" onClick={() => setQuantity((current) => current + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="kids-pd__actions">
                  <button type="button" onClick={buyNow} className="kids-pd__buy">
                    Comprar agora
                  </button>
                  <button type="button" onClick={addToCart} className="kids-pd__add">
                    <BagIcon />
                    Adicionar à sacola
                  </button>
                </div>

                {cartMessage && (
                  <p role="status" className={`kids-pd__toast ${cartAdded ? "is-success" : ""}`}>
                    {cartMessage}
                    {cartAdded && (
                      <Link href="/carrinho" className="kids-pd__toast-link">
                        Ver sacola
                      </Link>
                    )}
                  </p>
                )}

                {catalogMessage && (
                  <p role="status" className="kids-pd__toast">
                    {catalogMessage}
                  </p>
                )}
              </div>
            </article>
          ) : (
            <section className="kids-pd__missing">
              <h1 className="kids-pd__title">Produto não encontrado</h1>
              <p className="kids-pd__description">Este produto pode ter sido removido do catálogo.</p>
              {catalogMessage && (
                <p role="status" className="kids-pd__toast">
                  {catalogMessage}
                </p>
              )}
              <Link href="/" className="kids-pd__buy">
                Ver produtos
              </Link>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

/** Menino azul, menina rosa, unissex amarelo (mesmo padrão das abas e da sacola) */
function productTone(product: Product): "boy" | "girl" | "yellow" {
  const gender = productGender(product);
  return gender === "Menino" ? "boy" : gender === "Menina" ? "girl" : "yellow";
}

function audienceLabel(product: Product): string {
  return product.category === "Bebê" ? `Bebê · ${productGender(product)}` : product.category;
}

/** "Voltar" leva para a categoria do produto */
function categoryHref(product: Product): string {
  if (product.category === "Bebê") return "/categorias/bebe";
  return product.category === "Menino" ? "/categorias/meninos" : "/categorias/meninas";
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </svg>
  );
}
