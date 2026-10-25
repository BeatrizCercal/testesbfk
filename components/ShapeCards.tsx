import Image from "next/image";

type ShapeCard = {
  id: string;
  /** Caminho da foto em /public (ex.: "/produtos/minha-foto.png"). Vazio = card sem foto. */
  image?: string;
  alt?: string;
  tone: "pink" | "blue";
  /** Formato orgânico do card */
  shape: "drop" | "arch" | "bubble" | "leaf";
};

const cards: ShapeCard[] = [
  { id: "card-1", tone: "pink", shape: "drop" },
  { id: "card-2", tone: "blue", shape: "arch" },
  { id: "card-3", tone: "pink", shape: "bubble" },
  { id: "card-4", tone: "blue", shape: "leaf" },
];

/** Cards de imagem com bordas orgânicas, acima das marcas */
export function ShapeCards() {
  return (
    <section className="kids-shapes" aria-label="Destaques">
      <div className="kids-shapes__grid mx-auto max-w-7xl px-4 sm:px-8">
        {cards.map((card) => (
          <div key={card.id} className={`kids-shape-card kids-shape-card--${card.tone} kids-shape-card--${card.shape}`}>
            <div className="kids-shape-card__media">
              {card.image && (
                <Image
                  src={card.image}
                  alt={card.alt ?? ""}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
