"use client";

import { useEffect, useState } from "react";
import { CHECKOUT_URL } from "../constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1A1A2E]/90 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <span
          className="font-heading font-bold text-xl tracking-tighter text-parchment"
          style={{ letterSpacing: "-0.04em" }}
        >
          mogglia
        </span>

        {/* CTA */}
        <a
          href={CHECKOUT_URL}
          className="group relative inline-flex items-center gap-2 bg-tomato text-white font-heading font-700 text-sm px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-[#e04428] hover:shadow-[0_0_20px_rgba(249,87,56,0.4)]"
          style={{ letterSpacing: "-0.02em", fontWeight: 700 }}
        >
          <span>Quero aplicar IA no trabalho</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </nav>
  );
}
