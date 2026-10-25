import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CategoryCatalog } from "@/components/CategoryCatalog";

export const metadata: Metadata = {
  title: "Acessórios - Bia Fashion Kids",
};

export default function CategoriaAcessoriosPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">
        <Breadcrumb current="Acessórios" />
        <CategoryCatalog
          categoryKey="acessorios"
          title="Acessórios"
          theme="mix"
        />
      </main>
      <Footer />
    </>
  );
}
