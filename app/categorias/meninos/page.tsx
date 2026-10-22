import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Meninos - Bia Fashion Kids",
};

export default function CategoriaMeninosPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-white">
        <Breadcrumb current="Meninos" />
        <section aria-label="Destaques Meninos" className="h-[190px] bg-brand-sky-500 sm:h-[280px] lg:h-[480px]" />
      </main>
      <Footer />
    </>
  );
}
