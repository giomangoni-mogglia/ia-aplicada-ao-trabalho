"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "250+", label: "profissionais atendidos" },
  { value: "50k+", label: "seguidores" },
  { value: "3", label: "grandes palestras" },
];

export default function Instructor() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#1A1A2E] py-20 md:py-32 overflow-hidden"
    >
      {/* Decorative blob */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-cerulean/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-goldenrod/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Photo frame */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto md:mx-0">
              {/* Placeholder visual — replace with actual photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-cerulean/30 to-space-indigo aurora-bg" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-8">
                {/* Abstract person icon */}
                <svg viewBox="0 0 80 100" className="w-32 h-40 opacity-25 text-parchment" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="40" cy="22" r="16" />
                  <path d="M10 80 Q10 55 40 55 Q70 55 70 80 L70 100 L10 100 Z" />
                </svg>
                <div className="space-y-1">
                  <div className="h-2 w-32 bg-white/20 rounded" />
                  <div className="h-1.5 w-20 bg-white/10 rounded mx-auto" />
                </div>
                <p className="text-parchment/40 text-xs font-body">
                  Substitua com sua foto
                </p>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-transparent" />
            </div>

            {/* Floating credential card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-4 -right-4 md:right-0 glass-card rounded-2xl p-4 max-w-[200px] animate-float"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-goldenrod animate-pulse" />
                <span className="text-goldenrod text-xs font-heading font-bold uppercase tracking-wide">
                  Top Voice
                </span>
              </div>
              <p className="text-parchment text-xs font-body leading-tight">
                LinkedIn em IA · 2024
              </p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-cerulean text-sm font-body font-medium uppercase tracking-widest mb-4">
              Quem ensina
            </p>

            <h2
              className="font-heading font-bold text-[clamp(2rem,4vw,3.2rem)] text-parchment mb-6"
              style={{ letterSpacing: "-0.04em" }}
            >
              Gio Mangoni
            </h2>

            <p className="font-body text-parchment/70 text-base md:text-lg leading-relaxed mb-8">
              Educadora de IA aplicada ao trabalho. 250+ profissionais e
              empresas atendidos. Top Voice LinkedIn. Palestras na{" "}
              <span className="text-parchment font-medium">Red Bull</span>,{" "}
              <span className="text-parchment font-medium">UNIMED</span> e{" "}
              <span className="text-parchment font-medium">FGV</span>.
            </p>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative pl-6 mb-10"
            >
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-tomato via-goldenrod to-transparent" />
              <p className="font-serif italic text-parchment text-xl md:text-2xl leading-snug">
                &ldquo;Eu não ensino IA como hype.
                <br />
                <span className="text-goldenrod not-italic font-heading font-bold">
                  Ensino como ferramenta de trabalho.
                </span>
                &rdquo;
              </p>
            </motion.blockquote>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <p
                    className="font-heading font-bold text-parchment text-2xl"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-parchment/45 text-xs font-body mt-1 leading-tight">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
