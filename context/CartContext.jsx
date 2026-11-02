"use client";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "dum-co-demo-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const itemsRef = useRef([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          itemsRef.current = parsed;
          setItems(parsed);
        }
      }
    } catch {
      try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    itemsRef.current = items;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const persistItems = (nextItems) => {
    itemsRef.current = nextItems;
    setItems(nextItems);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems)); } catch {}
  };

  const addItem = (product, options = {}, quantity = 1) => {
    const portion = options.portion || "Regular";
    const spice = options.spice || "Medium";
    const key = [product.id, portion, spice, options.note || ""].join("-");
    const current = itemsRef.current;
    const existing = current.find(item => item.key === key);
    const nextItems = existing
      ? current.map(item => item.key === key ? { ...item, quantity: item.quantity + quantity } : item)
      : [...current, {
          key,
          id: product.id,
          name: product.name,
          price: product.price + (options.extraPrice || 0),
          image: product.image,
          quantity,
          portion,
          spice,
          note: options.note || ""
        }];
    persistItems(nextItems);
  };

  const updateQuantity = (key, quantity) => {
    const current = itemsRef.current;
    const nextItems = quantity <= 0
      ? current.filter(item => item.key !== key)
      : current.map(item => item.key === key ? { ...item, quantity } : item);
    persistItems(nextItems);
  };

  const clearCart = () => persistItems([]);
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
