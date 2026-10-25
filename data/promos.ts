import type { CategoryKey } from "@/data/products";

/** Promoção ligada a um dia do calendário */
export type Promo = {
  id: string;
  /** Data no formato AAAA-MM-DD */
  date: string;
  title: string;
  description?: string;
  /** Desconto em porcentagem (ex.: 20 = 20% OFF) */
  discount?: number;
  /** Categoria aberta pelo botão "Ver produtos" */
  link?: CategoryKey;
};

export const PROMO_STORAGE_KEY = "biafashionkids.admin.promos";
export const PROMOS_UPDATED_EVENT = "biafashionkids:promos-updated";

export const promoLinkOptions: { value: CategoryKey; label: string }[] = [
  { value: "bebe", label: "Bebê" },
  { value: "meninas", label: "Meninas" },
  { value: "meninos", label: "Meninos" },
  { value: "calcados", label: "Calçados" },
  { value: "acessorios", label: "Acessórios" },
];

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isPromo(value: unknown): value is Promo {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const promo = value as Record<string, unknown>;
  return (
    typeof promo.id === "string" &&
    typeof promo.date === "string" &&
    DATE_PATTERN.test(promo.date) &&
    typeof promo.title === "string" &&
    (promo.description === undefined || typeof promo.description === "string") &&
    (promo.discount === undefined || typeof promo.discount === "number") &&
    (promo.link === undefined || promoLinkOptions.some((option) => option.value === promo.link))
  );
}

export function readPromos(): Promo[] {
  const saved = window.localStorage.getItem(PROMO_STORAGE_KEY);
  if (!saved) return [];
  const parsed: unknown = JSON.parse(saved);
  if (!Array.isArray(parsed) || !parsed.every(isPromo)) {
    throw new Error("Promoções salvas com formato inválido.");
  }
  return parsed;
}

export function savePromos(promos: Promo[]) {
  window.localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(promos));
  window.dispatchEvent(new Event(PROMOS_UPDATED_EVENT));
}

/** AAAA-MM-DD no fuso local (sem o deslocamento de UTC do toISOString) */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDateKey(dateKey: string, options: Intl.DateTimeFormatOptions): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", options).format(new Date(y, m - 1, d));
}
