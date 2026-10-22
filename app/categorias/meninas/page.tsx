import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Meninas - Bia Fashion Kids",
};

export default function CategoriaMeninasPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-white">
        <Breadcrumb current="Meninas" />
        <section aria-label="Destaques Meninas" className="h-[190px] bg-brand-sky-500 sm:h-[280px] lg:h-[480px]" />
      </main>
      <Footer />
    </>
  );
}
