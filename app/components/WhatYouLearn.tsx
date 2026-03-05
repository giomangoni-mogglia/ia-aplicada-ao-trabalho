"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const modules = [
  {
    title: "Por que você trava ao usar IA",
    description:
      "Como parar de desperdiçar tempo com tentativa e erro e entender exatamente como avançar seu uso.",
    icon: (
      <svg className="w-5 h-5 text-tomato" fill="none" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v5M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "As 5 formas de usar IA no trabalho",
    description:
      "Como saber qual delas faz sentido para cada tarefa da sua rotina, para nunca mais abrir uma ferramenta sem saber o que esperar dela.",
    icon: (
      <svg className="w-5 h-5 text-cerulean" fill="none" viewBox="0 0 20 20">
        <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10h6M10 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Casos de uso práticos",
    description:
      "Como usar IA para trabalhar com documentos, analisar dados, criar conteúdo, preparar apresentações com sua identidade visual, reuniões e propostas, e otimizar processos do seu dia a dia.",
    icon: (
      <svg className="w-5 h-5 text-goldenrod" fill="none" viewBox="0 0 20 20">
        <path d="M4 5h12M4 10h12M4 15h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Método MAPA para mapear o seu próprio trabalho",
    description:
      "Como identificar o que otimizar primeiro e sair do curso com um plano concreto para aplicar ainda essa semana.",
    icon: (
      <svg className="w-5 h-5 text-parchment" fill="none" viewBox="0 0 20 20">
        <path d="M3 5l5-2 4 2 5-2v12l-5 2-4-2-5 2V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 3v12M12 5v12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function WhatYouLearn() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#0A0A0A] py-20 md:py-32 overflow-hidden"
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,242,236,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,236,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-cerulean text-sm font-medium uppercase tracking-widest mb-3">
            Conteúdo do curso
          </p>
          <h2
            className="font-bold text-[clamp(1.8rem,4vw,3rem)] text-parchment"
            style={{ letterSpacing: "-0.04em" }}
          >
            O que você vai aprender?
          </h2>
        </motion.div>

        {/* Module cards grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="glass-card rounded-2xl p-6 md:p-8 hover:border-parchment/15 transition-colors duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-white/20 transition-colors duration-300">
                  {mod.icon}
                </div>
                <div className="flex-1">
                  <h3
                    className="font-bold text-parchment text-lg mb-2"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {mod.title}
                  </h3>
                  <p className="text-parchment/55 text-sm leading-relaxed font-light">
                    {mod.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {["Aulas curtas", "Demonstração prática", "Passo a passo"].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-parchment/50 border border-parchment/10 rounded-full px-4 py-1.5"
            >
              <span className="w-1 h-1 rounded-full bg-goldenrod/60" />
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none" />
    </section>
  );
}
