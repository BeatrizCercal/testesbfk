import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CategoryCatalog } from "@/components/CategoryCatalog";

export const metadata: Metadata = {
  title: "Bebê - Bia Fashion Kids",
};

export default function CategoriaBebePage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">
        <Breadcrumb current="Bebê" />
        <CategoryCatalog
          categoryKey="bebe"
          title="Bebê"
          theme="mix"
          hideHero
          subdivisions={["Menino", "Menina", "Unissex"]}
        />
      </main>
      <Footer />
    </>
  );
}
