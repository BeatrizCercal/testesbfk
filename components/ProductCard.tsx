"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatBRL, type Product } from "@/data/products";

const badgeStyle: Record<NonNullable<Product["badge"]>, string> = {
  Lançamento: "bg-brand-sky-500 text-white",
  "Mais vendido": "bg-brand-sky-500 text-brand-ink",
  "Últimas peças": "bg-brand-pink-500 text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <article className="kids-card flex flex-col bg-white">
      <div className="kids-card__media relative flex aspect-square items-center justify-center rounded-lg bg-[#F6F6F6]">
        <button
          type="button"
          className="kids-fav"
          aria-pressed={favorite}
          aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Adicionar ${product.name} aos favoritos`}
          onClick={() => setFavorite((f) => !f)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M12 20.5s-7.2-4.4-9.2-8.9C1.4 8.3 3.4 4.8 6.8 4.5c1.9-.2 3.7.8 5.2 2.6 1.5-1.8 3.3-2.8 5.2-2.6 3.4.3 5.4 3.8 4 7.1-2 4.5-9.2 8.9-9.2 8.9Z"
              fill={favorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {product.image && product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold  tracking-wide ${badgeStyle[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={480}
            height={480}
            unoptimized
            className="h-full w-full rounded-lg object-cover"
          />
        ) : null}
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
          <p className="kids-price text-3xl font-extrabold">{formatBRL(product.price)}</p>
          <p className="mt-1 text-sm text-black/50">{product.installments}</p>
        </div>

        <div className="mt-5">
          <Link
            href={`/produtos/${encodeURIComponent(product.id)}`}
            className="kids-card__buy flex h-11 w-full items-center justify-center rounded-lg bg-brand-pink-300 text-sm font-bold text-white transition hover:bg-brand-pink-400"
          >
            Comprar
          </Link>
        </div>
      </div>
    </article>
  );
}
