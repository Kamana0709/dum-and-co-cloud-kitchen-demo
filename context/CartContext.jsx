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
          const safeItems = parsed.filter(item =>
            item && typeof item.key === "string" &&
            typeof item.id === "string" &&
            typeof item.name === "string" &&
            Number.isFinite(Number(item.price)) && Number(item.price) >= 0 &&
            Number.isFinite(Number(item.quantity)) && Number(item.quantity) > 0
          ).map(item => ({
            ...item,
            price: Number(item.price),
            quantity: Math.min(99, Math.floor(Number(item.quantity))),
            portion: typeof item.portion === "string" ? item.portion : "Regular",
            spice: typeof item.spice === "string" ? item.spice : "Medium",
            note: typeof item.note === "string" ? item.note.slice(0, 300) : ""
          }));
          itemsRef.current = safeItems;
          setItems(safeItems);
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
    const safeQuantity = Math.min(99, Math.max(1, Math.floor(Number(quantity) || 1)));
    const portion = options.portion || "Regular";
    const spice = options.spice || "Medium";
    const key = [product.id, portion, spice, options.note || ""].join("-");
    const current = itemsRef.current;
    const existing = current.find(item => item.key === key);
    const nextItems = existing
      ? current.map(item => item.key === key ? { ...item, quantity: Math.min(99, item.quantity + safeQuantity) } : item)
      : [...current, {
          key,
          id: product.id,
          name: product.name,
          price: product.price + (options.extraPrice || 0),
          image: product.image,
          quantity: safeQuantity,
          portion,
          spice,
          note: options.note || ""
        }];
    persistItems(nextItems);
  };

  const updateQuantity = (key, quantity) => {
    const safeQuantity = Math.min(99, Math.floor(Number(quantity) || 0));
    const current = itemsRef.current;
    const nextItems = safeQuantity <= 0
      ? current.filter(item => item.key !== key)
      : current.map(item => item.key === key ? { ...item, quantity: safeQuantity } : item);
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
