import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Checkout - Bia Fashion Kids",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
