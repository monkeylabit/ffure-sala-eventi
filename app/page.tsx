"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ImmersiveScrollGallery from "@/components/ui/immersive-scroll-gallery";
import { ImageGallery } from "@/components/ui/image-gallery";


// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about",   label: "Chi siamo" },
    { href: "#events",  label: "Servizi" },
    { href: "#gallery", label: "Galleria" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-16 py-3 flex items-center justify-between transition-all duration-300"
        style={{
          background:     scrolled ? "rgba(255,255,255,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          boxShadow:      scrolled ? "0 2px 24px rgba(201,164,101,0.12)" : "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#hero" aria-label="Torna in cima">
          <img src="/logo.png" alt="Ffure" className="h-14 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase">
          {links.map((l) => (
            <a key={l.href} href={l.href}
               className="transition-colors duration-200"
               style={{ color: scrolled ? "#1C1917" : "rgba(255,255,255,0.9)" }}>
              {l.label}
            </a>
          ))}
          <a href="#contact"
             className="px-6 py-2.5 rounded-full font-extrabold tracking-widest text-xs cursor-pointer shadow-lg transition-colors duration-200"
             style={{ backgroundColor: "#C9A465", color: "#1C1917" }}>
            Prenota ora
          </a>
        </div>

        <button onClick={() => setMenuOpen(true)} className="md:hidden cursor-pointer" aria-label="Apri menu"
                style={{ color: scrolled ? "#1C1917" : "white" }}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-9 text-xl font-bold tracking-widest uppercase">
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-dark cursor-pointer" aria-label="Chiudi">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
               className="text-dark hover:text-[#C9A465] transition-colors duration-200">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
             className="px-10 py-3 rounded-full cursor-pointer shadow-lg transition-colors duration-200"
             style={{ backgroundColor: "#C9A465", color: "#1C1917" }}>
            Prenota ora
          </a>
        </div>
      )}
    </>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative h-screen min-h-[620px] flex items-end overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sfondo-hero.jpg"
        alt="Sala Ffure allestita"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Gradient: strong at bottom, light at top */}
      <div className="absolute inset-0"
           style={{ background: "linear-gradient(to top, rgba(28,25,23,0.95) 0%, rgba(28,25,23,0.5) 45%, rgba(28,25,23,0.1) 100%)" }} />
      {/* Thin gold line at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px]"
           style={{ background: "linear-gradient(90deg, #C9A465, #E2C27D, #A07C3A)" }} />

      {/* Content — bottom left */}
      <div className="relative z-10 px-8 lg:px-20 pb-16 md:pb-24 w-full max-w-4xl">
        <span className="block text-xs font-bold tracking-[0.3em] uppercase mb-5"
              style={{ color: "rgba(201,164,101,0.85)" }}>
          Sala per eventi &amp; conferenze
        </span>
        <h1 className="font-display text-white leading-none mb-6"
            style={{ fontSize: "clamp(4rem,11vw,9.5rem)", textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}>
          LA TUA<br />FESTA<br /><span className="gold-text">INIZIA QUI</span>
        </h1>
        <div className="flex items-center gap-5 mb-10">
          <div className="h-px w-14 shrink-0" style={{ backgroundColor: "#C9A465" }} />
          <p className="text-white/65 text-base font-light tracking-wide">
            Compleanni · Feste a tema · Conferenze
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contact"
             className="inline-block font-extrabold px-10 py-4 rounded-full text-xs tracking-widest uppercase shadow-2xl cursor-pointer transition-colors duration-200 hover:opacity-90"
             style={{ backgroundColor: "#C9A465", color: "#1C1917" }}>
            Richiedi un preventivo
          </a>
          <a href="#gallery"
             className="inline-block border border-white/40 text-white/80 font-bold px-10 py-4 rounded-full text-xs tracking-widest uppercase hover:border-white hover:text-white transition-colors duration-200 cursor-pointer">
            Vedi la galleria
          </a>
        </div>
      </div>

      {/* Scroll indicator — bottom right */}
      <div className="absolute bottom-10 right-8 z-10 flex flex-col items-center gap-3" aria-hidden="true">
        <span className="text-white/30 text-[0.6rem] font-bold tracking-[0.2em] uppercase"
              style={{ writingMode: "vertical-rl", letterSpacing: "0.25em" }}>
          Scorri
        </span>
        <div className="w-px h-10" style={{ backgroundColor: "rgba(201,164,101,0.4)" }} />
      </div>
    </section>
  );
}

