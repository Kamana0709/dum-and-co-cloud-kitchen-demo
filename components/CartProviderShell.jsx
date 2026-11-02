"use client";
import { CartProvider } from "@/context/CartContext";
export default function CartProviderShell({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
