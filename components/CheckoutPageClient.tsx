"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  getCartTotal,
  readCart,
  readDirectCheckoutItem,
  type CartItem,
} from "@/data/cart";
import { formatBRL } from "@/data/products";

export function CheckoutPageClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loadMessage, setLoadMessage] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    try {
      const directItem = readDirectCheckoutItem();
      setItems(directItem ? [directItem] : readCart());
    } catch {
      setLoadMessage("Não foi possível carregar o pedido. Volte à sacola e tente novamente.");
    }
  }, []);

  const total = getCartTotal(items);

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="font-display text-3xl font-bold text-brand-ink">Finalizar compra</h1>

        {loadMessage ? (
          <p role="alert" className="mt-6 rounded-lg bg-brand-pink-50 p-4 font-semibold text-brand-pink-600">
            {loadMessage}
          </p>
        ) : items.length === 0 ? (
          <section className="mt-8 rounded-2xl bg-white p-8 text-center">
            <p className="font-semibold text-brand-ink">Sua sacola está vazia.</p>
            <Link
              href="/#produtos"
              className="mt-5 inline-flex rounded-full bg-brand-pink-500 px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-brand-pink-600"
            >
              Escolher produtos
            </Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-brand-ink">Seu pedido</h2>
              <ul className="mt-5 divide-y divide-brand-sky-100">
                {items.map((item, index) => {
                  return (
                    <li
                      key={`${item.product.id}-${item.size ?? "sem-tamanho"}-${index}`}
                      className="flex items-center gap-4 py-4"
                    >
                      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F6F6F6]">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            unoptimized
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-brand-ink">{item.product.name}</p>
                        <p className="mt-1 text-sm text-brand-ink/65">
                          {item.size ? `Tamanho ${item.size} · ` : ""}
                          Quantidade: {item.quantity}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-bold text-brand-ink">
                        {formatBRL(item.product.price * item.quantity)}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/carrinho"
                className="mt-4 inline-flex text-sm font-semibold text-brand-sky-600 hover:underline"
              >
                Voltar para a sacola
              </Link>
            </section>

            <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand-ink">Resumo do pedido</h2>
              <div className="mt-5 flex justify-between border-t border-brand-sky-100 pt-4">
                <span className="font-semibold text-brand-ink">Total</span>
                <span className="text-lg font-extrabold text-brand-ink">{formatBRL(total)}</span>
              </div>
              <p className="mt-2 text-sm text-brand-ink/60">O frete ainda não está incluído.</p>
              <button
                type="button"
                onClick={() =>
                  setPaymentMessage(
                    "O checkout está em modo demonstrativo. Nenhum pagamento foi realizado. Para cobrar, é necessário configurar um gateway de pagamento.",
                  )
                }
                className="mt-6 min-h-12 w-full rounded-lg bg-brand-pink-500 px-5 py-3 font-bold text-white shadow-soft transition hover:bg-brand-pink-600"
              >
                Pagar agora
              </button>
              <p className="mt-4 rounded-lg bg-brand-sky-100 p-3 text-sm leading-6 text-brand-ink/80">
                O pagamento online ainda não está configurado. Este botão não fará cobranças.
              </p>
              {paymentMessage && (
                <p role="status" className="mt-3 text-sm font-semibold text-brand-pink-600">
                  {paymentMessage}
                </p>
              )}
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
