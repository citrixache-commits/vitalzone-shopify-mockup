"use client";

import { useState, useEffect } from "react";

/* ═══════════ SVG Icons ═══════════ */
const Icons = {
  search: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  cart: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  ),
  user: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  heart: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  arrow: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  star: (
    <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  menu: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  truck: (
    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21.75a1.125 1.125 0 001.125-1.125V11.25a3 3 0 00-3-3h-1.5l-1.125-2.25A1.5 1.5 0 0015.75 4.5H14.25m0 0V3.375c0-.621-.504-1.125-1.125-1.125H5.625C5.004 2.25 4.5 2.754 4.5 3.375V14.25" />
    </svg>
  ),
  returnIcon: (
    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
  ),
  cash: (
    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  shield: (
    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  check: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  whatsapp: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
};

/* ═══════════ Data ═══════════ */
const categories = [
  {
    name: "Orteze & Bandaje", slug: "orteze", count: 48,
    gradient: "from-cyan-400 to-teal-500",
    icon: <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
  },
  {
    name: "Aparate de Masaj", slug: "masaj", count: 35,
    gradient: "from-orange-400 to-rose-500",
    icon: <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>,
  },
  {
    name: "Echipament Fitness", slug: "fitness", count: 62,
    gradient: "from-violet-500 to-purple-600",
    icon: <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  },
  {
    name: "Incaltaminte Ortopedica", slug: "incaltaminte", count: 29,
    gradient: "from-emerald-400 to-green-600",
    icon: <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
  },
  {
    name: "Dispozitive Medicale", slug: "dispozitive", count: 41,
    gradient: "from-blue-500 to-indigo-600",
    icon: <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
  },
  {
    name: "Suplimente & Vitamine", slug: "suplimente", count: 53,
    gradient: "from-amber-400 to-orange-500",
    icon: <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  },
];

const products = [
  { id: 1, name: "Genunchiera Elastica Premium", category: "Orteze", oldPrice: 149, price: 79, badge: "-47%", rating: 4.8, reviews: 124, color: "from-cyan-100 to-teal-50" },
  { id: 2, name: "Pistol de Masaj Pro 30W", category: "Masaj", oldPrice: 399, price: 199, badge: "-50%", rating: 4.9, reviews: 287, color: "from-orange-100 to-rose-50" },
  { id: 3, name: "Banda Elastica Fitness Set 5x", category: "Fitness", oldPrice: 89, price: 49, badge: "-45%", rating: 4.7, reviews: 98, color: "from-violet-100 to-purple-50" },
  { id: 4, name: "Perna Ortopedica Cervicala", category: "Dispozitive", oldPrice: 199, price: 119, badge: "-40%", rating: 4.6, reviews: 203, color: "from-blue-100 to-indigo-50" },
  { id: 5, name: "Incaltaminte Barefoot Sport", category: "Incaltaminte", oldPrice: 299, price: 179, badge: "-40%", rating: 4.8, reviews: 156, color: "from-emerald-100 to-green-50" },
  { id: 6, name: "Centura Lombara cu Suport", category: "Orteze", oldPrice: 129, price: 69, badge: "-47%", rating: 4.5, reviews: 89, color: "from-teal-100 to-cyan-50" },
  { id: 7, name: "Aparat Tens Electrostimulare", category: "Dispozitive", oldPrice: 249, price: 149, badge: "-40%", rating: 4.7, reviews: 167, color: "from-indigo-100 to-blue-50" },
  { id: 8, name: "Saltea Acupresura + Perna", category: "Masaj", oldPrice: 179, price: 99, badge: "-45%", rating: 4.9, reviews: 312, color: "from-rose-100 to-orange-50" },
];

const trustItems = [
  { icon: Icons.truck, title: "Livrare Gratuita", desc: "La comenzi peste 150 RON" },
  { icon: Icons.returnIcon, title: "Retur 30 Zile", desc: "Garantie satisfactie 100%" },
  { icon: Icons.cash, title: "Plata la Livrare", desc: "Cash sau card la curier" },
  { icon: Icons.shield, title: "Produse Certificate", desc: "Calitate garantata" },
];

const testimonials = [
  { name: "Maria D.", city: "Bucuresti", text: "Am comandat genunchiera si a ajuns in 24h. Calitate excelenta, materialul e premium si se simte foarte bine. Recomand cu incredere!", rating: 5, initials: "MD", color: "bg-cyan-500" },
  { name: "Andrei P.", city: "Cluj-Napoca", text: "Pistolul de masaj e fantastic. L-am folosit dupa fiecare antrenament si diferenta se simte enorm. Calitate-pret excelent.", rating: 5, initials: "AP", color: "bg-orange-500" },
  { name: "Elena M.", city: "Timisoara", text: "Foarte multumita de centura lombara. Durerea de spate s-a ameliorat semnificativ dupa doar o saptamana de utilizare.", rating: 5, initials: "EM", color: "bg-violet-500" },
];

const quantityOffers = [
  { qty: 1, label: "1 Bucata", price: 79, perUnit: 79, save: 0, popular: false },
  { qty: 2, label: "2 Bucati", price: 139, perUnit: 69, save: 19, popular: true },
  { qty: 3, label: "3 Bucati", price: 189, perUnit: 63, save: 48, popular: false },
];

/* ═══════════ Components ═══════════ */

function CountdownTimer() {
  const [time, setTime] = useState({ h: 2, m: 47, s: 33 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const labels = ["ORE", "MIN", "SEC"];

  return (
    <div className="flex items-center gap-3">
      {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
        <span key={i} className="flex items-center gap-3">
          <span className="flex flex-col items-center">
            <span className="glass-light rounded-2xl px-4 py-3 min-w-[3.5rem] text-center">
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tabular-nums">{v}</span>
            </span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 mt-1.5">{labels[i]}</span>
          </span>
          {i < 2 && <span className="text-primary font-bold text-2xl -mt-5">:</span>}
        </span>
      ))}
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-black/5" : "shadow-sm"}`}>
      {/* Top announcement bar */}
      <div className="gradient-primary text-white text-center py-2.5 px-4">
        <span className="animate-shimmer inline-block text-xs md:text-sm font-medium tracking-wide">
          Transport gratuit la comenzi peste 150 RON &nbsp;&bull;&nbsp; Livrare in 24h &nbsp;&bull;&nbsp; Plata la livrare
        </span>
      </div>

      <div className="site-container py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-11 h-11 gradient-primary rounded-2xl flex items-center justify-center font-extrabold text-lg shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow ring-1 ring-[#FFD700]/50" style={{ color: '#FFD700' }}>
            S
          </div>
          <span className="text-2xl font-extrabold text-gray-900">
            Sano<span className="text-gradient-primary">Viva</span>
            <span className="text-accent text-sm font-bold">.ro</span>
          </span>
        </a>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-lg">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Cauta produse: orteze, masaj, fitness..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 px-6 pr-12 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
            />
            <button className="absolute right-1.5 top-1.5 gradient-primary text-white rounded-full p-2 hover:shadow-lg hover:shadow-primary/30 transition-all">
              {Icons.search}
            </button>
          </div>
        </div>

        {/* Nav links (desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {["Produse", "Categorii", "Oferte", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative text-sm font-semibold text-slate-600 hover:text-primary px-3.5 py-2 rounded-lg transition-colors after:content-[''] after:absolute after:bottom-0.5 after:left-3.5 after:right-3.5 after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button className="md:hidden p-2.5 text-slate-500 hover:text-primary rounded-xl transition-colors">
            {Icons.search}
          </button>
          <a href="#" className="hidden sm:flex p-2.5 text-slate-500 hover:text-primary rounded-xl transition-colors">
            {Icons.user}
          </a>
          <a href="#" className="relative p-2.5 text-slate-500 hover:text-accent rounded-xl transition-colors">
            {Icons.cart}
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 gradient-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
              0
            </span>
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2.5 text-slate-500">
            {mobileOpen ? Icons.close : Icons.menu}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-slate-100 bg-white px-4 pb-5 animate-fade-in-up">
          <div className="py-3">
            <input
              type="text"
              placeholder="Cauta produse..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 px-5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="flex items-center gap-3 py-3 px-4 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <span className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-sm`}>
                <span className="text-white text-xs font-bold">{cat.name[0]}</span>
              </span>
              {cat.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative gradient-hero overflow-hidden">
      {/* Floating decorative orbs */}
      <div className="absolute top-20 left-[15%] w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-10 right-[10%] w-96 h-96 bg-accent/8 rounded-full blur-[120px] animate-float-delay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #00838F 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative site-container py-20 md:py-28 lg:py-32 flex flex-col items-center gap-12">
        <div className="max-w-3xl text-center z-10">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2.5 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary-dark tracking-wide">Oferta limitata - Pana la 50% reducere</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-6 animate-fade-in-up">
            Sanatatea Ta,
            <br />
            <span className="text-gradient-primary">Prioritatea Noastra</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up">
            Produse medicale si wellness de calitate superioara.
            <span className="text-slate-800 font-medium"> Livrare gratuita. Plata la livrare.</span>
          </p>

          {/* Countdown */}
          <div className="flex flex-col items-center gap-4 mb-12 animate-fade-in-up">
            <p className="text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase">Oferta expira in</p>
            <CountdownTimer />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <a
              href="#produse"
              className="group inline-flex items-center justify-center gap-2 gradient-accent text-white font-bold py-4 px-10 rounded-full transition-all hover:shadow-2xl hover:shadow-accent/30 hover:scale-[1.03] text-base animate-pulse-ring"
            >
              Vezi Ofertele Acum
              <span className="group-hover:translate-x-1 transition-transform">{Icons.arrow}</span>
            </a>
            <a
              href="#categorii"
              className="inline-flex items-center justify-center gap-2 border-2 border-slate-300 text-slate-700 font-bold py-4 px-10 rounded-full transition-all hover:border-primary hover:text-primary hover:scale-[1.03] text-base"
            >
              Categorii Produse
            </a>
          </div>
        </div>

        {/* Trust pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 z-10 animate-fade-in-up">
          {[
            { icon: Icons.truck, text: "Livrare Gratuita" },
            { icon: Icons.returnIcon, text: "Retur 30 Zile" },
            { icon: Icons.cash, text: "Plata la Livrare" },
            { icon: Icons.shield, text: "Produse Certificate" },
          ].map((t) => (
            <div key={t.text} className="glass-light rounded-2xl px-5 py-3 flex items-center gap-3">
              <span className="text-primary">{t.icon}</span>
              <span className="text-sm font-semibold text-slate-700">{t.text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-12 md:gap-16 z-10 animate-fade-in-up">
          {[
            { value: "12,847", label: "Clienti Multumiti" },
            { value: "200+", label: "Produse Premium" },
            { value: "4.8/5", label: "Rating Mediu" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="bg-white border-b border-slate-100">
      <div className="site-container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  return (
    <div
      className="group bg-white rounded-3xl border border-slate-100 overflow-hidden card-hover animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image area */}
      <div className={`relative bg-gradient-to-br ${product.color} p-8 flex items-center justify-center h-56 overflow-hidden`}>
        <div className="w-24 h-24 rounded-full bg-white/60 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
          <svg className="w-12 h-12 text-slate-300 group-hover:text-primary transition-colors duration-500" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
        </div>

        {product.badge && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/20">
            {product.badge}
          </span>
        )}

        <button className="absolute top-4 right-4 w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-accent hover:scale-110 text-slate-400">
          {Icons.heart}
        </button>

        {/* Quick add */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-4">
          <button className="w-full gradient-primary text-white text-sm font-semibold py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-shadow">
            + Adauga in Cos
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 text-center">
        <p className="text-[11px] font-semibold text-primary mb-1.5 tracking-[0.15em] uppercase">{product.category}</p>
        <h3 className="font-bold text-slate-900 text-sm mb-3 leading-snug line-clamp-2 group-hover:text-primary transition-colors">{product.name}</h3>

        <div className="flex items-center gap-1 mb-4 justify-center">
          <div className="flex gap-0.5">{Icons.star}{Icons.star}{Icons.star}{Icons.star}{Icons.star}</div>
          <span className="text-xs text-slate-500 font-medium">({product.reviews})</span>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <span className="text-sm text-slate-400 line-through">{product.oldPrice} RON</span>
          <p className="text-2xl font-extrabold text-accent mt-0.5">{product.price} <span className="text-sm font-bold">RON</span></p>
          <p className="text-xs font-semibold text-green-600 mt-1.5">Economisesti {product.oldPrice - product.price} RON</p>
        </div>
      </div>
    </div>
  );
}

function ProductsSection() {
  return (
    <section id="produse" className="gradient-mesh py-24">
      <div className="site-container">
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4">Top Produse</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Cele Mai <span className="text-gradient-primary">Vandute</span>
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-base leading-relaxed">
            Produsele preferate de clientii nostri, cu cele mai bune recenzii
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        <div className="text-center mt-16">
          <a href="#" className="group inline-flex items-center gap-2 gradient-primary text-white font-semibold py-3.5 px-8 rounded-full hover:shadow-xl hover:shadow-primary/20 transition-all hover:scale-[1.02]">
            Vezi Toate Produsele
            <span className="group-hover:translate-x-1 transition-transform">{Icons.arrow}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section id="categorii" className="bg-slate-50 py-24">
      <div className="site-container">
        <div className="text-center mb-16">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Exploreaza</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Toate <span className="text-gradient-accent">Categoriile</span>
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-base leading-relaxed">
            Gaseste exact ce ai nevoie din gama noastra completa
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {categories.map((cat, i) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="group bg-white rounded-3xl p-8 md:p-10 border border-slate-100 card-hover overflow-hidden animate-fade-in-up text-center flex flex-col items-center relative"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${cat.gradient} rounded-full opacity-[0.07] group-hover:opacity-[0.15] group-hover:scale-150 transition-all duration-700`} />

              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                {cat.icon}
              </div>

              <h3 className="relative font-bold text-slate-900 text-base mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="relative text-sm text-slate-400">{cat.count} produse</p>

              <div className="relative flex items-center gap-1.5 mt-5 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                Vezi produsele
                <span className="group-hover:translate-x-1 transition-transform">{Icons.arrow}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuantityOfferSection() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative site-container max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Economiseste</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Oferta <span className="text-gradient-accent">Speciala</span>
          </h2>
          <p className="text-slate-500 text-base">Genunchiera Elastica Premium - cumperi mai mult, platesti mai putin</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quantityOffers.map((offer, i) => (
            <div
              key={offer.qty}
              className={`relative rounded-3xl p-8 text-center transition-all duration-300 animate-fade-in-up ${
                offer.popular
                  ? "bg-white border-2 border-accent shadow-2xl shadow-accent/10 scale-105 z-10"
                  : "bg-white border border-slate-200 hover:border-primary/30 hover:shadow-xl"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {offer.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 gradient-accent text-white text-[11px] font-bold px-5 py-1.5 rounded-full shadow-lg shadow-accent/30 tracking-wide">
                  BEST DEAL
                </div>
              )}

              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
                <span className="text-3xl font-extrabold text-gradient-primary">{offer.qty}x</span>
              </div>

              <h3 className="font-bold text-xl text-slate-900 mb-1">{offer.label}</h3>
              <p className="text-sm text-slate-400 mb-6">{offer.perUnit} RON / bucata</p>

              <p className="text-4xl font-extrabold text-slate-900 mb-1">
                {offer.price} <span className="text-lg font-bold text-slate-400">RON</span>
              </p>
              {offer.save > 0 && (
                <p className="text-sm font-semibold text-green-600 mb-6">Economisesti {offer.save} RON</p>
              )}
              {offer.save === 0 && <p className="text-sm text-slate-400 mb-6">Pret standard</p>}

              <button
                className={`w-full py-3.5 rounded-full font-semibold transition-all text-sm ${
                  offer.popular
                    ? "gradient-accent text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02]"
                    : "gradient-primary text-white hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
                }`}
              >
                Comanda Acum
              </button>

              {offer.popular && (
                <div className="flex items-center justify-center gap-2 mt-5">
                  <span className="text-green-500">{Icons.check}</span>
                  <span className="text-xs text-slate-500 font-medium">Cea mai populara optiune</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="gradient-primary py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-[20%] w-64 h-64 border border-white/50 rounded-full" />
          <div className="absolute bottom-0 right-[20%] w-96 h-96 border border-white/30 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/40 rounded-full" />
        </div>
        <div className="relative site-container flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white text-center md:text-left">
            <p className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Oferte limitate</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Nu rata ofertele saptamanii!</h2>
            <p className="text-white/70 text-base max-w-md">Reduceri de pana la 50% la cele mai populare produse din magazin</p>
          </div>
          <a href="#produse" className="gradient-accent text-white font-bold py-4 px-10 rounded-full transition-all hover:shadow-2xl hover:shadow-accent/40 hover:scale-105 text-base shrink-0">
            Vezi Reducerile
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="gradient-mesh py-24">
      <div className="site-container">
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4">Testimoniale</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Ce Spun <span className="text-gradient-primary">Clientii</span>
          </h2>
          <p className="text-slate-500 text-base">Peste 12,000 de clienti multumiti in toata Romania</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-8 border border-slate-100 card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j}>{Icons.star}</span>
                ))}
              </div>

              <p className="text-slate-600 text-sm mb-8 leading-relaxed">&ldquo;{t.text}&rdquo;</p>

              <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                <div className={`w-11 h-11 ${t.color} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 gradient-primary opacity-[0.02]" />
      <div className="relative site-container max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          Aboneaza-te pentru Oferte
        </h2>
        <p className="text-slate-500 mb-8 text-base">Primeste primele reduceri si produse noi direct pe email</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Adresa ta de email"
            className="flex-1 bg-white border border-slate-200 rounded-full py-3.5 px-6 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
          <button className="gradient-accent text-white font-semibold py-3.5 px-7 rounded-full hover:shadow-lg hover:shadow-accent/20 transition-all hover:scale-[1.02] shrink-0">
            Aboneaza-te
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-4">Fara spam. Dezabonare oricand.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="gradient-dark text-white pt-20 pb-8">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center font-extrabold text-lg shadow-lg shadow-primary/20 ring-1 ring-[#FFD700]/50" style={{ color: '#FFD700' }}>S</div>
              <span className="text-xl font-extrabold">Sano<span className="text-primary">Viva</span><span className="text-accent text-sm">.ro</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Magazin online de produse medicale si wellness. Calitate, preturi accesibile si livrare rapida in toata Romania.
            </p>
            <a href="#" className="inline-flex items-center gap-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold py-2.5 px-5 rounded-full transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-green-600/30">
              {Icons.whatsapp}
              WhatsApp
            </a>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-6">Informatii</h4>
            <ul className="space-y-3.5 text-sm">
              {["Despre Noi", "Politica de Livrare", "Politica de Retur", "Termeni si Conditii", "Politica GDPR"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-6">Categorii</h4>
            <ul className="space-y-3.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <a href={`#${cat.slug}`} className="text-slate-400 hover:text-primary transition-colors">{cat.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-6">Contact</h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-primary shrink-0">
                  {Icons.whatsapp}
                </div>
                <div>
                  <p className="text-slate-500 text-xs">WhatsApp</p>
                  <a href="#" className="text-white font-medium hover:text-primary transition-colors">0371 XXX XXX</a>
                </div>
              </li>
              <li className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Email</p>
                  <a href="#" className="text-white font-medium hover:text-primary transition-colors">contact@sanoviva.ro</a>
                </div>
              </li>
              <li className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Program</p>
                  <p className="text-white font-medium">L-V: 09:00 - 18:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">&#169; 2026 SanoViva.ro &#8212; Toate drepturile rezervate</p>
          <div className="flex items-center gap-3">
            {["Visa", "Mastercard", "COD", "Transfer"].map((m) => (
              <div key={m} className="px-3.5 py-1.5 glass rounded-lg text-xs text-slate-400 font-medium">{m}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingButtons() {
  return (
    <>
      {/* WhatsApp - left */}
      <a
        href="#"
        className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-400 text-white font-bold p-4 rounded-full shadow-2xl shadow-green-500/30 transition-all hover:scale-110 flex items-center justify-center"
        title="WhatsApp"
      >
        {Icons.whatsapp}
      </a>
      {/* CTA - right */}
      <a
        href="#produse"
        className="fixed bottom-6 right-6 z-50 gradient-accent text-white font-bold py-3.5 px-7 rounded-full shadow-2xl shadow-accent/40 transition-all hover:scale-110 animate-pulse-ring flex items-center gap-2 text-sm"
      >
        COMANDA ACUM
      </a>
    </>
  );
}

/* ═══════════ Page ═══════════ */
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustBar />
        <ProductsSection />
        <CategoriesSection />
        <QuantityOfferSection />
        <PromoBanner />
        <TestimonialsSection />
        <Newsletter />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
