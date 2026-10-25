"use client";

import { useState } from "react";

function EnvelopeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m3.5 6.5 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NewsletterBanner() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-brand-sky-600 py-10" aria-label="Cadastro na newsletter">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 sm:px-8 lg:flex-row lg:justify-between">
        <div className="text-center lg:text-left">
          <h2 className="font-display text-xl font-extrabold text-white sm:text-2xl">
            Receba nossas ofertas por e-mail
          </h2>
          <div className="mt-2 flex items-center justify-center gap-2 text-white/90 lg:justify-start">
            <EnvelopeIcon />
            <p className="max-w-md text-left text-sm">
              Cadastre-se em nossa newsletter e receba cupons de desconto em produtos!!
            </p>
          </div>
        </div>

        <form
          className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            aria-label="Digite seu email"
            className="w-full flex-1 rounded-md border-0 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="shrink-0 rounded-md bg-brand-pink-200 px-6 py-3 text-sm font-extrabold tracking-wide text-brand-ink transition hover:bg-brand-pink-300"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </section>
  );
}
