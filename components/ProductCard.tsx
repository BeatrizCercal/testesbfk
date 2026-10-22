"use client";

import Image from "next/image";
import { useState } from "react";
import { formatBRL, type Product } from "@/data/products";
import { iconMap } from "./icons";

const tintBg: Record<Product["tint"], string> = {
  pink: "bg-brand-pink-50",
  sky: "bg-brand-sky-100",
  gold: "bg-brand-sky-100",
};

const badgeStyle: Record<NonNullable<Product["badge"]>, string> = {
  Lançamento: "bg-brand-sky-500 text-white",
  "Mais vendido": "bg-brand-sky-500 text-brand-ink",
  "Últimas peças": "bg-brand-pink-500 text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const Icon = iconMap[product.icon];
  const [qty, setQty] = useState(1);

  return (
    <article className="flex flex-col bg-white">
      <div className={`relative flex aspect-square items-center justify-center rounded-lg ${tintBg[product.tint]}`}>
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${badgeStyle[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label={`Favoritar ${product.name}`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-black/35 transition hover:text-brand-pink-500"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 20s-7.5-4.6-10-9.3C.4 7 2.3 3.5 6 3.5c2 0 3.6 1.1 4.5 2.6.9-1.5 2.5-2.6 4.5-2.6 3.7 0 5.6 3.5 4 7.2C19.5 15.4 12 20 12 20Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={480}
            height={480}
            unoptimized
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <Icon className="h-32 w-32 transition duration-300 hover:scale-105 sm:h-40 sm:w-40" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5 text-center">
        <h3 className="line-clamp-2 text-base text-black">{product.name}</h3>
        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm text-black/60">{product.description}</p>
        )}
        {product.sizes && product.sizes.length > 0 && (
          <p className="mt-2 text-xs font-semibold text-brand-sky-600">
            Tamanhos: {product.sizes.join(", ")}
          </p>
        )}

        <div className="mt-auto pt-4">
          {product.oldPrice && (
            <p className="text-sm text-black/40 line-through">{formatBRL(product.oldPrice)}</p>
          )}
          <p className="text-3xl font-extrabold text-black">{formatBRL(product.price)}</p>
          <p className="mt-1 text-sm text-black/50">{product.installments}</p>
        </div>

        <div className="mt-5 flex items-stretch gap-3">
          <div className="flex h-11 items-center rounded-lg border border-black/15">
            <button
              type="button"
              aria-label="Diminuir quantidade"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-full w-10 items-center justify-center text-black/60 transition hover:text-black"
            >
              −
            </button>
            <span className="w-5 text-center text-sm font-semibold text-black">{qty}</span>
            <button
              type="button"
              aria-label="Aumentar quantidade"
              onClick={() => setQty((q) => q + 1)}
              className="flex h-full w-10 items-center justify-center text-black/60 transition hover:text-black"
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="h-11 flex-1 rounded-lg bg-brand-pink-300 text-sm font-bold text-white transition hover:bg-brand-pink-400"
          >
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}
