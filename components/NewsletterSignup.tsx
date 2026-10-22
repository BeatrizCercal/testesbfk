"use client";

import { useState } from "react";

function EnvelopeIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="1.6" />
      <path d="m4 6.5 8 6 8-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NewsletterSignup() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-brand-pink-500 py-8 lg:py-20" aria-label="Receba nossas ofertas por e-mail">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Receba nossas ofertas por e-mail</h2>
          <div className="mt-2 flex items-start gap-2 text-base text-white/90">
            <EnvelopeIcon />
            <p>Cadastre-se em nossa newsletter e receba cupons de desconto em produtos!!</p>
          </div>
        </div>

        <form className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            className="w-full rounded-md bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none sm:w-80"
          />
          <button
            type="submit"
            className="shrink-0 rounded-md bg-brand-pink-100 px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-white"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </section>
  );
}
