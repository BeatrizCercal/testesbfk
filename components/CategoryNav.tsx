"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BLUE = { color: "var(--color-sky-dark)", fill: "var(--color-sky-medium)" };
const PINK = { color: "var(--color-pink)", fill: "var(--color-pink)" };

const categories = [
  { name: "Bebê", href: "/categorias/bebe", ...BLUE },
  { name: "Meninas", href: "/categorias/meninas", ...PINK },
  { name: "Meninos", href: "/categorias/meninos", ...BLUE },
  { name: "Calçados", href: "/categorias/calcados", ...PINK },
  { name: "Acessórios", href: "/categorias/acessorios", ...BLUE },
];

export function CategoryNav({
  mobileOpen = false,
  onLinkClick,
}: {
  mobileOpen?: boolean;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Categorias" className={`bg-[#F6F6F6] ${mobileOpen ? "block" : "hidden"} md:block`}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 pb-3 pt-3 md:flex-row md:items-stretch md:gap-0 md:pb-0 md:pt-0 lg:px-8">
        {categories.map((cat) => {
          const style = { "--nav-color": cat.color, "--nav-fill": cat.fill } as CSSProperties;
          const current = pathname === cat.href;
          return (
            <div key={cat.name} className="flex flex-col items-center md:flex-1 md:items-stretch" style={style}>
              <Link
                href={cat.href}
                onClick={onLinkClick}
                aria-current={current ? "page" : undefined}
                className="kids-nav-link flex items-center justify-center px-3 py-1.5 text-center text-base font-medium tracking-wide transition-colors md:flex-1 md:py-2.5"
              >
                {cat.name}
              </Link>
              <span className="kids-nav-stripe mt-3 hidden h-1 w-full md:mt-0 md:block" />
            </div>
          );
        })}
      </div>
    </nav>
  );
}
