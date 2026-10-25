"use client";

import Image from "next/image";
import { useRef } from "react";
import { Sparkle, Squiggle } from "./decor/Shapes";

type Brand = {
  id: string;
  name: string;
  image: string;
};

const brands: Brand[] = [
  { id: "adidas", name: "Adidas", image: "/logo/adidas.png" },
  { id: "charpey", name: "Charpey", image: "/logo/charpey.png" },
  { id: "fila", name: "Fila", image: "/logo/fila.png" },
  { id: "minico", name: "Mini & co", image: "/logo/minico.jpeg" },
  { id: "moleca", name: "Moleca", image: "/logo/moleca.png" },
  { id: "molekinha", name: "Molekinha", image: "/logo/molekinha.jpeg" },
  { id: "molekinho", name: "Molekinho", image: "/logo/molekinho.png" },
  { id: "nike", name: "Nike", image: "/logo/nike.jpeg" },
  { id: "pimpolho", name: "Pimpolho", image: "/logo/pimpolho.png" },
];

export function BrandsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByItem = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("[data-brand]");
    const amount = (item?.offsetWidth ?? el.clientWidth / 4) + 24;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section className="relative bg-white py-10" aria-label="Marcas">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 className="text-center text-xl font-bold uppercase tracking-[0.3em] text-brand-sky-600 sm:text-2xl">
          <span className="kids-title">
            <Sparkle className="kids-title__icon kids-twinkle" color="var(--color-sky)" />
            As melhores marcas
            <Sparkle className="kids-title__icon kids-twinkle" color="var(--color-pink)" style={{ animationDelay: "1.2s" }} />
          </span>
        </h2>
        <Squiggle className="kids-squiggle" color="var(--color-pink)" />
      </div>

      <div className="relative mx-auto mt-8 max-w-7xl px-4 sm:px-8">
        <button
          type="button"
          onClick={() => scrollByItem(-1)}
          aria-label="Ver marcas anteriores"
          className="absolute left-0 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-brand-ink shadow-md transition hover:bg-gray-50"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByItem(1)}
          aria-label="Ver mais marcas"
          className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 translate-x-1/2 rounded-full bg-white p-2 text-brand-ink shadow-md transition hover:bg-gray-50"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 sm:gap-10 lg:justify-center lg:gap-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              data-brand
              className="flex w-32 shrink-0 snap-start flex-col items-center gap-4 sm:w-36"
            >
              <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm sm:h-36 sm:w-36">
                <Image src={brand.image} alt={`Logo ${brand.name}`} fill className="rounded-full object-contain" sizes="144px" />
              </div>
              <p className="text-base font-bold text-black">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
