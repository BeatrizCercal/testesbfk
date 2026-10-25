import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CategoryCatalog } from "@/components/CategoryCatalog";

export const metadata: Metadata = {
  title: "Meninas - Bia Fashion Kids",
};

export default function CategoriaMeninasPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">
        <Breadcrumb current="Meninas" />
        <CategoryCatalog
          categoryKey="meninas"
          title="Meninas"
          theme="girl"
        />
      </main>
      <Footer />
    </>
  );
}
