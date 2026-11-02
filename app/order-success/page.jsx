"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Check, Clock3, Home } from "lucide-react";
import { useCart } from "@/context/CartContext";
export default function OrderSuccessPage() {
  const [order, setOrder] = useState(null);
  const { clearCart } = useCart();
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("dum-co-demo-order");
      if (saved) setOrder(JSON.parse(saved));
    } catch {}
    clearCart();
  }, []);
  return <main><Header/><section className="success-page"><div className="success-icon"><Check size={35}/></div><p className="eyebrow">THAT'S A WRAP</p><h1>Lovely choice.<br/><em>Really lovely.</em></h1><p className="success-copy">Your demo order journey is complete. In a live store, this is where the kitchen would receive the ticket and your order updates would begin.</p>
    {order && <div className="success-ticket"><span>DEMO ORDER REFERENCE</span><b>{order.reference}</b><div><span>Placed for</span><strong>{order.name}</strong></div><div><span>Payment preference</span><strong>{order.payment}</strong></div><div><span>Demo total</span><strong>₹{order.total}</strong></div></div>}
    <p className="demo-disclaimer"><Clock3 size={16}/> No real order has been sent to a kitchen.</p><a className="button-primary" href="/"><Home size={16}/> Back to home</a></section></main>;
}
