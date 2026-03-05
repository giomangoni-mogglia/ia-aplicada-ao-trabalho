"use client";

import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import { CHECKOUT_URL } from "../constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-landscape.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Dark overlay gradient — darkens top & bottom, lets center breathe */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/30 to-[#0A0A0A]/80" />
        {/* Extra top vignette for navbar readability */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0A0A0A]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-5 pt-32 pb-40">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-parchment/70 border border-parchment/20 rounded-full px-5 py-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-goldenrod animate-pulse" />
            Para profissionais que querem usar IA no trabalho
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-parchment font-bold text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02] tracking-tight max-w-4xl text-balance"
        >
          A IA não precisa ser{" "}
          <em className="not-italic text-parchment/60">ameaça.</em>{" "}
          Pode ser seu{" "}
          <em className="italic font-light">superpoder.</em>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 text-[clamp(0.95rem,1.8vw,1.15rem)] text-parchment/55 leading-relaxed max-w-2xl font-light"
        >
          Em <span className="text-parchment font-medium">2 horas</span>,
          identifique quais tarefas do seu trabalho podem ser
          otimizadas com IA, qual ferramenta usar — e como fazer isso{" "}
          <span className="text-parchment font-medium">ainda essa semana</span>.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <div className="pulse-ring-wrap rounded-3xl">
            <AnimatedButton href={CHECKOUT_URL} size="lg">
              Quero aplicar IA no trabalho
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Micro-info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-5 text-parchment/35 text-sm font-light"
        >
          Acesso imediato · Aulas curtas · R$ 147,00
        </motion.p>
      </div>

      {/* Social proof bar at bottom of hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="relative z-10 border-t border-parchment/10 bg-[#0A0A0A]/60 backdrop-blur-md"
      >
        <div className="max-w-5xl mx-auto px-5 py-5 flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {[
            { value: "250+", label: "consultorias realizadas" },
            { value: "50k+", label: "seguidores" },
            { value: "Top Voice", label: "LinkedIn em IA" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <span className="font-bold text-parchment text-sm md:text-base tracking-tight">
                {item.value}
              </span>
              <span className="text-parchment/40 text-xs md:text-sm font-light">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-parchment/10 to-transparent" />
    </section>
  );
}
