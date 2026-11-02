"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Star } from "lucide-react";

const slides = [
  {
    eyebrow: "THE ART OF SLOW COOKING",
    first: "A little", accent: "dum.", second: "A lot of", ending: "soul.",
    description: "Old Lucknow flavours, lovingly slow-cooked and brought straight to your door. Some things are worth waiting for.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1500&q=90",
    alt: "A fragrant plate of traditional chicken biryani",
    note: "Slow cooked", noteEnd: "to perfection.", label: "THE ORIGINAL"
  },
  {
    eyebrow: "A FEAST WORTH GATHERING FOR",
    first: "Layers of", accent: "love.", second: "A table full", ending: "of joy.",
    description: "Every grain, every spice, every slow turn of the dum. Made to be shared, remembered and relished.",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=1500&q=90",
    alt: "Indian biryani with aromatic rice and spices",
    note: "Made for sharing", noteEnd: "made with heart.", label: "THE CELEBRATION"
  },
  {
    eyebrow: "THE MAGIC IS IN THE DETAILS",
    first: "Spice with", accent: "soul.", second: "Comfort in", ending: "every bite.",
    description: "From fragrant biryani to slow-simmered curries, discover comfort food with a little Lucknowi magic.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=1500&q=90",
    alt: "Rich Indian curry finished with herbs and spices",
    note: "Rich in flavour", noteEnd: "never in a rush.", label: "THE COMFORT"
  },
  {
    eyebrow: "YOUR FAVOURITE MOMENT STARTS HERE",
    first: "Bring home", accent: "dum.", second: "Bring home", ending: "happiness.",
    description: "A little tradition, a lot of warmth. Your next favourite meal is only a few clicks away.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1500&q=90",
    alt: "A beautiful spread of Indian food ready to be served",
    note: "Fresh from us", noteEnd: "straight to you.", label: "THE EXPERIENCE"
  }
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const slide = slides[active];
  const next = () => setActive((value) => (value + 1) % slides.length);
  const previous = () => setActive((value) => (value - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(next, 5500);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section className="hero hero-carousel" aria-roledescription="carousel" aria-label="DUM & CO. featured food" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={(event) => setTouchStart(event.touches[0].clientX)} onTouchEnd={(event) => { if (touchStart === null) return; const delta = event.changedTouches[0].clientX - touchStart; if (Math.abs(delta) > 45) delta < 0 ? next() : previous(); setTouchStart(null); }}>
      <div className="hero-slides" style={{ transform: `translateX(-${active * 100}%)` }}>
        {slides.map((item, index) => (
          <article className="hero-slide" key={item.label} aria-hidden={index !== active}>
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line"/> {item.eyebrow}</p>
              <h1>{item.first} <em>{item.accent}</em><br/>{item.second} <span>{item.ending}</span></h1>
              <p className="hero-description">{item.description}</p>
              <div className="hero-actions"><a className="button-primary" href="#menu">Explore the menu <ArrowUpRight size={17}/></a><a className="text-link" href="#story">Get to know us <ArrowDownRight size={16}/></a></div>
              <div className="hero-proof"><div className="proof-avatars"><span>अ</span><span>✳</span><span>د</span></div><div><div className="stars"><Star/><Star/><Star/><Star/><Star/></div><small>Made fresh. Never rushed.</small></div></div>
            </div>
            <div className="hero-visual"><div className="hero-image"><img src={item.image} alt={item.alt} fetchPriority={index === active ? "high" : "auto"}/></div><div className="hero-stamp"><span>EST.</span><b>2024</b><i>✳</i><span>LUCKNOWI SOUL</span></div><div className="hero-note"><span className="note-icon">✳</span><span>{item.note}<br/><b>{item.noteEnd}</b></span></div><span className="hero-slide-label">{item.label}</span></div>
          </article>
        ))}
      </div>
      <div className="hero-bottom"><span>{String(active + 1).padStart(2, "0")} — {String(slides.length).padStart(2, "0")}</span><div className="hero-carousel-controls"><button type="button" onClick={previous} aria-label="Previous slide"><ArrowLeft size={15}/></button><div className="hero-dots">{slides.map((item, index) => <button type="button" key={item.label} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Go to slide ${index + 1}`} aria-current={index === active ? "true" : undefined}/>)}</div><button type="button" onClick={next} aria-label="Next slide"><ArrowRight size={15}/></button></div><span>GOOD FOOD, GOOD MOOD.</span></div>
    </section>
  );
}
