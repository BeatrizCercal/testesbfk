import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CategoryCatalog } from "@/components/CategoryCatalog";

export const metadata: Metadata = {
  title: "Meninos - Bia Fashion Kids",
};

export default function CategoriaMeninosPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">
        <Breadcrumb current="Meninos" />
        <CategoryCatalog
          categoryKey="meninos"
          title="Meninos"
          theme="boy"
        />
      </main>
      <Footer />
    </>
  );
}
