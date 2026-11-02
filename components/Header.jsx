import { Menu } from "lucide-react";
import CartBadge from "@/components/CartBadge";
export default function Header() {
  return <header className="site-header">
    <a className="wordmark" href="/" aria-label="DUM and Co home"><span className="wordmark-mark">D</span><span>DUM <i>&</i> CO.<small>AWADHI KITCHEN</small></span></a>
    <nav className="desktop-nav" aria-label="Main navigation"><a href="/#menu">Our menu</a><a href="/#story">Our story</a><a href="/#promise">The DUM promise</a></nav>
    <CartBadge />
    <a className="mobile-menu" href="/#menu" aria-label="Jump to menu"><Menu size={23}/></a>
  </header>;
}
