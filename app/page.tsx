import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { BenefitsBar } from "@/components/BenefitsBar";
import { BrandsCarousel } from "@/components/BrandsCarousel";
import { Reviews } from "@/components/Reviews";
import { Footer } from "@/components/Footer";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { Sparkle, Star } from "@/components/decor/Shapes";

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
          {/* Faixa azul que faz a transição para o rosa das avaliações */}
          <div className="kids-section" style={{ backgroundColor: PAGE_BG, height: 72 }} aria-hidden="true">
            <Star className="kids-decor kids-twinkle" color="var(--color-sky)" style={{ width: 22, left: "12%", top: 18 }} />
            <Sparkle
              className="kids-decor kids-twinkle"
              style={{ width: 18, right: "15%", top: 26, animationDelay: "1s" }}
            />
          </div>
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
