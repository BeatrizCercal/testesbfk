import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Carrinho - Bia Fashion Kids",
};

export default function CarrinhoPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-white px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-brand-ink">Nenhum produto na sacola</h1>
        <Link
          href="/"
          className="mt-4 rounded-full bg-brand-pink-500 px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-brand-pink-600"
        >
          Voltar a comprar
        </Link>
      </main>
      <Footer />
    </>
  );
}
