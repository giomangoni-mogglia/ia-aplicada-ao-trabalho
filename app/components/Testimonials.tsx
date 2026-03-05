"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "Consegui economizar 2 horas por semana só automatizando organização de agenda e follow-ups.",
    name: "Eduardo",
    role: "Analista de Produto",
    highlight: "2h/semana economizadas",
    initial: "E",
    color: "#2D6A8A",
  },
  {
    quote:
      "Finalmente entendi quando usar ChatGPT vs Claude vs Gemini. Antes testava no escuro.",
    name: "Marina",
    role: "Analista de Marketing",
    highlight: "Clareza total nas ferramentas",
    initial: "M",
    color: "#D4A017",
  },
  {
    quote:
      "Estruturei a adoção de IA no meu time de 8 pessoas. Economizamos 24 horas por semana.",
    name: "Ricardo",
    role: "Gerente de Vendas",
    highlight: "24h/semana no time",
    initial: "R",
    color: "#F95738",
  },
];

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    el.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-6px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
      el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="radial-reveal tilt-card"
      style={{ transition: "transform 0.15s ease, box-shadow 0.15s ease" }}
    >
      <div
        className="h-full rounded-2xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: `0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      >
        {/* Color accent top */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
          style={{ background: t.color }}
        />

        {/* Quote mark */}
        <svg
          className="absolute top-4 right-6 w-10 h-10 opacity-10"
          fill="currentColor"
          viewBox="0 0 40 32"
          style={{ color: t.color }}
        >
          <path d="M0 32V20Q0 13 3.5 7.5T14 0l2 3Q10 5 7 9.5T6 20h6v12H0zm22 0V20q0-7 3.5-12.5T36 0l2 3q-6 2-9 6.5T28 20h6v12H22z" />
        </svg>

        {/* Highlight badge */}
        <div
          className="inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-xs font-heading font-bold"
          style={{
            background: `${t.color}18`,
            border: `1px solid ${t.color}35`,
            color: t.color,
            letterSpacing: "-0.01em",
          }}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
            <path d="M6 1l1.5 3 3.5.5-2.5 2.5.6 3.5L6 9 2.9 10.5l.6-3.5L1 4.5 4.5 4z" />
          </svg>
          {t.highlight}
        </div>

        {/* Quote */}
        <blockquote className="font-body text-parchment/80 text-base md:text-lg leading-relaxed flex-1">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/6">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-white text-sm flex-shrink-0"
            style={{ background: t.color }}
          >
            {t.initial}
          </div>
          <div>
            <p
              className="font-heading font-bold text-parchment text-sm"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t.name}
            </p>
            <p className="text-parchment/45 text-xs font-body">{t.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative bg-[#0f0f1f] py-20 md:py-32 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(45,106,138,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-cerulean text-sm font-body font-medium uppercase tracking-widest mb-3">
            Resultados reais
          </p>
          <h2
            className="font-heading font-bold text-[clamp(1.8rem,4vw,3rem)] text-parchment"
            style={{ letterSpacing: "-0.04em" }}
          >
            Quem aplicou,{" "}
            <span className="text-goldenrod">sentiu essa semana</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#1A1A2E] pointer-events-none" />
    </section>
  );
}
