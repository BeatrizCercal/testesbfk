import { Header } from "@/components/Header";
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
