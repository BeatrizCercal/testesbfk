"use client";

import Image from "next/image";
import Link from "next/link";
import { formatBRL, type Product } from "@/data/products";

const badgeStyle: Record<NonNullable<Product["badge"]>, string> = {
  Lançamento: "bg-brand-sky-500 text-white",
  "Mais vendido": "bg-brand-sky-500 text-brand-ink",
  "Últimas peças": "bg-brand-pink-500 text-white",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col bg-white">
      <div className="relative flex aspect-square items-center justify-center rounded-lg bg-[#F6F6F6]">
        {product.image && product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${badgeStyle[product.badge]}`}
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
          <p className="text-3xl font-extrabold text-black">{formatBRL(product.price)}</p>
          <p className="mt-1 text-sm text-black/50">{product.installments}</p>
        </div>

        <div className="mt-5">
          <Link
            href={`/produtos/${encodeURIComponent(product.id)}`}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-brand-pink-300 text-sm font-bold text-white transition hover:bg-brand-pink-400"
          >
            Comprar
          </Link>
        </div>
      </div>
    </article>
  );
}
