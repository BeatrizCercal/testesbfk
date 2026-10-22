import Link from "next/link";

const banners = [
  { id: "loja", label: "Arte: Imagem da loja", color: "bg-brand-sky-500", href: "#" },
  { id: "outlet", label: "Arte: Imagem do outlet", color: "bg-blue-500", href: "#" },
];

export function StoreOutletBanners() {
  return (
    <section className="bg-white py-12" aria-label="Loja e Outlet">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-[10px] px-4 sm:grid-cols-2 sm:px-8">
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.href}
            className={`flex aspect-square items-center justify-center rounded-xl text-center text-xl font-bold uppercase tracking-wide text-white transition hover:opacity-90 ${banner.color}`}
          >
            {banner.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
