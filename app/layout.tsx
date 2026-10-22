import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
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
    <html lang="pt-BR" className={roboto.variable}>
      <body>{children}</body>
    </html>
  );
}
