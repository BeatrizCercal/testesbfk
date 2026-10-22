"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CategoryNav } from "./CategoryNav";

function SearchIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 20c1.6-4 5-6 8-6s6.4 2 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4 3.5V16H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7 9.5h10M7 13h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 2.5h2l1 2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5.5 4.7h14.3a1 1 0 0 1 .96 1.28l-1.8 6.2a1.5 1.5 0 0 1-1.45 1.1H9.2a1.5 1.5 0 0 1-1.46-1.15L5.5 4.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9.2 13.3 8.3 16h9.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.7" cy="19.3" r="1.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="19.3" r="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function AdminIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.5 2.9 8.1 7 10 4.1-1.9 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const [cartCount] = useState(0);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Mobile row: hamburger + search | logo | account + cart */}
      <div className="flex items-center gap-3 px-4 py-4 md:hidden">
        {mobileSearchOpen ? (
          <form
            role="search"
            className="flex w-full items-center gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              aria-label="Fechar busca"
              className="shrink-0 text-brand-ink"
            >
              <CloseIcon />
            </button>
            <div className="flex w-full items-center rounded-xl border border-gray-300 bg-white px-4 py-2">
              <input
                autoFocus
                type="search"
                placeholder="O que você procura?"
                className="w-full bg-transparent text-sm text-black placeholder:text-gray-400 focus:outline-none"
                aria-label="Buscar produtos"
              />
              <button type="submit" aria-label="Buscar" className="shrink-0 text-gray-500">
                <SearchIcon size={18} />
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex items-center gap-4 text-brand-ink">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label="Abrir menu"
                aria-expanded={mobileMenuOpen}
              >
                <MenuIcon />
              </button>
              <button type="button" onClick={() => setMobileSearchOpen(true)} aria-label="Buscar">
                <SearchIcon />
              </button>
            </div>

            <Link href="/" className="flex shrink-0 items-center" aria-label="Bia Fashion Kids - página inicial">
              <Image
                src="/logo/biafashionkids-logo.jpg"
                alt="Bia Fashion Kids"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
                priority
              />
            </Link>

            <div className="ml-auto flex items-center gap-4 text-brand-ink">
              <Link href="/admin" aria-label="Abrir administração" className="rounded-full bg-brand-sky-100 px-2 py-1 text-[10px] font-black tracking-wide text-brand-sky-600">
                ADM
              </Link>
              <Link href="/entrar" aria-label="Entrar ou cadastrar-se">
                <UserIcon size={26} />
              </Link>
              <Link href="/carrinho" className="relative" aria-label={`Carrinho, ${cartCount} itens`}>
                <CartIcon size={26} />
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-pink-500 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Desktop row: logo, search, account actions */}
      <div className="relative mx-auto hidden max-w-7xl items-center gap-6 px-4 py-6 md:flex lg:gap-10 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Bia Fashion Kids - página inicial">
          <Image
            src="/logo/biafashionkids-logo.jpg"
            alt="Bia Fashion Kids"
            width={68}
            height={68}
            className="h-[68px] w-[68px] rounded-full object-cover"
            priority
          />
        </Link>

        <form
          role="search"
          className="flex w-full max-w-[380px] items-center rounded-xl border border-gray-300 bg-white px-4 py-2 md:absolute md:left-[38%] md:-translate-x-1/2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            placeholder="O que você procura?"
            className="w-full bg-transparent text-sm text-black placeholder:text-gray-400 focus:outline-none"
            aria-label="Buscar produtos"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="shrink-0 border-l border-gray-200 pl-3 text-gray-500"
          >
            <SearchIcon />
          </button>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-8 text-brand-ink">
          <Link
            href="/admin"
            className="hidden items-center gap-2 rounded-full bg-brand-sky-100 px-3 py-2 text-sm font-bold text-brand-sky-600 transition hover:bg-brand-sky-300 md:flex"
            aria-label="Abrir administração"
          >
            <AdminIcon />
            Admin
          </Link>
          <Link href="#" className="hidden items-center gap-2 text-gray-700 lg:flex">
            <ChatIcon />
            <span className="text-sm leading-tight">
              Central de
              <br />
              <span className="font-bold text-black">Atendimento</span>
            </span>
          </Link>
          <div className="hidden items-center gap-2 text-gray-700 lg:flex">
            <UserIcon />
            <span className="text-sm leading-tight">
              Olá, Bem-vindo(a)
              <br />
              <Link href="/entrar" className="font-bold text-black hover:text-brand-pink-600">
                Entre
              </Link>{" "}
              ou{" "}
              <Link href="/cadastrar-se" className="font-bold text-black hover:text-brand-pink-600">
                Cadastre-se
              </Link>
            </span>
          </div>
          <Link
            href="/carrinho"
            className="flex items-center gap-2 text-gray-700"
            aria-label={`Carrinho, ${cartCount} itens`}
          >
            <span className="relative shrink-0">
              <CartIcon />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-pink-100 text-[11px] font-bold text-brand-pink-600 lg:hidden">
                {cartCount}
              </span>
            </span>
            <span className="hidden text-base leading-tight lg:block">
              <span className="flex items-center gap-1.5">
                <span className="font-bold text-black">Minha Sacola</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-pink-100 text-xs font-bold text-brand-pink-600">
                  {cartCount}
                </span>
              </span>
              R$ 0,00
            </span>
          </Link>
        </div>
      </div>

      <CategoryNav mobileOpen={mobileMenuOpen} onLinkClick={() => setMobileMenuOpen(false)} />
    </header>
  );
}
