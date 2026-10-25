"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  formatDateKey,
  promoLinkOptions,
  PROMOS_UPDATED_EVENT,
  readPromos,
  toDateKey,
  type Promo,
} from "@/data/promos";
import { Heart, Sparkle, Squiggle, Star } from "./decor/Shapes";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

type MonthCursor = { year: number; month: number };

/** Dias do mês, com espaços vazios antes do dia 1 para alinhar a semana */
function buildMonth({ year, month }: MonthCursor): (string | null)[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = Array.from({ length: firstWeekday }, () => null);
  for (let day = 1; day <= totalDays; day++) cells.push(toDateKey(new Date(year, month, day)));
  return cells;
}

export function PromoCalendar() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [today, setToday] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [cursor, setCursor] = useState<MonthCursor | null>(null);

  // Data e promoções só existem no navegador (evita diferença entre servidor e cliente)
  useEffect(() => {
    const now = new Date();
    const key = toDateKey(now);
    setToday(key);
    setSelected(key);
    setCursor({ year: now.getFullYear(), month: now.getMonth() });

    const load = () => {
      try {
        setPromos(readPromos());
      } catch {
        setPromos([]);
      }
    };
    load();
    window.addEventListener(PROMOS_UPDATED_EVENT, load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener(PROMOS_UPDATED_EVENT, load);
      window.removeEventListener("storage", load);
    };
  }, []);

  const promosByDate = useMemo(() => {
    const map = new Map<string, Promo[]>();
    for (const promo of promos) map.set(promo.date, [...(map.get(promo.date) ?? []), promo]);
    return map;
  }, [promos]);

  const cells = useMemo(() => (cursor ? buildMonth(cursor) : []), [cursor]);
  const selectedPromos = selected ? (promosByDate.get(selected) ?? []) : [];

  const moveMonth = (delta: number) =>
    setCursor((current) => {
      if (!current) return current;
      const date = new Date(current.year, current.month + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });

  const monthLabel = cursor
    ? new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(new Date(cursor.year, cursor.month, 1))
    : "";

  return (
    <section id="calendario" className="kids-section kids-cal-section" aria-labelledby="calendario-titulo">
      <Star className="kids-decor kids-twinkle" color="var(--color-sky)" style={{ width: 22, left: "6%", top: 20 }} />
      <Sparkle className="kids-decor kids-twinkle" style={{ width: 18, right: "8%", top: 40, animationDelay: "1s" }} />

      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <h2
          id="calendario-titulo"
          className="text-center text-xl font-bold text-brand-sky-600 sm:text-2xl"
        >
          <span className="kids-title">
            <Star className="kids-title__icon kids-wiggle" color="var(--color-pink)" />
            Promoções do dia
            <Star className="kids-title__icon kids-wiggle" color="var(--color-sky)" />
          </span>
        </h2>
        <Squiggle className="kids-squiggle" color="var(--color-pink)" />

        <div className="kids-cal-layout">
          {/* Calendário */}
          <div className="kids-cal">
            <div className="kids-cal__header">
              <button type="button" className="kids-cal__nav" onClick={() => moveMonth(-1)} aria-label="Mês anterior">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="kids-cal__month" aria-live="polite">
                {monthLabel}
              </p>
              <button type="button" className="kids-cal__nav" onClick={() => moveMonth(1)} aria-label="Próximo mês">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="kids-cal__grid" role="grid" aria-label={monthLabel}>
              {WEEKDAYS.map((weekday, i) => (
                <span key={weekday} className={`kids-cal__weekday ${i % 2 ? "is-pink" : ""}`} role="columnheader">
                  {weekday}
                </span>
              ))}
              {cells.map((dateKey, i) => {
                if (!dateKey) return <span key={`empty-${i}`} aria-hidden="true" />;
                const hasPromo = promosByDate.has(dateKey);
                const isSelected = dateKey === selected;
                const isToday = dateKey === today;
                const label = formatDateKey(dateKey, { day: "numeric", month: "long" });
                return (
                  <button
                    key={dateKey}
                    type="button"
                    role="gridcell"
                    onClick={() => setSelected(dateKey)}
                    aria-pressed={isSelected}
                    aria-label={`${label}${isToday ? ", hoje" : ""}${hasPromo ? ", tem promoção" : ""}`}
                    className={[
                      "kids-cal__day",
                      hasPromo ? "has-promo" : "",
                      isSelected ? "is-selected" : "",
                      isToday ? "is-today" : "",
                    ].join(" ")}
                  >
                    {Number(dateKey.slice(8))}
                    {hasPromo && <Heart className="kids-cal__dot" color="currentColor" />}
                  </button>
                );
              })}
            </div>

            <p className="kids-cal__legend">
              <span className="kids-cal__legend-promo" aria-hidden="true" /> Dia com promoção
              <span className="kids-cal__legend-today" aria-hidden="true" /> Hoje
            </p>
          </div>

          {/* Promoção do dia escolhido */}
          <div className="kids-cal-panel" aria-live="polite">
            {selected && (
              <p className="kids-cal-panel__date">
                {formatDateKey(selected, { weekday: "long", day: "numeric", month: "long" })}
              </p>
            )}

            {selectedPromos.length > 0 ? (
              <ul className="kids-cal-panel__list">
                {selectedPromos.map((promo, i) => {
                  const link = promoLinkOptions.find((option) => option.value === promo.link);
                  return (
                    <li key={promo.id} className={`kids-promo ${i % 2 ? "is-blue" : ""}`}>
                      {promo.discount ? <span className="kids-promo__discount">-{promo.discount}%</span> : null}
                      <p className="kids-promo__title">{promo.title}</p>
                      {promo.description && <p className="kids-promo__text">{promo.description}</p>}
                      {link && (
                        <Link href={`/categorias/${link.value}`} className="kids-promo__cta">
                          Ver {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="kids-cal-panel__empty">Nenhuma promoção neste dia. Escolha um dia com coração no calendário.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
