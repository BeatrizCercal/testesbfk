import Link from "next/link";
import { AccessoryIcon, DressIcon } from "./icons/ClothingIcons";

export function PromoBanner() {
  return (
    <section id="promocoes" className="mx-auto max-w-7xl px-4 pb-4">
      <div className="relative overflow-hidden rounded-xl2 bg-gradient-to-r from-brand-sky-400 to-brand-sky-500 px-6 py-10 sm:px-12 sm:py-14">
        <DressIcon className="pointer-events-none absolute -left-8 -top-6 h-40 w-40 rotate-[-12deg] opacity-20" aria-hidden="true" />
        <AccessoryIcon className="pointer-events-none absolute -right-6 -bottom-8 h-44 w-44 rotate-12 opacity-20" aria-hidden="true" />

        <div className="relative flex flex-col items-center gap-4 text-center">
          <p className="rounded-full bg-brand-ink/10 px-4 py-1 text-xs font-extrabold text-brand-ink">
            Por tempo limitado
          </p>
          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            Leve 3, pague 2 em toda a coleção
          </h2>
          <p className="max-w-md text-sm font-semibold text-brand-ink/70">
            Válido para vestidos, conjuntos e camisetas selecionadas. Peça de menor valor sai de graça.
          </p>
          <Link
            href="#produtos"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-ink px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-pink-600"
          >
            Aproveitar promoção
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
