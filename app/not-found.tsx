import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-white px-6 py-24 text-center">
        <p className="font-display text-6xl font-black text-brand-pink-500">404</p>
        <h1 className="text-2xl font-bold text-brand-ink">Página não encontrada</h1>
        <p className="max-w-md text-brand-ink/70">
          Ops! Não encontramos a página que você está procurando.
        </p>
        <Link
          href="/"
          className="mt-4 rounded-full bg-brand-pink-500 px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-brand-pink-600"
        >
          Voltar para a página inicial
        </Link>
      </main>
      <Footer />
    </>
  );
}
