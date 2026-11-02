"use client";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
export default function CartBadge() {
  const { count } = useCart();
  return <a className="header-order" href="/cart">Your order <ShoppingBag size={16}/>{count > 0 && <b className="cart-count">{count}</b>}</a>;
}
