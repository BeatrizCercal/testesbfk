"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="black" aria-hidden="true">
      <path
        d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2 2C10.5 19.5 4.5 13.5 4.5 5a2 2 0 0 1 2-2Z"
        stroke="black"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 8.5h2V5.3c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.6H5.7V16h2.8v8h3.4v-8h2.7l.4-3.4h-3.1V10c0-1 .3-1.5 1.7-1.5Z" />
    </svg>
  );
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.2 3h-3v13a2.6 2.6 0 1 1-2.3-2.6v-3.1a5.7 5.7 0 1 0 5.3 5.7V9.4a7.6 7.6 0 0 0 4.3 1.3V7.6c-1.9 0-3.5-1.1-4-2.9-.2-.5-.3-1.1-.3-1.7Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="black" className="shrink-0" aria-hidden="true">
      <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
      <path d="M19 8.839 11.23 12.724a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
    </svg>
  );
}

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14" stroke="white" strokeWidth="2" strokeLinecap="round" className={open ? "hidden" : ""} />
      <path d="M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon({ size = 38, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1c-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4a.5.5 0 0 0 0-.5c-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.6 1.1 2.8.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

const whatsappMessage = "Olá! Vim pelo site da Bia Fashion Kids e gostaria de mais informações.";
const whatsappHref = `https://wa.me/5511400000000?text=${encodeURIComponent(whatsappMessage)}`;

type FooterLink = { name: string; href: string; external?: boolean };

const institutionalLinks: FooterLink[] = [
  { name: "Atendimento", href: whatsappHref, external: true },
  { name: "Quem Somos", href: "#" },
  { name: "Como Comprar", href: "#" },
  { name: "A Bia Fashion Kids é confiável?", href: "#" },
  { name: "Como Pagar", href: "#" },
  { name: "Políticas de entrega", href: "#" },
  { name: "Trocas e devoluções", href: "#" },
  { name: "Avaliações", href: "/#avaliacoes" },
  { name: "Política de Privacidade", href: "#" },
];

function FooterLinkItem({ link, className }: { link: FooterLink; className: string }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.name}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.name}
    </Link>
  );
}

const specialPages = [
  { name: "Meninas", href: "/categorias/meninas" },
  { name: "Meninos", href: "/categorias/meninos" },
  { name: "Calçados", href: "#" },
  { name: "Promoções", href: "#" },
  { name: "Outlet", href: "#" },
];

const socials = [
  { name: "Instagram", href: "#", icon: InstagramIcon },
  { name: "Facebook", href: "#", icon: FacebookIcon },
  { name: "TikTok", href: "#", icon: TikTokIcon },
];

const paymentIcons = [
  { name: "Visa", src: "/footer/visa.png" },
  { name: "Mastercard", src: "/footer/mastercard.png" },
  { name: "Boleto", src: "/footer/boleto.png" },
  { name: "Pix", src: "/footer/pix.png" },
];

const accordionSections = ["Contato", "Institucional", "Páginas especiais", "Selos de segurança", "Formas de pagamento"];

