import { ArrowDownRight, ArrowUpRight, Clock3, Flame, Leaf, MapPin, Star } from "lucide-react";
import Header from "@/components/Header";
import MenuSection from "@/components/MenuSection";

export default function Home() {
  return <main>
    <Header/>
    <section className="hero"><div className="hero-copy">
      <p className="eyebrow"><span className="eyebrow-line"/> THE ART OF SLOW COOKING</p>
      <h1>A little <em>dum.</em><br/>A lot of <span>soul.</span></h1>
      <p className="hero-description">Old Lucknow flavours, lovingly slow-cooked and brought straight to your door. Some things are worth waiting for.</p>
      <div className="hero-actions"><a className="button-primary" href="#menu">Explore the menu <ArrowUpRight size={17}/></a><a className="text-link" href="#story">Get to know us <ArrowDownRight size={16}/></a></div>
      <div className="hero-proof"><div className="proof-avatars"><span>अ</span><span>✳</span><span>د</span></div><div><div className="stars"><Star/><Star/><Star/><Star/><Star/></div><small>Made fresh. Never rushed.</small></div></div>
    </div><div className="hero-visual"><div className="hero-image"><img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1400&q=90" alt="Fragrant chicken biryani served in a traditional bowl"/></div><div className="hero-stamp"><span>EST.</span><b>2024</b><i>✳</i><span>LUCKNOWI SOUL</span></div><div className="hero-note"><span className="note-icon">✳</span><span>Slow cooked<br/><b>to perfection.</b></span></div></div>
      <div className="hero-bottom"><span>01 — 04</span><span>SCROLL TO DISCOVER <ArrowDownRight size={15}/></span><span>GOOD FOOD, GOOD MOOD.</span></div>
    </section>
    <section className="promise-strip" id="promise"><div><Clock3/><span><b>Slow-cooked goodness</b><small>Time is our secret ingredient</small></span></div><div><Flame/><span><b>Fresh from our kitchen</b><small>Made when you order</small></span></div><div><Leaf/><span><b>Honest ingredients</b><small>Nothing to hide, ever</small></span></div><div><MapPin/><span><b>At your doorstep</b><small>Made for your kind of comfort</small></span></div></section>
    <MenuSection/>
    <section className="story-section" id="story"><div className="story-image"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1100&q=85" alt="A spread of traditional Indian food"/></div><div className="story-copy"><p className="eyebrow">A LEGACY IN EVERY LAYER</p><h2>Some recipes<br/>aren't written.<br/><em>They're remembered.</em></h2><p>Inspired by the old kitchens of Lucknow, DUM & CO. celebrates the patience, warmth and generosity that make Awadhi food unforgettable.</p><a href="#menu" className="text-link">Taste the tradition <ArrowUpRight size={16}/></a></div></section>
    <section className="closing-cta"><p className="eyebrow">YOUR TABLE IS WAITING</p><h2>Bring home a little<br/><em>Lucknowi love.</em></h2><a className="button-light" href="#menu">Find your favourite <ArrowUpRight size={17}/></a><span className="cta-flower">✳</span></section>
    <footer className="site-footer"><a className="wordmark footer-mark" href="/"><span className="wordmark-mark">D</span><span>DUM <i>&</i> CO.<small>AWADHI KITCHEN</small></span></a><p>Good food. Unhurried moments.</p><div><a href="#menu">Menu</a><a href="#story">Our story</a><a href="/dashboard">Kitchen dashboard</a><a href="mailto:hello@dumandco.example">Contact</a></div><small>© 2026 DUM & CO. A fictional demo concept by Taksha Nexus.</small></footer>
  </main>;
}
