"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedButton from "./AnimatedButton";
import { CHECKOUT_URL } from "../constants";

const features = [
  {
    icon: "🎯",
    label: "3 módulos práticos",
    description: "Diagnóstico, ferramentas e implementação",
  },
  {
    icon: "📋",
    label: "Casos de uso por área",
    description: "Marketing, Produto, Vendas, RH, Ops e mais",
  },
  {
    icon: "🧭",
    label: "Framework de diagnóstico",
    description: "Mapeie suas tarefas otimizáveis em 30 min",
  },
  {
    icon: "💬",
    label: "Galeria de prompts",
    description: "Prompts prontos para situações reais",
  },
  {
    icon: "⚡",
    label: "Acesso imediato",
    description: "Comece agora, aplique essa semana",
  },
  {
    icon: "📜",
    label: "Certificado incluso",
    description: "Comprove seu desenvolvimento profissional",
  },
];

export default function Offer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#0A0A0A] py-20 md:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(249,87,56,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-cerulean text-sm font-sans font-medium uppercase tracking-widest mb-3">
            O produto
          </p>
          <h2
            className="font-bold text-[clamp(1.8rem,4vw,3rem)] text-parchment"
            style={{ letterSpacing: "-0.04em" }}
          >
            IA Aplicada ao Trabalho
          </h2>
        </motion.div>

        {/* Offer card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-border-anim rounded-3xl"
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Top highlight bar */}
            <div className="h-1 bg-gradient-to-r from-tomato via-goldenrod to-cerulean" />

            <div className="p-8 md:p-12">
              {/* Price block */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <p className="text-parchment/40 text-sm font-sans mb-1">
                    Investimento único
                  </p>
                  <div className="flex items-start gap-1">
                    <span className="text-parchment/60 font-bold text-2xl mt-2">
                      R$
                    </span>
                    <span
                      className="font-bold text-[clamp(3.5rem,8vw,5.5rem)] text-parchment leading-none"
                      style={{ letterSpacing: "-0.04em" }}
                    >
                      147
                    </span>
                  </div>
                  <p className="text-parchment/40 text-xs font-sans mt-2">
                    ou 12x de R$ 14,15 no cartão
                  </p>
                </div>

                {/* Value comparison */}
                <div
                  className="rounded-2xl p-4 max-w-xs"
                  style={{
                    background: "rgba(212,160,23,0.06)",
                    border: "1px solid rgba(212,160,23,0.2)",
                  }}
                >
                  <p className="text-goldenrod text-xs font-bold uppercase tracking-wide mb-1">
                    Perspectiva de valor
                  </p>
                  <p className="text-parchment/70 text-sm font-sans leading-snug">
                    Menos que uma assinatura de ferramenta de IA que você não usa direito.
                  </p>
                </div>
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {features.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-white/3 transition-colors duration-200"
                  >
                    <span className="text-xl flex-shrink-0">{f.icon}</span>
                    <div>
                      <p
                        className="font-bold text-parchment text-sm"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {f.label}
                      </p>
                      <p className="text-parchment/45 text-xs font-sans mt-0.5">
                        {f.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

              {/* CTA */}
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="pulse-ring-wrap rounded-3xl"
                >
                  <AnimatedButton href={CHECKOUT_URL} size="lg">
                    Quero aplicar IA no trabalho →
                  </AnimatedButton>
                </motion.div>

                <div className="flex items-center gap-4 text-parchment/35 text-xs font-sans">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-goldenrod/60" fill="none" viewBox="0 0 14 14">
                      <path d="M7 1l1.5 3.5L12 5 9.5 7.5l.6 3.5L7 9.4 3.9 11l.6-3.5L2 5l3.5-.5z" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    Garantia de 7 dias
                  </span>
                  <span>·</span>
                  <span>Acesso imediato</span>
                  <span>·</span>
                  <span>Certificado incluso</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
