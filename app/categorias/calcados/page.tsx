import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CategoryCatalog } from "@/components/CategoryCatalog";

export const metadata: Metadata = {
  title: "Calçados - Bia Fashion Kids",
};

export default function CategoriaCalcadosPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">
        <Breadcrumb current="Calçados" />
        <CategoryCatalog
          categoryKey="calcados"
          title="Calçados"
          theme="mix"
          hideHero
          subdivisions={["Menino", "Menina"]}
        />
      </main>
      <Footer />
    </>
  );
}
