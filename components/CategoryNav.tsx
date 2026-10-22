import Link from "next/link";

const categories = [
  { name: "Lançamentos", href: "#" },
  { name: "Meninas", href: "/categorias/meninas" },
  { name: "Meninos", href: "/categorias/meninos" },
  { name: "Calçados", href: "#" },
  { name: "Acessórios", href: "#" },
];

const stripeColors = ["bg-brand-sky-400", "bg-brand-pink-500", "bg-brand-sky-400"];
const hoverColors = ["md:hover:bg-brand-sky-400", "md:hover:bg-brand-pink-500", "md:hover:bg-brand-sky-400"];

export function CategoryNav({
  mobileOpen = false,
  onLinkClick,
}: {
  mobileOpen?: boolean;
  onLinkClick?: () => void;
}) {
  return (
    <nav aria-label="Categorias" className={`bg-[#F6F6F6] ${mobileOpen ? "block" : "hidden"} md:block`}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 pb-3 pt-3 md:flex-row md:items-stretch md:gap-0 md:pb-0 md:pt-0 lg:px-8">
        {categories.map((cat, i) => (
          <div key={cat.name} className="flex flex-col items-center md:flex-1 md:items-stretch">
            <Link
              href={cat.href}
              onClick={onLinkClick}
              className={`flex items-center justify-center px-3 py-1.5 text-center text-base font-medium uppercase tracking-wide text-gray-800 transition-colors md:flex-1 md:py-2.5 md:hover:text-white ${hoverColors[i % hoverColors.length]}`}
            >
              {cat.name}
            </Link>
            <span className={`mt-3 hidden h-1 w-full md:mt-0 md:block ${stripeColors[i % stripeColors.length]}`} />
          </div>
        ))}
      </div>
    </nav>
  );
}
