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
    name: "Încălțăminte Ortopedică", slug: "incaltaminte", count: 29,
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
  { id: 1, name: "Genunchieră Elastică Premium", category: "Orteze", oldPrice: 149, price: 79, badge: "-47%", rating: 4.8, reviews: 124, color: "from-cyan-100 to-teal-50" },
  { id: 2, name: "Pistol de Masaj Pro 30W", category: "Masaj", oldPrice: 399, price: 199, badge: "-50%", rating: 4.9, reviews: 287, color: "from-orange-100 to-rose-50" },
  { id: 3, name: "Banda Elastică Fitness Set 5x", category: "Fitness", oldPrice: 89, price: 49, badge: "-45%", rating: 4.7, reviews: 98, color: "from-violet-100 to-purple-50" },
  { id: 4, name: "Pernă Ortopedică Cervicală", category: "Dispozitive", oldPrice: 199, price: 119, badge: "-40%", rating: 4.6, reviews: 203, color: "from-blue-100 to-indigo-50" },
  { id: 5, name: "Încălțăminte Barefoot Sport", category: "Încălțăminte", oldPrice: 299, price: 179, badge: "-40%", rating: 4.8, reviews: 156, color: "from-emerald-100 to-green-50" },
  { id: 6, name: "Centura Lombară cu Suport", category: "Orteze", oldPrice: 129, price: 69, badge: "-47%", rating: 4.5, reviews: 89, color: "from-teal-100 to-cyan-50" },
  { id: 7, name: "Aparat Tens Electrostimulare", category: "Dispozitive", oldPrice: 249, price: 149, badge: "-40%", rating: 4.7, reviews: 167, color: "from-indigo-100 to-blue-50" },
  { id: 8, name: "Saltea Acupresură + Pernă", category: "Masaj", oldPrice: 179, price: 99, badge: "-45%", rating: 4.9, reviews: 312, color: "from-rose-100 to-orange-50" },
];

const trustItems = [
  { icon: Icons.truck, title: "Livrare Gratuită", desc: "La comenzi peste 150 RON" },
  { icon: Icons.returnIcon, title: "Retur 30 Zile", desc: "Garanție satisfacție 100%" },
  { icon: Icons.cash, title: "Plata la Livrare", desc: "Cash sau card la curier" },
  { icon: Icons.shield, title: "Produse Certificate", desc: "Calitate garantată" },
];

const testimonials = [
  { name: "Maria D.", city: "București", text: "Am comandat genunchiera și a ajuns în 24h. Calitate excelentă, materialul e premium și se simte foarte bine. Recomand cu încredere!", rating: 5, initials: "MD", color: "bg-cyan-500" },
  { name: "Andrei P.", city: "Cluj-Napoca", text: "Pistolul de masaj e fantastic. L-am folosit după fiecare antrenament și diferența se simte enorm. Calitate-preț excelent.", rating: 5, initials: "AP", color: "bg-orange-500" },
  { name: "Elena M.", city: "Timișoara", text: "Foarte mulțumită de centura lombară. Durerea de spate s-a ameliorat semnificativ după doar o săptămână de utilizare.", rating: 5, initials: "EM", color: "bg-violet-500" },
];

const quantityOffers = [
  { qty: 1, label: "1 Bucată", price: 79, perUnit: 79, save: 0, popular: false },
  { qty: 2, label: "2 Bucăți", price: 139, perUnit: 69, save: 19, popular: true },
  { qty: 3, label: "3 Bucăți", price: 189, perUnit: 63, save: 48, popular: false },
];

/* ═══════════ Components ═══════════ */