/** Âncoras da barra de vantagens → seção correspondente do acordeão no mobile */
const hashToSection: Record<string, string> = {
  "#institucional": "Institucional",
  "#selos-de-seguranca": "Selos de segurança",
  "#formas-de-pagamento": "Formas de pagamento",
};

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  // No mobile as colunas do desktop ficam escondidas; então, ao clicar em um
  // link da barra de vantagens, abrimos a seção certa do acordeão e rolamos até ela.
  useEffect(() => {
    const handleHash = () => {
      const section = hashToSection[window.location.hash];
      if (!section) return;
      const target = document.getElementById(window.location.hash.slice(1));
      if (target && target.offsetParent !== null) return; // desktop: o navegador já rola
      setOpenSection(section);
      requestAnimationFrame(() => {
        document.querySelector(`[data-footer-section="${section}"]`)?.scrollIntoView({ behavior: "smooth" });
      });
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <>
      <footer id="rodape" className="relative bg-white text-black">
      {/* Mobile-first accordion */}
      <div className="sm:hidden" style={{ backgroundColor: "#71C9E7" }}>

        {accordionSections.map((section) => {
          const open = openSection === section;
          return (
            <div key={section} data-footer-section={section} className="border-t border-white/25">
              <button
                type="button"
                onClick={() => setOpenSection(open ? null : section)}
                aria-expanded={open}
                className="flex w-full items-center justify-between px-4 py-4 text-left text-base font-medium text-white"
              >
                {section}
                <PlusMinusIcon open={open} />
              </button>
              {open && (
                <div className="px-4 pb-5 text-sm text-white/90">
                  {section === "Contato" && (
                    <div className="space-y-3">
                      <a href="tel:+551140000000" className="flex items-center gap-2">
                        <PhoneIcon />
                        (11) 4000-0000
                      </a>
                      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <WhatsAppIcon size={18} color="white" />
                        (11) 4000-0000
                      </a>
                      <a href="mailto:contato@biafashionkids.com.br" className="flex items-center gap-2">
                        <EmailIcon />
                        contato@biafashionkids.com.br
                      </a>
                    </div>
                  )}
                  {section === "Institucional" && (
                    <ul className="space-y-3">
                      {institutionalLinks.map((link) => (
                        <li key={link.name}>
                          <FooterLinkItem link={link} className="uppercase" />
                        </li>
                      ))}
                    </ul>
                  )}
                  {section === "Páginas especiais" && (
                    <ul className="space-y-3">
                      {specialPages.map((page) => (
                        <li key={page.name}>
                          <Link href={page.href} className="uppercase">
                            {page.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section === "Selos de segurança" && <p></p>}
                  {section === "Formas de pagamento" && (
                    <div className="flex flex-wrap gap-2">
                      {paymentIcons.map((p) => (
                        <div
                          key={p.name}
                          className="flex h-9 items-center justify-center rounded-md bg-white px-3"
                        >
                          <Image src={p.src} alt={p.name} width={40} height={24} className="h-5 w-auto object-contain" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tablet / desktop grid */}
      <div className="mx-auto hidden max-w-7xl gap-10 px-4 py-14 sm:grid sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div>
          <Image
            src="/logo/biafashionkids-logo.jpg"
            alt="Bia Fashion Kids"
            width={128}
            height={128}
            className="h-32 w-32 rounded-full object-cover"
          />

          <div className="mt-5 space-y-3 text-sm text-black/80">
            <a href="tel:+551140000000" className="flex items-center gap-2 hover:text-black">
              <PhoneIcon />
              Telefone: (11) 4000-0000
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-black"
            >
              <WhatsAppIcon size={18} color="black" />
              WhatsApp: (11) 4000-0000
            </a>
            <a href="mailto:contato@biafashionkids.com.br" className="flex items-center gap-2 hover:text-black">
              <EmailIcon />
              E-mail: contato@biafashionkids.com.br
            </a>
          </div>

          <div className="mt-5 flex h-8 items-center gap-4">
            {socials.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className={`flex h-8 w-8 items-center justify-center text-black ${
                  s.name === "Facebook" ? "-translate-y-0.5" : s.name === "TikTok" ? "translate-y-px" : ""
                }`}
              >
                <s.icon size={26} />
              </Link>
            ))}
          </div>
        </div>

        <nav id="institucional" aria-label="Institucional">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-black">Institucional</h3>
          <ul className="mt-5 space-y-3">
            {institutionalLinks.map((link) => (
              <li key={link.name}>
                <FooterLinkItem link={link} className="text-sm uppercase text-black/80 transition hover:text-black" />
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Páginas especiais">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-black">Páginas especiais</h3>
          <ul className="mt-5 space-y-3">
            {specialPages.map((page) => (
              <li key={page.name}>
                <Link href={page.href} className="text-sm uppercase text-black/80 transition hover:text-black">
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div id="selos-de-seguranca">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-black">Selos de segurança</h3>
          <p className="mt-5 text-sm text-black/80"></p>
        </div>

        <div id="formas-de-pagamento">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-black">Formas de pagamento</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {paymentIcons.map((p) => (
              <div
                key={p.name}
                className="flex h-9 items-center justify-center rounded-md border border-black/10 bg-white px-3"
              >
                <Image src={p.src} alt={p.name} width={40} height={24} className="h-5 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scallop-divider mx-4 text-black/20 sm:mx-8" />

      <div className="bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-black/60 lg:px-8">
          <p>
            Bia Fashion Kids LTDA | CNPJ: 20.650.878/0001-80, Rua Laura Auler, 164 - Profipo, Joinville - SC,
            89.233-200 © Direitos Reservados www.biafashionkids.com.br
          </p>
        </div>
      </div>

      <div className="scallop-divider mx-4 text-black/20 sm:mx-8" />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp"
        title="Chat com a gente no WhatsApp!"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-105"
      >
        <WhatsAppIcon />
      </a>
      </footer>
    </>
  );
}