// ─── Numbers ───────────────────────────────────────────────────────────────────
function Numbers() {
  const stats = [
    { value: "500+", label: "eventi realizzati" },
    { value: "100%", label: "personalizzabile" },
    { value: "12+",  label: "tipi di eventi" },
    { value: "★★★★★", label: "recensioni" },
  ];
  return (
    <section className="py-14 px-6 lg:px-16" style={{ backgroundColor: "#FFF8EE" }}>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-display leading-none"
                 style={{ fontSize: "4rem", background: "linear-gradient(135deg,#C9A465,#F0C97A)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {s.value}
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest mt-1"
               style={{ color: "rgba(28,25,23,0.55)" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-24 md:py-28 px-6 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 md:order-1">
          <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl pointer-events-none"
               style={{ background: "linear-gradient(135deg,#C9A465,#F0C97A)", opacity: 0.18 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/eventi/SnapInsta.to_671244629_17892159366453132_3480184015416513213_n (1).jpg"
               alt="Sala Ffure allestita"
               className="relative z-10 w-full object-cover object-center rounded-2xl shadow-2xl"
               style={{ height: "clamp(280px, 50vw, 480px)" }} />
          <div className="absolute bottom-4 right-4 md:-bottom-5 md:-right-5 z-20 rounded-2xl px-5 py-3 shadow-xl"
               style={{ backgroundColor: "#C9A465", color: "#1C1917" }}>
            <p className="font-display text-2xl md:text-3xl leading-none">SALA</p>
            <p className="font-display text-2xl md:text-3xl leading-none">EVENTI</p>
            <p className="text-xs font-bold mt-1 opacity-70 tracking-widest">& CONFERENZE</p>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
                style={{ background: "linear-gradient(90deg,#C9A465,#F0C97A)", color: "#1C1917" }}>
            Chi siamo
          </span>
          <h2 className="font-display text-[#1C1917] leading-tight mb-6"
              style={{ fontSize: "clamp(2.8rem,6vw,4.5rem)" }}>
            DOVE OGNI<br /><span className="gold-text">MOMENTO</span><br />DIVENTA MAGICO
          </h2>
          <p className="text-lg leading-relaxed mb-5" style={{ color: "rgba(28,25,23,0.65)" }}>
            Ffure è una sala per eventi e conferenze pensata per chi vuole celebrare i momenti
            più belli della vita in un ambiente elegante, moderno e completamente personalizzabile.
          </p>
          <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(28,25,23,0.65)" }}>
            Dalla festa di compleanno alla conferenza aziendale, dal battesimo alla serata a tema:
            curiamo ogni dettaglio per rendere il tuo evento indimenticabile.
          </p>
          <a href="#contact"
             className="inline-flex items-center gap-3 text-white font-bold px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-colors duration-200 cursor-pointer shadow-lg group"
             style={{ backgroundColor: "#1C1917" }}>
            Contattaci subito
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  { img: "/eventi/SnapInsta.to_555049749_17867385240453132_4551923173738107532_n.jpg",
    alt: "Bambini", tag: "Feste private", title: "BAMBINI", sub: "Feste per i più piccoli" },
  { img: "/eventi/SnapInsta.to_670652930_17892159375453132_5067391862701741077_n.jpg",
    alt: "Feste a tema", tag: "Tematiche", title: "FESTE A TEMA", sub: "Allestimenti su misura" },
  { img: "/eventi/SnapInsta.to_581847306_17872784514453132_8530572488304752198_n.jpg",
    alt: "Compleanni", tag: "Feste private", title: "COMPLEANNI", sub: "Adulti e cerimonie" },
  { img: "/sfondo-conferenze.jpg",
    alt: "Conferenze", tag: "Business", title: "CONFERENZE", sub: "Meeting & aziendali" },
];

function Services() {
  return (
    <section id="events" className="py-24 md:py-28 px-6 lg:px-16" style={{ backgroundColor: "#FFF8EE" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
                style={{ background: "linear-gradient(90deg,#C9A465,#F0C97A)", color: "#1C1917" }}>
            I nostri servizi
          </span>
          <h2 className="font-display text-[#1C1917] leading-tight"
              style={{ fontSize: "clamp(3rem,7vw,5.5rem)" }}>
            OGNI EVENTO È<br /><span className="gold-text">UNA STORIA UNICA</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <div key={s.title} className="relative overflow-hidden rounded-2xl cursor-pointer shadow-xl group"
                 style={{ height: "384px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={s.alt}
                   className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-2xl"
                   style={{ background: "linear-gradient(to top, rgba(28,25,23,0.88) 0%, rgba(28,25,23,0.15) 55%, transparent 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 rounded-full text-[0.6rem] font-bold tracking-widest uppercase mb-3"
                      style={{ background: "linear-gradient(90deg,#C9A465,#F0C97A)", color: "#1C1917" }}>
                  {s.tag}
                </span>
                <h3 className="font-display text-3xl text-white leading-tight">{s.title}</h3>
                <p className="text-sm mt-1 font-light" style={{ color: "rgba(255,255,255,0.6)" }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a href="#contact"
             className="inline-block font-extrabold px-12 py-5 rounded-full text-sm tracking-widest uppercase cursor-pointer shadow-xl transition-colors duration-200"
             style={{ backgroundColor: "#C9A465", color: "#1C1917" }}>
            Richiedi disponibilità
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ───────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-28 px-6 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{ background: "linear-gradient(90deg,#C9A465,#F0C97A)", color: "#1C1917" }}
          >
            I nostri eventi
          </span>
          <h2
            className="font-display text-[#1C1917] leading-tight"
            style={{ fontSize: "clamp(3rem,7vw,5.5rem)" }}
          >
            LA NOSTRA <span className="gold-text">GALLERIA</span>
          </h2>
        </motion.div>
        <ImageGallery />
      </div>
    </section>
  );
}

// ─── Gold Banner ───────────────────────────────────────────────────────────────
function GoldBanner() {
  return (
    <section className="py-16 px-6 lg:px-16 text-center"
             style={{ background: "linear-gradient(135deg,#C9A465 0%,#E8B84B 50%,#F0C97A 100%)" }}>
      <h2 className="font-display text-[#1C1917] leading-tight mb-4"
          style={{ fontSize: "clamp(2rem,6vw,4rem)" }}>
        IL TUO EVENTO DEI SOGNI TI ASPETTA
      </h2>
      <p className="font-medium text-lg mb-8 max-w-xl mx-auto" style={{ color: "rgba(28,25,23,0.7)" }}>
        Contattaci oggi e scopri come trasformare ogni occasione in un ricordo indimenticabile
      </p>
      <a href="#contact"
         className="inline-block text-white font-extrabold px-12 py-5 rounded-full text-sm tracking-widest uppercase cursor-pointer shadow-2xl transition-colors duration-200"
         style={{ backgroundColor: "#1C1917" }}>
        Prenota la tua data
      </a>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef               = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); formRef.current?.reset(); }, 1000);
  };

  const inputCls = "w-full bg-white border-[1.5px] border-[#E5D9C8] text-[#1C1917] px-4 py-3 rounded-xl outline-none transition-all duration-200 focus:border-[#C9A465] focus:shadow-[0_0_0_3px_rgba(201,164,101,0.15)] placeholder:text-[#B0A090] text-[0.95rem]";

  return (
    <section id="contact" className="py-24 md:py-28 px-6 lg:px-16" style={{ backgroundColor: "#FFF8EE" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
                style={{ background: "linear-gradient(90deg,#C9A465,#F0C97A)", color: "#1C1917" }}>
            Contattaci
          </span>
          <h2 className="font-display text-[#1C1917] leading-tight mb-4"
              style={{ fontSize: "clamp(3rem,7vw,5.5rem)" }}>
            PRENOTA LA TUA <span className="gold-text">DATA</span>
          </h2>
          <p className="max-w-md mx-auto text-base leading-relaxed font-light"
             style={{ color: "rgba(28,25,23,0.55)" }}>
            Raccontaci il tuo evento e ti risponderemo al più presto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-start">
          <div>
            <h3 className="font-display text-4xl text-[#1C1917] mb-8">INFORMAZIONI</h3>
            <div className="flex flex-col gap-6">
              {[
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                  label: "Telefono / WhatsApp", value: "Da aggiungere" },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
                  label: "Indirizzo", value: "Da aggiungere" },
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  label: "Email", value: "Da aggiungere" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                       style={{ backgroundColor: "rgba(201,164,101,0.15)" }}>
                    <svg className="w-5 h-5" fill="none" stroke="#A07C3A" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase mb-1"
                       style={{ color: "rgba(28,25,23,0.45)" }}>{item.label}</p>
                    <p className="text-[#1C1917] font-semibold text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-xs font-bold tracking-widest uppercase mb-4"
                 style={{ color: "rgba(28,25,23,0.45)" }}>Seguici su Instagram</p>
              <a href="#"
                 className="inline-flex items-center gap-3 text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity duration-200 cursor-pointer"
                 style={{ background: "linear-gradient(to right,#7C3AED,#EC4899,#F97316)" }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @ffure_sala
              </a>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-xl flex flex-col gap-4">
            {[
              { id: "f-name", label: "Nome e cognome *", type: "text",  required: true,  autoComplete: "name",  placeholder: "Mario Rossi" },
              { id: "f-phone", label: "Telefono",         type: "tel",   required: false, autoComplete: "tel",   placeholder: "+39 000 000 0000" },
              { id: "f-date", label: "Data desiderata",   type: "date",  required: false, autoComplete: "off",   placeholder: "" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-xs font-bold tracking-widest uppercase mb-2"
                       style={{ color: "rgba(28,25,23,0.55)" }}>{field.label}</label>
                <input type={field.type} id={field.id} name={field.id} required={field.required}
                       autoComplete={field.autoComplete} className={inputCls} placeholder={field.placeholder} />
              </div>
            ))}
            <div>
              <label htmlFor="f-type" className="block text-xs font-bold tracking-widest uppercase mb-2"
                     style={{ color: "rgba(28,25,23,0.55)" }}>Tipo di evento *</label>
              <select id="f-type" name="event_type" required className={inputCls + " cursor-pointer"}>
                <option value="">Seleziona...</option>
                {["Compleanno bambini","Compleanno adulti","Festa a tema","Battesimo",
                  "Prima comunione","Anniversario","Conferenza / Meeting","Altro"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="f-msg" className="block text-xs font-bold tracking-widest uppercase mb-2"
                     style={{ color: "rgba(28,25,23,0.55)" }}>Messaggio</label>
              <textarea id="f-msg" name="message" rows={3} className={inputCls + " resize-none"}
                        placeholder="Numero ospiti, idee, richieste particolari..." />
            </div>
            <button type="submit" disabled={loading}
                    className="w-full font-extrabold py-4 rounded-full text-sm tracking-widest uppercase cursor-pointer mt-1 shadow-lg transition-colors duration-200 disabled:opacity-60"
                    style={{ backgroundColor: "#C9A465", color: "#1C1917" }}>
              {loading ? "Invio in corso..." : "Invia richiesta"}
            </button>
            {sent && <p className="text-center text-sm font-semibold" style={{ color: "#16a34a" }}>✓ Grazie! Ti contatteremo presto.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 px-6 lg:px-16" style={{ backgroundColor: "#1C1917" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Ffure" className="h-12 w-auto opacity-90" />
        <nav className="flex flex-wrap justify-center gap-6 text-xs font-bold tracking-widest uppercase">
          {[["#about","Chi siamo"],["#events","Servizi"],["#gallery","Galleria"],["#contact","Contatti"]].map(([href,label]) => (
            <a key={href} href={href} className="transition-colors duration-200 hover:text-[#C9A465]"
               style={{ color: "rgba(255,255,255,0.4)" }}>{label}</a>
          ))}
        </nav>
        <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2025 Ffure. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Numbers />
      <About />

      {/* ── Immersive scroll animation ── */}
      <section className="bg-white">
        <div className="text-center pt-24 pb-0 px-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
                style={{ background: "linear-gradient(90deg,#C9A465,#F0C97A)", color: "#1C1917" }}>
            Scopri i nostri eventi
          </span>
          <h2 className="font-display text-[#1C1917] leading-tight"
              style={{ fontSize: "clamp(3rem,7vw,5.5rem)" }}>
            SCORRI PER <span className="gold-text">SCOPRIRE</span>
          </h2>
        </div>
        <ImmersiveScrollGallery />
      </section>

      <Services />
      <Gallery />
      <GoldBanner />
      <Contact />
      <Footer />
    </main>
  );
}