function TopBar() {
  return (
    <div className="gradient-primary text-white text-center py-3 px-4 font-bold tracking-wide">
      <span className="animate-shimmer inline-block text-sm md:text-base">
        🔥 TRANSPORT GRATUIT la comenzi peste 150 RON &nbsp;|&nbsp; ⚡ Livrare în 24h &nbsp;|&nbsp; 💰 Plata la livrare
      </span>
    </div>
  );
}

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
  return (
    <div className="flex items-center gap-1.5">
      {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="bg-gray-900 text-white font-extrabold text-lg md:text-xl px-2.5 py-1 rounded-lg min-w-[2.5rem] text-center tabular-nums">{v}</span>
          {i < 2 && <span className="text-sale font-bold text-xl">:</span>}
        </span>
      ))}
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <TopBar />
      <div className="site-container py-4 flex items-center justify-between gap-4">
        {/* Logo — bigger */}
        <a href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-primary/30">
            V
          </div>
          <span className="text-2xl font-extrabold text-gray-900">
            Vital<span className="text-gradient-primary">Zone</span>
            <span className="text-accent text-sm font-bold">.ro</span>
          </span>
        </a>

        {/* Search — bigger */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Caută produse: orteze, masaj, fitness..."
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl py-3.5 px-6 pr-14 text-base focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-gray-400"
            />
            <button className="absolute right-2 top-2 gradient-primary text-white rounded-xl p-2.5 hover:shadow-lg hover:shadow-primary/30 transition-all">
              {Icons.search}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="md:hidden p-2.5 text-gray-600 hover:text-primary rounded-xl transition-all">
            {Icons.search}
          </button>
          <a href="#" className="hidden sm:flex p-2.5 text-gray-600 hover:text-primary rounded-xl transition-all">
            {Icons.user}
          </a>
          <a href="#" className="relative p-2.5 text-gray-600 hover:text-accent rounded-xl transition-all">
            {Icons.cart}
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-sale text-white text-[11px] font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2.5 text-gray-600">
            {mobileOpen ? Icons.close : Icons.menu}
          </button>
        </div>
      </div>

      {/* Desktop nav — BIGGER, BOLDER */}
      <nav className="hidden md:block bg-gray-50 border-t-2 border-primary/10">
        <div className="site-container flex items-center justify-center gap-1 overflow-x-auto py-1">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="py-3 px-5 text-base font-bold text-gray-700 hover:text-white hover:bg-primary rounded-xl transition-all whitespace-nowrap uppercase tracking-wide"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 animate-fade-in-up">
          <div className="py-3">
            <input type="text" placeholder="Caută produse..." className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl py-3 px-5 text-base focus:outline-none focus:border-primary" />
          </div>
          {categories.map((cat, i) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="flex items-center gap-3 py-3 px-4 text-base font-bold text-gray-800 hover:text-white hover:bg-primary rounded-xl transition-all uppercase"
              onClick={() => setMobileOpen(false)}
            >
              <span className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                <span className="text-white text-sm font-bold">{cat.name[0]}</span>
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
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />

      <div className="relative site-container py-14 md:py-20 flex flex-col items-center gap-10">
        <div className="max-w-3xl text-center z-10">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 bg-sale/10 text-sale font-bold text-sm md:text-base px-6 py-2.5 rounded-full mb-6 animate-fade-in-up">
            <span className="w-2.5 h-2.5 bg-sale rounded-full animate-pulse" />
            🔥 OFERTĂ LIMITATĂ — Până la 50% REDUCERE
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] mb-6 animate-fade-in-up">
            Sănătatea Ta,
            <br />
            <span className="text-gradient-primary">Prioritatea Noastră</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up">
            Produse medicale și wellness de calitate superioară.
            <strong className="text-gray-800"> Livrare GRATUITĂ. Plata la livrare.</strong>
          </p>

          {/* Countdown */}
          <div className="flex flex-col items-center gap-3 mb-10 animate-fade-in-up">
            <p className="text-sale font-bold text-sm uppercase tracking-widest">⏰ Oferta expiră în:</p>
            <CountdownTimer />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <a href="#produse" className="group inline-flex items-center justify-center gradient-accent text-white font-extrabold py-5 px-10 rounded-2xl transition-all hover:shadow-2xl hover:shadow-accent/40 hover:scale-105 text-lg animate-pulse-ring">
              👉 VEZI OFERTELE ACUM
            </a>
            <a href="#categorii" className="inline-flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 font-bold py-5 px-10 rounded-2xl hover:border-primary hover:text-primary transition-all text-lg">
              Categorii Produse
            </a>
          </div>

          {/* Stats — bigger */}
          <div className="flex items-center gap-10 mt-12 justify-center animate-fade-in-up">
            {[
              { value: "12,847", label: "Clienți Mulțumiți" },
              { value: "200+", label: "Produse Premium" },
              { value: "⭐ 4.8/5", label: "Rating Mediu" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust strip inline */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 z-10 animate-fade-in-up">
          {[
            { icon: "🚚", text: "Livrare GRATUITĂ" },
            { icon: "↩️", text: "Retur 30 Zile" },
            { icon: "💰", text: "Plata la Livrare" },
            { icon: "✅", text: "Produse Certificate" },
          ].map((t) => (
            <div key={t.text} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-sm border border-gray-100">
              <span className="text-xl">{t.icon}</span>
              <span className="font-bold text-sm text-gray-800">{t.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBar() { return null; }

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  return (
    <div
      className="group bg-white rounded-3xl border border-gray-100 overflow-hidden card-hover animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image */}
      <div className={`relative bg-gradient-to-br ${product.color} p-6 flex items-center justify-center h-56 overflow-hidden`}>
        <div className="w-28 h-28 rounded-full bg-white/50 flex items-center justify-center backdrop-blur-sm">
          <svg className="w-14 h-14 text-gray-400 group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
        </div>

        {product.badge && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-red-500/20">
            {product.badge}
          </span>
        )}

        <button className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-accent hover:scale-110 text-gray-400">
          {Icons.heart}
        </button>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
          <button className="w-full gradient-primary text-white text-sm font-semibold py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-shadow">
            + Adaugă în Coș
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 text-center">
        <p className="text-xs font-bold text-primary mb-1 tracking-widest uppercase">{product.category}</p>
        <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">{product.name}</h3>

        <div className="flex items-center gap-1.5 mb-3 justify-center">
          <div className="flex gap-0.5">{Icons.star}{Icons.star}{Icons.star}{Icons.star}{Icons.star}</div>
          <span className="text-xs font-bold text-gray-700">({product.reviews})</span>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-400 line-through">{product.oldPrice} RON</span>
          <p className="text-2xl font-extrabold text-accent">{product.price} <span className="text-base font-bold">RON</span></p>
          <p className="text-xs font-bold text-green-600 mt-1">Economisești {product.oldPrice - product.price} RON</p>
        </div>
      </div>
    </div>
  );
}

function ProductsSection() {
  return (
    <section id="produse" className="gradient-mesh py-20">
      <div className="site-container">
        <div className="text-center mb-14">
          <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-3">Top Produse</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Cele Mai <span className="text-gradient-primary">Vândute</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-lg">
            Produsele preferate de clienții noștri, cu cele mai bune recenzii
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        <div className="text-center mt-14">
          <a href="#" className="group inline-flex items-center gap-2 gradient-primary text-white font-semibold py-3.5 px-8 rounded-2xl hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02]">
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
    <section id="categorii" className="bg-gray-50 py-20">
      <div className="site-container">
        <div className="text-center mb-14">
          <span className="inline-block text-accent text-sm font-semibold tracking-widest uppercase mb-3">Explorează</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Toate <span className="text-gradient-accent">Categoriile</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-lg">
            Găsește exact ce ai nevoie din gama noastră completă
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="group relative bg-white rounded-3xl p-8 md:p-10 border border-gray-100 card-hover overflow-hidden animate-fade-in-up text-center flex flex-col items-center"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Gradient circle bg */}
              <div className={`absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br ${cat.gradient} rounded-full opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500`} />

              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                {cat.icon}
              </div>

              <h3 className="relative font-bold text-gray-900 text-lg mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="relative text-sm text-gray-400">{cat.count} produse</p>

              <div className="relative flex items-center gap-1 mt-4 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all">
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
    <section className="relative bg-bg-warm py-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative site-container !max-w-4xl">
        <div className="text-center mb-14">
          <span className="inline-block text-accent text-sm font-semibold tracking-widest uppercase mb-3">Economisește</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Ofertă <span className="text-gradient-accent">Specială</span>
          </h2>
          <p className="text-gray-500 text-lg">Genunchieră Elastică Premium — cumperi mai mult, plătești mai puțin</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quantityOffers.map((offer, i) => (
            <div
              key={offer.qty}
              className={`relative rounded-3xl p-7 text-center transition-all duration-300 animate-fade-in-up ${
                offer.popular
                  ? "bg-white border-2 border-accent shadow-2xl shadow-accent/10 scale-105 z-10"
                  : "bg-white border border-gray-200 hover:border-primary/30 hover:shadow-lg"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {offer.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 gradient-accent text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg shadow-accent/30">
                  ⭐ BEST DEAL
                </div>
              )}

              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5">
                <span className="text-3xl font-extrabold text-gradient-primary">{offer.qty}x</span>
              </div>

              <h3 className="font-bold text-xl text-gray-900 mb-1">{offer.label}</h3>
              <p className="text-sm text-gray-400 mb-5">{offer.perUnit} RON / bucată</p>

              <p className="text-4xl font-extrabold text-gray-900 mb-1">
                {offer.price} <span className="text-lg font-bold text-gray-400">RON</span>
              </p>
              {offer.save > 0 && (
                <p className="text-sm font-semibold text-green-600 mb-5">Economisești {offer.save} RON</p>
              )}
              {offer.save === 0 && <p className="text-sm text-gray-400 mb-5">Preț standard</p>}

              <button
                className={`w-full py-3.5 rounded-2xl font-semibold transition-all text-sm ${
                  offer.popular
                    ? "gradient-accent text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:scale-[1.02]"
                    : "gradient-primary text-white hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]"
                }`}
              >
                Comandă Acum
              </button>

              {offer.popular && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="text-green-500">{Icons.check}</span>
                  <span className="text-xs text-gray-500">Cea mai populară opțiune</span>
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
          <div className="absolute top-0 left-1/4 w-64 h-64 border border-white rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 border border-white rounded-full" />
        </div>
        <div className="relative site-container flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white text-center md:text-left">
            <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-3">Oferte limitate</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Nu rata ofertele săptămânii!</h2>
            <p className="text-white/80 text-lg max-w-md">Reduceri de până la 50% la cele mai populare produse din magazin</p>
          </div>
          <a href="#produse" className="gradient-accent text-white font-bold py-4 px-10 rounded-2xl transition-all hover:shadow-2xl hover:shadow-accent/40 hover:scale-105 text-lg shrink-0">
            🔥 Vezi Reducerile
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="gradient-mesh py-20">
      <div className="site-container">
        <div className="text-center mb-14">
          <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-3">Testimoniale</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Ce Spun <span className="text-gradient-primary">Clienții</span>
          </h2>
          <p className="text-gray-500 text-lg">Peste 12,000 de clienți mulțumiți în toată România</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-7 border border-gray-100 card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j}>{Icons.star}</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <div className={`w-11 h-11 ${t.color} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.city}</p>
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
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
      <div className="relative site-container !max-w-2xl text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          Abonează-te pentru Oferte
        </h2>
        <p className="text-gray-500 mb-8 text-lg">Primește primele reduceri și produse noi direct pe email</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Adresa ta de email"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-5 text-sm focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
          <button className="gradient-accent text-white font-semibold py-3.5 px-7 rounded-2xl hover:shadow-lg hover:shadow-accent/30 transition-all hover:scale-[1.02] shrink-0">
            Abonează-te
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-4">Fără spam. Dezabonare oricând.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-primary/30">V</div>
              <span className="text-xl font-bold">Vital<span className="text-primary">Zone</span><span className="text-accent text-sm">.ro</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Magazin online de produse medicale și wellness. Calitate, prețuri accesibile și livrare rapidă în toată România.
            </p>
            <a href="#" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2.5 px-5 rounded-xl transition-all hover:scale-[1.02]">
              {Icons.whatsapp}
              WhatsApp
            </a>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase text-gray-400 mb-5">Informații</h4>
            <ul className="space-y-3 text-sm">
              {["Despre Noi", "Politica de Livrare", "Politica de Retur", "Termeni și Condiții", "Politica GDPR"].map((link) => (
                <li key={link}><a href="#" className="text-gray-400 hover:text-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase text-gray-400 mb-5">Categorii</h4>
            <ul className="space-y-3 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}><a href={`#${cat.slug}`} className="text-gray-400 hover:text-primary transition-colors">{cat.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase text-gray-400 mb-5">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0">
                  {Icons.whatsapp}
                </div>
                <div>
                  <p className="text-gray-400">WhatsApp</p>
                  <a href="#" className="text-white font-medium hover:text-primary transition-colors">0371 XXX XXX</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                </div>
                <div>
                  <p className="text-gray-400">Email</p>
                  <a href="#" className="text-white font-medium hover:text-primary transition-colors">contact@vitalzone.ro</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-gray-400">Program</p>
                  <p className="text-white font-medium">L-V: 09:00 - 18:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 VitalZone.ro — Toate drepturile rezervate</p>
          <div className="flex items-center gap-3">
            {["Visa", "Mastercard", "COD", "Transfer"].map((m) => (
              <div key={m} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs text-gray-400 font-medium">{m}</div>
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
      {/* WhatsApp — left */}
      <a
        href="#"
        className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white font-bold p-4 rounded-full shadow-2xl shadow-green-500/40 transition-all hover:scale-110 flex items-center justify-center"
        title="WhatsApp"
      >
        {Icons.whatsapp}
      </a>
      {/* CTA — right, big sanatateforte style */}
      <a
        href="#produse"
        className="fixed bottom-6 right-6 z-50 gradient-accent text-white font-extrabold py-4 px-8 rounded-full shadow-2xl shadow-accent/50 transition-all hover:scale-110 animate-pulse-ring flex items-center gap-2 text-base"
      >
        👉🏻 COMANDĂ ACUM
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
