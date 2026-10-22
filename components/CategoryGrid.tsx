import Link from "next/link";
import { categories } from "@/data/products";
import { iconMap } from "./icons";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16" aria-labelledby="categorias-heading">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-pink-500">Compre por categoria</p>
          <h2 id="categorias-heading" className="font-display text-2xl font-bold text-brand-ink sm:text-3xl">
            O que você procura hoje?
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-5">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon];
          return (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center gap-3 rounded-xl2 border border-brand-pink-100 bg-white p-4 text-center shadow-card transition hover:-translate-y-1 hover:border-brand-pink-300"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink-50 transition group-hover:bg-brand-sky-100 sm:h-20 sm:w-20">
                <Icon className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden="true" />
              </span>
              <span className="text-xs font-bold text-brand-ink sm:text-sm">{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
