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
import { formatBRL } from "@/data/products";

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

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="font-display text-3xl font-bold text-brand-ink">Minha sacola</h1>
        {message && (
          <p role="alert" className="mt-4 rounded-lg bg-brand-pink-50 p-4 text-sm font-semibold text-brand-pink-600">
            {message}
          </p>
        )}

        {items.length === 0 ? (
          <section className="flex min-h-[35vh] flex-col items-center justify-center gap-4 text-center">
            <p className="text-lg font-semibold text-brand-ink">Sua sacola está vazia.</p>
            <Link
              href="/"
              className="rounded-full bg-brand-pink-500 px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-brand-pink-600"
            >
              Voltar a comprar
            </Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            <ul className="space-y-4">
              {items.map((item, index) => {
                return (
                  <li
                    key={`${item.product.id}-${item.size ?? "sem-tamanho"}-${index}`}
                    className="grid grid-cols-[88px_1fr] gap-4 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr]"
                  >
                    <Link
                      href={`/produtos/${encodeURIComponent(item.product.id)}`}
                      className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#F6F6F6]"
                    >
                      {item.product.image ? (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          unoptimized
                          sizes="120px"
                          className="object-cover"
                        />
                      ) : null}
                    </Link>
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/produtos/${encodeURIComponent(item.product.id)}`}
                            className="font-bold text-brand-ink hover:text-brand-pink-600"
                          >
                            {item.product.name}
                          </Link>
                          {item.size && <p className="mt-1 text-sm text-brand-ink/70">Tamanho: {item.size}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => updateCart(items.filter((_, itemIndex) => itemIndex !== index))}
                          className="text-sm font-semibold text-brand-pink-600 hover:underline"
                          aria-label={`Remover ${item.product.name} da sacola`}
                        >
                          Remover
                        </button>
                      </div>
                      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                        <div className="flex h-10 items-center rounded-lg border border-brand-sky-100">
                          <button
                            type="button"
                            aria-label={`Diminuir quantidade de ${item.product.name}`}
                            onClick={() =>
                              updateCart(
                                items.map((current, itemIndex) =>
                                  itemIndex === index
                                    ? { ...current, quantity: Math.max(1, current.quantity - 1) }
                                    : current,
                                ),
                              )
                            }
                            className="flex h-full w-9 items-center justify-center text-brand-ink/70 hover:text-brand-pink-500"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Aumentar quantidade de ${item.product.name}`}
                            onClick={() =>
                              updateCart(
                                items.map((current, itemIndex) =>
                                  itemIndex === index
                                    ? { ...current, quantity: current.quantity + 1 }
                                    : current,
                                ),
                              )
                            }
                            className="flex h-full w-9 items-center justify-center text-brand-ink/70 hover:text-brand-pink-500"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold text-brand-ink">
                          {formatBRL(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand-ink">Resumo do pedido</h2>
              <div className="mt-5 flex justify-between border-t border-brand-sky-100 pt-4 text-base">
                <span className="font-semibold text-brand-ink">Subtotal</span>
                <span className="font-bold text-brand-ink">{formatBRL(total)}</span>
              </div>
              <p className="mt-2 text-sm text-brand-ink/60">Frete calculado na próxima etapa.</p>
              <button
                type="button"
                onClick={checkout}
                className="mt-6 min-h-12 w-full rounded-lg bg-brand-pink-500 px-5 py-3 font-bold text-white shadow-soft transition hover:bg-brand-pink-600"
              >
                Ir para pagamento
              </button>
              <Link
                href="/"
                className="mt-4 block text-center text-sm font-semibold text-brand-sky-600 hover:underline"
              >
                Continuar comprando
              </Link>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
