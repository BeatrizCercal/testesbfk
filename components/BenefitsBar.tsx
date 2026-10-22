const benefits = [
  {
    title: "Parcelamento",
    text: "até 10x Sem Juros",
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2.5" y="5" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M2.5 9.5h19" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Avaliações",
    text: "dos Clientes",
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2-4.5-4.4 6.2-.9L12 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Frete Grátis",
    text: "acima de R$ 299 ( Sul e sudeste)",
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M1 9h2M2 12h2.5M1 15h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 7h9v9H6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M15 10.5h3.5L21 13v3h-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="9" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Site Confiável",
    text: "100% Seguro",
    icon: (
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function BenefitsBar() {
  return (
    <section className="overflow-hidden bg-white text-brand-sky-500" aria-label="Vantagens de comprar na Bia Fashion Kids">
      {/* Mobile: continuous carousel */}
      <div className="py-6 sm:hidden">
        <div className="flex w-max animate-marquee gap-12">
          {[...benefits, ...benefits].map((b, i) => (
            <div key={`${b.title}-${i}`} className="flex shrink-0 items-center gap-3">
              <span className="shrink-0">{b.icon}</span>
              <div className="whitespace-nowrap">
                <p className="text-base font-bold text-black">{b.title}</p>
                <p className="text-sm text-gray-500">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: static row */}
      <div className="mx-auto hidden max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-6 sm:flex sm:px-8">
        {benefits.map((b) => (
          <div key={b.title} className="flex items-center gap-3">
            <span className="shrink-0">{b.icon}</span>
            <div>
              <p className="text-base font-bold text-black">{b.title}</p>
              <p className="text-sm text-gray-500">{b.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
