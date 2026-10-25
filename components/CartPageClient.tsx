"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  clearDirectCheckoutItem,
  getCartTotal,
  readCart,
  saveCart,
  type CartItem,
} from "@/data/cart";
import { formatBRL, productGender } from "@/data/products";
import { Blob, Sparkle, Squiggle, Star } from "@/components/decor/Shapes";

export function CartPageClient() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      setItems(readCart());
    } catch {
      setMessage("Não foi possível carregar sua sacola. Os dados salvos podem estar inválidos.");
    }
  }, []);

  function updateCart(nextItems: CartItem[]): void {
    try {
      saveCart(nextItems);
      setItems(nextItems);
      setMessage("");
    } catch {
      setMessage("Não foi possível atualizar sua sacola. Tente novamente.");
    }
  }

  function checkout(): void {
    try {
      clearDirectCheckoutItem();
      router.push("/checkout");
    } catch {
      setMessage("Não foi possível abrir o checkout. Tente novamente.");
    }
  }

  const total = getCartTotal(items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const changeQuantity = (index: number, delta: number) =>
    updateCart(
      items.map((current, itemIndex) =>
        itemIndex === index ? { ...current, quantity: Math.max(1, current.quantity + delta) } : current,
      ),
    );

  return (
    <>
      <Header />
      <main className="kids-section kids-cart">
        <Star className="kids-decor kids-twinkle" color="var(--color-yellow)" style={{ width: 28, left: "4%", top: 36 }} />
        <Sparkle
          className="kids-decor kids-twinkle kids-decor--desktop"
          color="var(--color-pink)"
          style={{ width: 20, right: "6%", top: 48, animationDelay: "1s" }}
        />
        <Blob
          className="kids-decor kids-float--slow kids-float kids-decor--desktop"
          color="var(--color-pink-light)"
          style={{ width: 240, right: -90, bottom: 40 }}
        />

        <div className="kids-cart__inner">
          <div className="kids-cart__head">
            <span className="kids-cart__icon" aria-hidden="true">
              <BagIcon />
            </span>
            <h1 className="kids-cart__title">Minha sacola</h1>
            {items.length > 0 && (
              <span className="kids-cart__count">
                {count} {count === 1 ? "item" : "itens"}
              </span>
            )}
          </div>
          <Squiggle className="kids-cart__squiggle" color="var(--color-pink)" />

          {message && (
            <p role="alert" className="kids-cart__alert">
              {message}
            </p>
          )}

          {items.length === 0 ? (
            <section className="kids-cart__empty">
              <span className="kids-cart__empty-icon" aria-hidden="true">
                <BagIcon />
              </span>
              <p className="kids-cart__empty-text">Sua sacola está vazia.</p>
              <Link href="/" className="kids-cart__primary">
                Voltar a comprar
              </Link>
            </section>
          ) : (
            <div className="kids-cart__layout">
              <ul className="kids-cart__list">
                {items.map((item, index) => {
                  const tone = itemTone(item);
                  const href = `/produtos/${encodeURIComponent(item.product.id)}`;
                  return (
                    <li
                      key={`${item.product.id}-${item.size ?? "sem-tamanho"}-${index}`}
                      className={`kids-cart-item kids-cart-item--${tone}`}
                    >
                      <Link href={href} className="kids-cart-item__photo" tabIndex={-1} aria-hidden="true">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt=""
                            fill
                            unoptimized
                            sizes="88px"
                            className="object-cover"
                          />
                        ) : null}
                      </Link>

                      <div className="kids-cart-item__body">
                        <div className="kids-cart-item__top">
                          <div>
                            <Link href={href} className="kids-cart-item__name">
                              {item.product.name}
                            </Link>
                            <div className="kids-cart-item__tags">
                              <span className="kids-cart-item__tag">{itemAudience(item)}</span>
                              {item.size && <span className="kids-cart-item__tag is-light">Tam. {item.size}</span>}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => updateCart(items.filter((_, itemIndex) => itemIndex !== index))}
                            className="kids-cart-item__remove"
                            aria-label={`Remover ${item.product.name} da sacola`}
                            title="Remover"
                          >
                            <TrashIcon />
                          </button>
                        </div>

                        <div className="kids-cart-item__bottom">
                          <div className="kids-stepper">
                            <button
                              type="button"
                              aria-label={`Diminuir quantidade de ${item.product.name}`}
                              onClick={() => changeQuantity(index, -1)}
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span aria-live="polite">{item.quantity}</span>
                            <button
                              type="button"
                              aria-label={`Aumentar quantidade de ${item.product.name}`}
                              onClick={() => changeQuantity(index, 1)}
                            >
                              +
                            </button>
                          </div>
                          <p className="kids-cart-item__price">{formatBRL(item.product.price * item.quantity)}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <aside className="kids-cart__summary">
                <h2 className="kids-cart__summary-title">Resumo do pedido</h2>
                <div className="kids-cart__row">
                  <span>
                    Produtos ({count} {count === 1 ? "item" : "itens"})
                  </span>
                  <span>{formatBRL(total)}</span>
                </div>
                <div className="kids-cart__row is-total">
                  <span>Subtotal</span>
                  <span>{formatBRL(total)}</span>
                </div>
                <p className="kids-cart__note">Frete calculado na próxima etapa.</p>
                <button type="button" onClick={checkout} className="kids-cart__primary is-full">
                  Ir para pagamento
                </button>
                <Link href="/" className="kids-cart__secondary">
                  Continuar comprando
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

/** Cor do item: menino azul, menina rosa, unissex amarelo (igual às abas) */
function itemTone(item: CartItem): "boy" | "girl" | "yellow" {
  const gender = productGender(item.product);
  return gender === "Menino" ? "boy" : gender === "Menina" ? "girl" : "yellow";
}

function itemAudience(item: CartItem): string {
  if (item.product.category !== "Bebê") return item.product.category;
  return `Bebê · ${productGender(item.product)}`;
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h16M9 7V5h6v2m3 0-.8 12a2 2 0 0 1-2 1.9H8.8a2 2 0 0 1-2-1.9L6 7" />
      <path d="M10 11v6m4-6v6" />
    </svg>
  );
}
