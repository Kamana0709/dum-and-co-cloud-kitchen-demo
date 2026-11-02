"use client";
import { useState } from "react";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ShieldCheck } from "lucide-react";
export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", landmark: "", payment: "UPI" });
  const [error, setError] = useState("");
  const delivery = subtotal > 499 || subtotal === 0 ? 0 : 35;
  const total = subtotal + delivery;
  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  const submit = event => {
    event.preventDefault();
    if (!items.length) return setError("Your cart is empty. Add something delicious first.");
    const customer = { ...form, name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim(), landmark: form.landmark.trim() };
    if (!customer.name || !customer.address) return setError("Enter your name and complete delivery address.");
    if (!/^[6-9]\d{9}$/.test(customer.phone)) return setError("Enter a valid 10-digit Indian mobile number.");
    const order = { ...customer, items, total, reference: `DUM${Date.now().toString().slice(-6)}`, status: "New", createdAt: new Date().toLocaleString("en-IN", { weekday: "short", hour: "numeric", minute: "2-digit" }) };
    try {
      sessionStorage.setItem("dum-co-demo-order", JSON.stringify(order));
      const existing = JSON.parse(localStorage.getItem("dum-co-demo-orders") || "[]");
      const savedOrders = Array.isArray(existing) ? existing : [];
      localStorage.setItem("dum-co-demo-orders", JSON.stringify([order, ...savedOrders]));
    } catch {
      setError("This browser cannot save your demo order. Enable site storage and try again.");
      return;
    }
    window.location.href = "/order-success";
  };
  return <main><Header/><section className="checkout-page"><a className="back-link" href="/cart"><ArrowLeft size={15}/> Back to cart</a>
    <div className="checkout-heading"><p className="eyebrow">ALMOST AT YOUR DOOR</p><h1>Checkout, <em>with love.</em></h1><p>Just a few details and your feast is set.</p></div>
    <div className="cart-layout checkout-layout"><form className="checkout-form" onSubmit={submit}><h2>Delivery details</h2>
      <label>Full name<input name="name" value={form.name} onChange={update} required placeholder="Your name"/></label>
      <label>Mobile number<input name="phone" value={form.phone} onChange={update} required inputMode="numeric" maxLength={10} placeholder="10-digit mobile number"/></label>
      <label>Delivery address<textarea name="address" value={form.address} onChange={update} required rows={3} placeholder="House / flat, street, area, city, PIN code"/></label>
      <label>Landmark <span className="optional">(optional)</span><input name="landmark" value={form.landmark} onChange={update} placeholder="Near..."/></label>
      <h2 className="payment-heading">Payment preference</h2><div className="payment-options"><label><input type="radio" name="payment" value="UPI" checked={form.payment === "UPI"} onChange={update}/> UPI</label><label><input type="radio" name="payment" value="Cash on delivery" checked={form.payment === "Cash on delivery"} onChange={update}/> Cash on delivery</label></div>
      <p className="demo-disclaimer"><ShieldCheck size={16}/> Demo checkout only. No payment will be collected and no real order will be placed.</p>
      {error && <p className="form-error">{error}</p>}<button className="button-primary full-button" type="submit">Place demo order · ₹{total} <span>→</span></button>
    </form><aside className="order-summary"><h2>Your order</h2>{items.map(item => <div key={item.key}><span>{item.quantity} × {item.name}</span><b>₹{item.price * item.quantity}</b></div>)}<div><span>Subtotal</span><b>₹{subtotal}</b></div><div><span>Delivery</span><b>{delivery ? `₹${delivery}` : "Free"}</b></div><div className="summary-total"><span>Total</span><strong>₹{total}</strong></div></aside></div>
  </section></main>;
}
