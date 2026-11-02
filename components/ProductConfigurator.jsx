"use client";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductConfigurator({ item }) {
  const [portion, setPortion] = useState("Regular");
  const [spice, setSpice] = useState("Medium");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const { addItem } = useCart();
  const extraPrice = portion === "Large" ? 80 : portion === "Half" ? -60 : 0;
  const add = () => {
    addItem(item, { portion, spice, extraPrice, note }, quantity);
    window.location.href = "/cart";
  };
  return <section className="product-page">
    <a className="back-link" href="/#menu"><ArrowLeft size={15}/> Back to menu</a>
    <div className="product-layout"><div className="product-photo"><img src={item.image} alt={item.name}/><span>{item.tag}</span></div>
      <div className="product-details"><p className="eyebrow">{item.category.toUpperCase()} · MADE FRESH</p><h1>{item.name}</h1><strong className="product-price">₹{item.price + extraPrice}</strong><p className="product-description">{item.description} Prepared fresh with carefully selected ingredients and our signature kitchen touch.</p>
        <div className="option-group"><b>Choose your portion</b><div className="option-pills">{["Half","Regular","Large"].map(value => <button key={value} className={portion === value ? "option-pill selected" : "option-pill"} onClick={() => setPortion(value)}>{value}{value === "Large" ? " +₹80" : value === "Half" ? " -₹60" : ""}</button>)}</div></div>
        <div className="option-group"><b>Spice level</b><div className="option-pills">{["Mild","Medium","Hot"].map(value => <button key={value} className={spice === value ? "option-pill selected" : "option-pill"} onClick={() => setSpice(value)}>{value}</button>)}</div></div>
        <label className="special-note">Special instructions <span className="optional">(optional)</span><textarea rows={2} value={note} onChange={event => setNote(event.target.value)} placeholder="Any little requests for our kitchen?"/></label>
        <div className="product-buy"><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={14}/></button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={14}/></button></div><button className="button-primary" onClick={add}><ShoppingBag size={16}/> Add · ₹{(item.price + extraPrice) * quantity}</button></div>
      </div>
    </div>
  </section>;
}
