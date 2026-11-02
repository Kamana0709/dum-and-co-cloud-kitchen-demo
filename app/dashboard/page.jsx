"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight, ArrowUpRight, Bell, Check, ChefHat, ChevronDown,
  CircleDot, Clock3, IndianRupee, LayoutDashboard, LogOut, Menu as MenuIcon,
  MoreHorizontal, PackageCheck, Plus, Search, ShoppingBag, TrendingUp,
  UtensilsCrossed, X
} from "lucide-react";
import { menuItems } from "@/data/menu";

const ORDER_KEY = "dum-co-demo-orders";
const MENU_KEY = "dum-co-menu-settings";
const statuses = ["New", "Preparing", "Ready", "Completed", "Cancelled"];
const seedOrders = [
  { reference: "DUM28491", name: "Aarav Sharma", phone: "9876543210", address: "Unit 4, Bhubaneswar", payment: "UPI", total: 578, status: "New", createdAt: "Today, 12:42 PM", items: [{ name: "Old Lucknow Chicken Biryani", quantity: 2 }, { name: "Shahi Tukda", quantity: 0 }] },
  { reference: "DUM28490", name: "Priya Das", phone: "9861234567", address: "Saheed Nagar, Bhubaneswar", payment: "Cash on delivery", total: 329, status: "Preparing", createdAt: "Today, 12:31 PM", items: [{ name: "Mutton Galouti Kebab", quantity: 1 }] },
  { reference: "DUM28489", name: "Rohan Patnaik", phone: "9437123456", address: "Patia, Bhubaneswar", payment: "UPI", total: 478, status: "Ready", createdAt: "Today, 12:18 PM", items: [{ name: "Subz Dum Biryani", quantity: 1 }, { name: "Angara Paneer Tikka", quantity: 1 }] },
  { reference: "DUM28488", name: "Ananya Mohanty", phone: "9778123456", address: "Khandagiri, Bhubaneswar", payment: "UPI", total: 289, status: "Completed", createdAt: "Today, 11:54 AM", items: [{ name: "Old Lucknow Chicken Biryani", quantity: 1 }] },
  { reference: "DUM28487", name: "Kabir Sahu", phone: "9437456789", address: "Jaydev Vihar, Bhubaneswar", payment: "Cash on delivery", total: 558, status: "Completed", createdAt: "Today, 11:26 AM", items: [{ name: "Lucknowi Chicken Seekh", quantity: 2 }] }
];

