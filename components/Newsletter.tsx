"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-brand-pink-600">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-12 text-center text-white sm:py-16">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Ganhe 10% na primeira compra</h2>
        <p className="max-w-md text-sm text-white/85">
          Assine nossa newsletter e receba novidades, promoções exclusivas e dicas de moda infantil.
        </p>

        {sent ? (
          <p className="mt-2 rounded-full bg-white/15 px-5 py-2 text-sm font-bold">
            Prontinho! Confira seu e-mail para o cupom. 💌
          </p>
        ) : (
          <form
            className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Seu e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-email@exemplo.com"
              className="w-full flex-1 rounded-full border-2 border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-brand-sky-500 px-6 py-3 text-sm font-extrabold text-brand-ink transition hover:bg-brand-sky-400"
            >
              Quero meu cupom
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
