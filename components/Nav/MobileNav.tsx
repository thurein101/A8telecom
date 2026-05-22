"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/service" },
  { name: "Activities", href: "/activities" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];
type MobileNavProps = {
  pathname: string;
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
};
export default function MobileNav({
  pathname,
  mobileMenu,
  setMobileMenu,
}: MobileNavProps) {
  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setMobileMenu(!mobileMenu)}
        className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/5 transition"
        aria-label="Toggle Menu"
      >
        {mobileMenu ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl"
          >
            <div className="px-5 py-6 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenu(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.name}

                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    )}
                  </Link>
                );
              })}

              <button className="mt-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm active:scale-[0.98] transition">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}