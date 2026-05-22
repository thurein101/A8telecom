"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; 
import fdf from "@/public/fdf.jpg";

import { usePathname } from "next/navigation"; 
import Image from "next/image";
// 💡 LINK COMPONENT ကို IMPORT ခေါ်ယူလိုက်ပါသည်
import Link from "next/link"; 

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/service" }, // Note: /services ဖြစ်ရမလား ပြန်စစ်နိုင်ပါသည်
  { name: "Activities", href: "/activities" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function Nav() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-3 shadow-lg shadow-slate-950/50"
          : "bg-cyan-800 border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO AREA */}
          {/* 💡 ပြင်ဆင်ရန် - Link ကို အသုံးပြုထားပါသည် */}
          <Link href="/" onClick={() => setMobileMenu(false)} className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900/80 border border-white/10 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-transform duration-300">
              <Image
                src={fdf}
                alt="Amara8 Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-white font-black text-sm sm:text-base tracking-tight leading-none">
                Amara8 <span className="text-cyan-400 font-medium">Telecom</span>
              </h1>
              <p className="text-slate-400 text-[9px] tracking-widest uppercase mt-1 font-bold">
                Telecom Engineering
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV WITH FLOATING ACCENT UNDERLINE */}
          <nav className="max-md:hidden flex items-center gap-0.5 bg-white/5 border border-white/5 backdrop-blur-md rounded-full p-1 px-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                /* 💡 ပြင်ဆင်ရန် - Link ကို အသုံးပြုထားပါသည် */
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-1.5 text-xs lg:text-sm font-semibold transition-colors duration-300 rounded-lg ${
                    isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT BALANCER */}
          <div className="max-md:hidden w-[40px] shrink-0" />

          {/* MOBILE TOGGLE SWITCH (HAMBURGER) */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="hidden max-md:flex text-white w-10 h-10 items-center justify-center rounded-lg hover:bg-white/5 transition shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER WITH SMOOTH SCALE & FADE ANIMS */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  /* 💡 ပြင်ဆင်ရန် - Link ကို အသုံးပြုထားပါသည် */
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenu(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition text-base font-medium ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400 font-bold"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </Link>
                );
              })}

          
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}