"use client";

import { useState } from "react";
import { CHECKOUT_URL } from "../constants";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="relative z-[60] flex items-center justify-center gap-3 px-4 py-2.5 text-center bg-[#0A0A0A] border-b border-parchment/10"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-goldenrod animate-pulse flex-shrink-0" />
      <p className="text-parchment/70 text-xs md:text-sm font-light">
        <span className="text-parchment font-medium">
          IA Aplicada ao Trabalho
        </span>{" "}
        · Acesso imediato · Garantia de 7 dias ·{" "}
        <a
          href={CHECKOUT_URL}
          className="underline-draw text-parchment font-medium hover:text-goldenrod transition-colors duration-200"
        >
          Garantir minha vaga
        </a>
      </p>
      <button
        onClick={() => setVisible(false)}
        aria-label="Fechar aviso"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-parchment/30 hover:text-parchment/60 transition-colors duration-200"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
