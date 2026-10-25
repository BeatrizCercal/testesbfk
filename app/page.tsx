import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { BenefitsBar } from "@/components/BenefitsBar";
import { ProductGrid } from "@/components/ProductGrid";
import { BrandsCarousel } from "@/components/BrandsCarousel";
import { PijamasPromo } from "@/components/PijamasPromo";
import { StoreOutletBanners } from "@/components/StoreOutletBanners";
import { Reviews } from "@/components/Reviews";
import { Footer } from "@/components/Footer";
import { WaveDivider } from "@/components/decor/WaveDivider";

const WHITE = "#ffffff";
const PAGE_BG = "var(--color-background)";
const PINK_LIGHT = "var(--color-pink-light)";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="animate-fadeIn" style={{ position: "relative", zIndex: 2 }}>
          <HeroCarousel />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "150ms" }}>
          <BenefitsBar />
          <WaveDivider from={WHITE} to={PAGE_BG} />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "225ms" }}>
          <ProductGrid />
          <WaveDivider from={PAGE_BG} to={WHITE} flip />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "300ms" }}>
          <BrandsCarousel />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "450ms" }}>
          <StoreOutletBanners />
          <WaveDivider from={WHITE} to={PINK_LIGHT} />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "600ms" }}>
          <Reviews />
          <WaveDivider from={PINK_LIGHT} to={WHITE} flip />
        </div>
      </main>
      <Footer />
    </>
  );
}
