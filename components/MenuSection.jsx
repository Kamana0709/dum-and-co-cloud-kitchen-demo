"use client";
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { categories, menuItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";

export default function MenuSection() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const { addItem, count, subtotal } = useCart();
  const filtered = useMemo(() => menuItems.filter(item => {
    const categoryMatch = active === "All" || item.category === active;
    const searchMatch = `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && searchMatch;
  }), [active, query]);

  return <section className="menu-section section-wrap" id="menu">
    <div className="section-heading"><div><p className="eyebrow">MADE WITH TIME. SERVED WITH SOUL.</p><h2>A menu worth<br/><em>slowing down for.</em></h2></div><p className="section-intro">From the first crackle of the tadka to the last grain of basmati — every detail has a little more love in it.</p></div>
    <div className="menu-toolbar"><div className="category-tabs">{categories.map(category => <button key={category} className={active === category ? "category-tab active" : "category-tab"} onClick={() => setActive(category)}>{category}</button>)}</div><label className="menu-search"><Search size={16}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Find your favourite..."/></label></div>
    <div className="menu-grid">{filtered.map(item => <article className="menu-card" key={item.id}>
      <a href={`/menu/${item.id}`} className="menu-image"><img src={item.image} alt={item.name}/><span>{item.tag}</span></a>
      <div className="menu-card-content"><div className="menu-card-title"><h3><a href={`/menu/${item.id}`}>{item.name}</a></h3><strong>₹{item.price}</strong></div><p>{item.description}</p>
        <div className="menu-card-actions"><a href={`/menu/${item.id}`} className="customise-link">Customise</a><button className="add-button" onClick={() => addItem(item)}><Plus size={16}/> Quick add</button></div>
      </div></article>)}</div>
    {filtered.length === 0 && <p className="empty-state">Nothing on the menu by that name. Try another search.</p>}
    {count > 0 && <div className="cart-toast" role="status"><span><b>{count} items</b> in your order · ₹{subtotal}</span><a href="/cart">View cart →</a></div>}
  </section>;
}
