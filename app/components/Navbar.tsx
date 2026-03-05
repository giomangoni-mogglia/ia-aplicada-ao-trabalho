"use client";

import { useEffect, useState } from "react";
import { CHECKOUT_URL } from "../constants";

const NAV_LINKS = [
  { label: "Curso", href: "#curso" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Instrutor", href: "#instrutor" },
  { label: "FAQ", href: "#faq" },
];

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
          ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-parchment/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <span className="font-bold text-xl tracking-tight text-parchment">
          mogglia
        </span>

        {/* Nav links — desktop only */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-parchment/60 hover:text-parchment transition-colors duration-200 font-light"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={CHECKOUT_URL}
          className="inline-flex items-center gap-2 text-parchment text-sm font-medium px-5 py-2 rounded-full border border-parchment/30 hover:bg-parchment hover:text-[#0A0A0A] transition-all duration-300"
        >
          <span>Garantir vaga</span>
          <svg
            className="w-3.5 h-3.5"
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