const money = value => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function DashboardPage() {
  const [section, setSection] = useState("Overview");
  const [orders, setOrders] = useState([]);
  const [menuSettings, setMenuSettings] = useState({});
  const [filter, setFilter] = useState("All orders");
  const [query, setQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem(ORDER_KEY) || "null");
      setOrders(Array.isArray(savedOrders) ? savedOrders : seedOrders);
      setMenuSettings(JSON.parse(localStorage.getItem(MENU_KEY) || "{}"));
    } catch {
      setOrders(seedOrders);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
      localStorage.setItem(MENU_KEY, JSON.stringify(menuSettings));
    }
  }, [orders, menuSettings, ready]);

  const visibleOrders = useMemo(() => orders.filter(order => {
    const matchesFilter = filter === "All orders" || order.status === filter;
    const matchesQuery = `${order.reference} ${order.name} ${order.phone}`.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  }), [orders, filter, query]);

  const revenue = orders.filter(order => order.status !== "Cancelled").reduce((sum, order) => sum + Number(order.total || 0), 0);
  const activeOrders = orders.filter(order => ["New", "Preparing", "Ready"].includes(order.status)).length;
  const updateStatus = (reference, status) => setOrders(current => current.map(order => order.reference === reference ? { ...order, status } : order));
  const toggleMenuItem = id => setMenuSettings(current => ({ ...current, [id]: current[id] === false ? true : false }));
  const isAvailable = id => menuSettings[id] !== false;

  const nav = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Orders", icon: ShoppingBag },
    { label: "Menu", icon: UtensilsCrossed },
    { label: "Analytics", icon: TrendingUp }
  ];

  return <main className="dashboard-shell">
    <aside className="dashboard-sidebar">
      <a className="dashboard-brand" href="/"><span className="wordmark-mark">D</span><span>DUM <i>&</i> CO.<small>KITCHEN CONSOLE</small></span></a>
      <div className="dashboard-store"><span className="store-avatar">D</span><span><b>DUM & CO.</b><small>Lucknowi Cloud Kitchen</small></span><ChevronDown size={15}/></div>
      <p className="dashboard-nav-label">WORKSPACE</p>
      <nav className="dashboard-nav">{nav.map(item => <button key={item.label} className={section === item.label ? "active" : ""} onClick={() => { setSection(item.label); setSelectedOrder(null); }}><item.icon size={17}/>{item.label}{item.label === "Orders" && activeOrders > 0 && <span>{activeOrders}</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="kitchen-status"><span className="status-pulse"/> <span><b>Kitchen is open</b><small>Accepting demo orders</small></span></div><a href="/" className="back-store"><ArrowDownRight size={15}/> View customer storefront</a><div className="profile-mini"><span className="profile-avatar">AK</span><span><b>Kitchen Admin</b><small>Demo workspace</small></span><MoreHorizontal size={17}/></div></div>
    </aside>

    <section className="dashboard-main">
      <header className="dashboard-topbar"><div className="mobile-dash-brand"><span className="wordmark-mark">D</span><b>DUM & CO.</b></div><div className="breadcrumb">Workspace <span>/</span> {section}</div><div className="topbar-actions"><span className="topbar-date">MON, 02 NOV 2026</span><button className="icon-button" aria-label="Notifications"><Bell size={17}/><i/></button><span className="topbar-avatar">AK</span></div></header>

      <div className="dashboard-content">
        <div className="dashboard-heading"><div><p className="eyebrow">MONDAY, 02 NOVEMBER 2026</p><h1>{section === "Overview" ? <>Good afternoon, <em>Chef.</em></> : section === "Orders" ? <>Order <em>management.</em></> : section === "Menu" ? <>Your <em>menu.</em></> : <>Kitchen <em>performance.</em></>}</h1><p>{section === "Overview" ? "Here's what's happening in your kitchen today." : section === "Orders" ? "Track every ticket from first tap to final handoff." : section === "Menu" ? "Keep your best dishes available and your menu up to date." : "A quick look at your demo kitchen's performance."}</p></div><div className="dashboard-heading-actions"><span className="live-chip"><i/> LIVE DEMO</span><button className="dashboard-primary" onClick={() => setSection("Orders")}><Plus size={16}/> View orders</button></div></div>

        {section === "Overview" && <>
          <div className="metric-grid">
            <article className="metric-card"><div><span>Today's revenue</span><i className="metric-icon"><IndianRupee size={17}/></i></div><strong>{money(revenue)}</strong><small className="metric-positive"><ArrowUpRight size={13}/> Demo order total</small></article>
            <article className="metric-card"><div><span>Total orders</span><i className="metric-icon"><ShoppingBag size={17}/></i></div><strong>{orders.length.toString().padStart(2,"0")}</strong><small>Orders in this demo workspace</small></article>
            <article className="metric-card"><div><span>Active orders</span><i className="metric-icon"><Clock3 size={17}/></i></div><strong>{activeOrders.toString().padStart(2,"0")}</strong><small>Need kitchen attention</small></article>
            <article className="metric-card"><div><span>Menu items</span><i className="metric-icon"><UtensilsCrossed size={17}/></i></div><strong>{menuItems.filter(item => isAvailable(item.id)).length}/{menuItems.length}</strong><small>Currently available</small></article>
          </div>
          <div className="dashboard-panels">
            <section className="dashboard-panel recent-panel"><div className="panel-heading"><div><h2>Recent orders</h2><p>Your latest customer tickets</p></div><button className="subtle-link" onClick={() => setSection("Orders")}>View all <ArrowUpRight size={14}/></button></div><div className="recent-orders">{orders.slice(0,4).map(order => <button className="recent-order" key={order.reference} onClick={() => { setSelectedOrder(order); setSection("Orders"); }}><span className="order-initial">{order.name.charAt(0)}</span><span className="recent-order-info"><b>{order.name}</b><small>#{order.reference} · {order.createdAt}</small></span><span className={`order-status status-${order.status.toLowerCase()}`}>{order.status}</span><strong>{money(order.total)}</strong></button>)}</div></section>
            <section className="dashboard-panel"><div className="panel-heading"><div><h2>Kitchen pulse</h2><p>Order flow at a glance</p></div><span className="pulse-icon"><ChefHat size={18}/></span></div><div className="kitchen-flow">{statuses.slice(0,4).map((status,index) => <div className="flow-row" key={status}><span className={`flow-dot flow-${index}`}/><span>{status}</span><b>{orders.filter(order => order.status === status).length}</b></div>)}</div><div className="panel-tip"><ChefHat size={16}/><span><b>Keep the kitchen moving.</b><small>Update order statuses as tickets progress.</small></span></div></section>
          </div>
          <section className="dashboard-panel performance-panel"><div className="panel-heading"><div><h2>Weekly order activity</h2><p>Illustrative demo activity · not live sales data</p></div><span className="chart-legend"><i/> Orders</span></div><div className="mini-chart">{[["Mon",4],["Tue",6],["Wed",3],["Thu",8],["Fri",5],["Sat",10],["Sun",7]].map(([day,value]) => <div className="chart-column" key={day}><div className="chart-track"><span style={{height:`${value*9}%`}}/></div><small>{day}</small></div>)}</div></section>
        </>}

        {section === "Orders" && <section className="dashboard-panel orders-panel"><div className="orders-toolbar"><div className="order-filters">{["All orders","New","Preparing","Ready","Completed","Cancelled"].map(value => <button key={value} className={filter === value ? "selected" : ""} onClick={() => setFilter(value)}>{value}</button>)}</div><label className="dashboard-search"><Search size={15}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search order or customer"/></label></div><div className="orders-table-wrap"><table className="orders-table"><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>ITEMS</th><th>TIME</th><th>AMOUNT</th><th>STATUS</th><th/></tr></thead><tbody>{visibleOrders.map(order => <tr key={order.reference}><td><b>#{order.reference}</b><small>Demo order</small></td><td><b>{order.name}</b><small>{order.phone}</small></td><td>{order.items?.reduce((sum,item) => sum + Number(item.quantity || 1),0)} item(s)</td><td>{order.createdAt}</td><td><b>{money(order.total)}</b></td><td><span className={`order-status status-${order.status.toLowerCase()}`}>{order.status}</span></td><td><button className="row-action" onClick={() => setSelectedOrder(order)} aria-label={`View ${order.reference}`}><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table>{visibleOrders.length === 0 && <div className="dashboard-empty">No orders match this view.</div>}</div></section>}

        {section === "Menu" && <section className="dashboard-panel menu-manager"><div className="panel-heading"><div><h2>Menu availability</h2><p>Pause a dish when the kitchen runs out. Changes are saved in this browser.</p></div><span className="menu-count">{menuItems.filter(item => isAvailable(item.id)).length} available</span></div><div className="menu-manager-grid">{menuItems.map(item => <article className={`manage-menu-item ${isAvailable(item.id) ? "" : "is-paused"}`} key={item.id}><img src={item.image} alt={item.name}/><div className="manage-menu-copy"><small>{item.category}</small><b>{item.name}</b><strong>{money(item.price)}</strong></div><button className={`availability-toggle ${isAvailable(item.id) ? "on" : ""}`} onClick={() => toggleMenuItem(item.id)}><span/>{isAvailable(item.id) ? "Available" : "Paused"}</button></article>)}</div></section>}

        {section === "Analytics" && <><div className="metric-grid"><article className="metric-card"><div><span>Gross demo sales</span><i className="metric-icon"><IndianRupee size={17}/></i></div><strong>{money(revenue)}</strong><small>Excludes cancelled orders</small></article><article className="metric-card"><div><span>Average order value</span><i className="metric-icon"><TrendingUp size={17}/></i></div><strong>{money(orders.length ? Math.round(revenue / orders.filter(order => order.status !== "Cancelled").length || 0) : 0)}</strong><small>Across demo orders</small></article><article className="metric-card"><div><span>Completed</span><i className="metric-icon"><PackageCheck size={17}/></i></div><strong>{orders.filter(order => order.status === "Completed").length}</strong><small>Marked as completed</small></article><article className="metric-card"><div><span>In kitchen</span><i className="metric-icon"><ChefHat size={17}/></i></div><strong>{activeOrders}</strong><small>Open tickets</small></article></div><section className="dashboard-panel analytics-note"><TrendingUp size={22}/><div><h2>Demo analytics</h2><p>These totals are calculated from the sample orders and any orders submitted in this browser. Connect a backend and payment provider before using this for real business reporting.</p></div></section></>}
      </div>
    </section>

    {selectedOrder && <div className="order-modal-backdrop" onClick={() => setSelectedOrder(null)}><section className="order-modal" onClick={event => event.stopPropagation()}><div className="modal-heading"><div><p className="eyebrow">ORDER DETAILS</p><h2>#{selectedOrder.reference}</h2></div><button className="icon-button" onClick={() => setSelectedOrder(null)} aria-label="Close order details"><X size={18}/></button></div><div className="modal-customer"><b>{selectedOrder.name}</b><span>{selectedOrder.phone}</span><span>{selectedOrder.address}</span></div><div className="modal-items">{selectedOrder.items?.filter(item => item.quantity > 0).map((item,index) => <div key={index}><span>{item.quantity} × {item.name}</span></div>)}</div><div className="modal-total"><span>Order total</span><b>{money(selectedOrder.total)}</b></div><label className="status-select-label">Update order status<select value={selectedOrder.status} onChange={event => { updateStatus(selectedOrder.reference,event.target.value); setSelectedOrder({...selectedOrder,status:event.target.value}); }}>{statuses.map(status => <option key={status}>{status}</option>)}</select></label><button className="dashboard-primary modal-done" onClick={() => setSelectedOrder(null)}><Check size={16}/> Save changes</button><p className="modal-demo-note">Demo only · status changes are stored in this browser.</p></section></div>}
  </main>;
}
