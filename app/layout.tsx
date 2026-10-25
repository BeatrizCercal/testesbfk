import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

/** Títulos, preços, botões e menu: arredondada e divertida */
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-title",
  display: "swap",
});

/** Textos corridos: arredondada e bem legível */
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bia Fashion Kids - Bebê ao juvenil! Desde 2014🙌",
  description:
    "Roupas infantis para meninas e meninos com estilo, conforto e preço justo. Vestidos, conjuntos, camisas polo e muito mais na Bia Fashion Kids.",
  keywords: [
    "moda infantil",
    "roupa de criança",
    "Bia Fashion Kids",
    "roupa infantil menina",
    "roupa infantil menino",
  ],
  icons: {
    icon: "/logo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
