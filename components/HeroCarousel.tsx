"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Blob, Cloud, Rainbow, Sparkle, Star } from "./decor/Shapes";
import { SpinningBadge } from "./decor/SpinningBadge";

type Slide = {
  id: string;
  src: string;
  alt: string;
};

const slides: Slide[] = [
  {
    id: "slide-1",
    src: "/carrousel/1.png",
    alt: "Liquida Inverno 2026 — conjuntos em algodão premium, 3 por R$ 139",
  },
  {
    id: "slide-2",
    src: "/carrousel/2.png",
    alt: "Destaques Bia Fashion Kids",
  },
];

const AUTOPLAY_MS = 5500;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex((i + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const pause = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const resume = () => {
    pause();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
  };

  return (
    <div className="kids-hero">
    <section
      aria-roledescription="carousel"
      aria-label="Destaques Bia Fashion Kids"
      className="kids-hero__frame relative overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="relative h-[190px] overflow-hidden sm:h-[280px] lg:h-[480px]">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => {
            const isActive = i === index;
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${slides.length}`}
                aria-hidden={!isActive}
                className="relative h-full w-full shrink-0"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            );
          })}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          {/* Controls */}
          <button
            type="button"
            onClick={prev}
            aria-label="Slide anterior"
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 text-brand-ink shadow-md transition hover:bg-white sm:flex"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próximo slide"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 text-brand-ink shadow-md transition hover:bg-white sm:flex"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para o slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-7 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>

      {/* Decorações infantis ao redor do carrossel */}
      <Blob
        className="kids-decor kids-float--slow kids-float kids-decor--desktop"
        color="var(--color-pink-light)"
        style={{ width: 150, left: -50, bottom: -50, opacity: 0.95 }}
      />
      <Blob
        className="kids-decor kids-float kids-decor--desktop"
        color="var(--color-sky-medium)"
        style={{ width: 110, right: -36, top: -40, opacity: 0.9 }}
      />
      <Rainbow
        className="kids-decor kids-wiggle kids-decor--desktop"
        style={{ width: 96, left: 24, top: 18 }}
      />
      <Cloud className="kids-decor kids-float kids-decor--desktop" style={{ width: 70, left: "38%", top: 14 }} />
      <Star className="kids-decor kids-twinkle" color="var(--color-sky)" style={{ width: 22, left: 14, bottom: 18 }} />
      <Sparkle className="kids-decor kids-twinkle" style={{ width: 18, right: 18, bottom: 26, animationDelay: "0.8s" }} />
      <Sparkle
        className="kids-decor kids-twinkle kids-decor--desktop"
        color="var(--color-sky-medium)"
        style={{ width: 26, left: "24%", bottom: 40, animationDelay: "1.4s" }}
      />
      <Star
        className="kids-decor kids-twinkle kids-decor--desktop"
        color="var(--color-pink)"
        style={{ width: 20, right: "30%", top: 24, animationDelay: "0.4s" }}
      />

      <SpinningBadge className="kids-decor--desktop" />
    </div>
  );
}
