import { isProduct, type Product } from "@/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
};

export const CART_STORAGE_KEY = "biafashionkids.cart";
export const CHECKOUT_NOW_STORAGE_KEY = "biafashionkids.checkout-now";
export const CART_UPDATED_EVENT = "biafashionkids:cart-updated";

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;

  return (
    isProduct(item.product) &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0 &&
    (item.size === undefined || typeof item.size === "string")
  );
}

function parseCart(value: string | null): CartItem[] {
  if (!value) return [];

  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed) || !parsed.every(isCartItem)) {
    throw new Error("Os dados do carrinho estão inválidos.");
  }
  return parsed;
}

export function readCart(): CartItem[] {
  return parseCart(window.localStorage.getItem(CART_STORAGE_KEY));
}

export function saveCart(items: CartItem[]): void {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function readDirectCheckoutItem(): CartItem | null {
  const rawItem = window.sessionStorage.getItem(CHECKOUT_NOW_STORAGE_KEY);
  if (!rawItem) return null;

  const parsed: unknown = JSON.parse(rawItem);
  if (!isCartItem(parsed)) {
    throw new Error("Os dados da compra estão inválidos.");
  }
  return parsed;
}

export function saveDirectCheckoutItem(item: CartItem): void {
  window.sessionStorage.setItem(CHECKOUT_NOW_STORAGE_KEY, JSON.stringify(item));
}

export function clearDirectCheckoutItem(): void {
  window.sessionStorage.removeItem(CHECKOUT_NOW_STORAGE_KEY);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}
