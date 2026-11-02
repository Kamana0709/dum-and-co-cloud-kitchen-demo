"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "dum-co-demo-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const addItem = (product, options = {}) => {
    const portion = options.portion || "Regular";
    const spice = options.spice || "Medium";
    const key = [product.id, portion, spice, options.note || ""].join("-");
    setItems(current => {
      const existing = current.find(item => item.key === key);
      if (existing) return current.map(item => item.key === key ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { key, id: product.id, name: product.name, price: product.price + (options.extraPrice || 0), image: product.image, quantity: 1, portion, spice, note: options.note || "" }];
    });
  };

  const updateQuantity = (key, quantity) => setItems(current =>
    quantity <= 0 ? current.filter(item => item.key !== key) :
    current.map(item => item.key === key ? { ...item, quantity } : item)
  );
  const clearCart = () => setItems([]);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const value = useMemo(() => ({ items, addItem, updateQuantity, clearCart, subtotal, count }), [items, subtotal, count]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
