"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/service" },
  { name: "Activities", href: "/activities" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

type DesktopNavProps = {
  pathname: string;
};

export default function DesktopNav({ pathname }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full px-2 py-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              isActive
                ? "text-cyan-400"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <span className="relative z-10">
              {item.name}
            </span>

            {isActive && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}