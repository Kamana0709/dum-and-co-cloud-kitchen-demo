"use client";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
export default function CartPage() {
  const { items, updateQuantity, subtotal } = useCart();
  const delivery = subtotal > 499 || subtotal === 0 ? 0 : 35;
  return <main><Header/><section className="checkout-page">
    <a className="back-link" href="/#menu"><ArrowLeft size={15}/> Back to menu</a>
    <div className="checkout-heading"><p className="eyebrow">YOUR LITTLE FEAST</p><h1>Your <em>order.</em></h1><p>Good things are on their way.</p></div>
    {items.length === 0 ? <div className="empty-cart"><ShoppingBag size={35}/><h2>Your cart is taking a breather.</h2><p>Find something delicious to bring it back to life.</p><a className="button-primary" href="/#menu">Explore the menu</a></div> :
    <div className="cart-layout"><div className="cart-lines">{items.map(item => <article className="cart-line" key={item.key}>
      <img src={item.image} alt={item.name}/><div className="cart-line-info"><h3>{item.name}</h3><p>{item.portion} · {item.spice} spice</p><strong>₹{item.price * item.quantity}</strong></div>
      <div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => updateQuantity(item.key, item.quantity - 1)}><Minus size={14}/></button><b>{item.quantity}</b><button aria-label="Increase quantity" onClick={() => updateQuantity(item.key, item.quantity + 1)}><Plus size={14}/></button></div>
      <button className="remove-item" aria-label={`Remove ${item.name}`} onClick={() => updateQuantity(item.key, 0)}><Trash2 size={16}/></button>
    </article>)}</div><aside className="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><b>₹{subtotal}</b></div><div><span>Delivery</span><b>{delivery === 0 ? "Free" : `₹${delivery}`}</b></div><div className="summary-total"><span>Total</span><strong>₹{subtotal + delivery}</strong></div><p className="summary-note">Delivery charges shown are demo estimates.</p><a className="button-primary full-button" href="/checkout">Continue to checkout <span>→</span></a></aside></div>}
  </section></main>;
}
