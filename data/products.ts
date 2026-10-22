export type IconKey =
  | "dress"
  | "polo"
  | "onesie"
  | "shorts"
  | "shoe"
  | "jacket"
  | "accessory";

export type Product = {
  id: string;
  name: string;
  category: "Menina" | "Menino" | "Bebê";
  price: number;
  oldPrice?: number;
  installments: string;
  icon: IconKey;
  tint: "pink" | "sky" | "gold";
  badge?: "Lançamento" | "Mais vendido" | "Últimas peças";
};

export const products: Product[] = [
  {
    id: "vestido-flor-de-lis",
    name: "Vestido Flor de Lis Rodado",
    category: "Menina",
    price: 89.9,
    oldPrice: 119.9,
    installments: "3x de R$ 29,97",
    icon: "dress",
    tint: "pink",
    badge: "Mais vendido",
  },
  {
    id: "polo-listrada-azul",
    name: "Camisa Polo Listrada",
    category: "Menino",
    price: 64.9,
    installments: "2x de R$ 32,45",
    icon: "polo",
    tint: "sky",
  },
  {
    id: "body-nuvem-bebe",
    name: "Body Soft Nuvem",
    category: "Bebê",
    price: 39.9,
    installments: "2x de R$ 19,95",
    icon: "onesie",
    tint: "gold",
    badge: "Lançamento",
  },
  {
    id: "short-jeans-estrela",
    name: "Short Jeans Estrelinha",
    category: "Menina",
    price: 54.9,
    oldPrice: 69.9,
    installments: "2x de R$ 27,45",
    icon: "shorts",
    tint: "pink",
  },
  {
    id: "tenis-luz-colorido",
    name: "Tênis com Luz Colorido",
    category: "Menino",
    price: 129.9,
    installments: "4x de R$ 32,48",
    icon: "shoe",
    tint: "gold",
    badge: "Últimas peças",
  },
  {
    id: "jaqueta-corta-vento",
    name: "Jaqueta Corta-Vento",
    category: "Menino",
    price: 99.9,
    installments: "3x de R$ 33,30",
    icon: "jacket",
    tint: "sky",
  },
  {
    id: "conjunto-laco-bebe",
    name: "Conjunto Laço Encantado",
    category: "Bebê",
    price: 74.9,
    oldPrice: 94.9,
    installments: "2x de R$ 37,45",
    icon: "accessory",
    tint: "gold",
  },
  {
    id: "vestido-poa-festa",
    name: "Vestido Poá de Festa",
    category: "Menina",
    price: 109.9,
    installments: "3x de R$ 36,63",
    icon: "dress",
    tint: "pink",
    badge: "Lançamento",
  },
];

export type Category = {
  name: string;
  href: string;
  icon: IconKey;
};

export const categories: Category[] = [
  { name: "Meninas", href: "#produtos", icon: "dress" },
  { name: "Meninos", href: "#produtos", icon: "polo" },
  { name: "Bebês", href: "#produtos", icon: "onesie" },
  { name: "Calçados", href: "#produtos", icon: "shoe" },
  { name: "Casacos", href: "#produtos", icon: "jacket" },
  { name: "Acessórios", href: "#produtos", icon: "accessory" },
];

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
