import type { Metadata } from "next";
import { CartPageClient } from "@/components/CartPageClient";

export const metadata: Metadata = {
  title: "Carrinho - Bia Fashion Kids",
};

export default function CarrinhoPage() {
  return <CartPageClient />;
}
