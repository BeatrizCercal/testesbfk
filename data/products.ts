import catalog from "@/data/catalog/products.json";

export type IconKey =
  | "dress"
  | "polo"
  | "onesie"
  | "shorts"
  | "shoe"
  | "jacket"
  | "accessory";

export type BabyGender = "Menino" | "Menina" | "Unissex";

export const babyGenders: BabyGender[] = ["Menino", "Menina", "Unissex"];

export type Product = {
  id: string;
  name: string;
  category: "Menina" | "Menino" | "Bebê";
  /** Só para produtos de Bebê: separa menino, menina e unissex */
  gender?: BabyGender;
  price: number;
  oldPrice?: number;
  installments: string;
  icon: IconKey;
  tint: "pink" | "sky" | "gold";
  badge?: "Lançamento" | "Mais vendido" | "Últimas peças";
  description?: string;
  sizes?: string[];
  image?: string;
};

export type Category = {
  name: string;
  href: string;
  icon: IconKey;
};

export const PRODUCT_STORAGE_KEY = "biafashionkids.admin.products";

const iconKeys: IconKey[] = [
  "dress",
  "polo",
  "onesie",
  "shorts",
  "shoe",
  "jacket",
  "accessory",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIconKey(value: unknown): value is IconKey {
  return typeof value === "string" && iconKeys.some((iconKey) => iconKey === value);
}

export function isProduct(value: unknown): value is Product {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.category === "string" &&
    ["Menina", "Menino", "Bebê"].includes(value.category) &&
    (value.gender === undefined ||
      (typeof value.gender === "string" && ["Menino", "Menina", "Unissex"].includes(value.gender))) &&
    typeof value.price === "number" &&
    (value.oldPrice === undefined || typeof value.oldPrice === "number") &&
    typeof value.installments === "string" &&
    isIconKey(value.icon) &&
    typeof value.tint === "string" &&
    ["pink", "sky", "gold"].includes(value.tint) &&
    (value.badge === undefined ||
      (typeof value.badge === "string" &&
        ["Lançamento", "Mais vendido", "Últimas peças"].includes(value.badge))) &&
    (value.description === undefined || typeof value.description === "string") &&
    (value.sizes === undefined ||
      (Array.isArray(value.sizes) && value.sizes.every((size) => typeof size === "string"))) &&
    (value.image === undefined ||
      (typeof value.image === "string" && value.image.startsWith("data:image/")))
  );
}

function isCategory(value: unknown): value is Category {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    typeof value.href === "string" &&
    isIconKey(value.icon)
  );
}

function readEntries<T>(
  entries: unknown,
  isEntry: (entry: unknown) => entry is T,
  name: string,
): T[] {
  if (!Array.isArray(entries)) {
    throw new Error(`O catálogo JSON precisa ter uma lista de ${name}.`);
  }

  return entries.map((entry, index) => {
    if (!isEntry(entry)) {
      throw new Error(`O item ${index + 1} de ${name} tem dados inválidos.`);
    }

    return entry;
  });
}

const catalogData: unknown = catalog;

if (!isRecord(catalogData)) {
  throw new Error("O arquivo JSON do catálogo tem um formato inválido.");
}

export const products = readEntries(catalogData.products, isProduct, "produtos");
export const categories = readEntries(catalogData.categories, isCategory, "categorias");

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ---------- Páginas de categoria ---------- */

export type CategoryKey = "bebe" | "meninas" | "meninos" | "calcados" | "acessorios";

/** Gênero usado nas subdivisões: Menino/Menina vêm do público; Bebê usa o campo gender */
export function productGender(product: Product): BabyGender {
  if (product.category === "Menino") return "Menino";
  if (product.category === "Menina") return "Menina";
  return product.gender ?? "Unissex";
}

export function productsForCategory(list: Product[], key: CategoryKey): Product[] {
  switch (key) {
    case "bebe":
      return list.filter((product) => product.category === "Bebê");
    case "meninas":
      return list.filter((product) => product.category === "Menina");
    case "meninos":
      return list.filter((product) => product.category === "Menino");
    case "calcados":
      return list.filter((product) => product.icon === "shoe");
    case "acessorios":
      return list.filter((product) => product.icon === "accessory");
  }
}
