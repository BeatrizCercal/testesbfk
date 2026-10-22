import { Header } from "@/components/Header";
import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { BenefitsBar } from "@/components/BenefitsBar";
import { BrandsCarousel } from "@/components/BrandsCarousel";
import { PijamasPromo } from "@/components/PijamasPromo";
import { StoreOutletBanners } from "@/components/StoreOutletBanners";
import { Reviews } from "@/components/Reviews";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="flex justify-end bg-brand-sky-100 px-4 py-2 sm:px-8">
          <Link
            href="/admin"
            className="rounded-full bg-brand-sky-600 px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition hover:bg-brand-sky-500"
          >
            Acessar painel Admin
          </Link>
        </div>
        <div className="animate-fadeIn">
          <HeroCarousel />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "150ms" }}>
          <BenefitsBar />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "300ms" }}>
          <BrandsCarousel />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "450ms" }}>
          <StoreOutletBanners />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "600ms" }}>
          <Reviews />
        </div>
      </main>
      <Footer />
    </>
  );
}
