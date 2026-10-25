import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { BenefitsBar } from "@/components/BenefitsBar";
import { BrandsCarousel } from "@/components/BrandsCarousel";
import { Reviews } from "@/components/Reviews";
import { Footer } from "@/components/Footer";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { PromoCalendar } from "@/components/PromoCalendar";

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
          <BrandsCarousel />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "225ms" }}>
          <BenefitsBar />
          <WaveDivider from={WHITE} to={PAGE_BG} />
          <PromoCalendar />
          <WaveDivider from={PAGE_BG} to={PINK_LIGHT} flip />
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "300ms" }}>
          <Reviews />
          <WaveDivider from={PINK_LIGHT} to={WHITE} />
        </div>
      </main>
      <Footer />
    </>
  );
}
