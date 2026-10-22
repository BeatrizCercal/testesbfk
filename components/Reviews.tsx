"use client";

import { useState } from "react";
import Image from "next/image";

function StarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#5AC0E3" aria-hidden="true">
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2-4.5-4.4 6.2-.9L12 3Z" />
    </svg>
  );
}

type Review = {
  id: string;
  name: string;
  location: string;
  date: string;
  text: string;
  photo: string;
};

const IMG = (id: string) => `https://images.unsplash.com/${id}?w=200&h=200&fit=crop&crop=faces`;

const reviews: Review[] = [
  {
    id: "raissa",
    name: "Raissa",
    location: "Joinville, SC",
    date: "21/10/2023",
    text: "Roupas de qualidade, preço bom! Vendedoras atenciosas e com vontade de atender, principalmente a Kelly",
    photo: IMG("photo-1494790108377-be9c29b29330"),
  },
  {
    id: "beatriz",
    name: "Beatriz",
    location: "Joinville, SC",
    date: "20/07/2022",
    text: "A melhor! Atendimento impecável, combinados a uma variedade que só encontro nesta loja! Super recomendo",
    photo: IMG("photo-1500648767791-00dcc994a43e"),
  },
  {
    id: "dhuany",
    name: "Dhuany",
    location: "Joinville, SC",
    date: "23/05/2022",
    text: "Amo essa loja, sou cliente há 5 anos... muita variedade em roupas... peças lindas, para todos os gostos e bolsos... sem contar as promoções",
    photo: IMG("photo-1544005313-94ddf0286df2"),
  },
  {
    id: "patricia",
    name: "Patricia",
    location: "Joinville, SC",
    date: "07/05/2022",
    text: "Gostei muito do atendimento, roupas lindas e preços ótimos! Super recomendo! Tem de tudo na loja!",
    photo: IMG("photo-1438761681033-6461ffad8d80"),
  },
  {
    id: "darlene",
    name: "Darlene",
    location: "Joinville, SC",
    date: "30/01/2022",
    text: "Peças de ótima qualidade e muita variedade, sempre antenados com a moda kids. Atendimento muito bom.",
    photo: IMG("photo-1524504388940-b1c1722653e1"),
  },
  {
    id: "elizete",
    name: "Elizete",
    location: "Joinville, SC",
    date: "05/09/2021",
    text: "Nossa! Loja apaixonante, muitas coisas lindas, com toda certeza a melhor loja de Joinville",
    photo: IMG("photo-1487412720507-e7ab37603c6f"),
  },
  {
    id: "diego",
    name: "Diego",
    location: "Joinville, SC",
    date: "25/07/2021",
    text: "Loja com bastante variedade... preço bom, o atendimento também é muito bom... dependendo o dia tem fila",
    photo: IMG("photo-1500917293891-ef795e70e1f6"),
  },
  {
    id: "marcos",
    name: "Marcos",
    location: "Joinville, SC",
    date: "13/10/2020",
    text: "Excelente atendimento, loja da linha kids mais completa de Joinville",
    photo: IMG("photo-1506794778202-cad84cf45f1d"),
  },
  {
    id: "jucelaine",
    name: "Jucelaine",
    location: "Joinville, SC",
    date: "27/09/2020",
    text: "Sempre que preciso de roupas pro meu filho... roupas são de ótima qualidade e um bom atendimento",
    photo: IMG("photo-1502685104226-ee32379fefbe"),
  },
  {
    id: "joice",
    name: "Joice",
    location: "Joinville, SC",
    date: "23/03/2019",
    text: "Atendimento excelente, roupas e calçados de qualidade. Amo comprar roupas para a Isa na Bia Fashion Kids",
    photo: IMG("photo-1489424731084-a5d8b219a5bb"),
  },
];

function cardSizeClasses(state: "hovered" | "neighbor" | "base") {
  if (state === "hovered") return "w-80 h-72 sm:w-96 sm:h-80";
  if (state === "neighbor") return "w-64 h-56 sm:w-72 sm:h-64";
  return "w-72 h-64 sm:w-80 sm:h-72";
}

export function Reviews() {
  const track = [...reviews, ...reviews];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-12" aria-label="Avaliações de clientes">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 className="text-center text-xl font-bold uppercase tracking-[0.3em] text-black sm:text-2xl">Avaliações</h2>
        <div className="mx-auto mt-2 h-1 w-14 bg-black" />
      </div>

      <div className="mx-auto mt-8 max-w-7xl overflow-hidden px-4 sm:px-8">
        <div
          className="flex w-max items-center gap-6 animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDuration: "40s" }}
        >
          {track.map((review, i) => {
            const state: "hovered" | "neighbor" | "base" =
              hoveredIndex === i ? "hovered" : hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1 ? "neighbor" : "base";

            return (
              <div
                key={`${review.id}-${i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white p-5 shadow-sm transition-all duration-300 ease-out ${
                  state === "hovered" ? "z-10 shadow-lg" : ""
                } ${cardSizeClasses(state)}`}
              >
                <Image
                  src={review.photo}
                  alt={review.name}
                  width={64}
                  height={64}
                  className="float-left mb-2 mr-4 h-16 w-16 rounded-full border-4 border-white object-cover shadow"
                />
                <p className="text-xl font-bold text-black">{review.name}</p>
                <p className="text-sm text-black">Data da Avaliação: {review.date}</p>
                <p className="text-sm text-black">{review.location}</p>
                <div className="mt-1 flex -space-x-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                <p className="mt-2 text-base text-black">{review.text}</p>
                <div className="clear-both" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
